"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_types_enum_1 = require("../enums/typescript.types.enum");
const tstype_class_1 = require("../tstype.class");
const type_node_to_ts_type_1 = require("./type.node.to.ts.type");
/**
 * extract TsType from IndexSignature
 */
const indexSignaturToTsType = (indexSignature) => {
    const tsType = new tstype_class_1.TsTypeClass({ basicType: 'key', typescriptType: typescript_types_enum_1.TypescriptTypes.MAP });
    tsType.keyType = type_node_to_ts_type_1.TypeNodeToTsType(indexSignature.parameters[0].type).basicType;
    tsType.valueType = type_node_to_ts_type_1.TypeNodeToTsType(indexSignature.type).basicType;
    return tsType;
};
exports.IndexSignaturToTsType = indexSignaturToTsType;
//# sourceMappingURL=index.signature.to.ts.type.js.map