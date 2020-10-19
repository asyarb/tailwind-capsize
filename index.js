const plugin = require('tailwindcss/plugin')
const { default: capsize } = require('capsize')

module.exports = plugin(({ addUtilities, theme, e }) => {
  const capsizeSets = theme('capsize') || []

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
})
