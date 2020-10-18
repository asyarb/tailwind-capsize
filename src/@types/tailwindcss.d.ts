declare module 'tailwindcss/plugin' {
  interface PluginCallbackArgs {
    addUtilities: (utilities: Record<string, any>, variants: string[]) => void
    addComponents: (components: Record<string, any>, variants: string[]) => void
    addBase: (base: Record<string, any>, variants: string[]) => void
    addVariant: (variantName: string, variantArgs: any) => void
    e: (className: string) => string
    prefix: (className: string) => string
    theme: <T>(path: string) => T
    variants: (path: string) => any
    config: <T>(path: string) => T
    postcss: (args: any) => void
  }

  function plugin(callback: (args: PluginCallbackArgs) => void): any

  export default plugin
}
