import { TypescriptTypes } from '../../lib/enums/typescript.types.enum'
import { ParameterParam, PropertyParam } from '../../lib/interfaces/annotation.schema'
import { TsProperty } from '../../lib/interfaces/tsmeta.schema'
import { Schema } from '../../util/schema'

/**
 * class OasPropertyGenerator
 */
class OasPropertyGenerator {
  /**
   * generate property schema
   */
  public generate(
    tsProperty: TsProperty,
    propertyParam: PropertyParam,
    parameterParam?: ParameterParam,
    parentRequiredList?: string[]
  ): Schema {
    let schema: Schema = {}
    const version: string = propertyParam && propertyParam.version ? `_${propertyParam.version}` : ''
    switch (tsProperty.tstype.typescriptType) {
      case TypescriptTypes.ARRAY:
        schema = this.createArraySchema(tsProperty, version)
        break
      case TypescriptTypes.BASIC:
        if (parameterParam) {
          schema = parameterParam.schema
          schema.example = parameterParam.example
        } else if (tsProperty.tstype.basicType === 'object') {
          schema = {
            additionalProperties: {
              type: ['string', 'number', 'boolean']
            },
            type: tsProperty.tstype.basicType as string
          }
        } else {
          schema = { type: tsProperty.tstype.basicType as string }
        }
        break
      case TypescriptTypes.MAP:
        schema = this.createMapSchema(tsProperty, version)
        break
      case TypescriptTypes.MULTIPLE:
        schema = { type: (tsProperty.tstype.basicType as string[]).join('|') }
        break
      case TypescriptTypes.PROMISE:
        schema = { type: tsProperty.tstype.valueType as string }
        break
      case TypescriptTypes.PROP:
        schema = this.createPropSchema(tsProperty, version)
        break
      case TypescriptTypes.REFERENCE:
        if (parameterParam) {
          schema.properties = parameterParam.schema
          schema.example = parameterParam.example
        } else {
          schema = { $ref: `#/components/schemas/${tsProperty.tstype.basicType}${version}` }
        }
        break
      case TypescriptTypes.UNTYPED:
        schema = parameterParam && parameterParam.schema
        break
      default:
    }

    if (propertyParam && propertyParam.format) schema.format = propertyParam.format as string
    if (propertyParam && propertyParam.enum) schema.enum = propertyParam.enum
    if (propertyParam && propertyParam.required) {
      parentRequiredList.push(tsProperty.name)
    }

    return schema
  }

  /**
   * create array schema for property
   */
  private createArraySchema(tsProperty: TsProperty, version: string): Schema {
    const typeName: string = tsProperty.tstype.basicType as string

    if (typeName === 'array') {
      const subProperty: TsProperty = {
        decorators: tsProperty.decorators,
        name: tsProperty.name,
        tstype: {
          basicType: tsProperty.tstype.valueType,
          keyType: tsProperty.tstype.keyType,
          representation: tsProperty.tstype.representation,
          typescriptType: tsProperty.tstype.typescriptType,
          valueType: tsProperty.tstype.valueType
        }
      }

      return {
        items: this.createArraySchema(subProperty, version),
        type: 'array'
      }
    }

    if (['any', 'boolean', 'number', 'string'].includes(typeName)) return { type: 'array', items: { type: typeName } }
    else return { type: 'array', items: { $ref: `#/components/schemas/${typeName}${version}` } }
  }

  /**
   * create map schema for property
   */
  private createMapSchema(tsProperty: TsProperty, version: string): Schema {
    const propertiesType: string = tsProperty.tstype.valueType as string
    let _type: string
    let $ref: string

    if (['any', 'boolean', 'number', 'string'].includes(propertiesType)) _type = propertiesType
    else $ref = `#/components/schemas/${propertiesType}${version}`

    return { type: 'object', additionalProperties: { type: _type, $ref } }
  }

  /**
   * create prop schema for property
   */
  private createPropSchema(tsProperty: TsProperty, version: string): Schema {
    const properties: { [key: string]: Schema } = {}
    const keyTypes: string[] = tsProperty.tstype.keyType as string[]

    keyTypes.forEach((key: string, index: number) => {
      const value: string = tsProperty.tstype.valueType[index]

      if (['any', 'boolean', 'number', 'string'].includes(value)) properties[key] = { type: value }
      else properties[key] = { $ref: `#/components/schemas/${value}${version}` }
    })

    return { properties }
  }
}

export { OasPropertyGenerator }
