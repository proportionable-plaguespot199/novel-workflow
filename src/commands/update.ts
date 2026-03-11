import ansis from 'ansis'
import ora from 'ora'
import { resolveInstallPaths } from '../paths.js'
import { loadGlobalConfig } from '../config/index.js'
import { installPrompts, installCommands } from '../installer/install.js'

export async function runUpdate(): Promise<void> {
  const paths = resolveInstallPaths()

  console.log(ansis.bold('\n[novel-workflow] 更新模板\n'))

  // Load config to get genre for render vars
  const config = await loadGlobalConfig(paths.CONFIG_PATH)
  const genre = config.defaults?.genre ?? 'hongkong-crime'

  const renderVars: Record<string, string> = {
    NOVEL_HOME_DIR: paths.NOVEL_HOME,
    NOVEL_COMMANDS_DIR: paths.COMMANDS_DIR,
    NOVEL_PROMPTS_DIR: paths.PROMPTS_DIR,
    NOVEL_STATE_ROOT: paths.STATE_ROOT,
    WRAPPER_PATH: paths.WRAPPER_PATH,
    GLOBAL_CONFIG_PATH: paths.CONFIG_PATH,
    GEMINI_MODEL_FLAG: config.models?.gemini?.model
      ? `--model ${config.models.gemini.model}`
      : '--model gemini-2.5-pro',
    GENRE: genre,
  }

  // Update command templates
  const spinner = ora('更新命令模板...').start()
  const cmdFiles = await installCommands(paths, renderVars)
  spinner.succeed(`命令模板已更新 (${cmdFiles.length} 个文件)`)

  // Update prompt templates
  spinner.start('更新提示词模板...')
  const promptFiles = await installPrompts(paths, renderVars)
  spinner.succeed(`提示词模板已更新 (${promptFiles.length} 个文件)`)

  console.log(ansis.bold('\n更新完成\n'))
  console.log(`  命令目录:   ${ansis.dim(paths.COMMANDS_DIR)}`)
  console.log(`  提示词目录: ${ansis.dim(paths.PROMPTS_DIR)}`)
  console.log()
}
