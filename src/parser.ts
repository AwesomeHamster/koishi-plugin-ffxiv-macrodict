const keyMap: { [k: string]: string} = {
  "1": "↑",
  "2": "↓",
  "3": "←",
  "4": "→",
  "8": "〇",
  "9": "X",
  "10": "□",
  "11": "△",
  "14": "L2",
  "15": "R2",
};

/**
 * Parse a macro definition text for HTML.
 */
export function parseMacroDescriptionForHtml(description: string): string {
  return description
    // A weird character in Japanese macro description
    .replace(/\ue070/g, "→")
    // The soft indent(?) in French / German macro description
    .replace(/<Indent\/>/g, " ")
    // remove soft hyphen that is used in deutschen makro
    .replace(/<SoftHyphen\/>/g, "")
    // escape
    .replace(
      // FFXIV use color code in macro description
      // to highlight the wrapped text with orange color.
      // So we need to replace the color code with span tag.
      // eslint-disable-next-line max-len
      /<UIForeground>F201FA<\/UIForeground><UIGlow>F201FB<\/UIGlow>(.*?)<UIGlow>01<\/UIGlow><UIForeground>01<\/UIForeground>/g,
      "<span class='highlight'>$1</span>",
    )
    // replace <Gui(x)/> to corresponding keys
    .replace(/<Gui\((\d+)\)\/>/g, (_match, key) => {
      return `<kbd class="key">${keyMap[key] || key}</kbd>`;
    })
    .replace(/<(\w+)>/g, "&lt;$1&gt;")
    .replace(/\n/g, "<br>");
}
