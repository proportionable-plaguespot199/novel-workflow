import fs from 'fs-extra'
import { join } from 'pathe'

interface LockInfo {
  session_id: string
  timestamp: string
  holder: string
}

const LOCK_TIMEOUT_MS = 30 * 60 * 1000

export async function acquireProjectLock(
  projectDir: string,
  sessionId: string,
): Promise<boolean> {
  const lockPath = join(projectDir, '.lock')
  const lockInfo: LockInfo = {
    session_id: sessionId,
    timestamp: new Date().toISOString(),
    holder: `claude-${sessionId.slice(0, 8)}`,
  }
  try {
    await fs.writeFile(lockPath, JSON.stringify(lockInfo, null, 2), { flag: 'wx' })
    return true
  } catch {
    const existing = await checkLock(projectDir)
    if (existing && isLockExpired(existing)) {
      await fs.remove(lockPath)
      return acquireProjectLock(projectDir, sessionId)
    }
    return false
  }
}

export async function releaseProjectLock(projectDir: string): Promise<void> {
  const lockPath = join(projectDir, '.lock')
  await fs.remove(lockPath)
}

export async function checkLock(projectDir: string): Promise<LockInfo | null> {
  const lockPath = join(projectDir, '.lock')
  try {
    const content = await fs.readFile(lockPath, 'utf-8')
    return JSON.parse(content) as LockInfo
  } catch {
    return null
  }
}

function isLockExpired(lock: LockInfo): boolean {
  return Date.now() - new Date(lock.timestamp).getTime() > LOCK_TIMEOUT_MS
}
