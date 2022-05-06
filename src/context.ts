import { Result } from '@swan-io/boxed'
import { type TailwindContext } from 'tailwindcss/plugin'

import { Theme, Options } from './validators'
import { parseBoxed } from './parse'

export interface Context {
  theme: Theme
  tw: TailwindContext
  options: Options
}

export const createContext = (
  options: unknown,
  tw: TailwindContext
): Result<Context, string> => {
  return Result.allFromDict({
    theme: parseBoxed(Theme, tw.config().theme),
    options: parseBoxed(Options, options),
    tw: Result.Ok(tw),
  })
}
