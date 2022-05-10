import cssToJson from 'css2json'
import { expect, test } from 'vitest'
import { runTailwind } from './_testUtils'

test('it creates the `capsize` utility', async () => {
  const css = cssToJson(await runTailwind())
  const capsize = css['.capsize']
  const capsizeBefore = css['.capsize::before']
  const capsizeAfter = css['.capsize::after']

  expect(capsize).toMatchInlineSnapshot(`
    {
      "--absolute-descent": "max(var(--descent), -1 * var(--descent))",
      "--ascent-scale": "calc(var(--ascent) / var(--units-per-em))",
      "--baseline-trim": "calc(-1 * (var(--bl-trim) - var(--specified-line-height-offset) / var(--font-size)))",
      "--bl-trim": "calc(var(--descent-scale) + var(--line-gap-scale) / 2)",
      "--cap-height-scale": "calc(var(--cap-height) / var(--units-per-em))",
      "--cap-height-trim": "calc(-1 * (var(--ch-trim) - var(--specified-line-height-offset) / var(--font-size)))",
      "--ch-trim": "calc(var(--ascent-scale) - var(--cap-height-scale) + var(--line-gap-scale) / 2)",
      "--content-area": "calc(var(--ascent) + var(--line-gap) + var(--absolute-descent))",
      "--descent-scale": "calc(var(--absolute-descent) / var(--units-per-em))",
      "--line-gap-scale": "calc(var(--line-gap) / var(--units-per-em))",
      "--line-height-normal": "calc(var(--line-height-scale) * var(--font-size))",
      "--line-height-scale": "calc(var(--content-area) / var(--units-per-em))",
      "--specified-line-height-offset": "calc((var(--line-height-normal) - var(--line-height)) / 2)",
    }
  `)
  expect(capsizeBefore).toMatchInlineSnapshot(`
    {
      "content": "",
      "display": "table",
      "margin-bottom": "calc(-1em * var(--cap-height-trim))",
    }
  `)
  expect(capsizeAfter).toMatchInlineSnapshot(`
    {
      "content": "",
      "display": "table",
      "margin-top": "calc(-1em * var(--baseline-trim))",
    }
  `)
})
