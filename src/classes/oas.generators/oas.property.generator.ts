import { Schema } from 'oasmodel'
import { ParameterParam, PropertyParam } from '../../lib/annotation.schema'
import { TsProperty } from '../../lib/tsmeta.schema'
import { TypescriptTypes } from '../../lib/typescript.types.enum'

/**
 * class OasPropertyGenerator
 */
class OasPropertyGenerator {

  /**
   * generate property schema
   * @param tsProperty
   * @param propertyParam
   */
  public generate(tsProperty: TsProperty, propertyParam: PropertyParam, parameterParam?: ParameterParam): Schema {
    let schema: Schema = {}
    const version: string = (propertyParam && propertyParam.version) ? `_${propertyParam.version}` : ''

    switch (tsProperty.tstype.typescriptType) {
      case TypescriptTypes.ARRAY:
        schema = this.createArraySchema(tsProperty, version)
        break
      case TypescriptTypes.BASIC:
        schema = { type: <string> tsProperty.tstype.basicType }
        break
      case TypescriptTypes.MAP:
        schema = this.createMapSchema(tsProperty, version)
        break
      case TypescriptTypes.MULTIPLE:
        schema = { type: (<string[]> tsProperty.tstype.basicType).join('|') }
        break
      case TypescriptTypes.PROMISE:
        schema = { type: <string> tsProperty.tstype.valueType }
        break
      case TypescriptTypes.PROP:
        schema = this.createPropSchema(tsProperty, version)
        break
      case TypescriptTypes.REFERENCE:
        if (parameterParam) {
          schema.properties = parameterParam.res
          schema.example = parameterParam.example
        } else {
          schema = { type: 'object', $ref: `#/components/schemas/${tsProperty.tstype.basicType}${version}` }
        }

        break
      case TypescriptTypes.UNTYPED:
        schema = { type: 'any' }
        break
      default:
    }

    if (propertyParam && propertyParam.format) schema.format = <string> propertyParam.format

    return schema
  }

  /**
   * create array schema for property
   * @param tsProperty
   * @param version
   */
  private createArraySchema(tsProperty: TsProperty, version: string): Schema {
    const typeName: string = <string> tsProperty.tstype.basicType

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
        type: 'array',
        items: this.createArraySchema(subProperty, version)
      }
    }

    if (['any', 'boolean', 'number', 'string'].includes(typeName)) return { type: 'array', items: { type: typeName } }
    else return { type: 'array', items: { $ref: `#/components/schemas/${typeName}${version}` } }
  }

  /**
   * create map schema for property
   * @param tsProperty
   * @param version
   */
  private createMapSchema(tsProperty: TsProperty, version: string): Schema {
    const propertiesType: string = <string> tsProperty.tstype.valueType
    let _type: string
    let $ref: string

    if (['any', 'boolean', 'number', 'string'].includes(propertiesType))  _type = propertiesType
    else $ref = `#/components/schemas/${propertiesType}${version}`

    return { type: 'object', additionalProperties: { type: _type, $ref } }
  }

  /**
   * create prop schema for property
   * @param tsProperty
   * @param version
   */
  private createPropSchema(tsProperty: TsProperty, version: string): Schema {
    const properties: { [key: string]: Schema } = {}
    const keyTypes: string[] = <string[]> tsProperty.tstype.keyType

    keyTypes.forEach((key: string, index: number) => {
      const value: string = tsProperty.tstype.valueType[index]

      if (['any', 'boolean', 'number', 'string'].includes(value))  properties[key] = { type: value }
      else properties[key] = { $ref: `#/components/schemas/${value}${version}` }
    })

    return { type: 'object', properties }
  }
}

export { OasPropertyGenerator }
