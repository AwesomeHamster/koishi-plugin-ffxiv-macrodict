import { Context } from 'koishi'

import enUS from './en-US.yml'
import zhCN from './zh-CN.yml'

export function apply(ctx: Context) {
  ctx.i18n.define('en', enUS)
  ctx.i18n.define('en-US', enUS)
  ctx.i18n.define('zh', zhCN)
  ctx.i18n.define('zh-CN', zhCN)
}
