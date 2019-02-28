import { Expression, Identifier, ObjectLiteralExpression, SyntaxKind } from 'typescript'
import { ObjectLiteralExpressionToString } from './object.literal.expression.to.string'
import { TokenToString } from './token.to.string'

/**
 * extract text from initializer
 * @param initializer<Identifier>
 */
const initializerToString: ((initializer: Expression) => string|number|boolean)
  = (initializer: Expression): string|number|boolean => {
    switch (initializer.kind) {
      case SyntaxKind.StringLiteral: return TokenToString(initializer as Identifier)
      case SyntaxKind.NumericLiteral: return +TokenToString(initializer as Identifier)
      case SyntaxKind.TrueKeyword: return true
      case SyntaxKind.FalseKeyword: return false
      case SyntaxKind.ObjectLiteralExpression: return ObjectLiteralExpressionToString(initializer as ObjectLiteralExpression)
      default: return TokenToString(initializer as Identifier)
    }
}

export {
  initializerToString as InitializerToString
}
