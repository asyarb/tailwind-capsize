const plugin = require('tailwindcss/plugin')
const { default: capsize } = require('capsize')
const { mapValues, forEach, isNumber, isString, parseInt } = require('lodash')

// TODO: Map pixels to rems
function twCapsize(capsizeArgs) {
  const styles = capsize(capsizeArgs)

  styles['&::before'] = styles['::before']
  styles['&::after'] = styles['::after']
  delete styles['::before']
  delete styles['::after']

  return styles
}

// Only support REMS and pixels
function mapFontSizesToPx(fontSizes) {
  return mapValues(fontSizes, (fontSize) => {
    // px value
    if (isNumber(fontSize)) return fontSize

    // rem value
    if (isString(fontSize) && fontSize.includes('rem')) {
      return parseInt(fontSize) * 16
    }

    throw new Error(
      'tailwind-capsize received invalid CSS unit for a font-size. Please use a plain number for pixel values or rems.'
    )
  })
}

function mapLineHeightsToPx(lineHeights) {
  return mapValues(lineHeights, (lineHeight) => {
    if (!isNumber(lineHeight))
      throw new Error(
        'tailwind-capsize received invalid lineHeight value. Please use a relative plain number.'
      )

    return lineHeight * 16
  })
}

module.exports = plugin(({ addUtilities, theme, e }) => {
  const capsizeSets = theme('capsize', [])
  const fontSizes = mapFontSizesToPx(theme('fontSize', {}))
  const lineHeights = mapLineHeightsToPx(theme('lineHeight', {}))

  console.log(lineHeights)
  console.log(fontSizes)

  // Iterate over every fontSize and lineHeight and generate a set of capsize
  // styles.
  forEach(capsizeSets, (capsizeSet) => {
    forEach(fontSizes, (fontSize) => {
      forEach(lineHeights, (lineHeight) => {
        const fontFamily = theme(`fontFamily.${capsizeSet.fontFamily}`)

        const styles = twCapsize({
          fontMetrics: capsizeSet.fontMetrics,
          leading: lineHeight,
          fontSize,
        })
        // .sans-base-solid
        const className = e(
          `${capsizeSet.fontFamily}-${fontSize}-${lineHeight}`
        )

        const utilities = {
          [`.${className}`]: {
            fontFamily,
            ...styles,
          },
        }

        addUtilities(utilities, ['responsive'])
      })
    })
  })
})
