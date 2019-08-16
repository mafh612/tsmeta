import { merge } from 'lodash'
import { Components, Info, Openapi, Parameter, PathItem, Schema, SecurityRequirement, Server, Tag } from 'oasmodel'
import { GetMappedAnnotation } from '../lib/annotations.mapping'
import { last } from '../lib/array.reducer'
import { TypescriptTypes } from '../lib/enums/typescript.types.enum'
import { ModelParam } from '../lib/interfaces/annotation.schema'
import { OasConfig } from '../lib/interfaces/tsmeta.config'
import {
  TsArgument,
  TsDecorator,
  TsFile,
  TsMeta,
  TsMethod,
  TsParameter,
  TsProgram,
  TsProperty,
} from '../lib/interfaces/tsmeta.schema'
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

  constructor(private readonly oasConfig: OasConfig) {}

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
      openapi,
      paths,
      security,
      servers,
      tags,
    }
  }

  /**
   * filter TsMeta schema for Controller annotated classes
   */
  private filterController(tsMeta: TsMeta): TsFile[] {
    const tsFiles: TsFile[] = []

    tsMeta.programs.forEach((tsProgram: TsProgram) => {
      tsProgram.files.forEach((tsFile: TsFile) => {
        if (
          tsFile.tsClass &&
          tsFile.tsClass.decorators &&
          tsFile.tsClass.decorators.some(
            (tsDecorator: TsDecorator) => tsDecorator.name === GetMappedAnnotation('Controller'),
          )
        ) {
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
        if (
          tsFile.tsClass &&
          tsFile.tsClass.decorators &&
          tsFile.tsClass.decorators.some(
            (tsDecorator: TsDecorator) => tsDecorator.name === GetMappedAnnotation('Model'),
          )
        ) {
          tsFiles.push(tsFile)
        }
      })
    })

    return tsFiles
  }

  /**
   * construct pathItems from TsFile
   */
  private constructPaths(files: TsFile[]): { [key: string]: PathItem } {
    this.oasPathGenerator = new OasPathGenerator(this.oasConfig)

    let paths: { [key: string]: PathItem } = {}

    files.forEach((tsFile: TsFile) => {
      const controllerDecorator: TsDecorator = tsFile.tsClass.decorators.find(
        (tsDecorator: TsDecorator) => tsDecorator.name === GetMappedAnnotation('Controller'),
      )
      const controllerParams: Parameter[] = tsFile.tsClass.decorators
        .filter((tsDecorator: TsDecorator) => tsDecorator.name === GetMappedAnnotation('ControllerParam'))
        .map((tsDecorator: TsDecorator) => this.createControllerParams(tsDecorator))
      const controllerArgument: TsArgument = controllerDecorator.tsarguments.reduce(last)

      tsFile.tsClass.methods.forEach((tsMethod: TsMethod) => {
        const path: { [key: string]: PathItem } = this.oasPathGenerator.generate(
          tsFile.tsClass.name,
          controllerArgument.representation,
          tsMethod,
          controllerParams,
        )

        paths = merge(paths, path)
      })
    })

    return paths
  }

  /**
   * create controller params from TsDecorator
   */
  private createControllerParams(controllerParamDecorator: TsDecorator): Parameter {
    this.oasParameterGenerator = new OasParameterGenerator()

    const tsParameter: TsParameter = {
      decorators: [controllerParamDecorator],
      name: controllerParamDecorator.tsarguments[0].representation.name,
      tstype: {
        basicType: 'string',
        typescriptType: TypescriptTypes.BASIC,
      },
    }

    return this.oasParameterGenerator.generate(tsParameter)
  }

  /**
   * construct schemas from  TsFile
   */
  private constructSchemas(files: TsFile[]): { [key: string]: Schema } {
    this.oasSchemaGenerator = new OasSchemaGenerator()

    const schemas: { [key: string]: Schema } = {}

    files.forEach((tsFile: TsFile) => {
      const modelDecorator: TsDecorator = tsFile.tsClass.decorators.find(
        (tsDecorator: TsDecorator) => tsDecorator.name === GetMappedAnnotation('Model'),
      )
      const modelParam: ModelParam = modelDecorator.tsarguments
        ? modelDecorator.tsarguments.reduce(last).representation
        : {}
      const version: string = modelParam && modelParam.version ? `_${modelParam.version}` : ''

      const schemaName: string = `${tsFile.tsClass.name}${version}`
      let properties: { [key: string]: Schema } = {}

      schemas[schemaName] = {}

      tsFile.tsClass.properties.forEach((tsProperty: TsProperty) => {
        properties = {
          ...properties,
          ...this.oasSchemaGenerator.generate(modelParam, tsProperty),
        }
      })

      const example: any = modelParam.example

      schemas[schemaName] = {
        example,
        properties,
        type: 'object',
      }
    })

    return schemas
  }
}

export { OasGenerator }
