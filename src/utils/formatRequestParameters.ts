export const formatRequestParameters = (
  params: { [s: string]: unknown } | ArrayLike<unknown>,
): string => {
  const queryString = Object.entries(params)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  return queryString ? `?${queryString}` : ''
}
