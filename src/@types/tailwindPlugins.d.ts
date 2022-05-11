declare module 'tailwindcss/plugin' {
  export type ThemeValue = string | number
  export type FontSizeThemeValue =
    | ThemeValue
    | [fontSize: ThemeValue, lineHeight: ThemeValue]
    | [
        fontSize: ThemeValue,
        obj: { lineHeight?: ThemeValue; letterSpacing?: ThemeValue }
      ]

  export interface Config {
    content: string[]
    theme: Record<string, unknown>
    plugins: unknown[]
    presets: unknown[]
    prefix?: string
    important?: boolean
    separator?: string
    corePlugins?: Record<string, boolean>
  }

  export type ThemeFn = (key: string) => Record<string, unknown>
  export type ConfigFn = (key?: string) => Config
  export type EscapeFn = (className: string) => string
  export type AddUtilitiesFn = (
    utilities: Record<string, Record<string, string>>
  ) => void

  type UtilityGeneratorFn<T = any> = (value: T) => Record<string, string>
  export type MatchUtilitiesFn<T = any> = (
    utilities: Record<string, UtilityGeneratorFn<T>>,
    selector: { values: Record<string, any> }
  ) => void

  export interface TailwindContext {
    e: EscapeFn
    theme: ThemeFn
    config: ConfigFn
    addUtilities: AddUtilitiesFn
    matchUtilities: MatchUtilitiesFn
  }

  export type TailwindPluginFn = (ctx: TailwindContext, config?: any) => void

  type TailwindPlugin = () => void
  type TailwindPluginWithOptions<T = unknown> = (options?: T) => void

  interface TailwindPluginCreator {
    (pluginFn: TailwindPluginFn, defaultConfig?: any): TailwindPlugin
    withOptions<T = unknown>(
      pluginFnWithOpts: (options?: T) => TailwindPluginFn,
      defaultConfigFn?: (options?: T) => any
    ): TailwindPluginWithOptions<T>
  }

  const creator: TailwindPluginCreator

  export default creator
}
