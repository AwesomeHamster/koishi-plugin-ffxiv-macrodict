import path from 'path'

import type {} from 'koishi-plugin-puppeteer'
import { closest, distance } from 'fastest-levenshtein'
import { Context, Service, segment } from 'koishi'

import { Config } from './config'
import { parseMacroDescription } from './parser'
import { commandPrefix, Locale, slashless } from './utils'

interface MacroWithoutDescription {
  id: number
  locale: Locale
  names: string[]
}
interface Macro {
  id: number
  name: string
  description: string
  /** used to determine the input is exactly the same as the result */
  exactly?: boolean
}

export class Search extends Service {
  config: Required<Config>
  macros?: MacroWithoutDescription[]

  constructor(ctx: Context, config: Required<Config>) {
    super(ctx, 'macrodict', true)

    this.config = config

    this.ctx.on('macrodict/update', async () => (this.macros = await this.getNames()))
  }

  async getNames(locale?: Locale): Promise<MacroWithoutDescription[]> {
    const query = locale ? { locale: { $eq: locale } } : {}
    const db = await this.ctx.database.get('macrodict', query, ['macroId', 'locale', ...commandPrefix])

    const ret: MacroWithoutDescription[] = []

    for (const row of db) {
      const { macroId, locale } = row

      // initialize macro metadata container
      ret.push({
        id: macroId,
        locale: locale as Locale,
        names: [],
      })

      for (const key of commandPrefix) {
        ret[ret.length - 1].names.push(row[key])
      }
    }

    return ret
  }

  async get(id: number, lang: Locale): Promise<Macro> {
    const db = await this.ctx.database.get(
      'macrodict',
      {
        macroId: { $eq: id },
        locale: { $eq: lang },
      },
      ['macroId', 'Command', 'Description'],
    )
    return {
      id: db[0].macroId,
      name: db[0]['Command'],
      description: db[0]['Description'],
    }
  }

  async search(name: string, lang: Locale, threshold: number): Promise<Macro | undefined> {
    if (!this.macros) {
      this.macros = await this.getNames()
    }

    const predict = closest(name, this.macros.map((macro) => macro.names).flat())

    if (!predict || distance(name, predict) >= threshold) {
      return
    }

    const exactly = slashless(predict) === slashless(name)

    const id = this.macros.find(({ names }) => names.includes(predict))?.id

    if (!id) {
      return
    }

    const macro = await this.get(id, lang)

    if (!macro) {
      return
    }

    return {
      ...macro,
      exactly,
    }
  }

  async render(macro: { name: string; description: string }, about: string): Promise<string> {
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
