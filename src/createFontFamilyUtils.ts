import { z } from 'zod'
import { Context } from './context'

export const createFontFamilyUtils = (ctx: Context): void => {
  const { theme, tw } = ctx

  Object.entries(theme.capsize.metrics).forEach(([key, metrics]) => {
    const className = `.font-${key}`
    const fontFamily = z.string().parse(tw.theme(`fontFamily.${key}`))
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
  })
}
