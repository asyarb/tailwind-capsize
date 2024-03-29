import { ThemeValue } from './validators'
import { Context } from './context'

export function createLineHeightUtils({ tw }: Context): void {
  tw.matchUtilities(
    {
      leading: (value: ThemeValue) => ({
        '--line-height': typeof value === 'string' ? value : value.toString(),
        'line-height': `var(--line-height)`,
      }),
    },
    { values: tw.theme('lineHeight') }
  )
}
