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
    const parameterParam: ParameterParam =
      decorator && decorator.tsarguments.length ? decorator.tsarguments.reduce(last).representation : undefined

    const description: string = undefined
    let schema: Schema

    if (parameterParam.ref) {
      const version: string = parameterParam.version ? `_${parameterParam.version}` : ''

      schema = { $ref: `#/components/schemas/${parameterParam.ref}${version}` }
    } else {
      schema = this.oasPropertyGenerator.generate(reqBodyParameter, undefined, parameterParam)
    }

    schema.required = (Array.isArray(parameterParam.required) && (parameterParam.required as string[])) || undefined
    const required: boolean = (typeof parameterParam.required === 'boolean' && parameterParam.required) || undefined

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
}

export { OasRequestbodyGenerator }
