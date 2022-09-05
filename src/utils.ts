import { Search } from './search'

export type MacroDictDatabase = Record<CommandPrefix | 'Description' | 'locale', string> & {
  id: number
  lastUpdated: number
  macroId: number
}

export interface MacroDictDatabaseConfig {
  mode?: 'auto' | 'text'
}

declare module 'koishi' {
  interface Tables {
    macrodict: MacroDictDatabase
  }

  interface Channel {
    macrodict?: MacroDictDatabaseConfig
  }

  interface Context {
    macrodict: Search
  }

  interface Events {
    /* eslint-disable @typescript-eslint/naming-convention */
    'macrodict/update': () => void
    /* eslint-enable @typescript-eslint/naming-convention */
  }
}

export const locales = ['en', 'de', 'fr', 'ja', 'ko', 'zh'] as const
export type Locale = typeof locales[number]
export const commandPrefix = ['Command', 'Alias', 'ShortCommand', 'ShortAlias'] as const
export type CommandPrefix = typeof commandPrefix[number]

/**
 * remove slashes in string
 */
export function slashless(str: string): string {
  return str.replace(/\//g, '')
}
