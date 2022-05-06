import creator from 'tailwindcss/plugin'

import { type Options } from './validators'
import { addMetricsToFontFamilyUtils } from './addMetricsToFontFamilyUtils'
import { ensureSameFontKeys } from './ensureSameFontKeys'
import { logAndThrow } from './logAndThrow'
import { createContext } from './context'

const tailwindCapsize = creator.withOptions<Options>((options) => (tw) => {
  // TODO: Map over every "text-" and add css variable --font-size
  // TODO: Map over every "leading-" and add css variable --line-height
  // TODO: Only allow relative line-heights
  // TODO: Only allow number based font sizes?
  createContext(options, tw)
    .flatMap(ensureSameFontKeys)
    .flatMap(addMetricsToFontFamilyUtils)
    .tapError(logAndThrow)
})

export default tailwindCapsize
