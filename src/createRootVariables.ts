import { Context } from './context'

export const createRootVariables = (ctx: Context): void => {
  const { tw, options } = ctx

  tw.addUtilities({
    ':root': {
      '--root-font-size': options.rootFontSize.toString(),
      '--root-line-height': options.rootLineHeight.toString(),
      fontSize: 'var(--root-font-size)',
      lineHeight: 'var(--root-line-height)',
    },
  })
}
