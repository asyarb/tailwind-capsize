import { Context } from './context'

export const createRootVariables = (ctx: Context): Context => {
  const { tw, options } = ctx

  const fontSize = options.rootFontSize.toString()
  const lineHeight = options.rootLineHeight.toString()

  tw.addUtilities({
    ':root': {
      '--root-font-size': fontSize,
      '--root-line-height': lineHeight,
      fontSize,
      lineHeight,
    },
  })

  return ctx
}
