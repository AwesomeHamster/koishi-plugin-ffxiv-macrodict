import path from 'path'

import type {} from 'koishi-plugin-puppeteer'
import { get as getMacro, search as searchMacro, nameToIdMap } from 'ffxiv-textcommand-data'
import { Context, Service, segment } from 'koishi'

import { Config } from './config'
import { parseMacroDescription } from './parser'
import { Locale } from './utils'

interface Macro {
  id: number
  name: string
  description: string
  /** used to determine the input is exactly the same as the result */
  exactly?: boolean
}

export class Search extends Service {
  config: Required<Config>

  constructor(ctx: Context, config: Required<Config>) {
    super(ctx, 'macrodict', true)

    this.config = config
  }

  async getNames(locale?: Locale): Promise<string[]> {
    return Object.keys(nameToIdMap[locale ?? 'en'])
  }

  async get(id: number, lang: Locale): Promise<Macro | undefined> {
    const macro = getMacro(id, lang)
    if (!macro) return
    return {
      id,
      name: macro.Command,
      description: macro.Description,
    }
  }

  async search(name: string, lang: Locale, threshold: number): Promise<Macro | undefined> {
    if (!name.startsWith('/')) name = `/${name}`
    const macro = searchMacro(name, lang, threshold)
    if (!macro) return
    return {
      id: macro.ID,
      name: macro.Command,
      description: macro.Description,
      exactly: [macro.Command, macro.Alias, macro.ShortAlias, macro.ShortCommand].includes(name),
    }
  }

  async render(
    macro: { name: string; description: string },
    about: string,
  ): Promise<ReturnType<typeof segment['image']>> {
    const { puppeteer } = this.ctx

    if (!puppeteer) {
      throw new Error('Not found puppeteer.')
    }

    const { name, description } = macro
    const descriptionHtml = parseMacroDescription(description)

    const page = await puppeteer.page()

    await page.goto(`file:///${path.resolve(__dirname, '../view/macro.html')}`)

    await page.evaluate(
      (name: string, description: string, about: string): void => {
        let el = document.getElementById('macro-name')
        if (el) {
          el.innerText = name
        }
        el = document.getElementById('macro-description')
        if (el) {
          el.innerHTML = description
        }
        el = document.getElementById('about')
        if (el) {
          el.innerHTML = about
        }
      },
      name,
      descriptionHtml,
      about,
    )

    // set the viewport to the same size as the page
    const width = await page.evaluate(() => {
      const ele = document.body
      return ele.scrollWidth
    })
    await page.setViewport({
      width,
      height: 200,
    })

    // take a screenshot
    const screenshot = await page.screenshot({
      fullPage: true,
      type: 'png',
    })

    // don't forget to close the page
    await page.close()
    return segment.image(screenshot)
  }
}
