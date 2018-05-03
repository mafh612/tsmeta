import { CompilerOptions, Expression, Identifier, ObjectLiteralExpression, Program, PropertyName } from 'typescript';
/**
 * create typescript program file from rootNames
 * @param rootNames
 * @param compilerOptions
 */
declare const createTypescriptProgram: ((rootNames: ReadonlyArray<string>, compilerOptions: CompilerOptions) => Program);
/**
 * extract text from token
 * @param token<Identifier>
 */
declare const tokenToString: ((token: Identifier) => string);
/**
 * extract text from identifier
 * @param identifier<Identifier>
 */
declare const identifierToString: ((identifier: Identifier) => string);
/**
 * extract text from initializer
 * @param initializer<Identifier>
 */
declare const initializerToString: ((initializer: Expression) => string | number | boolean);
/**
 * extract text from token
 * @param propertyName<PropertyName>
 */
declare const propertyNameToString: ((propertyName: PropertyName) => string);
/**
 * extract text from ObjectLiteralExpression
 * @param expression<ObjectLiteralExpression>
 */
declare const objectLiteralExpressionToString: ((expression: ObjectLiteralExpression) => any);
/**
 * extract text from token
 * @param identifier<Identifier>
 */
declare const expressionToString: ((expression: Expression) => string);
export { createTypescriptProgram as CreateTypescriptProgram, expressionToString as ExpressionToString, identifierToString as IdentifierToString, initializerToString as InitializerToString, objectLiteralExpressionToString as ObjectLiteralExpressionToString, propertyNameToString as PropertyNameToString, tokenToString as TokenToString };
