import { Parameter } from 'oasmodel'
import { ParameterParam } from '../../lib/annotation.schema'
import { GetMappedAnnotation } from '../../lib/annotations.mapping'
import { TsDecorator, TsParameter } from '../../lib/tsmeta.schema'

/**
 * class OasParameterGenerator
 */
class OasParameterGenerator {

  private parameterAnnotations: string[] = ['PathVariable', 'RequestParam', 'RequestHeader', 'CookieValue', 'ControllerParam']
  private parameterAnnotationMap: { [key: string]: string } = {
    PathVariable: 'path',
    RequestParam: 'query',
    RequestHeader: 'header',
    CookieValue: 'cookie'
  }

  /**
   * generate Parameter
   */
  public generate(tsParameter: TsParameter): Parameter {
    let parameterDecorator: TsDecorator

    if (tsParameter.decorators) {
      parameterDecorator = tsParameter.decorators.find((tsDecorator: TsDecorator) => this.parameterAnnotations.includes(GetMappedAnnotation(tsDecorator.name)))
    }

    if (!parameterDecorator) return undefined

    const parameterArgument: ParameterParam = parameterDecorator.tsarguments.pop().representation

    const $ref: string = parameterArgument.ref
    const allowEmptyValue: boolean = !parameterArgument.required
    const deprecated: boolean = false
    const description: string = parameterArgument.description ? parameterArgument.description : `${parameterDecorator.name} ${tsParameter.name}`
    const example: any = parameterArgument.example
    const _in: string = parameterArgument.in ? parameterArgument.in : this.parameterAnnotationMap[GetMappedAnnotation(parameterDecorator.name)]
    const name: string = parameterArgument.name

    const requiredFields: any[] = this.requiredFields(parameterArgument)
    const required: boolean = <boolean> requiredFields.shift()

    const schema: any = parameterArgument.schema || { type: 'string' }
    schema.required = requiredFields

    return {
      $ref,
      allowEmptyValue,
      deprecated,
      description,
      example,
      in: _in,
      name,
      required,
      schema
    }
  }

  /**
   * collect from required field
   */
  private requiredFields(parameterParam: ParameterParam): any[] {
    if (!parameterParam || !parameterParam.required) return [false]
    if (!Array.isArray(parameterParam.required)) return [<boolean> parameterParam.required]

    return <(boolean|string)[]> parameterParam.required
  }
}

export { OasParameterGenerator }
