import { Parameter, PathItem } from 'oasmodel'
import { GetMappedAnnotation, SetAnnoationsMapping } from '../../lib/annotations.mapping'
import { last } from '../../lib/array.reducer'
import { AnnotationsEnum } from '../../lib/enums/annotations.enum'
import { MappingAnnotations } from '../../lib/enums/mapping.annotation.enum'
import { OasConfig } from '../../lib/interfaces/tsmeta.config'
import { TsDecorator, TsMethod } from '../../lib/interfaces/tsmeta.schema'
import { OasOperationGenerator } from './oas.operation.generator'

/**
 * class OasPathGenerator
 */
class OasPathGenerator {

  private oasOperationGeneration: OasOperationGenerator
  private readonly standardMappingAnnotations: string[] = [
    AnnotationsEnum.GETMAPPING,
    AnnotationsEnum.POSTMAPPING,
    AnnotationsEnum.PUTMAPPING,
    AnnotationsEnum.PATCHMAPPING,
    AnnotationsEnum.DELETEMAPPING,
    AnnotationsEnum.HEADMAPPING
  ]

  constructor(private readonly oasConfig: OasConfig) {}

  /**
   * generated PathItem
   */
  public generate(
      controllerName: string,
      controllerPath: string,
      tsMethod: TsMethod,
      controllerParameters: Parameter[]): { [key: string]: PathItem } {
    SetAnnoationsMapping(this.oasConfig.annotationsMap)
    const pathItem: { [key: string]: PathItem } = {}

    const mappingDecorator: TsDecorator = tsMethod.decorators
      .find((it: TsDecorator): boolean => this.standardMappingAnnotations.includes(GetMappedAnnotation(it.name)))

    if (!mappingDecorator) return

    const methodPath: string = mappingDecorator.tsarguments.reduce(last).representation

    const fullPath: string = this.createFullPath(controllerPath, methodPath)

    this.oasOperationGeneration = new OasOperationGenerator()

    switch (GetMappedAnnotation(mappingDecorator.name)) {
      case MappingAnnotations.GET.name:
        pathItem[fullPath] = { get: this.oasOperationGeneration.generate(controllerName, tsMethod, controllerParameters) }
        break
      case MappingAnnotations.POST.name:
        pathItem[fullPath] = { post: this.oasOperationGeneration.generate(controllerName, tsMethod, controllerParameters) }
        break
      case MappingAnnotations.PUT.name:
        pathItem[fullPath] = { put: this.oasOperationGeneration.generate(controllerName, tsMethod, controllerParameters) }
        break
      case MappingAnnotations.PATCH.name:
        pathItem[fullPath] = { patch: this.oasOperationGeneration.generate(controllerName, tsMethod, controllerParameters) }
        break
      case MappingAnnotations.DELETE.name:
        pathItem[fullPath] = { delete: this.oasOperationGeneration.generate(controllerName, tsMethod, controllerParameters) }
        break
      case MappingAnnotations.HEAD.name:
        pathItem[fullPath] = { head: this.oasOperationGeneration.generate(controllerName, tsMethod, controllerParameters) }
        break
      default:
    }

    return pathItem
  }

  /**
   * create full pathing
   */
  private createFullPath(controllerPath: string, methodPath: string): string {
    const controllerPathArray: string[] = controllerPath
      .split('/')
      .filter((part: string) => part !== '')
    const methodPathArray: string[] = methodPath && methodPath
      .split('/')
      .filter((part: string) => part !== '') || []

    let fullPathArray: string[] = controllerPathArray.concat(methodPathArray)

    fullPathArray = fullPathArray.map((pathString: string) => {
      if (pathString.startsWith(':')) return `{${pathString.replace(':', '')}}` // tslint:disable-line

      return pathString
    })

    return `/${fullPathArray.join('/')}`
  }
}

export { OasPathGenerator }
