import creator from 'tailwindcss/plugin'

import { type Options } from './validators'
import { createContext } from './context'
import { ensureSameFontKeys } from './ensureSameFontKeys'
import { createFontFamilyUtils } from './createFontFamilyUtils'
import { createFontSizeUtils } from './createFontSizeUtils'
import { createLineHeightUtils } from './createLineHeightUtils'
import { logAndThrow } from './logAndThrow'
import { createCapsizeUtil } from './createCapsizeUtil'
import { createRootVariables } from './createRootVariables'

const DEFAULT_CONFIG = {
  corePlugins: {
    fontSize: false,
    lineHeight: false,
    fontFamily: false,
  },
}

const tailwindCapsize = creator.withOptions<Partial<Options>>(
  (options) => (tw) => {
    createContext(options, tw)
      .flatMap(ensureSameFontKeys)
      .map(createRootVariables)
      .map(createFontSizeUtils)
      .map(createLineHeightUtils)
      .flatMap(createFontFamilyUtils)
      .map(createCapsizeUtil)
      .tapError(logAndThrow)
  },
  (_options) => DEFAULT_CONFIG
)

export default tailwindCapsize
