import { Operation, Parameter, RequestBody, Response } from 'oasmodel'
import { OasConfig } from '../../lib/tsmeta.config'
import { TsDecorator, TsMethod, TsParameter } from '../../lib/tsmeta.schema'
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
  public generate(controllerName: string, tsMethod: TsMethod, controllerParameters: Parameter[]): Operation {
    this.oasParameterGenerator = new OasParameterGenerator(this.oasConfig)
    this.oasResponseGenerator = new OasResponseGenerator(this.oasConfig)
    this.oasRequestbodyGenerator = new OasRequestbodyGenerator()

    let parameters: Parameter[]
    let requestBody: RequestBody

    parameters = tsMethod.parameters
      .map((tsParameter: TsParameter) => this.oasParameterGenerator.generate(tsParameter))
      .filter((parameter: Parameter) => !!parameter)

    if (controllerParameters) parameters = parameters.concat(controllerParameters)

    const reqBodyParameter: TsParameter = tsMethod.parameters
      .find((tsParameter: TsParameter) => tsParameter.decorators
        ? tsParameter.decorators.some((tsDecorator: TsDecorator) => this.mapAnnotations(tsDecorator.name) === 'RequestBody')
        : false)

    if (reqBodyParameter) {
      requestBody = this.oasRequestbodyGenerator.generate(reqBodyParameter)
    }

    const responses: { [key: number]: Response } = this.oasResponseGenerator.generate(tsMethod)

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
