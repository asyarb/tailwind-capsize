import { z } from 'zod'
import { Result } from '@swan-io/boxed'

export const parseBoxed = <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): Result<z.infer<T>, string> => {
  const result = schema.safeParse(data)

  if (!result.success) {
    return Result.Error(result.error.message)
  }

  return Result.Ok(result.data)
}
