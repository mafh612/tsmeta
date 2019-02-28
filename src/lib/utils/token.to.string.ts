import { Identifier } from 'typescript'
/**
 * extract text from token
 * @param token<Identifier>
 */
const tokenToString: ((token: Identifier) => string) = (token: Identifier): string => token.text

export {
  tokenToString as TokenToString
}
