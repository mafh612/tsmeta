"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
const identifier_to_string_1 = require("../../lib/utils/identifier.to.string");
const tsmeta_argument_factory_1 = require("./tsmeta.argument.factory");
/**
 * class TsMetaDecoratorFactory
 */
class TsMetaDecoratorFactory {
    constructor() {
        this.tsMetaArgumentFactory = new tsmeta_argument_factory_1.TsMetaArgumentFactory();
    }
    /**
     * build TsDecorator element
     */
    build(decorator) {
        let expression;
        if (typescript_1.isCallExpression(decorator.expression)) {
            expression = decorator.expression;
        }
        else {
            expression = decorator.expression;
        }
        let name;
        let tsarguments;
        if (expression.expression)
            name = identifier_to_string_1.IdentifierToString(expression.expression);
        else
            name = identifier_to_string_1.IdentifierToString(expression);
        if (expression.arguments)
            tsarguments = expression.arguments
                .map((xexpression) => this.tsMetaArgumentFactory.build(xexpression));
        else
            tsarguments = undefined;
        return {
            name,
            tsarguments
        };
    }
}
exports.TsMetaDecoratorFactory = TsMetaDecoratorFactory;
//# sourceMappingURL=tsmeta.decorator.factory.js.map