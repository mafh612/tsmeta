"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
const object_literal_expression_to_string_1 = require("./object.literal.expression.to.string");
const token_to_string_1 = require("./token.to.string");
/**
 * extract text from initializer
 * @param initializer<Identifier>
 */
const initializerToString = (initializer) => {
    switch (initializer.kind) {
        case typescript_1.SyntaxKind.StringLiteral: return token_to_string_1.TokenToString(initializer);
        case typescript_1.SyntaxKind.NumericLiteral: return +token_to_string_1.TokenToString(initializer);
        case typescript_1.SyntaxKind.TrueKeyword: return true;
        case typescript_1.SyntaxKind.FalseKeyword: return false;
        case typescript_1.SyntaxKind.ObjectLiteralExpression: return object_literal_expression_to_string_1.ObjectLiteralExpressionToString(initializer);
        default: return token_to_string_1.TokenToString(initializer);
    }
};
exports.InitializerToString = initializerToString;
//# sourceMappingURL=initializer.to.string.js.map