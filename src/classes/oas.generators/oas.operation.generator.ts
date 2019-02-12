import { Operation, Parameter, RequestBody, Response } from 'oasmodel'
import { GetMappedAnnotation } from '../../lib/annotations.mapping'
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

  /**
   * generate Operation
   */
  public generate(controllerName: string, tsMethod: TsMethod, controllerParameters: Parameter[]): Operation {
    this.oasParameterGenerator = new OasParameterGenerator()
    this.oasResponseGenerator = new OasResponseGenerator()
    this.oasRequestbodyGenerator = new OasRequestbodyGenerator()

    let parameters: Parameter[]
    let requestBody: RequestBody

    parameters = tsMethod.parameters
      .map((tsParameter: TsParameter) => this.oasParameterGenerator.generate(tsParameter))
      .filter((parameter: Parameter) => !!parameter)

    if (controllerParameters) parameters = parameters.concat(controllerParameters)

    const reqBodyParameter: TsParameter = tsMethod.parameters
      .find((tsParameter: TsParameter) => tsParameter.decorators
        ? tsParameter.decorators.some((tsDecorator: TsDecorator) => GetMappedAnnotation(tsDecorator.name) === 'RequestBody')
        : false)

    if (reqBodyParameter) {
      requestBody = this.oasRequestbodyGenerator.generate(reqBodyParameter)
    }

    const responses: { [key: number]: Response } = this.oasResponseGenerator.generate(tsMethod)

    const securityKey: string = tsMethod.decorators
      .find((it: TsDecorator) => it.name === 'Secured')
      .tsarguments[0].representation
    const securityObject: { [key: string]: string[] } = {}
    securityObject[securityKey] = []
    const security: any[] = securityObject ? [securityObject] : []

    return {
      parameters,
      requestBody,
      responses,
      security,
      tags: [controllerName]
    }
  }
}

export { OasOperationGenerator }
