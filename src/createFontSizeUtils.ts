import { ThemeValue, FontSizeValue } from './validators'
import { Context } from './context'
import { isNumber } from './utils/isNumber'

function getValueAsNumber(value: ThemeValue, ctx: Context): number {
  if (isNumber(value)) {
    return value
  }

  if (value.endsWith('rem')) {
    const remValue = Number.parseFloat(value.split('rem').at(0) as string)
    const size = remValue * ctx.options.rootFontSize

    return size
  }

  return Number.parseFloat(value)
}

function fontSizeToPx(value: FontSizeValue, ctx: Context): number {
  if (Array.isArray(value)) {
    return getValueAsNumber(value[0], ctx)
  }

  return getValueAsNumber(value, ctx)
}

export function createFontSizeUtils(ctx: Context): void {
  const { tw } = ctx

  tw.matchUtilities(
    {
      text: (value: FontSizeValue) => ({
        '--font-size': fontSizeToPx(value, ctx).toString(),
        fontSize: 'calc((var(--font-size) / var(--root-font-size)) * 1rem)',
      }),
    },
    { values: tw.theme('fontSize') }
  )
}
