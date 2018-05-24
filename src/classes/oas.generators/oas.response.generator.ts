import { MediaType, Response, Schema } from 'oasmodel'
import { ResponseParam } from '../../lib/annotation.schema'
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
      const responseArgument: TsArgument = responseDecorator.tsarguments.pop()
      const responseParam: ResponseParam = responseArgument
        ? <ResponseParam> responseArgument.representation
        : undefined
      const statusCode: number = responseParam && responseParam.statusCode || this.httpStatusOK

      response[statusCode] = {
        content: this.createContent(responseParam),
        description: this.createDescription(responseDecorator, responseParam)
      }
    })

    return response
  }

  /**
   * create description string
   */
  private createDescription(tsDecorator: TsDecorator, responseParam: ResponseParam): string {
    return !!responseParam ? tsDecorator.name : 'no content'
  }

  /**
   * create response content
   */
  private createContent(responseParam: ResponseParam): { [key: string]: MediaType } {
    let content: { [key: string]: MediaType }
    const version: string = (responseParam && responseParam.version) ? `_${responseParam.version}` : ''

    if (!responseParam) {
      content = undefined
    }

    if (responseParam && responseParam.ref) {
      content = {
        'application/json': {
          schema: {
            $ref: `#/components/schemas/${responseParam.ref}${version}`
          }
        }
      }
    }

    if (responseParam && responseParam.res) {
      const schema: Schema = {
        properties: {},
        example: responseParam.example || undefined
      }

      Object.keys(responseParam.res).forEach((key: string) => {
        schema.properties[key] = { type: responseParam.res[key] }
      })

      content = {
        'application/json': {
          schema
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
