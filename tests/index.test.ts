import { describe, expect, test, vi } from 'vitest'
import { runTailwind } from './utils'
import { Options } from '../src/validators'

describe('options', () => {
  test('allows customization', async () => {
    const opts: Options = {
      baseFontSize: 10,
      className: 'trim',
    }
    const spy = vi.spyOn(Options, 'parse')

    await runTailwind(opts)

    expect(spy).toHaveBeenCalledWith(opts)
  })

  test('throws if provided invalid customization options', async () => {
    //@ts-expect-error - Testing runtime throwing.
    await expect(runTailwind({ baseFontSize: '10' })).rejects.toThrowError()

    //@ts-expect-error - Testing runtime throwing.
    await expect(runTailwind({ className: 15 })).rejects.toThrowError()
  })
})

describe.skip('validation', () => {
  test('throws if given invalid plugin options', async () => {
    expect(() => runTailwind()).toThrowError()
  })
})
