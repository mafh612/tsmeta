"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
const ts_methods_1 = require("../../lib/ts.methods");
/**
 * class TsMetaArgumentFactory
 */
class TsMetaArgumentFactory {
    /**
     * build TsArgument element
     */
    build(expression) {
        let representation;
        switch (expression.kind) {
            case typescript_1.SyntaxKind.NumericLiteral:
                representation = ts_methods_1.ExpressionToString(expression);
                break;
            case typescript_1.SyntaxKind.StringLiteral:
                representation = ts_methods_1.ExpressionToString(expression);
                break;
            case typescript_1.SyntaxKind.ObjectLiteralExpression:
                representation = ts_methods_1.ObjectLiteralExpressionToString(expression);
                break;
            default:
        }
        const tstype = undefined;
        return {
            representation,
            tstype
        };
    }
}
exports.TsMetaArgumentFactory = TsMetaArgumentFactory;
