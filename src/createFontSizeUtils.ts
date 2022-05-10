import { ThemeValue, FontSizeValue } from './validators'
import { Context } from './context'
import { isNumber } from './utils/isNumber'

const getValueAsNumber = (value: ThemeValue, ctx: Context): number => {
  if (isNumber(value)) {
    return value
  }

  if (value.endsWith('rem')) {
    const remValue = Number.parseFloat(value.split('rem').at(0) as string)
    const size = remValue * ctx.options.baseFontSize

    return size
  }

  return Number.parseFloat(value)
}

const fontSizeToPx = (value: FontSizeValue, ctx: Context): number => {
  if (Array.isArray(value)) {
    return getValueAsNumber(value[0], ctx)
  }

  return getValueAsNumber(value, ctx)
}

export const createFontSizeUtils = (ctx: Context): Context => {
  const { tw } = ctx

  tw.matchUtilities(
    {
      text: (value: FontSizeValue) => ({
        '--font-size': fontSizeToPx(value, ctx).toString(),
        'font-size': `calc(1px * var(--font-size))`,
      }),
    },
    { values: tw.theme('fontSize') }
  )

  return ctx
}
