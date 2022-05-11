import { type TailwindContext } from 'tailwindcss/plugin'

import { Theme, Options } from './validators'

export interface Context {
  theme: Theme
  tw: TailwindContext
  options: Options
}

export function createContext(options: unknown, tw: TailwindContext): Context {
  return {
    theme: Theme.parse(tw.config().theme),
    options: Options.parse(options),
    tw,
  }
}
