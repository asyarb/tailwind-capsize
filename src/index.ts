import creator from 'tailwindcss/plugin'
import { Result } from '@swan-io/boxed'

import { parseBoxed } from './parse'
import { Config, FontFamilies, Options } from './validators'
import { mapMetricsToFontUtils } from './mapMetricsToFontUtils'
import { ensureSameKeys } from './ensureSameKeys'
import { logAndThrow } from './logAndThrow'

const tailwindCapsize = creator.withOptions<Options>((rawOptions) => (tw) => {
  Result.allFromDict({
    config: parseBoxed(Config, tw.theme('capsize')),
    fontFamilies: parseBoxed(FontFamilies, tw.theme('fontFamily')),
    options: parseBoxed(Options, rawOptions),
    tw: Result.Ok(tw),
  })
    .flatMap(ensureSameKeys)
    .flatMap(mapMetricsToFontUtils)
    .tapError(logAndThrow)
})

export default tailwindCapsize
