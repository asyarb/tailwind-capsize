import { z } from 'zod'

export const FontMetrics = z.object({
  capHeight: z.number(),
  ascent: z.number(),
  descent: z.number(),
  lineGap: z.number(),
  unitsPerEm: z.number(),
  xHeight: z.number(),
})
export type FontMetrics = z.infer<typeof FontMetrics>

export const FontFamilies = z.record(z.union([z.string(), z.array(z.string())]))
export type FontFamilies = z.infer<typeof FontFamilies>

export const Config = z.object({
  metrics: z.record(FontMetrics),
})
export type Config = z.infer<typeof Config>

export const Options = z.object({
  baseFontSize: z.number().default(16),
  className: z.string().default('capsize'),
})
export type Options = z.infer<typeof Options>
