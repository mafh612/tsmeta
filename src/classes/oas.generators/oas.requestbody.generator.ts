import { RequestBody, Schema } from 'oasmodel'
import { ParameterParam } from '../../lib/annotation.schema'
import { TsDecorator, TsParameter } from '../../lib/tsmeta.schema'
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

    const decorator: TsDecorator = reqBodyParameter.decorators.pop()
    const parameterParam: ParameterParam = (decorator && decorator.tsarguments.length)
      ? decorator.tsarguments.pop().representation
      : undefined

    const description: string = undefined
    let schema: Schema

    if (parameterParam.ref) {
      const version: string = parameterParam.version ? `_${parameterParam.version}` : ''

      schema = { $ref: `#components/schemas/${parameterParam.ref}${version}` }
    } else {
      schema = this.oasPropertyGenerator.generate(reqBodyParameter, undefined, parameterParam)
    }

    const requiredFields: any[] = this.requiredFields(parameterParam)

    const required: boolean = <boolean> requiredFields.shift()

    schema.required = requiredFields

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
   * collect from required field
   */
  private requiredFields(parameterParam: ParameterParam): (boolean|string)[] {
    if (!parameterParam || !parameterParam.required) return [false]
    if (!Array.isArray(parameterParam.required)) return [<boolean> parameterParam.required]

    return <(boolean|string)[]> parameterParam.required
  }
}

export { OasRequestbodyGenerator }
