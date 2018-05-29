import * as deepAssign from 'deep-assign'
import { Components, Info, Openapi, Parameter, PathItem, Schema, SecurityRequirement, Server, Tag } from 'oasmodel'

import { TypescriptTypes } from '..'
import { ModelParam } from '../lib/annotation.schema'
import { OasConfig } from '../lib/tsmeta.config'
import { TsArgument, TsDecorator, TsFile, TsMeta, TsMethod, TsParameter, TsProgram, TsProperty } from '../lib/tsmeta.schema'
import { OasParameterGenerator } from './oas.generators/oas.parameter.generator'
import { OasPathGenerator } from './oas.generators/oas.path.generator'
import { OasSchemaGenerator } from './oas.generators/oas.schema.generator'

/**
 * class OasGenerator
 */
class OasGenerator {

  private oasPathGenerator: OasPathGenerator
  private oasParameterGenerator: OasParameterGenerator
  private oasSchemaGenerator: OasSchemaGenerator

  constructor(private oasConfig: OasConfig) {}

  /**
   * generate openapi specification
   */
  public generate(tsMeta: TsMeta): Openapi {
    const controllerFiles: TsFile[] = this.filterController(tsMeta)
    const modelFiles: TsFile[] = this.filterModel(tsMeta)

    const components: Components = {}
    const info: Info = undefined

    const paths: { [key: string]: PathItem } = this.constructPaths(controllerFiles)
    components.schemas = this.constructSchemas(modelFiles)

    const openapi: string = this.oasConfig.openapistring || '3.0.0'
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
          && tsFile.tsClass.decorators.some((tsDecorator: TsDecorator) => tsDecorator.name === this.mapAnnotations('Controller'))) {
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
    const tsFiles: TsFile[] = []

    tsMeta.programs.forEach((tsProgram: TsProgram) => {
      tsProgram.files.forEach((tsFile: TsFile) => {
        if (tsFile.tsClass
          && tsFile.tsClass.decorators
          && tsFile.tsClass.decorators.some((tsDecorator: TsDecorator) => tsDecorator.name === this.mapAnnotations('Model'))) {
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
      console.log(tsFile) // tslint:disable-line
      const controllerDecorator: TsDecorator = tsFile.tsClass.decorators.find((tsDecorator: TsDecorator) => tsDecorator.name === this.mapAnnotations('Controller'))
      const controllerParams: Parameter[] = tsFile.tsClass.decorators
        .filter((tsDecorator: TsDecorator) => tsDecorator.name === this.mapAnnotations('ControllerParam'))
        .map((tsDecorator: TsDecorator) => this.createControllerParams(tsDecorator))
      const controllerArgument: TsArgument = controllerDecorator.tsarguments.pop()

      tsFile.tsClass.methods.forEach((tsMethod: TsMethod) => {
        const path: { [key: string]: PathItem } = this.oasPathGenerator.generate(tsFile.tsClass.name, controllerArgument.representation, tsMethod, controllerParams)

        paths = deepAssign(paths, path)
      })
    })

    return paths
  }

  /**
   * create controller params
   */
  private createControllerParams(controllerParamDecorator: TsDecorator): Parameter {
    this.oasParameterGenerator = new OasParameterGenerator(this.oasConfig)

    const tsParameter: TsParameter = {
      decorators: [controllerParamDecorator],
      name: controllerParamDecorator.tsarguments[0].representation.name,
      tstype: {
        basicType: 'string',
        typescriptType: TypescriptTypes.BASIC
      }
    }

    return this.oasParameterGenerator.generate(tsParameter)
  }

  /**
   * construct schemas
   */
  private constructSchemas(files: TsFile[]): { [key: string]: Schema } {
    this.oasSchemaGenerator = new OasSchemaGenerator(this.oasConfig)

    const schemas: { [key: string]: Schema } = {}

    files.forEach((tsFile: TsFile) => {
      const modelDecorator: TsDecorator = tsFile.tsClass.decorators.find((tsDecorator: TsDecorator) => tsDecorator.name === this.mapAnnotations('Model'))
      const modelParam: ModelParam = modelDecorator.tsarguments ? modelDecorator.tsarguments.pop().representation : {}
      const version: string = (modelParam && modelParam.version) ? `_${modelParam.version}` : ''

      const schemaName: string = `${tsFile.tsClass.name}${version}`
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

  /**
   * fetch standard mapping annotation by used annotation
   */
  private mapAnnotations(used: string): string {
    return this.oasConfig.annotationsMap[used] || used
  }
}

export { OasGenerator }
