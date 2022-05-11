const capsizePlugin = require('../../dist/index')
const inter = require('@capsizecss/metrics/inter')

module.exports = {
  content: ['./tests/fixtures/index.html'],
  theme: {
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
