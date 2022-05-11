import { Result, Dict } from '@swan-io/boxed'
import { z } from 'zod'
import { Context } from './context'
import { parseBoxed } from './parse'

export const createFontFamilyUtils = (
  ctx: Context
): Result<Context, string> => {
  const { theme, tw } = ctx

  const results = Dict.entries(theme.capsize.metrics).map(([key, metrics]) =>
    parseBoxed(z.string(), tw.theme(`fontFamily.${key}`)).tapOk(
      (fontFamily) => {
        const className = `.font-${key}`
        const styles = {
          fontFamily,
          '--cap-height': metrics.capHeight.toString(),
          '--ascent': metrics.ascent.toString(),
          '--descent': metrics.descent.toString(),
          '--line-gap': metrics.lineGap.toString(),
          '--units-per-em': metrics.unitsPerEm.toString(),
          '--x-height': metrics.xHeight.toString(),
        }

        tw.addUtilities({ [className]: styles })
      }
    )
  )

  return Result.all(results).map(() => ctx)
}
