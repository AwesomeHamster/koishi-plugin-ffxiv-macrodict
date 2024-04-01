import { Schema } from 'koishi'

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
  'zh': require('./locales/zh-CN/macrodict.schema.yml'),
  'zh-CN': require('./locales/zh-CN/macrodict.schema.yml'),
  'en': require('./locales/en-US/macrodict.schema.yml'),
})
