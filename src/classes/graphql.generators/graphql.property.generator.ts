import { PropertyParam } from '../../lib/annotation.schema'
import { OasFormat } from '../../lib/oas.format.enum'
import { GraphQLConfig } from '../../lib/tsmeta.config'
import { TsArgument, TsDecorator, TsProperty, TsType } from '../../lib/tsmeta.schema'
import { TypescriptTypes } from '../../lib/typescript.types.enum'

/**
 * class GraphQLPropertyGenerator
 */
class GraphQLPropertyGenerator {

  constructor(private graphQLConfig: GraphQLConfig) {}

  /**
   * generate single schema property
   */
  public generate(tsProperty: TsProperty): string {
    const tsType: TsType = tsProperty.tstype

    const propertyDecorator: TsDecorator = (tsProperty && tsProperty.decorators)
      ? tsProperty.decorators.find((tsDecorator: TsDecorator) => tsDecorator.name === this.graphQLConfig.property_annotation)
      : undefined

    const propertyArgument: TsArgument = (propertyDecorator && propertyDecorator.tsarguments)
      ? propertyDecorator.tsarguments.pop()
      : undefined

    const propertyParam: PropertyParam = (propertyArgument && propertyArgument.representation)
      ? <PropertyParam> propertyArgument.representation
      : undefined

    switch (tsType.typescriptType) {
      case TypescriptTypes.ARRAY:
        const arrayType: string = propertyParam && propertyParam.format
          ? this.mapTypeToGraphQLType(propertyParam.format)
          : this.mapTypeToGraphQLType(tsProperty.tstype.basicType, <string> tsProperty.tstype.valueType)

        if (tsProperty.tstype.basicType === 'array') return `${tsProperty.name}: [[${arrayType}]]`

        return `${tsProperty.name}: [${arrayType}]`
      case TypescriptTypes.BASIC:
        const basicType: string = propertyParam && propertyParam.format
          ? this.mapTypeToGraphQLType(propertyParam.format)
          : this.mapTypeToGraphQLType(tsProperty.tstype.basicType)

        return `${tsProperty.name}: ${basicType}`
      case TypescriptTypes.REFERENCE:
        const referenceType: string = this.mapTypeToGraphQLType(tsProperty.tstype.basicType)

        return `${tsProperty.name}: ${referenceType}`
      case TypescriptTypes.MAP:
        const mapKeyType: string = this.mapTypeToGraphQLType(tsProperty.tstype.keyType)
        const mapValueType: string = this.mapTypeToGraphQLType(tsProperty.tstype.valueType)

        return `${tsProperty.name}(key: ${mapKeyType}): ${mapValueType}`
      case TypescriptTypes.MULTIPLE:
        return `${tsProperty.name}: Any`
      default:
        return undefined
    }
  }

  /**
   * map typescript types to graphql types
   */
  private mapTypeToGraphQLType(format: string|OasFormat, additional?: string): string {
    if (!!additional) format = additional

    switch (format) {
      case 'any': return 'Any'
      case 'string': return 'String'
      case 'boolean': return 'Boolean'
      case 'int32': return 'Int'
      case 'int64': return 'Int'
      case 'float': return 'Float'
      case 'number': return 'Int'
      default: return <string> format
    }
  }
}

export { GraphQLPropertyGenerator }
