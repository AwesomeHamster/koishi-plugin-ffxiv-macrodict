import { Schema } from 'koishi'
import { Locale, locales } from './utils'

export interface Config {
  aliases?: string[]
  defaultLanguage?: Locale
  defaultMode?: 'image' | 'text'
  fetchOnStart?: boolean
  threshold?: number
}

export const Config: Schema<Config> = Schema.object({
  aliases: Schema.array(Schema.string()).default([]),
  defaultLanguage: Schema.union(locales).default('en'),
  defaultMode: Schema.union(['image', 'text'] as const),
  fetchOnStart: Schema.boolean().default(false),
  threshold: Schema.number().default(3),
})
