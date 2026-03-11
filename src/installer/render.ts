import fs from 'fs-extra'
import { join, dirname } from 'pathe'

/**
 * Replace `{{KEY}}` placeholders in a template string with values from the
 * provided data map. Unmatched placeholders are left as-is.
 */
export function renderTemplateString(
  template: string,
  data: Record<string, string>,
): string {
  return template.replace(
    /\{\{(\w+)\}\}/g,
    (match, key: string) => data[key] ?? match,
  )
}

/**
 * Read every file under `srcDir`, render placeholders, and write the result
 * into `destDir` preserving relative directory structure.
 *
 * Only processes `.md`, `.toml`, and `.txt` files (binary files are copied
 * as-is without rendering).
 */
export async function renderTemplateDir(
  srcDir: string,
  destDir: string,
  data: Record<string, string>,
): Promise<string[]> {
  const written: string[] = []
  const textExtensions = new Set(['.md', '.toml', '.txt', '.json'])

  async function walk(dir: string): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const srcPath = join(dir, entry.name)
      const relPath = srcPath.slice(srcDir.length)
      const destPath = join(destDir, relPath)

      if (entry.isDirectory()) {
        await fs.ensureDir(destPath)
        await walk(srcPath)
      } else {
        await fs.ensureDir(dirname(destPath))
        const ext = entry.name.slice(entry.name.lastIndexOf('.'))

        if (textExtensions.has(ext)) {
          const content = await fs.readFile(srcPath, 'utf-8')
          await fs.writeFile(destPath, renderTemplateString(content, data), 'utf-8')
        } else {
          await fs.copy(srcPath, destPath, { overwrite: true })
        }

        written.push(destPath)
      }
    }
  }

  await walk(srcDir)
  return written
}
