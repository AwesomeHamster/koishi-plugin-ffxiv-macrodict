import { Context } from 'koishi'

import { Config } from './config'
import i18n from './i18n'
import { parseMacroDescription } from './parser'
import { Search } from './search'
import { Updater } from './update'
import { Locale, locales } from './utils'

export { Config }

export const name = 'macrodict'

// only allow when database available
export const using = ['database'] as const

export async function apply(ctx: Context, _config: Config): Promise<void> {
  // set database
  ctx.model.extend(
    'macrodict',
    {
      id: 'unsigned',
      macroId: 'unsigned',
      lastUpdated: 'integer',
      locale: 'string',
      // Macros
      Description: 'string',
      Alias: 'string',
      ShortCommand: 'string',
      ShortAlias: 'string',
      Command: 'string',
    },
    {
      autoInc: true,
    },
  )

  ctx.model.extend('channel', {
    macrodict: { type: 'json', initial: {} },
  })

  const config: Required<Config> = {
    aliases: [],
    defaultLanguage: 'en',
    defaultMode: 'auto',
    fetchOnStart: false,
    threshold: 3,
    ..._config,
  }

  // register i18n resources
  Object.entries(i18n).forEach(([key, value]) => ctx.i18n.define(key, value))

  ctx.plugin(Search)
  ctx.plugin(Updater, config)

  ctx
    .command('macrodict <macro>')
    .alias(...config.aliases)
    .channelFields(['macrodict'])
    .option('lang', '-l <language:string>')
    .action(async ({ session, options }, macro) => {
      let lang = (options?.lang as Locale) ?? config.defaultLanguage
      if (!lang || !locales.includes(lang)) {
        session?.sendQueued(session.text('.wrong_language', [lang, config.defaultLanguage]))
        lang = config.defaultLanguage as Locale
      }
      const db = await ctx.macrodict.search(macro, lang, config.threshold)

      if (!db) {
        return session?.text('.not_found_macro')
      }

      if (db.exactly) {
        session?.text('.hint', [db.name])
      }

      const imageMode = (session?.channel?.macrodict?.mode ?? config.defaultMode) === 'auto' ? !!ctx.puppeteer : false
      if (!imageMode) {
        return session?.text('.format', {
          name: db.name,
          description: parseMacroDescription(db.description, 'text'),
          about: session?.text('.about'),
        })
      }
      return await ctx.macrodict.render(db, session?.text('.about_html') ?? '')
    })

  ctx.using(['puppeteer'], (ctx) => {
    ctx
      .command('macrodict', { patch: true })
      .channelFields(['macrodict'])
      .option('imageMode', '-i')
      .option('textMode', '-t')
      .action(({ options, session }) => {
        if (session?.channel?.macrodict) {
          if (options?.imageMode) {
            session.channel.macrodict.mode = 'auto'
            return session?.text('.setting.image_mode')
          } else if (options?.textMode) {
            session.channel.macrodict.mode = 'text'
            return session?.text('.setting.text_mode')
          }
        }
      }, true)
  })
}
