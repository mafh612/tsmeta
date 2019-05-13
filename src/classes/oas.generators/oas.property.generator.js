"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_types_enum_1 = require("../../lib/enums/typescript.types.enum");
/**
 * class OasPropertyGenerator
 */
class OasPropertyGenerator {
    /**
     * generate property schema
     */
    generate(tsProperty, propertyParam, parameterParam) {
        let schema = {};
        const version = (propertyParam && propertyParam.version) ? `_${propertyParam.version}` : '';
        switch (tsProperty.tstype.typescriptType) {
            case typescript_types_enum_1.TypescriptTypes.ARRAY:
                schema = this.createArraySchema(tsProperty, version);
                break;
            case typescript_types_enum_1.TypescriptTypes.BASIC:
                schema = { type: tsProperty.tstype.basicType };
                break;
            case typescript_types_enum_1.TypescriptTypes.MAP:
                schema = this.createMapSchema(tsProperty, version);
                break;
            case typescript_types_enum_1.TypescriptTypes.MULTIPLE:
                schema = { type: tsProperty.tstype.basicType.join('|') };
                break;
            case typescript_types_enum_1.TypescriptTypes.PROMISE:
                schema = { type: tsProperty.tstype.valueType };
                break;
            case typescript_types_enum_1.TypescriptTypes.PROP:
                schema = this.createPropSchema(tsProperty, version);
                break;
            case typescript_types_enum_1.TypescriptTypes.REFERENCE:
                if (parameterParam) {
                    schema.properties = parameterParam.schema;
                    schema.example = parameterParam.example;
                }
                else {
                    schema = { $ref: `#/components/schemas/${tsProperty.tstype.basicType}${version}` };
                }
                break;
            case typescript_types_enum_1.TypescriptTypes.UNTYPED:
                schema = { type: 'any' };
                break;
            default:
        }
        if (propertyParam && propertyParam.format)
            schema.format = propertyParam.format;
        if (propertyParam && propertyParam.enum)
            schema.enum = propertyParam.enum;
        return schema;
    }
    /**
     * create array schema for property
     */
    createArraySchema(tsProperty, version) {
        const typeName = tsProperty.tstype.basicType;
        if (typeName === 'array') {
            const subProperty = {
                decorators: tsProperty.decorators,
                name: tsProperty.name,
                tstype: {
                    basicType: tsProperty.tstype.valueType,
                    keyType: tsProperty.tstype.keyType,
                    representation: tsProperty.tstype.representation,
                    typescriptType: tsProperty.tstype.typescriptType,
                    valueType: tsProperty.tstype.valueType
                }
            };
            return {
                items: this.createArraySchema(subProperty, version),
                type: 'array'
            };
        }
        if (['any', 'boolean', 'number', 'string'].includes(typeName))
            return { type: 'array', items: { type: typeName } };
        else
            return { type: 'array', items: { $ref: `#/components/schemas/${typeName}${version}` } };
    }
    /**
     * create map schema for property
     */
    createMapSchema(tsProperty, version) {
        const propertiesType = tsProperty.tstype.valueType;
        let _type;
        let $ref;
        if (['any', 'boolean', 'number', 'string'].includes(propertiesType))
            _type = propertiesType;
        else
            $ref = `#/components/schemas/${propertiesType}${version}`;
        return { type: 'object', additionalProperties: { type: _type, $ref } };
    }
    /**
     * create prop schema for property
     */
    createPropSchema(tsProperty, version) {
        const properties = {};
        const keyTypes = tsProperty.tstype.keyType;
        keyTypes.forEach((key, index) => {
            const value = tsProperty.tstype.valueType[index];
            if (['any', 'boolean', 'number', 'string'].includes(value))
                properties[key] = { type: value };
            else
                properties[key] = { $ref: `#/components/schemas/${value}${version}` };
        });
        return { properties };
    }
}
exports.OasPropertyGenerator = OasPropertyGenerator;
//# sourceMappingURL=oas.property.generator.js.map