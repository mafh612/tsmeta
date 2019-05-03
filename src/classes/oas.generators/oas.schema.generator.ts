import { Schema } from 'oasmodel'
import { GetMappedAnnotation } from '../../lib/annotations.mapping'
import { last } from '../../lib/array.reducer'
import { TypescriptTypes } from '../../lib/enums/typescript.types.enum'
import { ModelParam, PropertyParam } from '../../lib/interfaces/annotation.schema'
import { TsDecorator, TsProperty } from '../../lib/interfaces/tsmeta.schema'
import { OasPropertyGenerator } from './oas.property.generator'

/**
 * class OasSchemaGenerator
 */
class OasSchemaGenerator {

  private oasPropertyGenerator: OasPropertyGenerator

  /**
   * generate schema
   */
  public generate(modelParam: ModelParam, tsProperty: TsProperty): { [key: string]: Schema } {
    const schemaObj: { [key: string]: Schema } = {}
    let propertyDecorator: TsDecorator
    let propertyParam: PropertyParam

    if (tsProperty.decorators) {
      propertyDecorator = tsProperty.decorators
        .find((tsDecorator: TsDecorator) => tsDecorator.name === GetMappedAnnotation(tsDecorator.name))

      propertyParam = propertyDecorator.tsarguments.reduce(last).representation
    }

    this.oasPropertyGenerator = new OasPropertyGenerator()

    schemaObj[tsProperty.name] = this.oasPropertyGenerator.generate(tsProperty, propertyParam)
    this.createSubSchema(tsProperty, propertyParam)

    return schemaObj
  }

  /**
   * create definition subschema
   */
  private createSubSchema(tsProperty: TsProperty, propertyParam: PropertyParam): Schema {
    let schema: Schema = {}
    const version: string = (propertyParam && propertyParam.version) ? `_${propertyParam.version}` : ''

    switch (tsProperty.tstype.typescriptType) {
      case TypescriptTypes.ARRAY:
        const typeName: string = tsProperty.tstype.basicType as string

        if (['any', 'boolean', 'number', 'string'].includes(typeName)) schema = { type: 'array', items: { type: typeName } }
        else schema = { type: 'array', items: { $ref: `#/components/schemas/${typeName}${version}` } }
        break
      case TypescriptTypes.BASIC:
        schema = { type: tsProperty.tstype.basicType as string }
        break
      case TypescriptTypes.MAP:
        const propertiesType: string = tsProperty.tstype.valueType as string
        let _type: string
        let $ref: string

        if (['any', 'boolean', 'number', 'string'].includes(propertiesType))  _type = propertiesType
        else $ref = `#/components/schemas/${propertiesType}${version}`

        schema = { type: 'object', additionalProperties: { type: _type, $ref } }
        break
      case TypescriptTypes.MULTIPLE:
        schema = { type: (tsProperty.tstype.basicType as string[]).join('|') }
        break
      case TypescriptTypes.PROMISE:
        schema = { type: tsProperty.tstype.valueType as string }
        break
      case TypescriptTypes.PROP:
        const properties: { [key: string]: Schema } = {}
        const keyTypes: string[] = tsProperty.tstype.keyType as string[]

        keyTypes.forEach((key: string, index: number) => {
          const value: string = tsProperty.tstype.valueType[index]

          if (['any', 'boolean', 'number', 'string'].includes(value))  properties[key] = { type: value }
          else properties[key] = { $ref: `#/components/schemas/${value}${version}` }
        })

        schema = { type: 'object', properties }
        break
      case TypescriptTypes.REFERENCE:
        schema = { type: 'object', $ref: `#/components/schemas/${tsProperty.tstype.basicType}${version}` }
        break
      case TypescriptTypes.UNTYPED:
        schema = { type: 'any' }
        break
      default:
    }

    if (propertyParam && propertyParam.format) schema.format = propertyParam.format as string

    return schema
  }
}

export { OasSchemaGenerator }
