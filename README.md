# `koishi-plugin-ffxiv-macrodict`

English | [简体中文](README.zh-CN.md)

A [koishi](https://github.com/koishijs/koishi) plugin for searching macro descriptions which is used in the famous video game [FFXIV (Final Fantasy XIV)](https://www.finalfantasyxiv.com/)

## Features

The plugin add two new commands: `macrodict` to search macro descriptions.

You can invoke `help` command to see the description and usage of these commands after installing the plugin.

## Install

### Market

If you create your Bot project via the [Koishi boilerplate](https://github.com/koishijs/boilerplate/generate), you can install the `koishi-plugin-ffxiv-macrodict` plugin from the plugin market.
As the dependency of the plugin, you may need to install [koishi-plugin-puppeteer](https://npmjs.com/package/koishi-plugin-puppeteer) before enable the plugin.

You can follow the instructions from [Install and Configure Plugins](https://koishi.js.org/manual/starter/console.html#%E5%AE%89%E8%A3%85%E5%92%8C%E9%85%8D%E7%BD%AE%E6%8F%92%E4%BB%B6) to add the plugin to your Bot.

### Manually

First, you should have `nodejs` and a package manager like `yarn` or `npm` installed.

```bash
# We recommend to use `yarn`
$ yarn add koishi-plugin-ffxiv-macrodict
# But you can use `npm` if you prefer
$ npm install --save koishi-plugin-ffxiv-macrodict
```

## Configuration

This plugin expose the following configuration:

```typescript
export interface MacroDictConfig {
  aliases?: string[]
  defaultLanguage?: 'en' | 'de' | 'fr' | 'ja' | 'ko' | 'chs'
  fetchOnStart?: boolean
}
```

## Translation

This plugin supports multiple languages.

To contribute translations, please register a [Crowdin](https://crowdin.com/) and contribute translations to the `macrodict` folder of the project [hatsushimo](https://crowdin.com/project/hatsushimo).

## LICENSE

This plugin is licensed under the [MIT license](LICENSE).

FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd. All the macro data from FINAL FANTASY XIV is used without any modification.

FINAL FANTASY XIV © 2010 - 2022 SQUARE ENIX CO., LTD. All Rights Reserved.
