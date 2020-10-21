const fs = require('fs/promises')
const path = require('path')
const postcss = require('postcss')
const { test } = require('uvu')
const assert = require('uvu/assert')

// Ensures that we purge.
process.env.NODE_ENV = 'production'

test('it works', async () => {
  const css = await fs.readFile(path.resolve(__dirname, './fixtures/index.css'))
  await postcss([require('tailwindcss')]).process(css, {
    from: './fixtures/index.css',
    to: './fixtures/result.css',
  })

  assert.is(true, true)
})

test.run()
