import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'pathe'
import { parse as parseTOML } from 'smol-toml'
import { resolveInstallPaths } from '../paths.js'
import {
  globalConfigSchema,
  projectConfigSchema,
  type GlobalConfig,
  type ProjectConfig,
} from './schema.js'

export async function loadGlobalConfig(
  configPath?: string,
): Promise<GlobalConfig> {
  const path = configPath ?? resolveInstallPaths().CONFIG_PATH

  if (!existsSync(path)) {
    return globalConfigSchema.parse({})
  }

  const raw = await readFile(path, 'utf-8')
  const parsed = parseTOML(raw)
  return globalConfigSchema.parse(parsed)
}

export async function loadProjectConfig(
  projectDir: string,
): Promise<ProjectConfig | undefined> {
  const path = join(projectDir, '.claude', 'novel.toml')

  if (!existsSync(path)) {
    return undefined
  }

  const raw = await readFile(path, 'utf-8')
  const parsed = parseTOML(raw)
  return projectConfigSchema.parse(parsed)
}
