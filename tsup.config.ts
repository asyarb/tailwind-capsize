import { defineConfig } from 'tsup'

const IS_PROD = process.env.NODE_ENV === 'production'
const IS_DEV = process.env.NODE_ENV === 'development'

console.log(IS_PROD)

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: './dist',
  format: ['cjs', 'esm'],
  platform: 'node',

  clean: true,
  silent: IS_PROD,

  dts: IS_PROD ? { resolve: true } : false,

  watch: IS_DEV,
})
