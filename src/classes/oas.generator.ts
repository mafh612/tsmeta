import * as deepAssign from 'deep-assign'
import { ModelParam } from '..'
import { Components, Info, Openapi, PathItem, Schema, SecurityRequirement, Server, Tag } from '../resources/openapispec'
import { OasConfig } from '../resources/tsmeta.config'
import { TsArgument, TsDecorator, TsFile, TsMeta, TsMethod, TsProgram, TsProperty } from '../resources/tsmeta.schema'
import { OasPathGenerator } from './oas.generators/oas.path.generator'
import { OasSchemaGenerator } from './oas.generators/oas.schema.generator'

/**
 * class OasGenerator
 */
class OasGenerator {

  private oasConfig: OasConfig
  private oasPathGenerator: OasPathGenerator
  private oasSchemaGenerator: OasSchemaGenerator
  private controllerAnnotation: string
  private modelAnnotation: string

  /**
   * generate openapi specification
   */
  public generate(tsMeta: TsMeta, oasConfig: OasConfig): Openapi {
    this.oasConfig = oasConfig
    this.controllerAnnotation = oasConfig.annotationsMap.Controller || 'Controller'
    this.modelAnnotation = oasConfig.annotationsMap.Model || 'Model'

    const controllerFiles: TsFile[] = this.filterController(tsMeta)
    const modelFiles: TsFile[] = this.filterModel(tsMeta)

    const components: Components = {}
    const info: Info = undefined

    const paths: { [key: string]: PathItem } = this.constructPaths(controllerFiles)
    components.schemas = this.constructSchemas(modelFiles)

    const openapi: string = '3.0.0'
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
    this.oasPathGenerator = new OasPathGenerator(this.oasConfig)

    let paths: { [key: string]: PathItem } = {}

    files.forEach((tsFile: TsFile) => {
      const controllerDecorator: TsDecorator = tsFile.tsClass.decorators.find((tsDecorator: TsDecorator) => tsDecorator.name === this.controllerAnnotation)
      const controllerArgument: TsArgument = controllerDecorator.tsarguments.pop()

      tsFile.tsClass.methods.forEach((tsMethod: TsMethod) => {
        paths = deepAssign(paths, this.oasPathGenerator.generate(tsFile.tsClass.name, controllerArgument.representation, tsMethod))
      })
    })

    return paths
  }

  /**
   * construct schemas
   */
  private constructSchemas(files: TsFile[]): { [key: string]: Schema } {
    this.oasSchemaGenerator = new OasSchemaGenerator(this.oasConfig)

    const schemas: { [key: string]: Schema } = {}

    files.forEach((tsFile: TsFile) => {
      const modelDecorator: TsDecorator = tsFile.tsClass.decorators.find((tsDecorator: TsDecorator) => tsDecorator.name === this.modelAnnotation)
      const modelParam: ModelParam = modelDecorator.tsarguments.pop().representation

      const schemaName: string = `${tsFile.tsClass.name}_${modelParam.version}`
      let properties: { [key: string]: Schema } = {}

      schemas[schemaName] = {}

      tsFile.tsClass.properties.forEach((tsProperty: TsProperty) => {
        properties = { ...properties, ...this.oasSchemaGenerator.generate(modelParam, tsProperty) }
      })

      const example: any = modelParam.example

      schemas[schemaName] = {
        type: 'object',
        properties,
        example
      }
    })

    return schemas
  }
}

export { OasGenerator }
