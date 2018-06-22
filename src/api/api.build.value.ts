/**
 * build value by literal types
 */
const buildValue: (propertyType: string) => boolean|number|string = (propertyType: string): boolean|number|string => {
  switch (propertyType) {
    case 'boolean': return true
    case 'number': return 1
    case 'string': return 'string'
    default: return undefined
  }
}

export { buildValue as BuildValue }
