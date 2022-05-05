const capsizePlugin = require('./dist/index').default

module.exports = {
  content: ['./tests/fixtures/index.html'],
  theme: {
    fontFamily: {
      sans: ['Inter var', 'system-ui'],
    },

    capsize: {
      metrics: {
        sans: require('@capsizecss/metrics/inter').fontMetrics,
      },
    },

    extend: {},
  },
  variants: {},
  plugins: [capsizePlugin({ baseFontSize: 16, className: 'capsize' })],
}
