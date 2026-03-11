import { z } from 'zod'
import fs from 'fs-extra'
import { dirname } from 'pathe'
import { parseMarkdownToml } from './markdown'

export async function readMarkdownFirst<T>(
  mdPath: string,
  jsonPath: string,
  schema: z.ZodSchema<T>,
): Promise<T> {
  // Try Markdown first
  try {
    const mdContent = await fs.readFile(mdPath, 'utf-8')
    const parsed = parseMarkdownToml<unknown>(mdContent)
    return schema.parse(parsed)
  } catch {
    // Fall through to JSON
  }

  // Try JSON
  try {
    const jsonContent = await fs.readFile(jsonPath, 'utf-8')
    const parsed = JSON.parse(jsonContent)
    return schema.parse(parsed)
  } catch {
    // Both failed
  }

  throw new Error(
    `Failed to read state from both:\n  MD:   ${mdPath}\n  JSON: ${jsonPath}`,
  )
}

export async function writeDualAtomic<T>(
  mdPath: string,
  jsonPath: string,
  value: T,
  schema: z.ZodSchema<T>,
  mdFormatter: (data: T) => string,
): Promise<void> {
  const validated = schema.parse(value)

  await fs.ensureDir(dirname(mdPath))
  await fs.ensureDir(dirname(jsonPath))

  // Backup existing files
  for (const filePath of [mdPath, jsonPath]) {
    if (await fs.pathExists(filePath)) {
      await fs.copy(filePath, `${filePath}.bak`, { overwrite: true })
    }
  }

  // Write Markdown via temp file
  const mdTmp = `${mdPath}.tmp`
  await fs.writeFile(mdTmp, mdFormatter(validated), 'utf-8')
  await fs.rename(mdTmp, mdPath)

  // Write JSON via temp file
  const jsonTmp = `${jsonPath}.tmp`
  await fs.writeFile(jsonTmp, JSON.stringify(validated, null, 2), 'utf-8')
  await fs.rename(jsonTmp, jsonPath)
}
