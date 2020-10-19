module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: ['./src/**/*.jsx'],
  theme: {
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
        fontSets: [
          {
            fontSize: 16,
            leading: 16 * 1.5,
          },
          { fontSize: 24, leading: 24 * 1.15 },
        ],
      },
    ],
    fontFamily: {
      sans: "'Inter var', system-ui",
    },

    extend: {},
  },
  variants: {},
  plugins: [require('@asyarb/tailwind-capsize')],
}
