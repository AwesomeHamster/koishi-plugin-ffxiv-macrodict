import { Schema } from 'koishi'

import { Locale, locales } from './utils'

export interface Config {
  aliases: string[]
  defaultLanguage: Locale
  defaultMode: 'auto' | 'text'
  threshold: number
}

export const Config: Schema<Config> = Schema.object({
  aliases: Schema.array(Schema.string()).default([]),
  defaultLanguage: Schema.union(locales).default('en'),
  defaultMode: Schema.union(['auto', 'text'] as const).default('auto'),
  threshold: Schema.number().default(3),
})
