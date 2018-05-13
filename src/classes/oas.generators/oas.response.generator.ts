import { ResponseParam } from '../../resources/annotation.schema'
import { MediaType, Response, Schema } from '../../resources/openapispec'
import { OasConfig } from '../../resources/tsmeta.config'
import { TsArgument, TsDecorator, TsMethod, TsType } from '../../resources/tsmeta.schema'

/**
 * class OasResponseGenerator
 */
class OasResponseGenerator {

  constructor(private oasConfig: OasConfig) {}

  public generate(tsMethod: TsMethod): { [key: number]: Response } {
    const responseDecorators: TsDecorator[] = tsMethod.decorators.filter((tsDecorator: TsDecorator) => tsDecorator.name.includes('Response'))
    const response: { [key: string]: Response } = {}

    // tslint:disable

    responseDecorators.forEach((responseDecorator: TsDecorator) => {
        responseDecorator.tsarguments.forEach((tsArgument: TsArgument) => {
        const responseParam: ResponseParam = <ResponseParam> tsArgument.representation

        response[responseParam.statusCode || 200] = {
          content: this.createContent(responseParam)
        }
      })
    })

    return response
  }

  /**
   * create response content
   */
  private createContent(responseParam: ResponseParam): { [key: string]: MediaType } {
    let content: { [key: string]: MediaType } = undefined

    if (responseParam.ref) {
      content = {
        'application/json': {
          schema: {
            $ref: `#/components/schemas/${responseParam.ref}_${responseParam.version}`
          }
        }
      }
    }

    if (responseParam.res) {
      const schema: Schema = {}
      const example: any = responseParam.example || undefined

      Object.keys(responseParam.res).forEach((key: string) => {
        schema[key] = { type: responseParam.res[key] }
      })

      content = {
        'application/json': {
          schema,
          example
        }
      }
    }

    return content
  }
}

export { OasResponseGenerator }
