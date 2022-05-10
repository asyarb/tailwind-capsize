import { expect, test } from 'vitest'
import { runTailwind } from './_testUtils'

test('throws if provided invalid customization options', async () => {
  const config: any = { options: { baseFontSize: '10' } }
  await expect(runTailwind(config)).rejects.toThrowError()

  const config2: any = { options: { className: 100 } }
  await expect(runTailwind(config2)).rejects.toThrowError()
})
