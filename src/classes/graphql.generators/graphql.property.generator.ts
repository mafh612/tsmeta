import { OasFormat, PropertyParam, TypescriptTypes } from '../..'
import { TsArgument, TsDecorator, TsProperty, TsType } from '../../lib/tsmeta.schema'

/**
 * class GraphQLPropertyGenerator
 */
class GraphQLPropertyGenerator {

  /**
   * generate single schema property
   */
  public generate(tsProperty: TsProperty): string {
    const tsType: TsType = tsProperty.tstype
    const propertyDecorator: TsDecorator = tsProperty.decorators && tsProperty.decorators.find((tsDecorator: TsDecorator) => tsDecorator.name === 'Property')
    const propertyArgument: TsArgument = propertyDecorator && propertyDecorator.tsarguments.pop()
    const propertyParam: PropertyParam = propertyArgument && propertyArgument.representation

    /* if (tsProperty.decorators) {
      propertyDecorator = tsProperty.decorators && tsProperty.decorators.find((tsDecorator: TsDecorator) => tsDecorator.name === 'Property')
      propertyArgument = propertyDecorator && propertyDecorator.tsarguments.pop()
      propertyParam = propertyArgument && propertyArgument.representation
    } */

    switch (tsType.typescriptType) {
      case TypescriptTypes.ARRAY:
        const arrayType: string = propertyParam && propertyParam.format
          ? this.mapTypeToGraphQLType(propertyParam.format)
          : this.mapTypeToGraphQLType(tsProperty.tstype.basicType)

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
  private mapTypeToGraphQLType(format: string|OasFormat): string {
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
