const keyMap: { [k: string]: string } = {
  1: '↑',
  2: '↓',
  3: '←',
  4: '→',
  8: '〇',
  9: 'x',
  10: '□',
  11: '△',
  14: 'L2',
  15: 'R2',
}

/**
 * Parse a macro definition text.
 */
export function parseMacroDescription(description: string, format: 'html' | 'text' = 'html') {
  const renderer = new Renderer(format)
  let index = 0
  const result: (JSX.IntrinsicElements | string)[] = []
  while (index < description.length) {
    const sub = description.substring(index)
    if (/^\ue070/.test(sub)) {
      // A weird character in Japanese macro description
      result.push('→')
      index += 1
    } else if (/^<Indent\/>/.test(sub)) {
      // The soft indent(?) in French / German macro description
      result.push(' ')
      index += 9
    } else if (/^<SoftHyphen\/>/.test(sub)) {
      // remove soft hyphen that is used in deutschen makro
      index += 13
    } else if (/^<UIForeground>/.test(sub)) {
      // FFXIV use color code in macro description
      // to highlight the wrapped text with orange color.
      // So we need to replace the color code with span tag.
      const m =
        // eslint-disable-next-line max-len
        /^<UIForeground>F201FA<\/UIForeground><UIGlow>F201FB<\/UIGlow>(.*?)<UIGlow>01<\/UIGlow><UIForeground>01<\/UIForeground>/.exec(
          sub,
        )
      if (!m) {
        throw new Error('parse error')
      }
      result.push(renderer.span(m[1], 'highlight'))
      index += m[0].length
    } else if (/^<Gui\((\d+)\)\/>/.test(sub)) {
      // replace <Gui(x)/> to corresponding keys
      const m = /^<Gui\((\d+)\)\/>/.exec(sub)
      if (!m) {
        throw new Error('parse error')
      }
      result.push(renderer.kbd(keyMap[m[1]] || m[1]))
      index += m[0].length
    } else if (/^<(\w+)>/.test(sub)) {
      const m = /^<(\w+)>/.exec(sub)
      if (!m) {
        throw new Error('parse error')
      }
      result.push(`&lt;${m[1]}&gt;`)
      index += m[0].length
    } else if (/^\n/.test(sub)) {
      result.push(renderer.br())
      index += 1
    } else {
      result.push(description[index])
      index += 1
    }
  }

  return result
}

class Renderer {
  html: boolean

  constructor(format: 'html' | 'text') {
    this.html = format === 'html'
  }

  p(text: string, className = '') {
    return this.html ? <p className={className}>{text}</p> : `${text}\n`
  }

  span(text: string, className = '') {
    return this.html ? <span className={className}>{text}</span> : ` ${text} `
  }

  kbd(text: string, className = '') {
    return this.html ? <kbd className={className}>{text}</kbd> : `[${text}]`
  }

  br() {
    return this.html ? <br /> : '\n'
  }
}