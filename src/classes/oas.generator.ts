import * as deepAssign from 'deep-assign'
import { Components, Info, Openapi, PathItem, SecurityRequirement, Server, Tag } from '../resources/openapispec'
import { OasConfig } from '../resources/tsmeta.config'
import { TsArgument, TsDecorator, TsFile, TsMeta, TsMethod, TsProgram } from '../resources/tsmeta.schema'
import { OasPathGenerator } from './oas.generators/oas.path.generator'

/**
 * class OasGenerator
 */
class OasGenerator {

  private oasConfig: OasConfig
  private oasPathGenerator: OasPathGenerator
  private controllerAnnotation: string

  /**
   * generate openapi specification
   */
  public generate(tsMeta: TsMeta, oasConfig: OasConfig): Openapi {
    this.oasConfig = oasConfig
    this.oasPathGenerator = new OasPathGenerator(this.oasConfig)
    this.controllerAnnotation = oasConfig.annotationsMap.Controller || 'Controller'

    const controllerFiles: TsFile[] = this.filterController(tsMeta)
    const modelFiles: TsFile[] = this.filterModel(tsMeta)

    console.log(`${modelFiles}`) // tslint:disable-line

    const components: Components = undefined
    const info: Info = undefined

    const paths: { [key: string]: PathItem } = this.constructPaths(controllerFiles)

    const openapi: string = undefined
    const security: SecurityRequirement[] = undefined
    const servers: Server[] = undefined
    const tags: Tag[] = undefined

    return {
      components,
      info,
      paths,
      openapi,
      security,
      servers,
      tags
    }
  }

  /**
   * filter TsMeta schema for Controller annotated classes
   */
  private filterController(tsMeta: TsMeta): TsFile[] {
    const tsFiles: TsFile[] = []

    tsMeta.programs.forEach((tsProgram: TsProgram) => {
      tsProgram.files.forEach((tsFile: TsFile) => {
        if (tsFile.tsClass
          && tsFile.tsClass.decorators
          && tsFile.tsClass.decorators.some((tsDecorator: TsDecorator) => tsDecorator.name === this.controllerAnnotation)) {
          tsFiles.push(tsFile)
        }
      })
    })

    return tsFiles
  }

  /**
   * filter TsMeta schema for Model annotated classes
   */
  private filterModel(tsMeta: TsMeta): TsFile[] {
    const modelAnnotation: string = this.oasConfig.annotationsMap.Model || 'Model'

    const tsFiles: TsFile[] = []

    tsMeta.programs.forEach((tsProgram: TsProgram) => {
      tsProgram.files.forEach((tsFile: TsFile) => {
        if (tsFile.tsClass
          && tsFile.tsClass.decorators
          && tsFile.tsClass.decorators.some((tsDecorator: TsDecorator) => tsDecorator.name === modelAnnotation)) {
          tsFiles.push(tsFile)
        }
      })
    })

    return tsFiles
  }

  /**
   * construct pathItems
   */
  private constructPaths(files: TsFile[]): { [key: string]: PathItem } {
    let paths: { [key: string]: PathItem } = {}

    files.forEach((tsFile: TsFile) => {
      const controllerDecorator: TsDecorator = tsFile.tsClass.decorators.find((tsDecorator: TsDecorator) => tsDecorator.name === this.controllerAnnotation)
      const controllerArgument: TsArgument = controllerDecorator.tsarguments.pop()

      tsFile.tsClass.methods.forEach((tsMethod: TsMethod) => {
        paths = deepAssign(paths, this.oasPathGenerator.generate(controllerArgument.representation, tsMethod, this.oasConfig))
      })
    })

    return paths
  }
}

export { OasGenerator }
