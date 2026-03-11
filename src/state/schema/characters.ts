import { z } from 'zod'

export const characterSchema = z.object({
  id: z.string(),
  name: z.string(),
  aliases: z.array(z.string()).default([]),
  gender: z.string(),
  age: z.union([z.number(), z.string()]),
  identity: z.string(),
  personality: z.object({
    core_traits: z.array(z.string()),
    speech_style: z.string(),
    behavioral_tags: z.array(z.string()).default([]),
  }),
  relationships: z.array(z.object({
    target: z.string(),
    type: z.string(),
    description: z.string(),
  })).default([]),
  arc: z.string().optional(),
  first_appearance: z.number(),
  status: z.enum(['active', 'deceased', 'absent', 'unknown']).default('active'),
})

export const charactersSchema = z.object({
  schema_version: z.number().default(1),
  characters: z.array(characterSchema),
})

export type Character = z.infer<typeof characterSchema>
export type Characters = z.infer<typeof charactersSchema>
