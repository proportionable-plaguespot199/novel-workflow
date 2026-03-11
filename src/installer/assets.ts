import fs from 'fs-extra'
import { join, dirname } from 'pathe'
import { createHash } from 'node:crypto'

const BINARY_BASE_DIR = 'bin/codeagent-wrapper'

export function selectBinary(platform: string, arch: string): string {
  const ext = platform === 'win32' ? '.exe' : ''
  const binaryName = `codeagent-wrapper${ext}`
  return join(BINARY_BASE_DIR, `${platform}-${arch}`, binaryName)
}

export async function copyBinaryToTarget(
  srcPath: string,
  dstPath: string,
): Promise<void> {
  await fs.ensureDir(dirname(dstPath))
  await fs.copy(srcPath, dstPath, { overwrite: true })

  if (process.platform !== 'win32') {
    await fs.chmod(dstPath, 0o755)
  }
}

export async function verifyChecksum(
  binaryPath: string,
  manifest: Record<string, string>,
): Promise<boolean> {
  const key = binaryPath.replace(/\\/g, '/')
  const expected = manifest[key]
    ?? manifest[binaryPath]
    ?? Object.values(manifest).find((_, i) =>
      Object.keys(manifest)[i].endsWith(binaryPath.split('/').pop()!),
    )

  if (!expected) return true

  const content = await fs.readFile(binaryPath)
  const hash = createHash('sha256').update(content).digest('hex')
  return hash === expected.toLowerCase()
}
