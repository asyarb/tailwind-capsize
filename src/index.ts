import creator from 'tailwindcss/plugin'

import { type Options } from './validators'
import { createContext } from './context'
import { ensureSameFontKeys } from './ensureSameFontKeys'
import { addMetricsToFontFamilyUtils } from './addMetricsToFontFamilyUtils'
import { addCssVarsToFontSizes } from './addCssVarsToFontSizes'
import { logAndThrow } from './logAndThrow'

const tailwindCapsize = creator.withOptions<Options>((options) => (tw) => {
  // TODO: Map over every "text-" and add css variable --font-size
  // TODO: Map over every "leading-" and add css variable --line-height
  // TODO: Only allow relative line-heights
  // TODO: Only allow number based font sizes?
  createContext(options, tw)
    .flatMap(ensureSameFontKeys)
    .flatMap(addMetricsToFontFamilyUtils)
    .flatMap(addCssVarsToFontSizes)
    .tapError(logAndThrow)
})

export default tailwindCapsize
