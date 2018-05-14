import { ModelParam, PropertyParam } from '../../resources/annotation.schema'
import { Schema } from '../../resources/openapispec'
import { OasConfig } from '../../resources/tsmeta.config'
import { TsDecorator, TsProperty } from '../../resources/tsmeta.schema'
import { TypescriptTypes } from '../../resources/typescript.types.enum'

/**
 * class OasSchemaGenerator
 */
class OasSchemaGenerator {

  constructor(private oasConfig: OasConfig) {}

  /**
   * generate schema
   */
  public generate(modelParam: ModelParam, tsProperty: TsProperty): { [key: string]: Schema } {
    const schemaObj: { [key: string]: Schema } = {}
    let propertyDecorator: TsDecorator
    let propertyParam: PropertyParam

    if (tsProperty.decorators) {
      propertyDecorator = tsProperty.decorators.find((tsDecorator: TsDecorator) => tsDecorator.name === this.mapAnnotations(tsDecorator.name))
      propertyParam = propertyDecorator.tsarguments.pop().representation
    }

    schemaObj[tsProperty.name] = this.createSubSchema(tsProperty, propertyParam)

    return schemaObj
  }

  /**
   * create definition subschema
   */
  private createSubSchema(tsProperty: TsProperty, propertyParam: PropertyParam): Schema {
    let schema: Schema = {}

    switch (tsProperty.tstype.typescriptType) {
      case TypescriptTypes.ARRAY:
        schema = {
          type: 'array',
          items: <string> tsProperty.tstype.basicType
        }
        break
      case TypescriptTypes.BASIC:
        schema = {
          type: <string> tsProperty.tstype.basicType
        }
        break
      case TypescriptTypes.MAP:
        schema = {
          type: <string> tsProperty.tstype.keyType,
          additionalProperties: {
            type: <string> tsProperty.tstype.valueType
          }
        }
        break
      case TypescriptTypes.MULTIPLE:
        schema = {
          type: (<string[]> tsProperty.tstype.basicType).join('|')
        }
        break
      case TypescriptTypes.PROMISE:
        schema = {
          type: <string> tsProperty.tstype.valueType
        }
        break
      case TypescriptTypes.PROP:
        schema = {
          type: tsProperty.tstype.representation
        }
        break
      case TypescriptTypes.REFERENCE:
        schema = {
          type: 'object',
          $ref: `#/components/schemas/${tsProperty.tstype.basicType}_${propertyParam.version}`
        }
        break
      case TypescriptTypes.UNTYPED:
        schema = {
          type: 'any'
        }
        break
      default:
    }

    if (propertyParam) schema.format = <string> propertyParam.format

    return schema
  }

  /**
   * fetch standard mapping annotation by used annotation
   */
  private mapAnnotations(used: string): string {
    return this.oasConfig.annotationsMap[used] || used
  }
}

export { OasSchemaGenerator }
