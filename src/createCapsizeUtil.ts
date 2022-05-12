import { Context } from './context'

export const createCapsizeUtil = (ctx: Context): void => {
  const { tw, options } = ctx

  const className = '.' + options.className
  const before = className + '::before'
  const after = className + '::after'

  const noClassName = '.no-' + options.className
  const noBefore = noClassName + '::before'
  const noAfter = noClassName + '::after'

  tw.addUtilities({
    [className]: {
      '--line-height-numeric':
        'calc(var(--font-size) * var(--line-height, var(--root-line-height)))',

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
        'calc((var(--line-height-normal) - var(--line-height-numeric)) / 2)',

      '--cap-height-trim-param':
        'calc(var(--ascent-scale) - var(--cap-height-scale) + var(--line-gap-scale) / 2)',
      '--cap-height-trim':
        'calc(var(--cap-height-trim-param) - var(--specified-line-height-offset) / var(--font-size))',

      '--baseline-trim-param':
        'calc(var(--descent-scale) + var(--line-gap-scale) / 2)',
      '--baseline-trim':
        'calc(var(--baseline-trim-param) - var(--specified-line-height-offset) / var(--font-size))',
    },

    [before]: {
      content: '""',
      display: 'table',
      marginBottom: 'calc(var(--cap-height-trim) * -1em)',
    },

    [after]: {
      content: '""',
      display: 'table',
      marginTop: 'calc(var(--baseline-trim) * -1em)',
    },

    [`${noBefore}, ${noAfter}`]: {
      content: 'none',
    },
  })
}
