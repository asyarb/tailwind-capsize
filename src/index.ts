import creator from 'tailwindcss/plugin'
import { Result } from '@swan-io/boxed'

import { parseBoxed } from './parse'
import { Config, FontFamilies, Options } from './validators'
import { addMetricsToFontFamilyUtils } from './addMetricsToFontFamilyUtils'
import { ensureSameKeys } from './ensureSameKeys'
import { logAndThrow } from './logAndThrow'

const tailwindCapsize = creator.withOptions<Options>((rawOptions) => (tw) => {
  const ctx = {
    config: parseBoxed(Config, tw.theme('capsize')),
    fontFamilies: parseBoxed(FontFamilies, tw.theme('fontFamily')),
    options: parseBoxed(Options, rawOptions),
    tw: Result.Ok(tw),
  }

  // TODO: Map over every "text-" and add css variable --font-size
  // TODO: Map over every "leading-" and add css variable --line-height
  // TODO: Only allow relative line-heights
  // TODO: Only allow number based font sizes?
  Result.allFromDict(ctx)
    .flatMap(ensureSameKeys)
    .flatMap(addMetricsToFontFamilyUtils)
    .tapError(logAndThrow)
})

export default tailwindCapsize
