import { Operation, Parameter, RequestBody, Response } from 'oasmodel'
import { GetMappedAnnotation } from '../../lib/annotations.mapping'
import { AnnotationsEnum } from '../../lib/enums/annotations.enum'
import { TsDecorator, TsMethod, TsParameter } from '../../lib/interfaces/tsmeta.schema'
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
      .filter((tsParameter: TsParameter) => !!tsParameter.decorators)
      .map((tsParameter: TsParameter) => this.oasParameterGenerator.generate(tsParameter))
      .filter((parameter: Parameter) => !!parameter)

    if (controllerParameters) parameters = parameters.concat(controllerParameters)

    const reqBodyParameter: TsParameter = tsMethod.parameters
      .filter((tsParameter: TsParameter) => !!tsParameter.decorators)
      .find((tsParameter: TsParameter) =>
        tsParameter.decorators.some(
          (tsDecorator: TsDecorator) =>
            tsDecorator && GetMappedAnnotation(tsDecorator.name) === AnnotationsEnum.REQUESTBODY
        )
      )

    if (reqBodyParameter) {
      requestBody = this.oasRequestbodyGenerator.generate(reqBodyParameter)
    }

    const responses: { [key: number]: Response } = this.oasResponseGenerator.generate(tsMethod)

    const deprecated: boolean =
      tsMethod.decorators.some((it: TsDecorator) => GetMappedAnnotation(it.name) === AnnotationsEnum.DEPRECATED) ||
      undefined

    let security: any[] = tsMethod.decorators
      .filter((it: TsDecorator) => GetMappedAnnotation(it.name) === AnnotationsEnum.SECURED)
      .map((it: TsDecorator) => {
        const securityObject: { [key: string]: string[] } = {}
        securityObject[it.tsarguments[0].representation] = []

        return securityObject
      })

    if (security.length < 1) security = undefined

    return {
      deprecated,
      parameters,
      requestBody,
      responses,
      security,
      tags: [controllerName]
    }
  }
}

export { OasOperationGenerator }
