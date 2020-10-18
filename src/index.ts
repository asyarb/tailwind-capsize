import plugin from 'tailwindcss/plugin'
import capsize, { FontMetrics } from 'capsize'

interface FontSet {
  fontSize: number
  leading: number
}

interface CapsizeSet {
  fontFamily: string
  fontMetrics: FontMetrics
  fontSets: FontSet[]
}

export default plugin(({ addUtilities, theme, e }) => {
  const capsizeSets: CapsizeSet[] | undefined = theme('capsize')

  capsizeSets?.forEach((set) => {
    set.fontSets.forEach((fontSet) => {
      // TODO: Fix type
      const styles: any = capsize({
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
