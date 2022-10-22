import { Search } from './search'

export interface MacroDictDatabaseConfig {
  mode?: 'auto' | 'text'
}

declare module 'koishi' {
  interface Channel {
    macrodict?: MacroDictDatabaseConfig
  }

  interface Context {
    macrodict: Search
  }
}

export const locales = ['en', 'de', 'fr', 'ja', 'ko', 'zh'] as const
export type Locale = typeof locales[number]
