import { RequestBody, Schema } from 'oasmodel'
import { ParameterParam } from '../../lib/annotation.schema'
import { TsDecorator, TsParameter } from '../../lib/tsmeta.schema'
// import { TypescriptTypes } from '../../lib/typescript.types.enum'
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
    const required: boolean = undefined
    let schema: Schema

    if (parameterParam.ref) {
      const version: string = parameterParam.version ? `_${parameterParam.version}` : ''

      schema = { $ref: `#components/schemas/${parameterParam.ref}${version}` }
    } else {
      schema = this.oasPropertyGenerator.generate(reqBodyParameter, undefined, parameterParam)
    }

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
}

export { OasRequestbodyGenerator }
