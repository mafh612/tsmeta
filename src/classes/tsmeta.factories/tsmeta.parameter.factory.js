"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const identifier_to_string_1 = require("../../lib/utils/identifier.to.string");
const tsmeta_decorator_factory_1 = require("./tsmeta.decorator.factory");
const tsmeta_type_factory_1 = require("./tsmeta.type.factory");
/**
 * class TsMetaParameterFactory
 */
class TsMetaParameterFactory {
    constructor() {
        this.tsMetaTypeFactory = new tsmeta_type_factory_1.TsMetaTypeFactory();
        this.tsMetaDecoratorFactory = new tsmeta_decorator_factory_1.TsMetaDecoratorFactory();
    }
    /**
     * build TsParameter element
     */
    build(parameterDeclaration) {
        const name = identifier_to_string_1.IdentifierToString(parameterDeclaration.name);
        const decorators = parameterDeclaration.decorators
            ? parameterDeclaration.decorators.map((decorator) => this.tsMetaDecoratorFactory.build(decorator))
            : undefined;
        const tstype = this.tsMetaTypeFactory.build(parameterDeclaration.type);
        return {
            decorators,
            name,
            tstype
        };
    }
}
exports.TsMetaParameterFactory = TsMetaParameterFactory;
//# sourceMappingURL=tsmeta.parameter.factory.js.map