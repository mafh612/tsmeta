"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_name_to_string_1 = require("../../lib/utils/property.name.to.string");
const tsmeta_decorator_factory_1 = require("./tsmeta.decorator.factory");
const tsmeta_type_factory_1 = require("./tsmeta.type.factory");
/**
 * class TsMetaPropertyFactory
 */
class TsMetaPropertyFactory {
    constructor() {
        this.tsMetaTypeFactory = new tsmeta_type_factory_1.TsMetaTypeFactory();
        this.tsMetaDecoratorFactory = new tsmeta_decorator_factory_1.TsMetaDecoratorFactory();
    }
    /**
     * build TsProperty element
     */
    build(property) {
        let decorators;
        if (property.decorators) {
            decorators = property.decorators.map((decorator) => this.tsMetaDecoratorFactory.build(decorator));
        }
        const name = property_name_to_string_1.PropertyNameToString(property.name);
        const tstype = this.tsMetaTypeFactory.build(property.type);
        return {
            decorators,
            name,
            tstype
        };
    }
}
exports.TsMetaPropertyFactory = TsMetaPropertyFactory;
//# sourceMappingURL=tsmeta.property.factory.js.map