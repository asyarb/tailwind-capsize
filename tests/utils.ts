import * as fs from 'fs/promises'
import * as path from 'path'
import postcss from 'postcss'
import tailwind from 'tailwindcss'
import inter from '@capsizecss/metrics/inter'
import capsizePlugin from '../src/index'
import { Options } from '../src/validators'

const CSS_PATH = path.resolve(__dirname, './fixtures/index.css')

const config = (opts?: Options) => ({
  content: ['./tests/fixtures/index.html'],
  theme: {
    fontFamily: {
      sans: ['Inter var', 'system-ui'],
    },

    capsize: {
      metrics: {
        sans: inter,
      },
    },

    extend: {},
  },
  variants: {},
  plugins: [capsizePlugin(opts)],
})

export async function runTailwind(opts?: Options): Promise<boolean> {
  const css = await fs.readFile(CSS_PATH)
  const plugins = [tailwind(config(opts))]

  const result = await postcss(plugins).process(css, { from: undefined })

  return Boolean(result.css)
}
