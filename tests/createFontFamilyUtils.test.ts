import cssToJson from 'css2json'
import { expect, test } from 'vitest'
import { runTailwind } from './_testUtils'

test('it adds font metrics via CSS vars to existing font utility classes', async () => {
  const css = cssToJson(await runTailwind())
  const fontSansClass = css['.font-sans']

  expect(fontSansClass).toEqual({
    'font-family': 'Inter var, system-ui',
    '--cap-height': '2048',
    '--ascent': '2728',
    '--descent': '-680',
    '--line-gap': '0',
    '--units-per-em': '2816',
    '--x-height': '1536',
  })
})
