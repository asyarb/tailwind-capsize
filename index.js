const plugin = require('tailwindcss/plugin')
const { default: capsize } = require('capsize')
const { mapValues, forEach, isNumber, isString, parseInt } = require('lodash')

// GIven a pixel value, provides the rem equivalent.
function convertPxStringToRem(pxString, remSize = 16) {
  return `${parseInt(pxString) / remSize}rem`
}

// Generates the capsize styles in a tailwind-compatible format.
// Converts the pixel based ouput into rems for a11y reasons.
function twCapsize(capsizeArgs, remFontSize = 16) {
  const styles = capsize(capsizeArgs)

  styles.fontSize = convertPxStringToRem(styles.fontSize, remFontSize)
  styles.lineHeight = convertPxStringToRem(styles.lineHeight, remFontSize)

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
  const config = theme('capsize', {})
  const baseFontSize = config.remFontSize

  const fontSizes = mapFontSizesToPx(theme('fontSize', {}))
  const lineHeights = theme('lineHeight', {})
  validateLineHeights(lineHeights)

  // Iterate over every fontSize and lineHeight and generate a set of capsize
  // styles.
  forEach(config.fontFamilies, (fontMetrics, fontFamilyKey) => {
    forEach(fontSizes, (fontSize, fontSizeKey) => {
      forEach(lineHeights, (lineHeight, lineHeightKey) => {
        // TODO: Throw if this is not defined in the fontFamily key.
        const fontFamily = theme(`fontFamily.${fontFamilyKey}`)

        const styles = twCapsize(
          {
            fontMetrics,
            fontSize,
            leading: lineHeight * fontSize,
          },
          baseFontSize
        )
        const className = e(`${fontFamilyKey}-${fontSizeKey}-${lineHeightKey}`)

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
