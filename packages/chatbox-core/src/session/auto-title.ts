import type { SessionHeader } from '../types'

// 轻聊：默认会话名直接使用中文（轻聊为纯中文应用）。
// 兼容：历史数据中的 'Untitled' 由 isUntitledSessionName 统一识别。
export const UNTITLED_SESSION_NAME = '未命名'
export const LEGACY_UNTITLED_SESSION_NAME = 'Untitled'
export const DEFAULT_INBOX_SESSION_ID = 'justchat-b612-406a-985b-3ab4d2c482ff'
export const DEFAULT_INBOX_SESSION_NAME = '随聊'

export function isUntitledSessionName(name: string): boolean {
  return name === UNTITLED_SESSION_NAME || name === LEGACY_UNTITLED_SESSION_NAME
}

export type NameGenerationKind = 'name' | 'thread'

export function isDefaultInboxSession(session: Pick<SessionHeader, 'id' | 'name'>): boolean {
  return session.id === DEFAULT_INBOX_SESSION_ID || session.name === DEFAULT_INBOX_SESSION_NAME
}

export function buildNameGenerationAttemptKey(
  kind: NameGenerationKind,
  sessionId: string,
  threadIdentity?: string
): string {
  return threadIdentity ? `${kind}:${sessionId}:${threadIdentity}` : `${kind}:${sessionId}`
}

export function isNameGenerationAttemptKeyForSession(key: string, sessionId: string): boolean {
  return (
    key === `name:${sessionId}` ||
    key.startsWith(`name:${sessionId}:`) ||
    key === `thread:${sessionId}` ||
    key.startsWith(`thread:${sessionId}:`)
  )
}

export function sanitizeGeneratedSessionName(raw: string): string {
  return raw
    .replace(/['"\u201C\u201D]/g, '')
    .replace(/<think>[\s\S]*?<\/think>/g, '')
    .trim()
}

/**
 * Historical sessions predate `threadName` (`undefined`). New conversations
 * persist `threadName: ''` so a copilot or other preset name is not copied
 * onto the thread and first-reply naming can still run. Inbox and Untitled
 * also stay unset.
 */
export function shouldBackfillThreadName(session: Pick<SessionHeader, 'id' | 'name' | 'threadName'>): boolean {
  if (session.threadName !== undefined) return false
  if (!session.name || session.name === UNTITLED_SESSION_NAME) return false
  return !isDefaultInboxSession(session)
}
