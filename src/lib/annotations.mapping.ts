/**
 * function annoationsMapping
 */
let annoationsMapping: { [key: string]: string } = {}

/**
 * get mapped annotation
 */
const getMappedAnnotation: ((mapped: string) => string) = (mapped: string): string => {
  return Object.keys(annoationsMapping).find((key: string) => annoationsMapping[key] === mapped) || mapped
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
