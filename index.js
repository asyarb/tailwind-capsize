const plugin = require('tailwindcss/plugin')
const { default: capsize } = require('capsize')
const { mapValues, forEach, isNumber, isString, parseInt } = require('lodash')

// GIven a pixel value, provides the rem equivalent.
function convertPxStringToRem(pxString, remSize = 16) {
  return `${parseInt(pxString) / remSize}rem`
}

// Generates the capsize styles in a tailwind-compatible format.
// Converts the pixel based ouput into rems for a11y reasons.
function twCapsize(capsizeArgs) {
  const styles = capsize(capsizeArgs)

  styles.fontSize = convertPxStringToRem(styles.fontSize)
  styles.lineHeight = convertPxStringToRem(styles.lineHeight)

  styles['&::before'] = styles['::before']
  styles['&::after'] = styles['::after']
  delete styles['::before']
  delete styles['::after']

  return styles
}

// Maps the theme font sizes to pixel based values.
// Throws an error if a non-pixel or rem based value is provided e.g. vw, %, etc.
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

// Validates the lineHeight object to ensure that it only contains relative values.
function validateLineHeights(lineHeights) {
  forEach(lineHeights, (lineHeight) => {
    if (!isNumber(lineHeight))
      throw new Error(
        'tailwind-capsize received invalid lineHeight value. Please use a relative plain number.'
      )
  })
}

module.exports = plugin(({ addUtilities, theme, e }) => {
  const capsizeSets = theme('capsize', [])
  const fontSizes = mapFontSizesToPx(theme('fontSize', {}))

  const lineHeights = theme('lineHeight', {})
  validateLineHeights(lineHeights)

  // Iterate over every fontSize and lineHeight and generate a set of capsize
  // styles.
  forEach(capsizeSets, (capsizeSet) => {
    forEach(fontSizes, (fontSize, fontSizeKey) => {
      forEach(lineHeights, (lineHeight, lineHeightKey) => {
        const fontFamily = theme(`fontFamily.${capsizeSet.fontFamily}`)

        const styles = twCapsize({
          fontMetrics: capsizeSet.fontMetrics,
          leading: lineHeight * fontSize,
          fontSize,
        })
        // .sans-base-solid
        const className = e(
          `${capsizeSet.fontFamily}-${fontSizeKey}-${lineHeightKey}`
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
