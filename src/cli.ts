import cac from 'cac'
import { version } from '../package.json'
import { runInit } from './commands/init.js'
import { runUpdate } from './commands/update.js'
import { runDoctor } from './commands/doctor.js'

const cli = cac('novel-workflow')

cli
  .command('init', '初始化 novel-workflow 环境')
  .option('--project <name>', '项目名称', { default: 'my-novel' })
  .option('--genre <genre>', '题材类型', { default: 'hongkong-crime' })
  .option('--platform <platform>', '发布平台', { default: 'fanqie' })
  .action((options) => {
    return runInit(options)
  })

cli
  .command('update', '更新命令模板和提示词')
  .action(() => {
    return runUpdate()
  })

cli
  .command('doctor', '检查环境健康状态')
  .action(() => {
    return runDoctor()
  })

cli.help()
cli.version(version)
cli.parse()
