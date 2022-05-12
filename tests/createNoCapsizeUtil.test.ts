import cssToJson from 'css2json'
import { expect, test } from 'vitest'
import { runTailwind } from './_testUtils'

test('it creates the `no-capsize` utility', async () => {
  const css = cssToJson(await runTailwind())

  const noCapsizeBefore = css['.no-capsize::before']
  const noCapsizeAfter = css['.no-capsize::after']

  expect(noCapsizeBefore).toMatchInlineSnapshot(`
    {
      "content": "none",
    }
  `)
  expect(noCapsizeAfter).toMatchInlineSnapshot(`
    {
      "content": "none",
    }
  `)
})
