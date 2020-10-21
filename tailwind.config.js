module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: ['./tests/fixtures/index.html'],
  theme: {
    fontSize: {
      base: '1rem',
      another: 24,
    },
    lineHeight: {
      solid: 1,
    },
    fontFamily: {
      sans: "'Inter var', system-ui",
    },

    capsize: [
      {
        fontFamily: 'sans',
        fontMetrics: {
          capHeight: 2048,
          ascent: 2728,
          descent: -680,
          lineGap: 0,
          unitsPerEm: 2816,
        },
      },
    ],

    extend: {},
  },
  variants: {},
  plugins: [require('./')],
}
