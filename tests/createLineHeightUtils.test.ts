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
