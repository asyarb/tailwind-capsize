import { z } from 'zod'

const FontMetrics = z.object({
  capHeight: z.number(),
  ascent: z.number(),
  descent: z.number(),
  lineGap: z.number(),
  unitsPerEm: z.number(),
  xHeight: z.number(),
})
const FontSize = z.record(
  z.union([
    z.number(),
    z.string(),
    z.tuple([z.string(), z.string()]),
    z.tuple([
      z.string(),
      z.object({
        lineHeight: z.string().optional(),
        letterSpacing: z.string().optional(),
      }),
    ]),
  ])
)
const FontFamily = z.record(z.union([z.string(), z.array(z.string())]))
const LineHeight = z.record(z.union([z.string(), z.number()]))
const Capsize = z.object({ metrics: z.record(FontMetrics) })

export const Theme = z.object({
  fontFamily: FontFamily,
  lineHeight: LineHeight,
  fontSize: FontSize,
  capsize: Capsize,
})
export type Theme = z.infer<typeof Theme>

export const Options = z
  .object({
    baseFontSize: z.number().default(16),
    className: z.string().default('capsize'),
  })
  .default({
    baseFontSize: 16,
    className: 'capsize',
  })
export type Options = z.infer<typeof Options>
