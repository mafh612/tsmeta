import { Expression, Identifier } from 'typescript'

/**
 * extract text from token
 * @param identifier<Identifier>
 */
const expressionToString: (expression: Expression) => string = (expression: Expression): string =>
  (expression as Identifier).text

export { expressionToString as ExpressionToString }
