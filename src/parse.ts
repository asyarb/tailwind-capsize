import { z } from 'zod'
import { Result } from '@swan-io/boxed'

export const parseBoxed = <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): Result<z.infer<T>, z.ZodError> =>
  Result.fromExecution(() => schema.parse(data))
