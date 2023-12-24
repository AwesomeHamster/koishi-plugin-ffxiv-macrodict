import yaml from 'esbuild-plugin-yaml'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  format: ['cjs'],
  clean: true,
  outDir: 'lib',
  esbuildPlugins: [yaml.yamlPlugin()],
  esbuildOptions(options, context) {
  },
})
