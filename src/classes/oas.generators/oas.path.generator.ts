import { MappingAnnotations } from '../../resources/mapping.annotation.enum'
import { PathItem } from '../../resources/openapispec'
import { OasConfig } from '../../resources/tsmeta.config'
import { TsDecorator, TsMethod } from '../../resources/tsmeta.schema'
import { OasOperationGenerator } from './oas.operation.generator'

/**
 * class OasPathGenerator
 */
class OasPathGenerator {

  private oasOperationGeneration: OasOperationGenerator

  constructor(private oasConfig: OasConfig) {}

  /**
   * generated PathItem
   */
  public generate(controllerPath: string, tsMethod: TsMethod): { [key: string]: PathItem } {
    const pathItem: { [key: string]: PathItem } = {}

    const usedMappingAnnotation: string[] = this.combineMappingAnnotations()

    const mappingDecorator: TsDecorator = tsMethod.decorators.reduce((curr: TsDecorator, prev: TsDecorator): TsDecorator => {
      if (usedMappingAnnotation.includes(curr.name)) return curr

      // istanbul ignore next
      return prev
    })

    const methodPath: string = mappingDecorator.tsarguments.pop().representation
    const fullPath: string = this.createFullPath(controllerPath, methodPath)

    this.oasOperationGeneration = new OasOperationGenerator(this.oasConfig)

    switch (this.mapAnnotations(mappingDecorator.name)) {
      case MappingAnnotations.GET.name:
        pathItem[fullPath] = { get: this.oasOperationGeneration.generate(tsMethod) }
        break
      case MappingAnnotations.POST.name:
        pathItem[fullPath] = { post: this.oasOperationGeneration.generate(tsMethod) }
        break
      case MappingAnnotations.PUT.name:
        pathItem[fullPath] = { put: this.oasOperationGeneration.generate(tsMethod) }
        break
      case MappingAnnotations.PATCH.name:
        pathItem[fullPath] = { patch: this.oasOperationGeneration.generate(tsMethod) }
        break
      case MappingAnnotations.DELETE.name:
        pathItem[fullPath] = { delete: this.oasOperationGeneration.generate(tsMethod) }
        break
      case MappingAnnotations.HEAD.name:
        pathItem[fullPath] = { head: this.oasOperationGeneration.generate(tsMethod) }
        break
      // istanbul ignore next
      default:
    }

    return pathItem
  }

  /**
   * combined set mapping annotations to string array
   */
  private combineMappingAnnotations(): string[] {
    const usedMappingAnnotation: string[] = []

    usedMappingAnnotation.push(this.oasConfig.annotationsMap.GetRequest || 'GetRequest')
    usedMappingAnnotation.push(this.oasConfig.annotationsMap.PostRequest || 'PostRequest')
    usedMappingAnnotation.push(this.oasConfig.annotationsMap.PutRequest || 'PutRequest')
    usedMappingAnnotation.push(this.oasConfig.annotationsMap.PatchRequest || 'PatchRequest')
    usedMappingAnnotation.push(this.oasConfig.annotationsMap.DeleteRequest || 'DeleteRequest')
    usedMappingAnnotation.push(this.oasConfig.annotationsMap.HeadRequest || 'HeadRequest')

    return usedMappingAnnotation
  }

  /**
   * fetch standard mapping annotation by used annotation
   */
  private mapAnnotations(used: string): string {
    return this.oasConfig.annotationsMap[used] || used
  }

  /**
   * create full pathing
   */
  private createFullPath(controllerPath: string, methodPath: string): string {
    const controllerPathArray: string[] = controllerPath .split('/').filter((part: string) => part !== '')
    const methodPathArray: string[] = methodPath .split('/').filter((part: string) => part !== '')

    const fullPathArray: string[] = controllerPathArray.concat(methodPathArray)
    fullPathArray.forEach((pathString: string) => {
      if (pathString.startsWith(':')) {
        return `{${pathString.replace(':', '')}}`
      }
    })

    return fullPathArray.join('/')
  }
}

export { OasPathGenerator }
