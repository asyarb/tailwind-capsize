import cssToJson from 'css2json'
import { expect, test } from 'vitest'
import { runTailwind } from './_testUtils'

test('it adds font size CSS vars to existing `text-` utilities', async () => {
  const css = cssToJson(await runTailwind())
  const textLg = css['.text-lg']

  expect(textLg).toMatchInlineSnapshot(`
    {
      "--font-size": "18",
      "font-size": "calc((var(--font-size) / var(--root-font-size)) * 1rem)",
    }
  `)
})

test('supports arbitrary values', async () => {
  const css = cssToJson(await runTailwind())
  const text20 = css['.text-\\[20\\]']

  expect(text20).toMatchInlineSnapshot(`
    {
      "--font-size": "20",
      "font-size": "calc((var(--font-size) / var(--root-font-size)) * 1rem)",
    }
  `)
})
