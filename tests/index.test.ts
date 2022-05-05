import * as fs from 'fs/promises'
import * as path from 'path'
import postcss from 'postcss'
import { test } from 'vitest'

test('it works', async () => {
  const cssFixture = await fs.readFile(
    path.resolve(__dirname, './fixtures/index.css')
  )

  const result = await postcss([require('tailwindcss')]).process(cssFixture, {
    from: undefined,
  })
})
