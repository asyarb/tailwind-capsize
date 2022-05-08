import cssToJson from 'css2json'
import { expect, test } from 'vitest'
import { runTailwind } from './_testUtils'

test('it adds line height CSS vars to existing `leading-` utilities', async () => {
  const css = cssToJson(await runTailwind())
  const leadingNone = css['.leading-none']

  expect(leadingNone).toEqual({
    '--line-height': '1',
    'line-height': 'var(--line-height)',
  })
})

test.skip('supports arbitrary values', async () => {
  const css = cssToJson(await runTailwind())
  const leading1_5 = css['.leading-\\[1px\\]']
  console.log(css)

  expect(leading1_5).toEqual({
    '--line-height': '1.5',
    'line-height': 'var(--line-height)',
  })
})
