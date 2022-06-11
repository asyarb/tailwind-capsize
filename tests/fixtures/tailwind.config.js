const capsizePlugin = require('../../dist/index')
const defaultTheme = require('tailwindcss/defaultTheme')
const inter = require('@capsizecss/metrics/inter')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./tests/fixtures/index.html'],
  theme: {
    screens: {
      base: '360px',
      ...defaultTheme.screens,
    },

    fontFamily: {
      sans: ['Inter var', 'system-ui'],
    },

    capsize: {
      metrics: {
        sans: inter,
      },
    },
  },
  plugins: [capsizePlugin.default],
}
