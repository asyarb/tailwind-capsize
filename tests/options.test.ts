import { expect, test, vi } from 'vitest'

import { runTailwind } from './_testUtils'
import { Options } from '../src/validators'
import { ZodError } from 'zod'

test('allows customization', async () => {
  const spy = vi.spyOn(Options, 'parse')
  const options: Options = {
    baseFontSize: 10,
    className: 'trim',
  }

  await runTailwind({ options })

  expect(spy).toHaveBeenCalledWith(options)
})

test('throws if provided invalid customization options', async () => {
  await expect(
    //@ts-expect-error - Testing runtime throwing.
    runTailwind({ options: { baseFontSize: '10' } })
  ).rejects.toThrowError(ZodError)

  await expect(
    //@ts-expect-error - Testing runtime throwing.
    runTailwind({ options: { className: 100 } })
  ).rejects.toThrowError(ZodError)
})
