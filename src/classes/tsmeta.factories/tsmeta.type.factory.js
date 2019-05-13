"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_types_enum_1 = require("../../lib/enums/typescript.types.enum");
const type_node_to_ts_type_1 = require("../../lib/utils/type.node.to.ts.type");
/**
 * class TsMetaTypeFactory
 */
class TsMetaTypeFactory {
    /**
     * build TsType element
     */
    build(typeNode) {
        if (!typeNode) {
            return {
                basicType: 'not typed',
                typescriptType: typescript_types_enum_1.TypescriptTypes.UNTYPED
            };
        }
        return type_node_to_ts_type_1.TypeNodeToTsType(typeNode);
    }
}
exports.TsMetaTypeFactory = TsMetaTypeFactory;
//# sourceMappingURL=tsmeta.type.factory.js.map