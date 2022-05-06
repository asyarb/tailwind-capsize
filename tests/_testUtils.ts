import * as fs from 'fs/promises'
import * as path from 'path'
import postcss from 'postcss'
import tailwind from 'tailwindcss'
import inter from '@capsizecss/metrics/inter'

import capsizePlugin from '../src/index'
import { Options } from '../src/validators'

const CSS_PATH = path.resolve(__dirname, './fixtures/index.css')

interface RunTailwindArgs {
  options?: Options
  theme?: Record<any, any>
}

const config = (args?: RunTailwindArgs) => ({
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

    ...args?.theme,
  },
  plugins: [capsizePlugin(args?.options)],
})

export async function runTailwind(args?: RunTailwindArgs): Promise<string> {
  const css = await fs.readFile(CSS_PATH)
  const resolvedConfig = config(args)

  const plugins = [tailwind(resolvedConfig)]

  const result = await postcss(plugins).process(css, { from: undefined })

  return result.css
}
