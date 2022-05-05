import creator from 'tailwindcss/plugin'
import { Result } from '@swan-io/boxed'

import * as log from './logger'
import { parseBoxed } from './parse'
import { Config, FontFamilies, Options } from './validators'
import { mapMetricsToFontUtils } from './mapMetricsToFontUtils'

const tailwindCapsize = creator.withOptions<Options>((rawOptions) => {
  console.log(rawOptions)
  const _options = Options.parse(rawOptions)

  return (tw) => {
    Result.allFromDict({
      config: parseBoxed(Config, tw.theme('capsize')),
      fontFamilies: parseBoxed(FontFamilies, tw.theme('fontFamily')),
    }).match({
      Error: (zodError) => {
        log.info('Received invalid Tailwind theme config!', zodError.issues)
        throw zodError
      },
      Ok: ({ config, fontFamilies }) => {
        mapMetricsToFontUtils({ config, fontFamilies, tw })
      },
    })
  }
})

export default tailwindCapsize
