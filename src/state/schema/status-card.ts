import { z } from 'zod'

export const statusCardSchema = z.object({
  schema_version: z.number().default(1),
  project: z.string(),
  current_chapter: z.number(),
  current_volume: z.number().optional(),
  word_count: z.number().default(0),
  protagonist: z.object({
    name: z.string(),
    realm: z.string().optional(),
    position: z.string().optional(),
    status: z.string().default('正常'),
  }),
  active_conflicts: z.array(z.object({
    id: z.string(),
    description: z.string(),
    stakes: z.string(),
    chapter_started: z.number(),
  })).default([]),
  known_truths: z.array(z.string()).default([]),
  resources: z.record(z.string(), z.union([z.number(), z.string()])).default({}),
  last_updated: z.string(),
})

export type StatusCard = z.infer<typeof statusCardSchema>
