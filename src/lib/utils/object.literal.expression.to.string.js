"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const source_file_container_1 = require("../source.file.container");
const evaluate_1 = require("./evaluate");
const identifier_to_string_1 = require("./identifier.to.string");
const initializer_to_string_1 = require("./initializer.to.string");
/**
 * extract text from ObjectLiteralExpression
 * @param expression<ObjectLiteralExpression>
 */
const objectLiteralExpressionToString = (expression) => {
    const expressionString = expression.getFullText(source_file_container_1.getSourceFile());
    let obj = {};
    try {
        obj = evaluate_1.Evaluate(expressionString);
    }
    catch (_a) {
        expression.properties.forEach((propertyAssignment) => {
            obj[identifier_to_string_1.IdentifierToString(propertyAssignment.name)] = initializer_to_string_1.InitializerToString(propertyAssignment.initializer);
        });
    }
    return obj;
};
exports.ObjectLiteralExpressionToString = objectLiteralExpressionToString;
//# sourceMappingURL=object.literal.expression.to.string.js.map