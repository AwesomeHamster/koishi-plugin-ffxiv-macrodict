# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- add threshold of distance in fuzzy search ([#10](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/10))
- upgrade to adapt koishi v4.8 ([#9](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/9))
- optimize html rendering ([#15](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/15))

### Changed

- add default value in config ([#12](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/12))

### Removed

- update [`@koishijs/plugin-puppeteer`](https://www.npmjs.com/package/@koishijs/plugin-puppeteer) to the community-driven version [`koishi-plugin-puppeteer`](https://www.npmjs.com/package/koishi-plugin-puppeteer) ([#18](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/18))

  You need to remove it manually and install `koishi-plugin-puppeteer` instead.

## [2.0.10] - 2022-07-02

### Added

- add text mode ([#7](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/7))
- update translations ([fa7e5f3](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/fa7e5f3aeeb58b26b29a5ca96684ede094a93884))

### Fixed

- render images should use about_html ([311e59c](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/311e59c19d0003c55f8704f35e421eaff4467e17))

## [2.0.9] - 2022-06-22

### Fixed

- should not throw error on render ([6cca70c](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/6cca70c2462bac173b1802294f40d22ab466d498))

## [2.0.8] - 2022-06-20

### Added

- support fuzzy search ([#15](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/15))
- extract search function to Service ([#17](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/17))
- update i18n translations from [crowdin](https://crowdin.com/project/hatsushimo) ([#13](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/13))

### Fixed

- update message not found ([#19](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/19))

## [2.0.7] - 2022-06-14

### Fixed

- author field in package.json ([71a0adf](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/71a0adff6a1dffcde69e37ed8bddaf3a8650433a))

## [2.0.6] - 2022-06-12

### Added

- add koishi field in package.json ([b06d4f2](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/b06d4f232d704e8f622af645045f55aa0e41e15d))

### Changed

- transform update to class ([c0a2706](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/c0a2706cd6b5c3a4f09633ca6d136a89422ada92))

### Removed

- remove usage of template ([c4f9611](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/c4f9611abb85b805ed5c3d83b6a6e009ca1c0b9e))

## [2.0.5] - 2022-03-12

### Added

- add i18n translations support ([#12](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/12), [#10](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/10), [e581baa](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/e581baa11205f77d3f2fe71806cf93fe5110b335), [a0e8940](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/a0e89409189f479c5f9c5766bb90d6da33171e82))

### Changed

- re-word some command descriptions

### Removed

- remove unused languages

## [2.0.4] - 2022-04-02

### Fixed

- koishi cannot currently load plugin ([2d611f0](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/2d611f0de9cae04e996ef80bca6784d8573f636e))

## [2.0.3] - 2022-04-01

### Fixed

- error occurs in rendering ([977eb89](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/977eb891db90e3f44790f40d5a8f21aa45a75930))

## [2.0.2] - 2022-04-01

### Added

- configuration page in koishi console ([efb4171](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/efb4171095d8ef73c3ebbdec4904b66c15497a52))

### Fixed

- remove unused imports, shrink bundle size ([7072e4a](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/7072e4a40c90b9732e3ce2e2695b79e55e5d0694))

## [2.0.1] - 2022-01-21

### Changed

- migrate test files to use plugin-mock ([2766ee3](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/2766ee35b7274221b57d0a13540d4b9b19c522eb))

## [2.0.0] - 2022-01-17

### Added

- add support for koishi v4 ([#1](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/1))
- add `fetchOnStart` option ([#1](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/1))

### Changed

- migrate axios to koishi built-in `ctx.http.get` function ([#1](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/1))

### Fixed

- puppeteer should be read from `ctx.puppeteer` ([#1](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/1))
- update function causes errors ([#1](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/pull/1))
- placeholder reconized as html tag which cause macro content not fully displayed ([223c306](https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/223c30647ea95d9d52cca3133f3a728f88de1315))

[unreleased]: https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/compare/v2.0.10...HEAD
[2.0.10]: https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/compare/v2.0.9...v2.0.10
[2.0.9]: https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/compare/v2.0.8...v2.0.9
[2.0.8]: https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/compare/v2.0.7...v2.0.8
[2.0.7]: https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/compare/v2.0.6...v2.0.7
[2.0.6]: https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/compare/v2.0.5...v2.0.6
[2.0.5]: https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/compare/v2.0.4...v2.0.5
[2.0.4]: https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/compare/v2.0.3...v2.0.4
[2.0.3]: https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/compare/v2.0.2...v2.0.3
[2.0.2]: https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/AwesomeHamster/koishi-plugin-ffxiv-macrodict/commit/c801c9c59588807a66180dc737526c4fda7bf71a
