import cssToJson from 'css2json'
import { expect, test } from 'vitest'
import { runTailwind } from './_testUtils'

test('it creates the fluid typography utils', async () => {
  const css = cssToJson(await runTailwind())
  const capsizeFluid = css['.capsize-fluid']
  const fromTextSm = css['.from-text-sm']
  const toText2xl = css['.to-text-2xl']
  const screenBaseToXl = css['.screen-base-to-xl']

  expect(capsizeFluid).toMatchInlineSnapshot(`
    {
      "--absolute-descent": "max(var(--descent), -1 * var(--descent))",
      "--ascent-scale": "calc(var(--ascent) / var(--units-per-em))",
      "--baseline-trim": "calc(var(--baseline-trim-param) - var(--specified-line-height-offset) / var(--font-size))",
      "--baseline-trim-param": "calc(var(--descent-scale) + var(--line-gap-scale) / 2)",
      "--cap-height-scale": "calc(var(--cap-height) / var(--units-per-em))",
      "--cap-height-trim": "calc(var(--cap-height-trim-param) - var(--specified-line-height-offset) / var(--font-size))",
      "--cap-height-trim-param": "calc(var(--ascent-scale) - var(--cap-height-scale) + var(--line-gap-scale) / 2)",
      "--content-area": "calc(var(--ascent) + var(--line-gap) + var(--absolute-descent))",
      "--descent-scale": "calc(var(--absolute-descent) / var(--units-per-em))",
      "--font-size": "var(--min-font-size)",
      "--line-gap-scale": "calc(var(--line-gap) / var(--units-per-em))",
      "--line-height-normal": "calc(var(--line-height-scale) * var(--font-size))",
      "--line-height-numeric": "calc(var(--font-size) * var(--line-height, var(--root-line-height)))",
      "--line-height-scale": "calc(var(--content-area) / var(--units-per-em))",
      "--r": "calc(var(--r-numerator) / var(--r-denominator))",
      "--r-denominator": "calc(var(--min-screen-size) - var(--max-screen-size))",
      "--r-numerator": "calc((var(--min-screen-size) * var(--max-font-size)) - (var(--max-screen-size) * var(--min-font-size)))",
      "--specified-line-height-offset": "calc((var(--line-height-normal) - var(--line-height-numeric)) / 2)",
      "--v": "calc(var(--v-numerator) / var(--v-denominator))",
      "--v-denominator": "calc(var(--max-screen-size) - var(--min-screen-size))",
      "--v-numerator": "calc(100 * (var(--max-font-size) - var(--min-font-size)))",
    }
  `)
  expect(fromTextSm).toMatchInlineSnapshot(`
    {
      "--min-font-size": "14",
      "font-size": "clamp(var(--min-font-size) / var(--root-font-size) * 1rem, (var(--v) * 1vw) + ((var(--r) / var(--root-font-size)) * 1rem), var(--max-font-size) / var(--root-font-size) * 1rem)",
    }
  `)
  expect(toText2xl).toMatchInlineSnapshot(`
    {
      "--max-font-size": "24",
    }
  `)
  expect(screenBaseToXl).toMatchInlineSnapshot(`
    {
      "--max-screen-size": "1280",
      "--min-screen-size": "360",
    }
  `)
})
