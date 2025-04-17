export const byDate = <T>(getProperty: (item: T) => string | number | Date, order: 'ASCENDING' | 'DESCENDING') => (a: T, b: T) => {
  const dateA = new Date(getProperty(a)).getTime()
  const dateB = new Date(getProperty(b)).getTime()

  return order === 'ASCENDING' ? dateA - dateB : dateB - dateA;
}