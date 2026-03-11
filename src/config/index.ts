export {
  globalConfigSchema,
  projectConfigSchema,
  type GlobalConfig,
  type ProjectConfig,
} from './schema.js'

export { loadGlobalConfig, loadProjectConfig } from './load.js'

export { mergeConfig } from './merge.js'
