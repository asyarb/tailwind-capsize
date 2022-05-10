import cssToJson from 'css2json'
import { expect, test } from 'vitest'
import { runTailwind } from './_testUtils'

test('it adds correct styles to :root', async () => {
  const css = cssToJson(await runTailwind())
  const root = css[':root']

  expect(root).toMatchInlineSnapshot(`
    {
      "--root-font-size": "16",
      "--root-line-height": "1.2",
      "font-size": "16",
      "line-height": "1.2",
    }
  `)
})

test('it supports customization :root', async () => {
  const css = cssToJson(
    await runTailwind({ options: { rootFontSize: 10, rootLineHeight: 1.5 } })
  )
  const root = css[':root']

  expect(root).toMatchInlineSnapshot(`
    {
      "--root-font-size": "10",
      "--root-line-height": "1.5",
      "font-size": "10",
      "line-height": "1.5",
    }
  `)
})
