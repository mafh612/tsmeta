import { Parameter, Schema } from '../../resources/openapispec'
import { OasConfig } from '../../resources/tsmeta.config'
import { TsParameter } from '../../resources/tsmeta.schema'

/**
 * class OasParameterGenerator
 */
class OasParameterGenerator {

  constructor(private oasConfig: OasConfig) {}

  /**
   * generate Parameter
   */
  public generate(tsParameter: TsParameter): Parameter {
    const $ref: string = undefined
    const allowEmptyValue: boolean = undefined
    const deprecated: boolean = undefined
    const description: string = undefined
    const example: string = undefined
    const _in: string = undefined
    const name: string = undefined
    const required: boolean = undefined
    const schema: Schema = undefined

    return {
      $ref,
      allowEmptyValue,
      deprecated,
      description,
      example,
      in: _in,
      name,
      required,
      schema
    }
  }
}

export { OasParameterGenerator }
