import plugin from 'tailwindcss/plugin'
import { z } from 'zod'

const Config = z.object({
  baseFontSize: z.number().default(16),
})

const tailwindCapsize = plugin(({ addUtilities, theme, e }) => {
  const config = theme('capsize', {})
})

export default tailwindCapsize
