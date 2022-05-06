import creator from 'tailwindcss/plugin'
import { Result } from '@swan-io/boxed'

import { parseBoxed } from './parse'
import { Config, FontFamilies, Options } from './validators'
import { mapMetricsToFontUtils } from './mapMetricsToFontUtils'
import { ZodError } from 'zod'

const tailwindCapsize = creator.withOptions<Options>((rawOptions) => {
  const _options = Options.parse(rawOptions)

  return (tw) => {
    Result.allFromDict({
      config: parseBoxed(Config, tw.theme('capsize')),
      fontFamilies: parseBoxed(FontFamilies, tw.theme('fontFamily')),
    })
      .flatMap(({ config, fontFamilies }) =>
        mapMetricsToFontUtils({ config, fontFamilies, tw })
      )
      .tapError((err) => {
        if (err instanceof ZodError) {
          throw err
        }

        throw new Error(err)
      })
  }
})

export default tailwindCapsize
