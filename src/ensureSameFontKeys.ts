import { Dict, Result } from '@swan-io/boxed'
import { stripIndent } from 'common-tags'
import { Context } from './context'

export const ensureSameFontKeys = (ctx: Context): Result<Context, string> => {
  const fontFamilyKeys = Dict.keys(ctx.fontFamilies)
  const metricKeys = Dict.keys(ctx.config.metrics)

  if (!metricKeys.every((key) => fontFamilyKeys.includes(key))) {
    return Result.Error(
      stripIndent`The keys provided in 'capsize.metrics' do not match the keys
      specified in 'fontFamily'.`
    )
  }

  return Result.Ok(ctx)
}
