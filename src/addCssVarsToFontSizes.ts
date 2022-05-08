import { ThemeValue, FontSizeValue } from './validators'
import { Result } from '@swan-io/boxed'
import { Context } from './context'
import { isNumber } from './utils/isNumber'

const parsePx = (value: ThemeValue, ctx: Context): number => {
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

const parseFontSize = (value: FontSizeValue, ctx: Context): number => {
  if (Array.isArray(value)) {
    return parsePx(value[0], ctx)
  }

  return parsePx(value, ctx)
}

export const addCssVarsToFontSizes = (
  ctx: Context
): Result<Context, string> => {
  const { tw } = ctx

  tw.matchUtilities(
    {
      text: (value: FontSizeValue) => ({
        '--font-size': parseFontSize(value, ctx).toString(),
        'font-size': `calc(1px * var(--font-size))`,
        'line-height': 'inherit',
      }),
    },
    { values: tw.theme('fontSize') }
  )

  return Result.Ok(ctx)
}
