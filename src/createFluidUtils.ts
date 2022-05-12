import { Context } from './context'
import { AFTER_STYLES, BEFORE_STYLES, CAPSIZE_VARS } from './createCapsizeUtil'
import { parsePixels } from './utils/parsePixels'
import { FontSizeValue } from './validators'

type FluidUtil = {
  '--min-screen-size': string
  '--max-screen-size': string
}

export function createFluidUtils(ctx: Context): void {
  const { tw, theme, options } = ctx

  tw.matchUtilities(
    {
      'from-text': (value: FontSizeValue) => ({
        '--min-font-size': parsePixels(value, ctx).toString(),
        fontSize:
          'clamp(var(--min-font-size) / var(--root-font-size) * 1rem, (var(--v) * 1vw) + ((var(--r) / var(--root-font-size)) * 1rem), var(--max-font-size) / var(--root-font-size) * 1rem)',
      }),
      'to-text': (value: FontSizeValue) => ({
        '--max-font-size': parsePixels(value, ctx).toString(),
      }),
    },
    { values: theme.fontSize }
  )

  const screens = Object.keys(theme.screens)
  let fluidUtils: Record<string, FluidUtil> = {}

  Object.entries(theme.screens).forEach(([screen, breakpoint], idx) => {
    screens.slice(idx + 1).forEach((otherScreen) => {
      const className = `.from-${screen}-to-${otherScreen}`
      const otherScreenBreakpoint = theme.screens[otherScreen]!

      fluidUtils[className] = {
        '--min-screen-size': parsePixels(breakpoint, ctx).toString(),
        '--max-screen-size': parsePixels(otherScreenBreakpoint, ctx).toString(),
      }
    })
  })

  const className = '.' + options.className + '-fluid'
  const before = className + '::before'
  const after = className + '::after'

  tw.addUtilities(fluidUtils)
  tw.addUtilities({
    [className]: {
      '--font-size': 'var(--min-font-size)',

      ...CAPSIZE_VARS,

      '--v-numerator':
        'calc(100 * (var(--max-font-size) - var(--min-font-size)))',
      '--v-denominator':
        'calc(var(--max-screen-size) - var(--min-screen-size))',
      '--v': 'calc(var(--v-numerator) / var(--v-denominator))',

      '--r-numerator':
        'calc((var(--min-screen-size) * var(--max-font-size)) - (var(--max-screen-size) * var(--min-font-size)))',
      '--r-denominator':
        'calc(var(--min-screen-size) - var(--max-screen-size))',
      '--r': 'calc(var(--r-numerator) / var(--r-denominator))',
    },

    [before]: BEFORE_STYLES,
    [after]: AFTER_STYLES,
  })
}
