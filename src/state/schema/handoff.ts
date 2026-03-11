import { z } from 'zod'

export const handoffSchema = z.object({
  schema_version: z.number().default(1),
  session_id: z.string(),
  timestamp: z.string(),
  current_progress: z.object({
    chapter: z.number(),
    volume: z.number().optional(),
    word_count: z.number(),
    scene_in_progress: z.string().optional(),
  }),
  emotional_state: z.object({
    protagonist_mood: z.string(),
    narrative_tension: z.enum(['low', 'building', 'peak', 'release']),
    reader_expectation: z.string(),
  }),
  pending_tasks: z.array(z.object({
    task: z.string(),
    priority: z.enum(['high', 'medium', 'low']),
    context: z.string().optional(),
  })).default([]),
  next_steps: z.array(z.string()),
  warnings: z.array(z.string()).default([]),
  active_hooks_summary: z.array(z.string()).default([]),
})

export type Handoff = z.infer<typeof handoffSchema>
