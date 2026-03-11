import { z } from 'zod'

export const globalConfigSchema = z.object({
  version: z.number().default(1),
  paths: z
    .object({
      claude_home: z.string().optional(),
      novel_home: z.string().optional(),
    })
    .optional(),
  wrapper: z
    .object({
      detect_existing: z.boolean().default(true),
      custom_path: z.string().optional(),
    })
    .optional(),
  models: z
    .object({
      codex: z
        .object({
          provider: z.string().default('codex'),
          flags: z.string().default(''),
        })
        .optional(),
      gemini: z
        .object({
          provider: z.string().default('gemini'),
          model: z.string().default('gemini-2.5-pro'),
          flags: z.string().default(''),
        })
        .optional(),
    })
    .optional(),
  workflow: z
    .object({
      auto_state_sync: z.boolean().default(true),
      auto_handoff: z.boolean().default(true),
      context_window: z.number().default(3),
    })
    .optional(),
  defaults: z
    .object({
      genre: z.string().default('hongkong-crime'),
      platform: z.string().default('fanqie'),
      min_chapter_words: z.number().default(3000),
    })
    .optional(),
})

export type GlobalConfig = z.infer<typeof globalConfigSchema>

export type ProjectConfig = Partial<
  Pick<GlobalConfig, 'models' | 'workflow' | 'defaults'>
>

export const projectConfigSchema = globalConfigSchema
  .pick({ models: true, workflow: true, defaults: true })
  .partial()
