declare module 'tailwindcss/plugin' {
  type ThemeValue = string | number | string[] | number[]

  export type ThemeFn = (key: string) => Record<string, unknown>
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
    addUtilities: AddUtilitiesFn
    matchUtilities: MatchUtilitiesFn
  }

  export type TailwindPluginFn = (ctx: TailwindContext, config?: any) => void

  interface TailwindPlugin {
    (pluginFn: TailwindPluginFn, config?: any): void
    withOptions<T = unknown>(
      pluginFnWithOpts: (options?: T) => TailwindPluginFn,
      config?: any
    ): void
  }

  const plugin: TailwindPlugin

  export default plugin
}
