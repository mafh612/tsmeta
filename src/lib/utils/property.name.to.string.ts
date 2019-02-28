import { Identifier, PropertyName } from 'typescript'

/**
 * extract text from token
 * @param propertyName<PropertyName>
 */
const propertyNameToString: ((propertyName: PropertyName) => string)
  = (propertyName: PropertyName): string => (propertyName as Identifier).text

export {
  propertyNameToString as PropertyNameToString
}
