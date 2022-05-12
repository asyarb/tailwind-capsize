import { type FontSizeValue } from './validators'
import { type Context } from './context'
import { parsePixels } from './utils/parsePixels'

export function createFontSizeUtils(ctx: Context): void {
  const { tw } = ctx

  tw.matchUtilities(
    {
      text: (value: FontSizeValue) => ({
        '--font-size': parsePixels(value, ctx).toString(),
        fontSize: 'calc((var(--font-size) / var(--root-font-size)) * 1rem)',
      }),
    },
    { values: tw.theme('fontSize') }
  )
}
