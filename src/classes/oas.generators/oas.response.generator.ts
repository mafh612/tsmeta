import { MediaType, Response, Schema } from 'oasmodel'
// import { GetMappedAnnotation } from '../../lib/annotations.mapping'
import { last } from '../../lib/array.reducer'
import { ResponseParam } from '../../lib/interfaces/annotation.schema'
import { TsArgument, TsDecorator, TsMethod } from '../../lib/interfaces/tsmeta.schema'

/**
 * class OasResponseGenerator
 */
class OasResponseGenerator {
  private readonly httpStatusOK: number = 200

  /**
   * generate Response
   */
  public generate(tsMethod: TsMethod): { [key: number]: Response } {
    const responseDecorators: TsDecorator[] = tsMethod.decorators.filter((tsDecorator: TsDecorator) =>
      tsDecorator.name.includes('Response')
    )
    const responses: { [key: string]: Response } = {}

    // GetMappedAnnotation('any') // tslint:disable-line

    responseDecorators.forEach((responseDecorator: TsDecorator) => {
      const responseArgument: TsArgument =
        responseDecorator.tsarguments && responseDecorator.tsarguments.reduce(last, undefined)
      const responseParam: ResponseParam = responseArgument
        ? (responseArgument.representation as ResponseParam)
        : undefined
      const statusCode: number = (responseParam && responseParam.statusCode) || this.httpStatusOK

      responses[statusCode] = { ...this.createContent(responseParam) }
      responses[statusCode].description =
        (responseParam && responseParam.description) || this.createDescription(responseDecorator, responseParam)

      if ('$ref' in responses[statusCode]) {
        responses[statusCode] = { $ref: responses[statusCode].$ref }
      }
    })

    if (!Object.keys(responses).length) {
      responses[this.httpStatusOK] = {
        content: { 'application/json': { schema: { type: 'string' } } },
        description: 'SuccessResponse'
      }
    }

    return responses
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
    const version: string = responseParam && responseParam.version ? `_${responseParam.version}` : ''

    if (!responseParam) {
      content = undefined
    }

    if (responseParam && responseParam.responseRef) {
      return { $ref: `#/components/responses/${responseParam.responseRef}${version}` }
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

    if (responseParam && responseParam.schema) {
      const schema: Schema = {
        example: responseParam.example || undefined,
        properties: {}
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
