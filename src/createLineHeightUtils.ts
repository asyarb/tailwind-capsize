import { ThemeValue } from './validators'
import { Context } from './context'

export const createLineHeightUtils = (ctx: Context): Context => {
  const { tw } = ctx

  tw.matchUtilities(
    {
      leading: (value: ThemeValue) => ({
        '--line-height': typeof value === 'string' ? value : value.toString(),
        'line-height': `var(--line-height)`,
      }),
    },
    { values: tw.theme('lineHeight') }
  )

  return ctx
}
