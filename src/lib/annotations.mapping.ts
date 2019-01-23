/**
 * function annoationsMapping
 */
let annoationsMapping: { [key: string]: string } = {}

/**
 * get mapped annotation
 */
const getMappedAnnotation: ((map: string) => string) = (map: string): string => {
  return annoationsMapping && annoationsMapping[map] || map
}

/**
 * set annoation mapping
 */
const setAnnoationsMapping: ((mapping: { [key: string]: string }) => void) = (mapping: { [key: string]: string }): void => {
  annoationsMapping = mapping
}

export {
  getMappedAnnotation as GetMappedAnnotation,
  setAnnoationsMapping as SetAnnoationsMapping
}
