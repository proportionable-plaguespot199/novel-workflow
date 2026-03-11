import { resolve, join } from 'pathe'
import { homedir } from 'node:os'

export interface InstallPaths {
  CLAUDE_HOME: string
  NOVEL_HOME: string
  COMMANDS_DIR: string
  PROMPTS_DIR: string
  STATE_ROOT: string
  CONFIG_PATH: string
  WRAPPER_PATH: string
}

export function resolveInstallPaths(): InstallPaths {
  const claudeHome = resolve(
    process.env.CLAUDE_HOME ?? join(homedir(), '.claude'),
  )
  const novelHome = join(claudeHome, '.novel')
  const ext = process.platform === 'win32' ? '.exe' : ''

  return {
    CLAUDE_HOME: claudeHome,
    NOVEL_HOME: novelHome,
    COMMANDS_DIR: join(claudeHome, 'commands', 'novel'),
    PROMPTS_DIR: join(novelHome, 'prompts'),
    STATE_ROOT: join(novelHome, 'state'),
    CONFIG_PATH: join(novelHome, 'config.toml'),
    WRAPPER_PATH: join(claudeHome, 'bin', `codeagent-wrapper${ext}`),
  }
}
