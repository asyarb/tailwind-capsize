import { expect, test } from 'vitest'
import { runTailwind } from './_testUtils'

test('throws if invalid config', async () => {
  const missing = { capsize: undefined }
  const invalid = { capsize: { metrics: { sans: { capHight: 100 } } } }

  await expect(runTailwind({ theme: missing })).rejects.toThrowError()
  await expect(runTailwind({ theme: invalid })).rejects.toThrowError()
})

test('throws if "capsize.metrics[keys]" do not match "fontFamily[keys]"', async () => {
  const mismatch = {
    fontFamily: {
      sans: ['Inter', 'system-ui'],
    },

    capsize: {
      metrics: {
        serif: {
          capHeight: 1,
          ascent: 1,
          descent: 1,
          lineGap: 1,
          unitsPerEm: 1,
          xHeight: 1,
        },
      },
    },
  }

  await expect(runTailwind({ theme: mismatch })).rejects.toThrowError(Error)
})

test('runs with valid config', async () => {
  await expect(runTailwind()).resolves.toBeTruthy()
})
