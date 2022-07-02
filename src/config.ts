import { Schema } from 'koishi'
import { Locale, locales } from './utils'

export interface Config {
  aliases?: string[]
  defaultLanguage?: Locale
  defaultMode?: 'image' | 'text'
  fetchOnStart?: boolean
}

export const Config = Schema.object({
  aliases: Schema.array(Schema.string()),
  defaultLanguage: Schema.union(locales),
  defaultMode: Schema.union(['image', 'text']),
  fetchOnStart: Schema.boolean(),
})
