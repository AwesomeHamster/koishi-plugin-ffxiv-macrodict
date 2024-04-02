import type {} from 'koishi-plugin-puppeteer'
import { get as getMacro, search as searchMacro, nameToIdMap } from 'ffxiv-textcommand-data'
import { Context, Element, Service } from 'koishi'

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
  constructor(ctx: Context) {
    super(ctx, 'macrodict', true)
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

  async render(macro: Macro, info: { about: string; copyright: string }, lang: string): Promise<Element> {
    const { name, description } = macro
    const descriptionHtml = parseMacroDescription(description)

    const { about, copyright } = info

    return (
      <html lang={lang}>
        <style>{`
    body {
      margin: 0;
      padding: 0;
      width: 800px;
      font-size: 16px;
      font-family: Consolas, 'Courier New', monospace;
    }
    [lang="zh"] body {
      font-family: 'Microsoft Yahei UI', SimHei, Consolas, 'Courier New', monospace;
    }
    [lang="ja"] body {
      font-family: 'Yu Gothic', 'Yu Gothic UI', 'Meiryo UI', 'Meiryo', 'MS Gothic', Consolas, 'Courier New', monospace;
    }
    [lang="ko"] body {
      font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', 'Nanum Gothic', Consolas, 'Courier New', monospace;
    }
    
    code {
      color: orange;
      border: 2px solid #30363d;
      margin: 0px 7px;
      margin-right: 0;
      padding: 5px;
      border-radius: 5px;
      background-color: #3e3e3e;
    }
    
    kbd {
      display: inline-block;
      padding: 3px 5px;
      line-height: 10px;
      color: rgb(201, 209, 217);
      vertical-align: middle;
      background-color: rgb(22, 27, 34);
      border: solid 1px rgb(110, 118, 129, 0);
      border-radius: 6px;
      box-shadow: inset 0 -1px 0 rgb(110, 118, 129, 0);
    }
    
    #container {
      margin: 0px;
      padding: 10px 30px;
      background-color: #333333;
      color: white;
    }
    
    span.highlight {
      color: #b2b23e;
    }

    footer {
      padding: 10px 30px;
      padding-bottom: 0;
    }
    footer > div {
      display: flex;
      justify-content: space-between;
    }
    footer > div #about {
      text-align: right;
      line-height: 0.8em;
    }`}</style>
        <main id='container'>
          <div>
            <h1 id='macro-name'>{name}</h1>
            <hr />
          </div>
          <div id='macro-description'>{descriptionHtml}</div>
        </main>
        <footer>
          <div>
            <div id='copyright'>{copyright}</div>
            <div id='about'>{about}</div>
          </div>
          <p>FINAL FANTASY XIV © 2010 - 2023 SQUARE ENIX CO., LTD. All Rights Reserved.</p>
        </footer>
      </html>
    )
  }
}
