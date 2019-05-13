"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
const identifier_to_string_1 = require("../../lib/utils/identifier.to.string");
const tsmeta_method_factory_1 = require("./tsmeta.method.factory");
const tsmeta_property_factory_1 = require("./tsmeta.property.factory");
/**
 * class TsMetaMainFactory
 */
class TsMetaMainFactory {
    constructor() {
        this.tsMetaMethodFactory = new tsmeta_method_factory_1.TsMetaMethodFactory();
        this.tsMetaPropertyFactory = new tsmeta_property_factory_1.TsMetaPropertyFactory();
    }
    /**
     * build TsClass element
     */
    build(declaration) {
        const name = identifier_to_string_1.IdentifierToString(declaration.name);
        const methods = [];
        const properties = [];
        declaration.members.forEach((typeElement) => {
            if (typescript_1.isMethodSignature(typeElement))
                methods.push(this.tsMetaMethodFactory.build(typeElement));
            if (typescript_1.isPropertySignature(typeElement))
                properties.push(this.tsMetaPropertyFactory.build(typeElement));
        });
        return {
            methods,
            name,
            properties
        };
    }
}
exports.TsMetaMainFactory = TsMetaMainFactory;
//# sourceMappingURL=tsmeta.main.factory.js.map