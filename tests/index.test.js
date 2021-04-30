const fs = require('fs/promises')
const path = require('path')
const postcss = require('postcss')
const { test } = require('uvu')
const assert = require('uvu/assert')
const cssToJson = require('css2json')

// Ensures that we purge styles.
process.env.NODE_ENV = 'production'

test('it works', async () => {
  const cssFixture = await fs.readFile(
    path.resolve(__dirname, './fixtures/index.css')
  )
  const { css } = await postcss([require('tailwindcss')]).process(cssFixture, {
    from: './fixtures/index.css',
    to: './fixtures/result.css',
  })

  const cssJson = cssToJson(css)

  assert.equal(
    {
      'font-family': "'Inter var', system-ui",
      'font-size': '1rem',
      'line-height': '1rem',
    },
    cssJson['.sans-base-solid']
  )

  assert.equal(
    {
      content: "''",
      'margin-bottom': '-0.1364em',
      display: 'table',
    },
    cssJson['.sans-base-solid::before']
  )

  assert.equal(
    {
      content: "''",
      'margin-top': '-0.1364em',
      display: 'table',
    },
    cssJson['.sans-base-solid::after']
  )
})

test.run()
