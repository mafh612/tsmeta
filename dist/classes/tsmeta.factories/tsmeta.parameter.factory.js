"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_methods_1 = require("../../lib/ts.methods");
const tsmeta_decorator_factory_1 = require("./tsmeta.decorator.factory");
/**
 * class TsMetaParameterFactory
 */
class TsMetaParameterFactory {
    constructor() {
        this.tsMetaDecoratorFactory = new tsmeta_decorator_factory_1.TsMetaDecoratorFactory();
    }
    /**
     * build TsParameter element
     */
    build(parameterDeclaration) {
        const name = ts_methods_1.IdentifierToString(parameterDeclaration.name);
        const decorators = parameterDeclaration.decorators
            ? parameterDeclaration.decorators.map((decorator) => this.tsMetaDecoratorFactory.build(decorator))
            : undefined;
        const tstype = undefined;
        return {
            decorators,
            name,
            tstype
        };
    }
}
exports.TsMetaParameterFactory = TsMetaParameterFactory;
