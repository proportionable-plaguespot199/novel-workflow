import { parse as parseToml, stringify as stringifyToml } from 'smol-toml'

const TOML_FENCE_RE = /```toml\s*\n([\s\S]*?)```/

export function parseMarkdownToml<T>(mdContent: string): T {
  const match = mdContent.match(TOML_FENCE_RE)
  if (!match || !match[1]) {
    throw new Error('No TOML fenced block found in Markdown content')
  }
  return parseToml(match[1].trim()) as T
}

export function formatMarkdownToml(
  title: string,
  description: string,
  data: Record<string, unknown>,
  humanReadableSection: string,
): string {
  const tomlBlock = stringifyToml(data as any)
  const parts = [
    `# ${title}`,
    '',
    `> ${description}`,
    '',
    '```toml',
    tomlBlock,
    '```',
  ]

  if (humanReadableSection) {
    parts.push('', '## Human-Readable Section', '', humanReadableSection)
  }

  return parts.join('\n') + '\n'
}
