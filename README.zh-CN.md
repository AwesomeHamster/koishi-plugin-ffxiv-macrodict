# `koishi-plugin-ffxiv-macrodict`

[English](README.md) | 简体中文

[koishi](https://github.com/koishijs/koishi) 的插件，用于搜索著名的 MMORPG 网络游戏 [FFXIV (Final Fantasy XIV)](https://www.finalfantasyxiv.com/) 的宏描述文本信息。

## 功能

本插件添加了 `macrodict` 命令用于搜索宏描述文本信息。

你可以在安装插件后使用 `help` 命令查看这些命令的介绍与使用方法。

## 安装

### 插件市场

如果你通过 [Koishi 模板项目](https://github.com/koishijs/boilerplate/generate)创建了你的机器人，你可以直接在插件市场安装名为 `koishi-plugin-ffxiv-macrodict` 的插件。你可能还需要安装 [koishi-plugin-puppeteer](https://npmjs.com/package/koishi-plugin-puppeteer) 才能启用本插件。

你可以需要参考[安装和配置插件](https://koishi.js.org/manual/starter/console.html#%E5%AE%89%E8%A3%85%E5%92%8C%E9%85%8D%E7%BD%AE%E6%8F%92%E4%BB%B6)的说明添加此插件到你的机器人中。

### 手动安装

首先，你需要安装 `nodejs` 以及任意一个包管理器，如 `yarn` 或 `npm`。

```bash
# 建议使用 `yarn`
$ yarn add koishi-plugin-ffxiv-macrodict
# 但是你也可以使用 `npm`
$ npm install --save koishi-plugin-ffxiv-macrodict
```

## 配置

该插件公开以下配置：

```typescript
export interface MacroDictConfig {
  aliases?: string[]
  defaultLanguage?: 'en' | 'de' | 'fr' | 'ja' | 'ko' | 'chs'
  fetchOnStart?: boolean
}
```

## 翻译

本插件支持多语言。

若您想要贡献翻译，请注册 [Crowdin](https://crowdin.com/) 并在项目 [hatsushimo](https://crowdin.com/project/hatsushimo) 的 `macrodict` 文件夹中贡献翻译。

## 许可证

本插件遵循 [MIT license](LICENSE) 许可协议。

FINAL FANTASY、最终幻想是株式会社史克威尔艾尼克斯的注册商标。所有来自 FINAL FANTASY XIV 的宏描述数据均未作任何修改。

FINAL FANTASY XIV © 2010 - 2022 SQUARE ENIX CO., LTD. All Rights Reserved.
