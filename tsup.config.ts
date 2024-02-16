// Since tsup requires the default export, we need to disable the eslint rule for this file.
/* eslint-disable import/default */
/* eslint-disable import/no-named-as-default-member */

import yaml from 'esbuild-plugin-yaml'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  format: ['cjs'],
  clean: true,
  outDir: 'lib',
  esbuildPlugins: [yaml.yamlPlugin({})],
  esbuildOptions(options, context) {
  },
})
