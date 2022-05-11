import creator from 'tailwindcss/plugin'

import { type Options } from './validators'
import { createContext } from './context'
import { ensureSameFontKeys } from './ensureSameFontKeys'
import { createFontFamilyUtils } from './createFontFamilyUtils'
import { createFontSizeUtils } from './createFontSizeUtils'
import { createLineHeightUtils } from './createLineHeightUtils'
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
    const ctx = createContext(options, tw)
    ensureSameFontKeys(ctx)
    createRootVariables(ctx)
    createFontSizeUtils(ctx)
    createLineHeightUtils(ctx)
    createFontFamilyUtils(ctx)
    createCapsizeUtil(ctx)
  },
  (_options) => DEFAULT_CONFIG
)

export default tailwindCapsize
