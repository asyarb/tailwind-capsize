import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: './dist',
  format: ['cjs', 'esm'],
  platform: 'node',
  target: 'node16',

  clean: true,
  dts: true,

  sourcemap: false,

  esbuildOptions: (options) => {
    options.footer = {
      /**
       * This will ensure we can continue writing this plugin as a modern ES
       * module while still publishing this as a CJS library with a proper
       * defualt export.
       *
       * @see: https://github.com/evanw/esbuild/issues/1182#issuecomment-1011414271
       */
      js: 'module.exports = module.exports.default',
    }
  },
})
