import { stripIndent } from 'common-tags'
import { Context } from './context'

export const ensureSameFontKeys = (ctx: Context): void => {
  const { theme } = ctx

  const fontFamilyKeys = Object.keys(theme.fontFamily)
  const metricKeys = Object.keys(theme.capsize.metrics)

  if (!metricKeys.every((key) => fontFamilyKeys.includes(key))) {
    throw new Error(
      stripIndent`The keys provided in 'capsize.metrics' do not match the keys
      specified in 'fontFamily'.`
    )
  }
}
