import * as deepAssign from 'deep-assign'

import { Operation, Parameter, Response } from '../../resources/openapispec'
import { OasConfig } from '../../resources/tsmeta.config'
import { TsDecorator, TsMethod, TsParameter } from '../../resources/tsmeta.schema'
import { OasParameterGenerator } from './oas.parameter.generator'
import { OasResponseGenerator } from './oas.response.generator'

/**
 * class OasOperationGenerator
 */
class OasOperationGenerator {

  private oasParameterGenerator: OasParameterGenerator
  private oasResponseGenerator: OasResponseGenerator

  constructor(private oasConfig: OasConfig) {}

  /**
   * generate Operation
   */
  public generate(tsMethod: TsMethod): Operation {
    this.oasParameterGenerator = new OasParameterGenerator(this.oasConfig)
    this.oasResponseGenerator = new OasResponseGenerator(this.oasConfig)

    const parameters: Parameter[] = tsMethod.parameters
      .map((tsParameter: TsParameter) => this.oasParameterGenerator.generate(tsParameter))

    let responses: { [key: number]: Response } = {}

    tsMethod.decorators.forEach((tsDecorator: TsDecorator) => {
      responses = deepAssign(responses, this.oasResponseGenerator.generate(tsMethod))
    })

    return {
      parameters,
      responses
    }
  }
}

export { OasOperationGenerator }
