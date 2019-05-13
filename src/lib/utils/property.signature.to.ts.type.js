"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_types_enum_1 = require("../enums/typescript.types.enum");
const tstype_class_1 = require("../tstype.class");
const identifier_to_string_1 = require("./identifier.to.string");
const type_node_to_ts_type_1 = require("./type.node.to.ts.type");
/**
 * extract TsType from PropertySignature
 */
const propertySignaturToTsType = (propertySignature) => {
    const tsType = new tstype_class_1.TsTypeClass({ basicType: 'key', typescriptType: typescript_types_enum_1.TypescriptTypes.MAP });
    tsType.keyType = identifier_to_string_1.IdentifierToString(propertySignature.name);
    tsType.valueType = type_node_to_ts_type_1.TypeNodeToTsType(propertySignature.type).basicType;
    return tsType;
};
exports.PropertySignaturToTsType = propertySignaturToTsType;
//# sourceMappingURL=property.signature.to.ts.type.js.map