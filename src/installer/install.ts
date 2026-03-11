import fs from 'fs-extra'
import { join, resolve, dirname } from 'pathe'
import { stringify as stringifyTOML } from 'smol-toml'
import { fileURLToPath } from 'node:url'
import { resolveInstallPaths, type InstallPaths } from '../paths.js'
import { loadGlobalConfig, globalConfigSchema, type GlobalConfig } from '../config/index.js'
import { renderTemplateDir } from './render.js'
import { selectBinary, copyBinaryToTarget, verifyChecksum } from './assets.js'

function getPackageRoot(): string {
  // dist/cli.mjs 打包后只需向上 1 级；fileURLToPath 正确处理 URL 编码（如中文路径）
  return resolve(dirname(fileURLToPath(import.meta.url)), '..')
}

export async function ensureBaseDirs(paths: InstallPaths): Promise<void> {
  await fs.ensureDir(paths.NOVEL_HOME)
  await fs.ensureDir(paths.COMMANDS_DIR)
  await fs.ensureDir(paths.PROMPTS_DIR)
  await fs.ensureDir(paths.STATE_ROOT)
  await fs.ensureDir(dirname(paths.WRAPPER_PATH))
}

export async function installWrapperBinary(paths: InstallPaths): Promise<{ installed: boolean; path: string }> {
  // Check if already installed and working
  if (await fs.pathExists(paths.WRAPPER_PATH)) {
    return { installed: true, path: paths.WRAPPER_PATH }
  }

  const packageRoot = getPackageRoot()
  const platform = process.platform
  const arch = process.arch
  const relativeBin = selectBinary(platform, arch)
  const assetPath = join(packageRoot, relativeBin)

  if (!(await fs.pathExists(assetPath))) {
    return { installed: false, path: paths.WRAPPER_PATH }
  }

  await copyBinaryToTarget(assetPath, paths.WRAPPER_PATH)

  // Try to verify checksum from manifest
  const manifestPath = join(packageRoot, 'bin', 'checksums.json')
  if (await fs.pathExists(manifestPath)) {
    const manifest = await fs.readJSON(manifestPath) as Record<string, string>
    const valid = await verifyChecksum(paths.WRAPPER_PATH, manifest)
    if (!valid) {
      console.warn(`[warn] wrapper binary checksum mismatch: ${paths.WRAPPER_PATH}`)
    }
  }

  return { installed: true, path: paths.WRAPPER_PATH }
}

export async function installPrompts(
  paths: InstallPaths,
  renderVars: Record<string, string>,
): Promise<string[]> {
  const srcDir = join(getPackageRoot(), 'templates', 'prompts')
  if (!(await fs.pathExists(srcDir))) return []
  return renderTemplateDir(srcDir, paths.PROMPTS_DIR, renderVars)
}

export async function installCommands(
  paths: InstallPaths,
  renderVars: Record<string, string>,
): Promise<string[]> {
  const srcDir = join(getPackageRoot(), 'templates', 'commands')
  if (!(await fs.pathExists(srcDir))) return []
  return renderTemplateDir(srcDir, paths.COMMANDS_DIR, renderVars)
}

export async function installStateTemplates(
  paths: InstallPaths,
  genre: string,
): Promise<string[]> {
  const written: string[] = []

  // Try genre-specific templates first
  const genreDir = join(getPackageRoot(), 'templates', 'state', 'genres', genre)
  if (await fs.pathExists(genreDir)) {
    const files = await renderTemplateDir(genreDir, paths.STATE_ROOT, {})
    written.push(...files)
    return written
  }

  // Fallback: create default state skeletons
  console.warn(`[warn] 未找到题材 "${genre}" 的专用模板 (${genreDir})，使用通用骨架`)
  await fs.ensureDir(paths.STATE_ROOT)

  const skeletons: Record<string, string> = {
    'status_card.md': [
      '# 当前状态卡',
      '',
      '> 唯一的当前时间点状态覆盖文件',
      '',
      '| 字段 | 值 |',
      '|------|-----|',
      '| 当前章节 | 0 |',
      '| 当前时间 | 待填写 |',
      '| 当前地点 | 待填写 |',
      '| 主角状态 | 待填写 |',
      '',
    ].join('\n'),
    'hooks_pool.md': [
      '# 伏笔池',
      '',
      '> 记录所有待回收伏笔，每卷开篇前必读',
      '',
      '| hook_id | 起始章 | 类型 | 状态 | 最近推进 | 预期回收窗口 | 备注 |',
      '|---------|--------|------|------|----------|-------------|------|',
      '',
    ].join('\n'),
    'timeline.md': [
      '# 时间线',
      '',
      '> 按时间顺序记录关键事件',
      '',
      '| 序号 | 时间 | 事件 | 涉及人物 | 影响 | 章节 |',
      '|------|------|------|----------|------|------|',
      '',
    ].join('\n'),
    'ledger.md': [
      '# 资源账本',
      '',
      '> 追踪主角资源变动，数值必须可追溯',
      '',
      '| 章节 | 期初 | 变动来源 | 变动值 | 期末 | 依据 |',
      '|------|------|----------|--------|------|------|',
      '',
    ].join('\n'),
    'characters.md': [
      '# 角色档案',
      '',
      '> 记录所有出场角色的当前状态、关系、立场。角色状态变化时必须同步更新。',
      '',
      '| 角色ID | 姓名 | 定位 | 状态 | 所属势力 | 动机 | 与主角关系 | 最后出场章 | 备注 |',
      '|--------|------|------|------|----------|------|-----------|-----------|------|',
      '',
    ].join('\n'),
  }

  for (const [filename, content] of Object.entries(skeletons)) {
    const filePath = join(paths.STATE_ROOT, filename)
    if (!(await fs.pathExists(filePath))) {
      await fs.writeFile(filePath, content, 'utf-8')
      written.push(filePath)
    }
  }

  return written
}

export async function writeOrMergeGlobalConfig(
  paths: InstallPaths,
  defaults: Partial<GlobalConfig>,
): Promise<void> {
  let existing: GlobalConfig
  try {
    existing = await loadGlobalConfig(paths.CONFIG_PATH)
  } catch {
    existing = globalConfigSchema.parse({})
  }

  const merged: GlobalConfig = {
    ...existing,
    ...defaults,
    paths: { ...existing.paths, ...defaults.paths },
    wrapper: { ...existing.wrapper, ...defaults.wrapper },
    models: { ...existing.models, ...defaults.models },
    workflow: { ...existing.workflow, ...defaults.workflow },
    defaults: { ...existing.defaults, ...defaults.defaults },
  }

  const validated = globalConfigSchema.parse(merged)

  await fs.ensureDir(dirname(paths.CONFIG_PATH))
  await fs.writeFile(
    paths.CONFIG_PATH,
    stringifyTOML(validated as Record<string, unknown>),
    'utf-8',
  )
}
