import { z } from 'zod'

export const ledgerEntrySchema = z.object({
  id: z.string(),
  chapter: z.number(),
  category: z.string(),
  item: z.string(),
  change: z.number(),
  balance: z.number(),
  note: z.string().optional(),
})

export const ledgerSchema = z.object({
  schema_version: z.number().default(1),
  entries: z.array(ledgerEntrySchema),
  balances: z.record(z.string(), z.record(z.string(), z.number())).default({}),
})

export type LedgerEntry = z.infer<typeof ledgerEntrySchema>
export type Ledger = z.infer<typeof ledgerSchema>
