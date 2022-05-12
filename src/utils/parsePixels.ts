import { type ThemeValue, type FontSizeValue } from '../validators'
import { type Context } from '../context'
import { isNumber } from './isNumber'

function cssUnitToNumber(value: ThemeValue, ctx: Context): number {
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

export function parsePixels(value: FontSizeValue, ctx: Context): number {
  if (Array.isArray(value)) {
    return cssUnitToNumber(value[0], ctx)
  }

  return cssUnitToNumber(value, ctx)
}
