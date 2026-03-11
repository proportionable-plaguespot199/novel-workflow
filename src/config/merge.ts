import type { GlobalConfig, ProjectConfig } from './schema.js'

type AnyRecord = Record<string, unknown>

function isPlainObject(value: unknown): value is AnyRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function deepMerge(base: AnyRecord, override: AnyRecord): AnyRecord {
  const result: AnyRecord = { ...base }

  for (const key of Object.keys(override)) {
    const baseVal = base[key]
    const overVal = override[key]

    if (isPlainObject(baseVal) && isPlainObject(overVal)) {
      result[key] = deepMerge(baseVal, overVal)
    } else if (overVal !== undefined) {
      result[key] = overVal
    }
  }

  return result
}

export function mergeConfig(
  global: GlobalConfig,
  project?: Partial<ProjectConfig>,
): GlobalConfig {
  if (!project) return global

  return deepMerge(global as AnyRecord, project as AnyRecord) as GlobalConfig
}
