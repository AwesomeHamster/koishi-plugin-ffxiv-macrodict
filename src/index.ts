import { Context, h, omit } from 'koishi'

import { Config } from './config'
import * as i18n from './locales'
import { parseMacroDescription } from './parser'
import { Search } from './search'
import { Locale, locales } from './utils'

export { Config }

export const name = 'macrodict'

// only allow when database available
export const using = ['database']

export async function apply(ctx: Context, config: Config): Promise<void> {
  ctx.model.extend('channel', {
    macrodict: { type: 'json', initial: {} },
  })

  // register i18n resources
  ctx.plugin(i18n)

  ctx.plugin(Search)

  // remove obsolete `aliases` configuration
  if (typeof (ctx.config as any).aliases !== 'undefined') {
    ctx.setTimeout(() => {
      ctx.scope.update(omit(ctx.config, 'aliases'))
    }, 0)
  }

  ctx
    .command('macrodict <macro>')
    .channelFields(['macrodict'])
    .option('lang', '-l <language:string>')
    .option('imageMode', '-i')
    .option('textMode', '-t')
    .action(async ({ session, options }, macro) => {
      const puppeteer = ctx.get('puppeteer')
      if (puppeteer && session?.channel?.macrodict) {
        if (options?.imageMode) {
          session.channel.macrodict.mode = 'auto'
          return session?.text('.setting.image_mode')
        } else if (options?.textMode) {
          session.channel.macrodict.mode = 'text'
          return session?.text('.setting.text_mode')
        }
      }
      if (!macro?.trim?.()) {
        return h('message', [h('p', h.text(session?.text('.no_macro'))), h('br'), h('execute', 'help macrodict')])
      }
      let lang = (options?.lang as Locale) ?? config.defaultLanguage
      if (!lang || !locales.includes(lang)) {
        session?.sendQueued(session.text('.wrong_language', [lang, config.defaultLanguage]))
        lang = config.defaultLanguage as Locale
      }
      const db = await ctx.macrodict.search(macro, lang, config.threshold)

      if (!db) {
        return session?.text('.not_found_macro', [macro])
      }

      if (!db.exactly) {
        session?.text('.hint', [db.name])
      }

      const imageMode = (session?.channel?.macrodict?.mode ?? config.defaultMode) === 'auto' ? !!ctx.puppeteer : false
      if (!imageMode) {
        return session?.text('.format', {
          name: db.name,
          description: parseMacroDescription(db.description, 'text'),
          about: session?.text('.about'),
          copyright: session?.text('.copyright'),
        })
      }
      return await ctx.macrodict.render(
        db,
        { about: session?.text('.about_html') ?? '', copyright: session?.text('.copyright_html') ?? '' },
        lang,
      )
    })
}
