import { Context } from './context'

export const createCapsizeUtil = (ctx: Context): Context => {
  const { tw, options } = ctx

  const className = '.' + options.className
  const before = className + '::before'
  const after = className + '::after'

  tw.addUtilities({
    [className]: {
      '--absolute-descent': 'max(var(--descent), -1 * var(--descent))',
      '--cap-height-scale': 'calc(var(--cap-height) / var(--units-per-em))',
      '--descent-scale': 'calc(var(--absolute-descent) / var(--units-per-em))',
      '--ascent-scale': 'calc(var(--ascent) / var(--units-per-em))',
      '--line-gap-scale': 'calc(var(--line-gap) / var(--units-per-em))',

      '--content-area':
        'calc(var(--ascent) + var(--line-gap) + var(--absolute-descent))',
      '--line-height-scale': 'calc(var(--content-area) / var(--units-per-em))',
      '--line-height-normal':
        'calc(var(--line-height-scale) * var(--font-size))',

      '--specified-line-height-offset':
        'calc((var(--line-height-normal) - var(--line-height)) / 2)',

      '--ch-trim':
        'calc(var(--ascent-scale) - var(--cap-height-scale) + var(--line-gap-scale) / 2)',
      '--cap-height-trim':
        'calc(-1 * (var(--ch-trim) - var(--specified-line-height-offset) / var(--font-size)))',

      '--bl-trim': 'calc(var(--descent-scale) + var(--line-gap-scale) / 2)',
      '--baseline-trim':
        'calc(-1 * (var(--bl-trim) - var(--specified-line-height-offset) / var(--font-size)))',
    },

    [before]: {
      content: '',
      display: 'table',
      marginBottom: 'calc(-1em * var(--cap-height-trim))',
    },

    [after]: {
      content: '',
      display: 'table',
      marginTop: 'calc(-1em * var(--baseline-trim))',
    },
  })

  return ctx
}
