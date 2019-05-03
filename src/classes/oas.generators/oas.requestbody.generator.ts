import { RequestBody, Schema } from 'oasmodel'
import { last } from '../../lib/array.reducer'
import { ParameterParam } from '../../lib/interfaces/annotation.schema'
import { TsDecorator, TsParameter } from '../../lib/interfaces/tsmeta.schema'
import { OasPropertyGenerator } from './oas.property.generator'

/**
 * class OasRequestbodyGenerator
 */
class OasRequestbodyGenerator {

  private oasPropertyGenerator: OasPropertyGenerator

  /**
   * generate RequestBody
   */
  public generate(reqBodyParameter: TsParameter): RequestBody {
    this.oasPropertyGenerator = new OasPropertyGenerator()

    const decorator: TsDecorator = reqBodyParameter.decorators.reduce(last)
    const parameterParam: ParameterParam = (decorator && decorator.tsarguments.length)
      ? decorator.tsarguments.reduce(last).representation
      : undefined

    const description: string = undefined
    let schema: Schema

    if (parameterParam.ref) {
      const version: string = parameterParam.version ? `_${parameterParam.version}` : ''

      schema = { $ref: `#/components/schemas/${parameterParam.ref}${version}` }
    } else {
      schema = this.oasPropertyGenerator.generate(reqBodyParameter, undefined, parameterParam)
    }

    const requiredFields: any[] = this.requiredFields(parameterParam)

    const required: boolean = requiredFields.shift() as boolean

    schema.required = requiredFields

    return {
      content: {
        'application/json': {
          schema
        }
      },
      description,
      required
    }
  }

  /**
   * collect from required field
   */
  private requiredFields(parameterParam: ParameterParam): (boolean|string)[] {
    if (!parameterParam || !parameterParam.required) return [false]
    if (!Array.isArray(parameterParam.required)) return [parameterParam.required as boolean]

    return parameterParam.required as (boolean|string)[]
  }
}

export { OasRequestbodyGenerator }
