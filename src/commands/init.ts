import ansis from 'ansis'
import ora from 'ora'
import inquirer from 'inquirer'
import { resolveInstallPaths } from '../paths.js'
import { type GlobalConfig } from '../config/index.js'
import {
  ensureBaseDirs,
  installWrapperBinary,
  installPrompts,
  installCommands,
  installStateTemplates,
  writeOrMergeGlobalConfig,
} from '../installer/install.js'

const GENRES = [
  { name: '港风犯罪 (hongkong-crime)', value: 'hongkong-crime' },
  { name: '玄幻仙侠 (fantasy)', value: 'fantasy' },
  { name: '都市现实 (urban)', value: 'urban' },
  { name: '科幻未来 (scifi)', value: 'scifi' },
]

const PLATFORMS = [
  { name: '番茄小说 (fanqie)', value: 'fanqie' },
  { name: '飞卢小说 (feilu)', value: 'feilu' },
  { name: '起点中文网 (qidian)', value: 'qidian' },
  { name: '其他 (other)', value: 'other' },
]

interface InitOptions {
  project?: string
  genre?: string
  platform?: string
}

export async function runInit(options: InitOptions): Promise<void> {
  console.log(ansis.bold('\n[novel-workflow] 初始化环境\n'))

  // Interactive prompts for missing options
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'project',
      message: '项目名称:',
      default: 'my-novel',
      when: () => !options.project,
      validate: (input: string) => {
        if (/^[\w\u4e00-\u9fff-]+$/.test(input)) return true
        return '项目名仅允许中英文、数字、连字符、下划线'
      },
    },
    {
      type: 'list',
      name: 'genre',
      message: '选择题材:',
      choices: GENRES,
      when: () => !options.genre,
    },
    {
      type: 'list',
      name: 'platform',
      message: '选择平台:',
      choices: PLATFORMS,
      when: () => !options.platform,
    },
  ])

  const projectName = options.project ?? answers.project ?? 'my-novel'
  const genre = options.genre ?? answers.genre ?? 'hongkong-crime'
  const platform = options.platform ?? answers.platform ?? 'fanqie'
  const paths = resolveInstallPaths()

  // Step 1: Ensure base directories
  const spinner = ora('创建基础目录...').start()
  await ensureBaseDirs(paths)
  spinner.succeed('基础目录已就绪')

  // Step 2: Write global config
  spinner.start('写入全局配置...')
  const configDefaults: Partial<GlobalConfig> = {
    version: 1,
    defaults: { genre, platform, min_chapter_words: 3000 },
  }
  await writeOrMergeGlobalConfig(paths, configDefaults)
  spinner.succeed('全局配置已写入')

  // Step 3: Install wrapper binary
  spinner.start('安装 codeagent-wrapper...')
  const { installed, path: wrapperPath } = await installWrapperBinary(paths)
  if (installed) {
    spinner.succeed(`wrapper 已安装: ${wrapperPath}`)
  } else {
    spinner.warn('未找到预编译 wrapper，跳过（可后续手动安装）')
  }

  // Step 4: Install command templates
  spinner.start('安装命令模板...')
  const renderVars = buildRenderVars(paths, genre)
  const cmdFiles = await installCommands(paths, renderVars)
  spinner.succeed(`命令模板已安装 (${cmdFiles.length} 个文件)`)

  // Step 5: Install prompts
  spinner.start('安装提示词模板...')
  const promptFiles = await installPrompts(paths, renderVars)
  spinner.succeed(`提示词模板已安装 (${promptFiles.length} 个文件)`)

  // Step 6: Initialize project state
  spinner.start(`初始化项目 "${projectName}"...`)
  const stateFiles = await installStateTemplates(paths, genre)
  spinner.succeed(`项目状态文件已创建 (${stateFiles.length} 个文件)`)

  // Summary
  console.log(ansis.bold('\n初始化完成\n'))
  console.log(`  项目名:     ${ansis.cyan(projectName)}`)
  console.log(`  题材:       ${ansis.cyan(genre)}`)
  console.log(`  平台:       ${ansis.cyan(platform)}`)
  console.log(`  项目路径:   ${ansis.dim(paths.STATE_ROOT)}`)
  console.log(`  全局配置:   ${ansis.dim(paths.CONFIG_PATH)}`)
  console.log(`  命令目录:   ${ansis.dim(paths.COMMANDS_DIR)}`)
  console.log()
  console.log(ansis.bold('下一步建议:'))
  console.log('  1. /novel:style     — 提炼风格圣经')
  console.log('  2. /novel:setting   — 创建角色卡与世界观')
  console.log('  3. /novel:outline   — 规划卷纲')
  console.log()
}

function buildRenderVars(
  paths: ReturnType<typeof resolveInstallPaths>,
  genre: string,
): Record<string, string> {
  return {
    NOVEL_HOME_DIR: paths.NOVEL_HOME,
    NOVEL_COMMANDS_DIR: paths.COMMANDS_DIR,
    NOVEL_PROMPTS_DIR: paths.PROMPTS_DIR,
    NOVEL_STATE_ROOT: paths.STATE_ROOT,
    WRAPPER_PATH: paths.WRAPPER_PATH,
    GLOBAL_CONFIG_PATH: paths.CONFIG_PATH,
    GEMINI_MODEL_FLAG: '--model gemini-2.5-pro',
    GENRE: genre,
  }
}
