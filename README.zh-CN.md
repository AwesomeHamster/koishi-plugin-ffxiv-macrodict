# `koishi-plugin-ffxiv-macrodict`

[English](README.md) | 简体中文

[koishi](https://github.com/koishijs/koishi) 的插件，用于搜索并显示著名 MMORPG 网络游戏 [最终幻想 XIV (Final Fantasy XIV，FFXIV)](https://www.finalfantasyxiv.com/) 的文本指令信息。

<!-- AUTO-GENERATED-CONTENT:START (TOC:maxDepth=3) -->

- [功能与用法](#%E5%8A%9F%E8%83%BD%E4%B8%8E%E7%94%A8%E6%B3%95)
  - [搜索指令的描述](#%E6%90%9C%E7%B4%A2%E6%8C%87%E4%BB%A4%E7%9A%84%E6%8F%8F%E8%BF%B0)
  - [手动更新数据](#%E6%89%8B%E5%8A%A8%E6%9B%B4%E6%96%B0%E6%95%B0%E6%8D%AE)
- [安装](#%E5%AE%89%E8%A3%85)
  - [插件市场](#%E6%8F%92%E4%BB%B6%E5%B8%82%E5%9C%BA)
  - [手动安装](#%E6%89%8B%E5%8A%A8%E5%AE%89%E8%A3%85)
- [注意](#%E6%B3%A8%E6%84%8F)
- [配置](#%E9%85%8D%E7%BD%AE)
- [翻译](#%E7%BF%BB%E8%AF%91)
- [许可证](#%E8%AE%B8%E5%8F%AF%E8%AF%81)
<!-- AUTO-GENERATED-CONTENT:END -->

## 功能与用法

### 搜索指令的描述

使用 `macrodict <指令名>` 搜索文本指令信息。

实例：

```bash
macrodict target
# 也可以识别中文的文本指令
macrodict 目标
# 也可以识别以 / 开头的文本指令
macrodict /target
```

<!-- Here should be an image shows the result -->

#### 输出其他语言版本的描述

使用 `-l <语言代码>` 或 `--lang <语言代码>` 指定输出的语言版本。可选值有：

- `en`：英文
- `ja`：日文
- `de`：德文
- `fr`：法文
- `zh`：简体中文
- `ko`：韩文

若没有指定语言，则默认以当前频道的语言输出，或回退到英文 `en`。

实例：

```bash
macrodict -l en target
```

<!-- Here should be an image shows the result -->

### 手动更新数据

使用 `macrodict.update` 手动更新数据。

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
