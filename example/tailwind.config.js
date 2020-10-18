const plugin = require('tailwindcss/plugin')
const { default: capsize } = require('capsize')

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
        ],
      },
    ],
    fontFamily: {
      sans: "'Inter var', system-ui",
    },

    extend: {},
  },
  variants: {},
  plugins: [
    plugin(({ addUtilities, theme, e }) => {
      const capsizeSets = theme('capsize')

      capsizeSets.forEach((set) => {
        set.fontSets.forEach((fontSet) => {
          const styles = capsize({
            fontSize: fontSet.fontSize,
            leading: fontSet.leading,
            fontMetrics: set.fontMetrics,
          })
          styles['&::before'] = styles['::before']
          styles['&::after'] = styles['::after']
          delete styles['::before']
          delete styles['::after']

          const className = e(`${set.fontFamily}-${fontSet.fontSize}`)

          const utilities = {
            [`.${className}`]: {
              fontFamily: theme(`fontFamily.${set.fontFamily}`),
              ...styles,
            },
          }

          addUtilities(utilities, ['responsive'])
        })
      })
    }),
  ],
}
