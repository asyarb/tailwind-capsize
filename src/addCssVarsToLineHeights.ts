import { ThemeValue } from './validators'
import { Result } from '@swan-io/boxed'
import { Context } from './context'

export const addCssVarsToLineHeights = (
  ctx: Context
): Result<Context, string> => {
  const { tw } = ctx

  tw.matchUtilities(
    {
      leading: (value: ThemeValue) => ({
        '--line-height': typeof value === 'string' ? value : value.toString(),
        'line-height': `var(--line-height)`,
      }),
    },
    { values: tw.theme('lineHeight') }
  )

  return Result.Ok(ctx)
}
