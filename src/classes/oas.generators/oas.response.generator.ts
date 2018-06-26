import { MediaType, Response, Schema } from 'oasmodel'
import { ResponseParam } from '../../lib/annotation.schema'
import { GetMappedAnnotation } from '../../lib/annotations.mapping'
import { TsArgument, TsDecorator, TsMethod } from '../../lib/tsmeta.schema'

/**
 * class OasResponseGenerator
 */
class OasResponseGenerator {

  private httpStatusOK: number = 200

  /**
   * generate Response
   */
  public generate(tsMethod: TsMethod): { [key: number]: Response } {
    const responseDecorators: TsDecorator[] = tsMethod.decorators.filter((tsDecorator: TsDecorator) => tsDecorator.name.includes('Response'))
    const response: { [key: string]: Response } = {}

    GetMappedAnnotation('any') // tslint:disable-line

    responseDecorators.forEach((responseDecorator: TsDecorator) => {
      const responseArgument: TsArgument = responseDecorator.tsarguments.pop()
      const responseParam: ResponseParam = responseArgument
        ? <ResponseParam> responseArgument.representation
        : undefined
      const statusCode: number = responseParam && responseParam.statusCode || this.httpStatusOK

      response[statusCode] = { ...this.createContent(responseParam) }
      response[statusCode].description = (responseParam && responseParam.description) ? responseParam.description : this.createDescription(responseDecorator, responseParam)
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
  private createContent(responseParam: ResponseParam): Response {
    let content: { [key: string]: MediaType }
    const version: string = (responseParam && responseParam.version) ? `_${responseParam.version}` : ''

    if (!responseParam) {
      content = undefined
    }

    if (responseParam && responseParam.response_ref) {
      return { $ref: `#/components/responses/${responseParam.response_ref}${version}` }
    }

    if (responseParam && responseParam.ref) {
      content = {
        'applciation/json': {
          schema: {
            $ref: `#/components/schemas/${responseParam.ref}${version}`
          }
        }
      }
    }

    if (responseParam && responseParam.schema) {
      const schema: Schema = {
        properties: {},
        example: responseParam.example || undefined
      }

      Object.keys(responseParam.schema).forEach((key: string) => {
        schema.properties[key] = { type: responseParam.schema[key] }
      })

      content = {
        'application/json': {
          schema
        }
      }
    }

    return { content }
  }
}

export { OasResponseGenerator }
