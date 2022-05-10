import creator from 'tailwindcss/plugin'

import { type Options } from './validators'
import { createContext } from './context'
import { ensureSameFontKeys } from './ensureSameFontKeys'
import { addMetricsToFontFamilyUtils } from './addMetricsToFontFamilyUtils'
import { addCssVarsToFontSizes } from './addCssVarsToFontSizes'
import { addCssVarsToLineHeights } from './addCssVarsToLineHeights'
import { logAndThrow } from './logAndThrow'
import { createCapsizeUtil } from './createCapsizeUtil'

const DEFAULT_CONFIG = {
  corePlugins: {
    fontSize: false,
    lineHeight: false,
    fontFamily: false,
  },
}

const tailwindCapsize = creator.withOptions<Options>(
  (options) => (tw) => {
    createContext(options, tw)
      .flatMap(ensureSameFontKeys)
      .map(addCssVarsToFontSizes)
      .map(addCssVarsToLineHeights)
      .flatMap(addMetricsToFontFamilyUtils)
      .map(createCapsizeUtil)
      .tapError(logAndThrow)
  },
  (_options) => DEFAULT_CONFIG
)

export default tailwindCapsize
