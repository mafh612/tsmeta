import { TypescriptTypes } from '../..'
import { ParameterParam } from '../../resources/annotation.schema'
import { RequestBody, Schema } from '../../resources/openapispec'
import { OasConfig } from '../../resources/tsmeta.config'
import { TsDecorator, TsParameter } from '../../resources/tsmeta.schema'

/**
 * class OasRequestbodyGenerator
 */
class OasRequestbodyGenerator {

  constructor(private oasConfig: OasConfig) {}

  /**
   * generate RequestBody
   */
  public generate(reqBodyParameter: TsParameter): RequestBody {
    let schema: Schema
    const parameterParam: ParameterParam = reqBodyParameter.decorators.pop().tsarguments.pop().representation
    const version: string = (parameterParam && parameterParam.version) ? parameterParam.version : 'v1'

    switch (reqBodyParameter.tstype.typescriptType) {
      case TypescriptTypes.ARRAY:
        const _type: string = <string> reqBodyParameter.tstype.basicType
        const $ref: string = `#/components/schemas/${reqBodyParameter.tstype.basicType}_${version}`

        schema = { type: 'array', items: { type: _type, $ref } }
        break
      case TypescriptTypes.BASIC:
        schema = { type: <string> reqBodyParameter.tstype.basicType }
        break
      case TypescriptTypes.MAP:
        schema = { type: 'object', additionalProperties: { type: _type, $ref } }
        break
      case TypescriptTypes.MULTIPLE:
        const typeArray: string[] = <string[]> reqBodyParameter.tstype.basicType

        schema = { type: typeArray.join('|') }
        break
      case TypescriptTypes.REFERENCE:
        schema = { type: 'object', $ref: `#/components/schemas/${reqBodyParameter.tstype.basicType}_${version}` }
        break
      case TypescriptTypes.UNTYPED:
        schema = undefined
        break
      default:
    }

    const description: string = undefined
    const required: boolean = undefined

    return {
      description,
      required,
      content: {
        'application/json': {
          schema
        }
      }
    }
  }

  /**
   * fetch standard mapping annotation by used annotation
   */
  private mapAnnotations(used: string): string {
    return this.oasConfig.annotationsMap[used] || used
  }
}

export { OasRequestbodyGenerator }
