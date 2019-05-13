"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_types_enum_1 = require("./enums/typescript.types.enum");
/**
 * class TsTypeFactory
 */
class TsTypeClass {
    constructor(tsType) {
        this.typescriptType = tsType.typescriptType;
        this.basicType = tsType.basicType;
        this.keyType = tsType.keyType;
        this.valueType = tsType.valueType;
    }
    /**
     * create representation from type strings
     */
    createRepresentation() {
        switch (this.typescriptType) {
            case typescript_types_enum_1.TypescriptTypes.BASIC:
                this.representation = this.basicType;
                break;
            case typescript_types_enum_1.TypescriptTypes.MULTIPLE:
                this.representation = this.basicType.join('|');
                break;
            case typescript_types_enum_1.TypescriptTypes.ARRAY:
                this.representation = `${this.basicType}[]`;
                break;
            case typescript_types_enum_1.TypescriptTypes.MAP:
                if (Array.isArray(this.valueType))
                    this.representation = `Map<${this.keyType}, ${this.valueType.join('|')}>`;
                else
                    this.representation = `Map<${this.keyType}, ${this.valueType}>`;
                break;
            case typescript_types_enum_1.TypescriptTypes.REFERENCE:
                this.representation = this.basicType;
                break;
            case typescript_types_enum_1.TypescriptTypes.PROMISE:
                this.representation = `Promise<${this.valueType}>`;
                break;
            case typescript_types_enum_1.TypescriptTypes.PROP:
                const propTypes = this.keyType
                    .map((keyType, i) => `${keyType}: ${this.valueType[i]}`)
                    .join('; ');
                this.representation = `{ ${propTypes} }`;
                break;
            case typescript_types_enum_1.TypescriptTypes.UNTYPED:
                this.representation = this.basicType;
                break;
            default:
        }
    }
}
exports.TsTypeClass = TsTypeClass;
//# sourceMappingURL=tstype.class.js.map