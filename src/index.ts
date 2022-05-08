import creator from 'tailwindcss/plugin'

import { type Options } from './validators'
import { createContext } from './context'
import { ensureSameFontKeys } from './ensureSameFontKeys'
import { addMetricsToFontFamilyUtils } from './addMetricsToFontFamilyUtils'
import { addCssVarsToFontSizes } from './addCssVarsToFontSizes'
import { addCssVarsToLineHeights } from './addCssVarsToLineHeights'
import { logAndThrow } from './logAndThrow'

const tailwindCapsize = creator.withOptions<Options>((options) => (tw) => {
  // TODO: Create `capsize` utility.
  createContext(options, tw)
    .flatMap(ensureSameFontKeys)
    .flatMap(addMetricsToFontFamilyUtils)
    .flatMap(addCssVarsToFontSizes)
    .flatMap(addCssVarsToLineHeights)
    .tapError(logAndThrow)
})

export default tailwindCapsize
