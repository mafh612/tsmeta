"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_reducer_1 = require("../../lib/array.reducer");
const typescript_types_enum_1 = require("../../lib/enums/typescript.types.enum");
/**
 * class GraphQLPropertyGenerator
 */
class GraphQLPropertyGenerator {
    constructor(graphQLConfig) {
        this.graphQLConfig = graphQLConfig;
    }
    /**
     * generate single schema property
     */
    generate(tsProperty) {
        const tsType = tsProperty.tstype;
        const propertyDecorator = (tsProperty && tsProperty.decorators)
            ? tsProperty.decorators.find((tsDecorator) => tsDecorator.name === this.graphQLConfig.propertyAnnotation)
            : undefined;
        const propertyArgument = (propertyDecorator && propertyDecorator.tsarguments)
            ? propertyDecorator.tsarguments.reduce(array_reducer_1.last)
            : undefined;
        const propertyParam = (propertyArgument && propertyArgument.representation)
            ? propertyArgument.representation
            : undefined;
        switch (tsType.typescriptType) {
            case typescript_types_enum_1.TypescriptTypes.ARRAY:
                const arrayType = propertyParam && propertyParam.format
                    ? this.mapTypeToGraphQLType(propertyParam.format)
                    : this.mapTypeToGraphQLType(tsProperty.tstype.basicType, tsProperty.tstype.valueType);
                if (tsProperty.tstype.basicType === 'array') {
                    return `${tsProperty.name}: [[${arrayType}]]`;
                }
                return `${tsProperty.name}: [${arrayType}]`;
            case typescript_types_enum_1.TypescriptTypes.BASIC:
                const basicType = propertyParam && propertyParam.format
                    ? this.mapTypeToGraphQLType(propertyParam.format)
                    : this.mapTypeToGraphQLType(tsProperty.tstype.basicType);
                return `${tsProperty.name}: ${basicType}`;
            case typescript_types_enum_1.TypescriptTypes.REFERENCE:
                const referenceType = this.mapTypeToGraphQLType(tsProperty.tstype.basicType);
                return `${tsProperty.name}: ${referenceType}`;
            case typescript_types_enum_1.TypescriptTypes.MAP:
                const mapKeyType = this.mapTypeToGraphQLType(tsProperty.tstype.keyType);
                const mapValueType = this.mapTypeToGraphQLType(tsProperty.tstype.valueType);
                return `${tsProperty.name}(key: ${mapKeyType}): ${mapValueType}`;
            case typescript_types_enum_1.TypescriptTypes.MULTIPLE:
                return `${tsProperty.name}: Any`;
            default:
                return undefined;
        }
    }
    /**
     * map typescript types to graphql types
     */
    mapTypeToGraphQLType(format, additional) {
        if (!!additional)
            format = additional;
        switch (format) {
            case 'any': return 'Any';
            case 'string': return 'String';
            case 'boolean': return 'Boolean';
            case 'int32': return 'Int';
            case 'int64': return 'Int';
            case 'float': return 'Float';
            case 'number': return 'Int';
            default: return format;
        }
    }
}
exports.GraphQLPropertyGenerator = GraphQLPropertyGenerator;
//# sourceMappingURL=graphql.property.generator.js.map