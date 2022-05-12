import { stripIndent } from 'common-tags'
import { Context } from './context'

export function ensureSameFontKeys({ theme }: Context): void {
  const fontFamilyKeys = Object.keys(theme.fontFamily)
  const metricKeys = Object.keys(theme.capsize.metrics)

  if (!metricKeys.every((key) => fontFamilyKeys.includes(key))) {
    throw new Error(
      stripIndent`The keys provided in 'capsize.metrics' do not match the keys
      specified in 'fontFamily'.`
    )
  }
}
