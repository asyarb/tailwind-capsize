import { Context } from './context'

export function createNoCapsizeUtil({ tw, options }: Context): void {
  const className = '.no-' + options.className
  const before = className + '::before'
  const after = className + '::after'

  tw.addUtilities({
    [`${before}, ${after}`]: {
      content: 'none',
    },
  })
}
