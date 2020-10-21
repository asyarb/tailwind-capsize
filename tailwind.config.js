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
    },
    lineHeight: {
      solid: 1,
    },
    fontFamily: {
      sans: "'Inter var', system-ui",
    },

    capsize: {
      remFontSize: 16,
      fontFamilies: {
        sans: {
          capHeight: 2048,
          ascent: 2728,
          descent: -680,
          lineGap: 0,
          unitsPerEm: 2816,
        },
      },
    },

    extend: {},
  },
  variants: {},
  plugins: [require('./')],
}
