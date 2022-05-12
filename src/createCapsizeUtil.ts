import { Context } from './context'

export const CAPSIZE_VARS = {
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
  '--line-height-normal': 'calc(var(--line-height-scale) * var(--font-size))',

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
}

export const BEFORE_STYLES = {
  content: '""',
  display: 'table',
  marginBottom: 'calc(var(--cap-height-trim) * -1em)',
}

export const AFTER_STYLES = {
  content: '""',
  display: 'table',
  marginTop: 'calc(var(--baseline-trim) * -1em)',
}

export function createCapsizeUtil({ tw, options }: Context): void {
  const className = '.' + options.className
  const before = className + '::before'
  const after = className + '::after'

  tw.addUtilities({
    [className]: CAPSIZE_VARS,
    [before]: BEFORE_STYLES,
    [after]: AFTER_STYLES,
  })
}
