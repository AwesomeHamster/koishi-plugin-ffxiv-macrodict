import { parseStream } from '@fast-csv/parse'
import { Context, Logger } from 'koishi'

import type { Config } from './index'

export type XivapiResponse<T = any> = {
  Pagination: {
    Page: number
    PageNext: number | null
    PagePrev: number | null
    PageTotal: number
    Results: number
    ResultsPerPage: number
    ResultsTotal: number
  }
  Results: T[]
}

export type Fields = 'Command' | 'ShortCommand' | 'Alias' | 'ShortAlias' | 'Description'

export type Macros = Record<Fields | 'ID' | 'locale', string>

export class Updater {
  private logger = new Logger('macrodict')
  private ctx: Context
  public name = 'macrodict-updater'

  constructor(ctx: Context, config: Config) {
    this.ctx = ctx

    ctx.command('macrodict.update').action(async ({ session }) => {
      session?.sendQueued(session.text('.start_updating_macros'))
      const count = await this.update()
      session?.text('.macros_updated', [count])
    })

    if (config.fetchOnStart) {
      // update macro database when bot connected successfully.
      ctx.on('ready', async () => {
        await this.update()
      })
    }
  }

  async update(): Promise<number> {
    this.logger.info('start updating macros')
    const macros = this.normalize(await this.fetchIntl())
    const cnMacros = this.normalize(await this.fetchCn())
    const koMacros = this.normalize(await this.fetchKo())

    await this.ctx.database.upsert('macrodict', Object.values(macros.concat(cnMacros).concat(koMacros)))
    this.logger.info('macros updated')
    this.ctx.emit('macrodict/update')
    return Object.keys(macros).length
  }

  async fetchXivapi<T>(url: string, columns: string[]): Promise<T[]> {
    const ret: T[] = []
    let data = await this.ctx.http.get<XivapiResponse<T>>(url, {
      params: { columns: columns.join(',') },
    })
    ret.push(...data.Results)
    while (data && data.Pagination.PageNext) {
      data = await this.ctx.http.get<XivapiResponse<T>>(url, {
        params: { columns: columns.join(','), page: data.Pagination.PageNext },
      })
      ret.push(...data.Results)
    }
    return ret
  }

  async fetchIntl(): Promise<Macros[]> {
    type IntlMacros = Record<`${Fields}_${'en' | 'de' | 'fr' | 'ja'}` | 'ID', string>
    const locales = ['en', 'de', 'fr', 'ja'] as const
    const data = await this.fetchXivapi<IntlMacros>(
      'https://xivapi.com/TextCommand',
      ['ID'].concat(
        locales.reduce<string[]>((arr, loc) => {
          arr.push(`Command_${loc}`, `ShortCommand_${loc}`, `Alias_${loc}`, `ShortAlias_${loc}`, `Description_${loc}`)
          return arr
        }, []),
      ),
    )
    const ret: Macros[] = []
    for (const macro of data) {
      locales.forEach((loc) => {
        ret.push({
          ID: macro.ID,
          Command: macro[`Command_${loc}`],
          ShortCommand: macro[`ShortCommand_${loc}`],
          Alias: macro[`Alias_${loc}`],
          ShortAlias: macro[`ShortAlias_${loc}`],
          Description: macro[`Description_${loc}`],
          locale: loc,
        })
      })
    }

    return ret
  }

  async fetchCn(): Promise<Macros[]> {
    const data = await this.fetchXivapi<Record<`${Fields}_chs` | 'ID', string>>(
      'https://cafemaker.wakingsands.com/TextCommand',
      ['ID', 'Command_chs', 'ShortCommand_chs', 'Alias_chs', 'ShortAlias_chs', 'Description_chs'],
    )
    return data.map((macro) => ({
      ID: macro.ID,
      Command: macro.Command_chs,
      ShortCommand: macro.ShortCommand_chs,
      Alias: macro.Alias_chs,
      ShortAlias: macro.ShortAlias_chs,
      Description: macro.Description_chs,
      locale: 'zh',
    }))
  }

  async fetchKo(): Promise<Macros[]> {
    const content = await this.ctx.http.get<NodeJS.ReadableStream>(
      'https://cdn.jsdelivr.net/gh/Ra-Workspace/ffxiv-datamining-ko@master/csv/TextCommand.csv',
      {
        responseType: 'stream',
      },
    )

    const rows = await new Promise<Macros[]>((resolve, reject) => {
      const rows: Macros[] = []
      parseStream(content, {
        skipLines: 1,
        ignoreEmpty: false,
        headers: true,
      })
        .on('error', (err) => reject(err))
        .on('data', (row) => {
          // CSV files from SaintCoinach has the first 3 rows as headers,
          // but only the second row is useful for naming.
          // the third row is type information, which we don't need.
          // `#` column is the ID, which is always number.
          if (/^[0-9]+$/.test(row?.['#'])) {
            rows.push({
              ID: row?.['#'],
              Alias: row.Alias,
              Command: row.Command,
              Description: row.Description,
              ShortAlias: row.ShortAlias,
              ShortCommand: row.ShortCommand,
              locale: 'ko',
            })
          }
        })
        .on('end', (rowCount: number) => {
          if (rowCount === 0) reject(new Error('csv reads no data'))

          resolve(rows)
        })
    })

    return rows
  }

  /**
   * Transforms the raw data from xivapi or github to a shape like:
   * `{ 1: { id: "1", Command_en: "command", ShortCommand_en: "short-command", ... }}`
   */
  normalize<T extends { ID?: string }>(macros: T[]): T[] {
    const set = new Set<T>()
    for (const macro of macros) {
      const id = macro.ID
      delete macro.ID
      if (id) {
        set.add({
          macroId: id,
          ...macro,
        })
      }
    }
    return Array.from(set)
  }
}
