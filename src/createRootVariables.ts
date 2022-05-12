import { Context } from './context'

export function createRootVariables({ tw, options }: Context): void {
  tw.addUtilities({
    ':root': {
      '--root-font-size': options.rootFontSize.toString(),
      '--root-line-height': options.rootLineHeight.toString(),
      fontSize: 'var(--root-font-size)',
      lineHeight: 'var(--root-line-height)',
    },
  })
}
