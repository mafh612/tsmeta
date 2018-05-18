import { ResponseParam } from '../../lib/annotation.schema'
import { MediaType, Response, Schema } from '../../lib/openapispec'
import { OasConfig } from '../../lib/tsmeta.config'
import { TsArgument, TsDecorator, TsMethod } from '../../lib/tsmeta.schema'

/**
 * class OasResponseGenerator
 */
class OasResponseGenerator {

  private httpStatusOK: number = 200

  constructor(private oasConfig: OasConfig) {}

  /**
   * generate Response
   */
  public generate(tsMethod: TsMethod): { [key: number]: Response } {
    const responseDecorators: TsDecorator[] = tsMethod.decorators.filter((tsDecorator: TsDecorator) => tsDecorator.name.includes('Response'))
    const response: { [key: string]: Response } = {}

    this.mapAnnotations('any') // tslint:disable-line

    responseDecorators.forEach((responseDecorator: TsDecorator) => {
        responseDecorator.tsarguments.forEach((tsArgument: TsArgument) => {
        const responseParam: ResponseParam = <ResponseParam> tsArgument.representation

        response[responseParam.statusCode || this.httpStatusOK] = {
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
    let content: { [key: string]: MediaType }

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

  /**
   * fetch standard mapping annotation by used annotation
   */
  private mapAnnotations(used: string): string {
    return this.oasConfig.annotationsMap[used] || used
  }
}

export { OasResponseGenerator }
