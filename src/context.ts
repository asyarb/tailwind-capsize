import type { PluginAPI } from 'tailwindcss/types/config'

import { Theme, Options } from './validators'

export interface Context {
  theme: Theme
  tw: PluginAPI
  options: Options
}

export function createContext(options: unknown, tw: PluginAPI): Context {
  return {
    theme: Theme.parse(tw.config().theme),
    options: Options.parse(options),
    tw,
  }
}
