"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_methods_1 = require("../../lib/ts.methods");
const tsmeta_decorator_factory_1 = require("./tsmeta.decorator.factory");
const tsmeta_parameter_factory_1 = require("./tsmeta.parameter.factory");
/**
 * class TsMetaMethodFactory
 */
class TsMetaMethodFactory {
    constructor() {
        this.tsMetaDecoratorFactory = new tsmeta_decorator_factory_1.TsMetaDecoratorFactory();
        this.tsMetaParameterFactory = new tsmeta_parameter_factory_1.TsMetaParameterFactory();
    }
    /**
     * build TsMethod element
     * @param methodDeclaration
     */
    build(methodDeclaration) {
        const name = ts_methods_1.PropertyNameToString(methodDeclaration.name);
        const decorators = methodDeclaration.decorators
            ? methodDeclaration.decorators.map((decorator) => this.tsMetaDecoratorFactory.build(decorator))
            : undefined;
        const parameters = methodDeclaration.parameters
            ? methodDeclaration.parameters
                .map((parameterDeclaration) => this.tsMetaParameterFactory.build(parameterDeclaration))
            : undefined;
        const tstype = undefined;
        return {
            name,
            decorators,
            parameters,
            tstype
        };
    }
}
exports.TsMetaMethodFactory = TsMetaMethodFactory;
