import { z } from 'zod'

export const ThemeValue = z.union([z.number(), z.string()])
export type ThemeValue = z.infer<typeof ThemeValue>
export const FontSizeValue = z.union([
  ThemeValue,
  z.tuple([ThemeValue, ThemeValue]),
  z.tuple([
    ThemeValue,
    z.object({
      lineHeight: ThemeValue.optional(),
      letterSpacing: ThemeValue.optional(),
    }),
  ]),
])
export type FontSizeValue = z.infer<typeof FontSizeValue>

const FontMetrics = z.object({
  capHeight: z.number(),
  ascent: z.number(),
  descent: z.number(),
  lineGap: z.number(),
  unitsPerEm: z.number(),
  xHeight: z.number(),
})
const FontSize = z.record(FontSizeValue)
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
    rootFontSize: z.number().default(16),
    className: z.string().default('capsize'),
  })
  .default({
    rootFontSize: 16,
    className: 'capsize',
  })
export type Options = z.infer<typeof Options>
