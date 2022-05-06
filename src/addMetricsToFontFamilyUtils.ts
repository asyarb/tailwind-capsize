import { Result, Dict } from '@swan-io/boxed'
import { Context } from './context'
import { parseBoxed } from './parse'
import { FontFamilyRule } from './validators'

export const addMetricsToFontFamilyUtils = (
  ctx: Context
): Result<Context, string> => {
  const results = Dict.entries(ctx.config.metrics).map(([key, metrics]) =>
    parseBoxed(FontFamilyRule, ctx.tw.theme(`fontFamily.${key}`)).tapOk(
      (fontFamily) => {
        const className = `.font-${key}`
        const styles = {
          fontFamily,
          '--cap-height': metrics.capHeight,
          '--ascent': metrics.ascent,
          '--descent': metrics.descent,
          '--line-gap': metrics.lineGap,
          '--units-per-em': metrics.unitsPerEm,
          '--x-height': metrics.xHeight,
        }

        ctx.tw.addUtilities({ [className]: styles })
      }
    )
  )

  return Result.all(results).map(() => ctx)
}
