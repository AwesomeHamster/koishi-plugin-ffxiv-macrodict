import { Schema } from 'koishi'

import enUS from './locales/en-US.schema.yml'
import zhCN from './locales/zh-CN.schema.yml'
import { Locale, locales } from './utils'

export interface Config {
  defaultLanguage: Locale
  defaultMode: 'auto' | 'text'
  threshold: number
}

export const Config: Schema<Config> = Schema.object({
  defaultLanguage: Schema.union(locales).default('en'),
  defaultMode: Schema.union([Schema.const('auto'), Schema.const('text')])
    .role('radio')
    .default('auto'),
  threshold: Schema.number().default(3),
}).i18n({
  'zh': zhCN,
  'zh-CN': zhCN,
  'en': enUS,
  'en-US': enUS,
})
