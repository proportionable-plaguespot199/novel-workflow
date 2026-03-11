import { z } from 'zod'

export const hookSchema = z.object({
  hook_id: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.enum(['foreshadow', 'chekhov', 'mystery', 'promise', 'setup']),
  chapter_planted: z.number(),
  expected_payoff_range: z.string(),
  status: z.enum(['planted', 'growing', 'payoff_ready', 'resolved', 'abandoned']).default('planted'),
  resolution_chapter: z.number().optional(),
  resolution_note: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low']).default('medium'),
})

export const hooksPoolSchema = z.object({
  schema_version: z.number().default(1),
  hooks: z.array(hookSchema),
})

export type Hook = z.infer<typeof hookSchema>
export type HooksPool = z.infer<typeof hooksPoolSchema>
