import { Context } from './context'

export const createRootVariables = (ctx: Context): Context => {
  const { tw, options } = ctx

  tw.addUtilities({
    ':root': { '--root-font-size': options.rootFontSize.toString() },
  })

  return ctx
}
