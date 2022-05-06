declare module 'tailwindcss/plugin' {
  type ThemeValue = string | number | string[] | number[]

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

  type UtilityGeneratorFn = (value: ThemeValue) => Record<string, string>
  export type MatchUtilitiesFn = (
    utilities: Record<string, UtilityGeneratorFn>,
    selector: { values: Record<string | number, ThemeValue> }
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
    (pluginFn: TailwindPluginFn, config?: any): TailwindPlugin
    withOptions<T = unknown>(
      pluginFnWithOpts: (options?: T) => TailwindPluginFn,
      config?: any
    ): TailwindPluginWithOptions<T>
  }

  const creator: TailwindPluginCreator

  export default creator
}
