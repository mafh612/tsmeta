import { Identifier } from 'typescript'

/**
 * extract text from identifier
 * @param identifier<Identifier>
 */
const identifierToString: (identifier: Identifier) => string
  = (identifier: Identifier): string => identifier.escapedText ? identifier.escapedText.toString() : ''

export {
  identifierToString as IdentifierToString
}
