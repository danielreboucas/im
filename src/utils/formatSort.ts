export const formatSortOrder = (order: number | null | undefined): string | undefined => {
  if (order === null || order === undefined) return undefined
  return order === 1 ? 'asc' : 'desc'
}
