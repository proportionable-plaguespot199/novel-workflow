import { z } from 'zod'

export const timelineEventSchema = z.object({
  id: z.string(),
  date: z.string(),
  chapter: z.number(),
  event: z.string(),
  characters_involved: z.array(z.string()).default([]),
  consequences: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
})

export const timelineSchema = z.object({
  schema_version: z.number().default(1),
  events: z.array(timelineEventSchema),
})

export type TimelineEvent = z.infer<typeof timelineEventSchema>
export type Timeline = z.infer<typeof timelineSchema>
