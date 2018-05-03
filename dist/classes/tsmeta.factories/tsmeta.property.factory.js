"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_methods_1 = require("../../lib/ts.methods");
/**
 * class TsMetaPropertyFactory
 */
class TsMetaPropertyFactory {
    /**
     * build TsProperty element
     * @param propertyDeclaration
     */
    build(propertyDeclaration) {
        const name = ts_methods_1.PropertyNameToString(propertyDeclaration.name);
        const tstype = undefined;
        return {
            name,
            tstype
        };
    }
}
exports.TsMetaPropertyFactory = TsMetaPropertyFactory;
