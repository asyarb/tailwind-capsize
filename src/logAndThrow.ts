export const logAndThrow = (err: unknown) => {
  if (err instanceof Error) {
    throw err
  }

  if (typeof err === 'string') {
    throw new Error(err)
  }

  console.error(err)
  throw new Error('An unknown error occurred.')
}
