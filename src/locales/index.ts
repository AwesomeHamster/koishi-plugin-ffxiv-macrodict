import { Context } from 'koishi'

export function apply(ctx: Context) {
  ctx.i18n.define('en', require('./en-US/macrodict.yml'))
  ctx.i18n.define('zh', require('./zh-CN/macrodict.yml'))
  ctx.i18n.define('zh-CN', require('./zh-CN/macrodict.yml'))
}
