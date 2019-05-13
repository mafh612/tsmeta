"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
const array_reducer_1 = require("../array.reducer");
const typescript_types_enum_1 = require("../enums/typescript.types.enum");
const tstype_class_1 = require("../tstype.class");
const identifier_to_string_1 = require("./identifier.to.string");
const index_signature_to_ts_type_1 = require("./index.signature.to.ts.type");
const property_signature_to_ts_type_1 = require("./property.signature.to.ts.type");
/**
 * extract TsType from TypeNode
 */
// tslint:disable cyclomatic-complexity
const typeNodeToTsType = (typeNode) => {
    let tsType;
    switch (typeNode.kind) {
        case typescript_1.SyntaxKind.AnyKeyword:
            tsType = new tstype_class_1.TsTypeClass({ basicType: 'any', typescriptType: typescript_types_enum_1.TypescriptTypes.BASIC });
            break;
        case typescript_1.SyntaxKind.BooleanKeyword:
            tsType = new tstype_class_1.TsTypeClass({ basicType: 'boolean', typescriptType: typescript_types_enum_1.TypescriptTypes.BASIC });
            break;
        case typescript_1.SyntaxKind.NumberKeyword:
            tsType = new tstype_class_1.TsTypeClass({ basicType: 'number', typescriptType: typescript_types_enum_1.TypescriptTypes.BASIC });
            break;
        case typescript_1.SyntaxKind.StringKeyword:
            tsType = new tstype_class_1.TsTypeClass({ basicType: 'string', typescriptType: typescript_types_enum_1.TypescriptTypes.BASIC });
            break;
        case typescript_1.SyntaxKind.ObjectKeyword:
            tsType = new tstype_class_1.TsTypeClass({ basicType: 'object', typescriptType: typescript_types_enum_1.TypescriptTypes.BASIC });
            break;
        case typescript_1.SyntaxKind.IndexSignature:
            tsType = index_signature_to_ts_type_1.IndexSignaturToTsType(typeNode);
            break;
        case typescript_1.SyntaxKind.PropertySignature:
            tsType = property_signature_to_ts_type_1.PropertySignaturToTsType(typeNode);
            break;
        case typescript_1.SyntaxKind.ArrayType:
            const arrayType = new tstype_class_1.TsTypeClass(typeNodeToTsType(typeNode.elementType));
            if (typeNode.elementType.kind === typescript_1.SyntaxKind.ArrayType) {
                arrayType.valueType = arrayType.basicType;
                arrayType.basicType = 'array';
            }
            arrayType.typescriptType = typescript_types_enum_1.TypescriptTypes.ARRAY;
            tsType = arrayType;
            break;
        case typescript_1.SyntaxKind.UnionType:
            const unionTypes = typeNode.types
                .map(typeNodeToTsType)
                .filter((_tsType) => !!_tsType);
            let mappedUnionTypes = '';
            if (unionTypes)
                mappedUnionTypes = unionTypes.map((ut) => ut.basicType);
            tsType = new tstype_class_1.TsTypeClass({ basicType: mappedUnionTypes, typescriptType: typescript_types_enum_1.TypescriptTypes.MULTIPLE });
            break;
        case typescript_1.SyntaxKind.TypeLiteral:
            const tsTypes = typeNode.members
                .map((typeElement) => typeNodeToTsType(typeElement));
            if (tsTypes.length > 1) {
                tsType = tsTypes.reduce((prev, curr) => {
                    if (Array.isArray(prev.keyType))
                        prev.keyType.push(curr.keyType);
                    else
                        prev.keyType = [prev.keyType, curr.keyType];
                    if (Array.isArray(prev.valueType))
                        prev.valueType.push(curr.valueType);
                    else
                        prev.valueType = [prev.valueType, curr.valueType];
                    return prev;
                });
                tsType.typescriptType = typescript_types_enum_1.TypescriptTypes.PROP;
            }
            else
                tsType = tsTypes && tsTypes.reduce(array_reducer_1.last, undefined);
            break;
        case typescript_1.SyntaxKind.TypeReference:
            let basicType = identifier_to_string_1.IdentifierToString(typeNode.typeName);
            let keyType;
            let valueType;
            let typescriptType = typescript_types_enum_1.TypescriptTypes.REFERENCE;
            if (typeNode.typeArguments && basicType === 'Array') {
                basicType = typeNodeToTsType(typeNode.typeArguments[0]).basicType;
                typescriptType = typescript_types_enum_1.TypescriptTypes.ARRAY;
            }
            if (typeNode.typeArguments && basicType === 'Map') {
                keyType = typeNodeToTsType(typeNode.typeArguments[0]).basicType;
                valueType = typeNodeToTsType(typeNode.typeArguments[1]).basicType;
                typescriptType = typescript_types_enum_1.TypescriptTypes.MAP;
            }
            if (typeNode.typeArguments && basicType === 'Promise') {
                valueType = typeNodeToTsType(typeNode.typeArguments[0]).basicType;
                typescriptType = typescript_types_enum_1.TypescriptTypes.PROMISE;
            }
            tsType = new tstype_class_1.TsTypeClass({ basicType, keyType, valueType, typescriptType });
            break;
        case typescript_1.SyntaxKind.VoidKeyword:
            tsType = undefined;
            break;
        default:
            tsType = new tstype_class_1.TsTypeClass({ basicType: 'undefined', typescriptType: typescript_types_enum_1.TypescriptTypes.UNTYPED });
    }
    if (tsType && 'createRepresentation' in tsType)
        tsType.createRepresentation();
    return tsType;
};
exports.TypeNodeToTsType = typeNodeToTsType;
//# sourceMappingURL=type.node.to.ts.type.js.map