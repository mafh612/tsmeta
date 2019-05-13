"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_name_to_string_1 = require("../../lib/utils/property.name.to.string");
const tsmeta_decorator_factory_1 = require("./tsmeta.decorator.factory");
const tsmeta_parameter_factory_1 = require("./tsmeta.parameter.factory");
const tsmeta_type_factory_1 = require("./tsmeta.type.factory");
/**
 * class TsMetaMethodFactory
 */
class TsMetaMethodFactory {
    constructor() {
        this.tsMetaDecoratorFactory = new tsmeta_decorator_factory_1.TsMetaDecoratorFactory();
        this.tsMetaParameterFactory = new tsmeta_parameter_factory_1.TsMetaParameterFactory();
        this.tsMetaTypeFactory = new tsmeta_type_factory_1.TsMetaTypeFactory();
    }
    /**
     * build TsMethod element
     */
    build(method) {
        const name = property_name_to_string_1.PropertyNameToString(method.name);
        const decorators = method.decorators
            ? method.decorators.map((decorator) => this.tsMetaDecoratorFactory.build(decorator))
            : undefined;
        const parameters = method.parameters
            ? method.parameters.map((parameterDeclaration) => this.tsMetaParameterFactory.build(parameterDeclaration))
            : undefined;
        const tstype = this.tsMetaTypeFactory.build(method.type);
        return {
            decorators,
            name,
            parameters,
            tstype
        };
    }
}
exports.TsMetaMethodFactory = TsMetaMethodFactory;
//# sourceMappingURL=tsmeta.method.factory.js.map