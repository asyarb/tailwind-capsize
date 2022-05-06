import { type TailwindContext } from 'tailwindcss/plugin'
import { type FontFamilies, type Config, type Options } from './validators'

export interface Context {
  config: Config
  fontFamilies: FontFamilies
  tw: TailwindContext
  options: Options
}
