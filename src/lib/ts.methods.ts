// tslint:disable no-use-before-declare
import {
  CompilerOptions,
  createProgram as CreateProgram,
  Expression,
  Identifier,
  ObjectLiteralExpression,
  Program,
  PropertyAssignment,
  PropertyName,
  SyntaxKind
} from 'typescript'

/**
 * create typescript program file from rootNames
 * @param rootNames
 * @param compilerOptions
 */
const createTypescriptProgram: ((rootNames: ReadonlyArray<string>, compilerOptions: CompilerOptions) => Program) = CreateProgram

/**
 * extract text from token
 * @param token<Identifier>
 */
const tokenToString: ((token: Identifier) => string) = (token: Identifier): string => token.text

/**
 * extract text from identifier
 * @param identifier<Identifier>
 */
const identifierToString: ((identifier: Identifier) => string) = (identifier: Identifier): string => identifier.escapedText.toString()

/**
 * extract text from initializer
 * @param initializer<Identifier>
 */
const initializerToString: ((initializer: Expression) => string|number|boolean) = (initializer: Expression): string|number|boolean => {
  switch (initializer.kind) {
    case SyntaxKind.StringLiteral: return tokenToString(<Identifier> initializer)
    case SyntaxKind.NumericLiteral: return +tokenToString(<Identifier> initializer)
    case SyntaxKind.TrueKeyword: return true
    case SyntaxKind.FalseKeyword: return false
    case SyntaxKind.ObjectLiteralExpression: return objectLiteralExpressionToString(<ObjectLiteralExpression> initializer)
    default: return tokenToString(<Identifier> initializer)
  }
}

/**
 * extract text from token
 * @param propertyName<PropertyName>
 */
const propertyNameToString: ((propertyName: PropertyName) => string)
  = (propertyName: PropertyName): string => (<Identifier> propertyName).text

/**
 * extract text from ObjectLiteralExpression
 * @param expression<ObjectLiteralExpression>
 */
const objectLiteralExpressionToString: ((expression: ObjectLiteralExpression) => any)
  = (expression: ObjectLiteralExpression): any => {
    const obj: {} = {}
    expression.properties.forEach((propertyAssignment: PropertyAssignment): any => {
      obj[identifierToString(<Identifier> propertyAssignment.name)] = initializerToString(propertyAssignment.initializer)
    })

    return obj
  }

/**
 * extract text from token
 * @param identifier<Identifier>
 */
const expressionToString: ((expression: Expression) => string) = (expression: Expression): string => (<Identifier> expression).text

export {
  createTypescriptProgram as CreateTypescriptProgram,
  expressionToString as ExpressionToString,
  identifierToString as IdentifierToString,
  initializerToString as InitializerToString,
  objectLiteralExpressionToString as ObjectLiteralExpressionToString,
  propertyNameToString as PropertyNameToString,
  tokenToString as TokenToString
}
