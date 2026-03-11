import type { StatusCard, Characters, HooksPool, Ledger, Timeline, Handoff } from './schema'

export interface ProjectState {
  statusCard: StatusCard
  characters: Characters
  hooksPool: HooksPool
  ledger: Ledger
  timeline: Timeline
  handoff?: Handoff
}

export interface ContextPackOptions {
  command: 'write' | 'review' | 'check' | 'research' | 'polish'
  chapterRange?: { start: number; end: number }
  characterFilter?: string[]
}

export function buildContextPack(
  state: ProjectState,
  options: ContextPackOptions,
): Record<string, unknown> {
  const { command, chapterRange, characterFilter } = options

  switch (command) {
    case 'write': {
      const activeHooks = state.hooksPool.hooks.filter(
        h => h.status !== 'resolved' && h.status !== 'abandoned',
      )
      const recentEntries = chapterRange
        ? state.ledger.entries.filter(
            e => e.chapter >= chapterRange.start && e.chapter <= chapterRange.end,
          )
        : state.ledger.entries.slice(-20)
      const relevantChars = characterFilter
        ? state.characters.characters.filter(
            c => characterFilter.includes(c.id) || characterFilter.includes(c.name),
          )
        : state.characters.characters.filter(c => c.status === 'active')

      return {
        statusCard: state.statusCard,
        characters: relevantChars,
        activeHooks,
        recentLedger: recentEntries,
        balances: state.ledger.balances,
      }
    }

    case 'review':
      return {
        statusCard: state.statusCard,
        characters: state.characters.characters,
        hooks: state.hooksPool.hooks,
        timeline: state.timeline.events,
      }

    case 'check': {
      const checkChars = characterFilter
        ? state.characters.characters.filter(
            c => characterFilter.includes(c.id) || characterFilter.includes(c.name),
          )
        : state.characters.characters
      return {
        statusCard: state.statusCard,
        characters: checkChars,
        timeline: state.timeline.events,
        hooks: state.hooksPool.hooks,
        balances: state.ledger.balances,
      }
    }

    case 'research':
      return {
        project: state.statusCard.project,
        current_chapter: state.statusCard.current_chapter,
        protagonist: state.statusCard.protagonist,
        known_truths: state.statusCard.known_truths,
      }

    case 'polish':
      return {
        statusCard: state.statusCard,
        protagonist: state.statusCard.protagonist,
        resources: state.statusCard.resources,
      }
  }
}

export function buildWriteContext(
  state: ProjectState,
  currentChapter: number,
): {
  hot: { description: string; range: string }
  warm: { description: string; range: string }
  cold: { description: string; triggers: string[] }
} {
  const hotStart = Math.max(1, currentChapter - 2)
  const warmStart = Math.max(1, currentChapter - 9)

  const coldTriggers = state.hooksPool.hooks
    .filter(h => h.status === 'payoff_ready' || h.status === 'growing')
    .map(h => h.hook_id)

  return {
    hot: {
      description: '最近 3 章原文',
      range: `ch${hotStart}-ch${currentChapter}`,
    },
    warm: {
      description: '最近 10 章摘要',
      range: `ch${warmStart}-ch${currentChapter}`,
    },
    cold: {
      description: '按伏笔 ID 定向检索',
      triggers: coldTriggers,
    },
  }
}
