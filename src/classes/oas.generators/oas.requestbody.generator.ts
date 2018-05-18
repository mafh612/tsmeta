import { ParameterParam } from '../../lib/annotation.schema'
import { RequestBody, Schema } from '../../lib/openapispec'
import { TsParameter } from '../../lib/tsmeta.schema'
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

    const parameterParam: ParameterParam = reqBodyParameter.decorators.pop().tsarguments.pop().representation
    const description: string = undefined
    const required: boolean = undefined
    const schema: Schema = this.oasPropertyGenerator.generate(reqBodyParameter, parameterParam)

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
