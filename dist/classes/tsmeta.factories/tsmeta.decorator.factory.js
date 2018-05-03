"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_methods_1 = require("../../lib/ts.methods");
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
     * @param decorator
     */
    build(decorator) {
        // console.log(JSON.stringify(decorator, undefined, 4)) // tslint:disable-line
        const callExpression = decorator.expression;
        const name = ts_methods_1.IdentifierToString(callExpression.expression);
        const tsarguments = callExpression.arguments.map((expression) => this.tsMetaArgumentFactory.build(expression));
        return {
            name,
            tsarguments
        };
    }
}
exports.TsMetaDecoratorFactory = TsMetaDecoratorFactory;
