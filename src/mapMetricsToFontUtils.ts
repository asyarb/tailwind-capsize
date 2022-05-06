import { Result, Dict } from '@swan-io/boxed'
import { stripIndent } from 'common-tags'
import type { TailwindContext } from 'tailwindcss/plugin'
import type { Config, FontFamilies } from './validators'

interface Arg {
  config: Config
  fontFamilies: FontFamilies
  tw: TailwindContext
}

const ensureSameKeys = (
  config: Config,
  fontFamilies: FontFamilies
): Result<undefined, string> => {
  const fontFamilyKeys = Dict.keys(fontFamilies)
  const metricKeys = Dict.keys(config.metrics)

  if (!metricKeys.every((key) => fontFamilyKeys.includes(key))) {
    return Result.Error(
      stripIndent`The keys provided in 'capsize.metrics' do not match the keys
      specified in 'fontFamily'.`
    )
  }

  return Result.Ok(undefined)
}

export const mapMetricsToFontUtils = ({ config, fontFamilies, tw }: Arg) =>
  ensureSameKeys(config, fontFamilies).map(() => {
    Dict.entries(config.metrics).forEach(([key, metrics]) => {
      const className = `.font-${key}`
      const fontFamily = tw.theme(`fontFamily.${key}`)

      tw.addUtilities({
        [className]: {
          fontFamily,
        },
      })
    })
  })
