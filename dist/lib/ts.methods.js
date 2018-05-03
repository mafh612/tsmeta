"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable no-use-before-declare
const typescript_1 = require("typescript");
/**
 * create typescript program file from rootNames
 * @param rootNames
 * @param compilerOptions
 */
const createTypescriptProgram = typescript_1.createProgram;
exports.CreateTypescriptProgram = createTypescriptProgram;
/**
 * extract text from token
 * @param token<Identifier>
 */
const tokenToString = (token) => token.text;
exports.TokenToString = tokenToString;
/**
 * extract text from identifier
 * @param identifier<Identifier>
 */
const identifierToString = (identifier) => identifier.escapedText.toString();
exports.IdentifierToString = identifierToString;
/**
 * extract text from initializer
 * @param initializer<Identifier>
 */
const initializerToString = (initializer) => {
    switch (initializer.kind) {
        case typescript_1.SyntaxKind.StringLiteral: return tokenToString(initializer);
        case typescript_1.SyntaxKind.NumericLiteral: return +tokenToString(initializer);
        case typescript_1.SyntaxKind.TrueKeyword: return true;
        case typescript_1.SyntaxKind.FalseKeyword: return false;
        case typescript_1.SyntaxKind.ObjectLiteralExpression: return objectLiteralExpressionToString(initializer);
        default: return tokenToString(initializer);
    }
};
exports.InitializerToString = initializerToString;
/**
 * extract text from token
 * @param propertyName<PropertyName>
 */
const propertyNameToString = (propertyName) => propertyName.text;
exports.PropertyNameToString = propertyNameToString;
/**
 * extract text from ObjectLiteralExpression
 * @param expression<ObjectLiteralExpression>
 */
const objectLiteralExpressionToString = (expression) => {
    const obj = {};
    expression.properties.forEach((propertyAssignment) => {
        obj[identifierToString(propertyAssignment.name)] = initializerToString(propertyAssignment.initializer);
    });
    return obj;
};
exports.ObjectLiteralExpressionToString = objectLiteralExpressionToString;
/**
 * extract text from token
 * @param identifier<Identifier>
 */
const expressionToString = (expression) => expression.text;
exports.ExpressionToString = expressionToString;
