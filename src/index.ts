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
      const styles = {
        ...capsize({
          fontSize: fontSet.fontSize,
          leading: fontSet.leading,
          fontMetrics: set.fontMetrics,
        }),
        fontFamily: theme(`fontFamily.${set.fontFamily}`),
      }

      const className = e(`${set.fontFamily}-${fontSet.fontSize}`)
      const utilities = {
        [`.${className}`]: styles,
      }

      addUtilities(utilities, ['responsive'])
    })
  })
})
