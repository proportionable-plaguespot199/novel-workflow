import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import fs from 'fs-extra'
import ansis from 'ansis'
import { resolveInstallPaths } from '../paths.js'
import { loadGlobalConfig } from '../config/index.js'

const execFileAsync = promisify(execFile)

interface CheckResult {
  name: string
  status: 'pass' | 'fail' | 'warn'
  message: string
  fix?: string
}

function pass(name: string, message: string): CheckResult {
  return { name, status: 'pass', message }
}
function fail(name: string, message: string, fix?: string): CheckResult {
  return { name, status: 'fail', message, fix }
}
function warn(name: string, message: string, fix?: string): CheckResult {
  return { name, status: 'warn', message, fix }
}

async function checkNodeVersion(): Promise<CheckResult> {
  const major = Number.parseInt(process.version.slice(1), 10)
  if (major >= 18) return pass('Node.js', process.version)
  return fail('Node.js', process.version, '请升级 Node.js 至 v18 或以上')
}

async function checkDir(label: string, dirPath: string): Promise<CheckResult> {
  if (await fs.pathExists(dirPath)) return pass(label, dirPath)
  return fail(label, `目录不存在: ${dirPath}`, 'novel-workflow init')
}

async function checkFile(label: string, filePath: string): Promise<CheckResult> {
  if (await fs.pathExists(filePath)) return pass(label, filePath)
  return fail(label, `文件不存在: ${filePath}`, 'novel-workflow init')
}

async function checkConfig(): Promise<CheckResult> {
  const paths = resolveInstallPaths()
  try {
    const config = await loadGlobalConfig(paths.CONFIG_PATH)
    return pass('全局配置解析', `version=${config.version}, genre=${config.defaults?.genre ?? 'N/A'}`)
  } catch (err) {
    return fail(
      '全局配置解析',
      `解析失败: ${err instanceof Error ? err.message : String(err)}`,
      '检查 config.toml 格式，或删除后重新 novel-workflow init',
    )
  }
}

async function checkWrapper(): Promise<CheckResult> {
  const paths = resolveInstallPaths()

  if (!(await fs.pathExists(paths.WRAPPER_PATH))) {
    return fail('codeagent-wrapper', `未找到: ${paths.WRAPPER_PATH}`, 'novel-workflow init')
  }

  if (process.platform !== 'win32') {
    try {
      await fs.access(paths.WRAPPER_PATH, fs.constants.X_OK)
    } catch {
      return fail(
        'codeagent-wrapper',
        `不可执行: ${paths.WRAPPER_PATH}`,
        `chmod +x ${paths.WRAPPER_PATH}`,
      )
    }
  }

  return pass('codeagent-wrapper', paths.WRAPPER_PATH)
}

async function checkCliTool(name: string, cmd: string): Promise<CheckResult> {
  const which = process.platform === 'win32' ? 'where' : 'which'
  try {
    const { stdout } = await execFileAsync(which, [cmd])
    return pass(name, stdout.trim().split('\n')[0])
  } catch {
    return warn(name, `未找到 "${cmd}" 命令`, `请安装 ${name} 或检查 PATH`)
  }
}

async function checkCommands(): Promise<CheckResult> {
  const paths = resolveInstallPaths()
  if (!(await fs.pathExists(paths.COMMANDS_DIR))) {
    return fail('命令模板', `目录不存在: ${paths.COMMANDS_DIR}`, 'novel-workflow init 或 update')
  }

  const files = await fs.readdir(paths.COMMANDS_DIR)
  const mdFiles = files.filter(f => f.endsWith('.md'))

  if (mdFiles.length === 0) {
    return fail('命令模板', '命令目录为空', 'novel-workflow update')
  }

  return pass('命令模板', `${mdFiles.length} 个模板: ${mdFiles.join(', ')}`)
}

async function checkPrompts(): Promise<CheckResult> {
  const paths = resolveInstallPaths()
  if (!(await fs.pathExists(paths.PROMPTS_DIR))) {
    return fail('提示词模板', `目录不存在: ${paths.PROMPTS_DIR}`, 'novel-workflow init 或 update')
  }

  const files = await fs.readdir(paths.PROMPTS_DIR)
  if (files.length === 0) {
    return warn('提示词模板', '提示词目录为空', 'novel-workflow update')
  }

  return pass('提示词模板', `${files.length} 个文件`)
}

export async function runDoctor(): Promise<void> {
  const paths = resolveInstallPaths()

  console.log(ansis.bold('\n[novel-workflow] 环境检查\n'))
  console.log(`  CLAUDE_HOME:  ${ansis.dim(paths.CLAUDE_HOME)}`)
  console.log(`  NOVEL_HOME:   ${ansis.dim(paths.NOVEL_HOME)}`)
  console.log()

  const checks: CheckResult[] = await Promise.all([
    checkNodeVersion(),
    checkCliTool('Codex CLI', 'codex'),
    checkCliTool('Gemini CLI', 'gemini'),
    checkDir('NOVEL_HOME', paths.NOVEL_HOME),
    checkDir('STATE_ROOT', paths.STATE_ROOT),
    checkDir('COMMANDS_DIR', paths.COMMANDS_DIR),
    checkDir('PROMPTS_DIR', paths.PROMPTS_DIR),
    checkFile('全局配置文件', paths.CONFIG_PATH),
    checkConfig(),
    checkWrapper(),
    checkCommands(),
    checkPrompts(),
  ])

  let failCount = 0
  let warnCount = 0

  for (const check of checks) {
    let icon: string
    let label: string

    switch (check.status) {
      case 'pass':
        icon = ansis.green('[OK]')
        label = check.name
        break
      case 'fail':
        icon = ansis.red('[FAIL]')
        label = ansis.red(check.name)
        failCount++
        break
      case 'warn':
        icon = ansis.yellow('[WARN]')
        label = ansis.yellow(check.name)
        warnCount++
        break
    }

    console.log(`  ${icon} ${label}: ${check.message}`)
    if (check.fix && check.status !== 'pass') {
      console.log(`       ${ansis.yellow('Fix:')} ${check.fix}`)
    }
  }

  console.log()
  if (failCount === 0 && warnCount === 0) {
    console.log(ansis.green(ansis.bold('  所有检查通过\n')))
  } else if (failCount === 0) {
    console.log(ansis.yellow(ansis.bold(`  ${warnCount} 项警告，无严重问题\n`)))
  } else {
    console.log(ansis.red(ansis.bold(`  ${failCount} 项失败, ${warnCount} 项警告\n`)))
    console.log('  建议运行 ' + ansis.cyan('novel-workflow init') + ' 修复问题\n')
  }
}
