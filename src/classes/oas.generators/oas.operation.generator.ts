import * as deepAssign from 'deep-assign'

import { Operation, Parameter, RequestBody, Response } from '../../resources/openapispec'
import { OasConfig } from '../../resources/tsmeta.config'
import { TsDecorator, TsMethod, TsParameter } from '../../resources/tsmeta.schema'
import { OasParameterGenerator } from './oas.parameter.generator'
import { OasRequestbodyGenerator } from './oas.requestbody.generator'
import { OasResponseGenerator } from './oas.response.generator'

/**
 * class OasOperationGenerator
 */
class OasOperationGenerator {

  private oasParameterGenerator: OasParameterGenerator
  private oasResponseGenerator: OasResponseGenerator
  private oasRequestbodyGenerator: OasRequestbodyGenerator

  constructor(private oasConfig: OasConfig) {}

  /**
   * generate Operation
   */
  public generate(controllerName: string, tsMethod: TsMethod): Operation {
    this.oasParameterGenerator = new OasParameterGenerator(this.oasConfig)
    this.oasResponseGenerator = new OasResponseGenerator(this.oasConfig)
    this.oasRequestbodyGenerator = new OasRequestbodyGenerator(this.oasConfig)

    let parameters: Parameter[]
    let requestBody: RequestBody

    parameters = tsMethod.parameters
      .map((tsParameter: TsParameter) => this.oasParameterGenerator.generate(tsParameter))
      .filter((parameter: Parameter) => !!parameter)

    const reqBodyParameter: TsParameter = tsMethod.parameters
      .find((tsParameter: TsParameter) => tsParameter.decorators
        .some((tsDecorator: TsDecorator) => this.mapAnnotations(tsDecorator.name) === 'ReqBody'))

    if (reqBodyParameter) {
      requestBody = this.oasRequestbodyGenerator.generate(reqBodyParameter)
    }

    let responses: { [key: number]: Response } = {}

    tsMethod.decorators.forEach((tsDecorator: TsDecorator) => {
      responses = deepAssign(responses, this.oasResponseGenerator.generate(tsMethod))
    })

    return {
      tags: [controllerName],
      requestBody,
      parameters,
      responses
    }
  }

  /**
   * fetch standard mapping annotation by used annotation
   */
  private mapAnnotations(used: string): string {
    return this.oasConfig.annotationsMap[used] || used
  }
}

export { OasOperationGenerator }
