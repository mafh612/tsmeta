import { GraphQLConfig } from '../lib/interfaces/tsmeta.config'
import { TsDecorator, TsFile, TsMeta, TsProgram } from '../lib/interfaces/tsmeta.schema'
import { getMultiTypes, MultiType } from './graphql.generators/graphql.scalar.type.generator'
import { GraphQLSchemaGenerator } from './graphql.generators/graphql.schema.generator'

/**
 * class GraphQLGenerator
 */
class GraphQLGenerator {
  private readonly graphQLSchemaGenerator: GraphQLSchemaGenerator = new GraphQLSchemaGenerator(this.graphQLConfig)
  constructor(private readonly graphQLConfig: GraphQLConfig) {}

  /**
   * generate GraphQLSchema files
   */
  public generate(tsMeta: TsMeta): { [key: string]: string } {
    const graphQLSchema: { [key: string]: string } = {}

    const models: TsFile[] = this.filterModel(tsMeta)

    graphQLSchema.Any = 'scalar Any {\n\tstring: String\n\tboolean: Boolean\n\tint: Int\n\tfloat: Float\n}'

    models.forEach((model: TsFile) => {
      graphQLSchema[model.tsClass.name] = this.graphQLSchemaGenerator.generate(model.tsClass)
    })

    const multiTypes: MultiType[] = getMultiTypes()

    multiTypes.forEach((multiType: MultiType): void => {
      graphQLSchema[multiType.name] = `scalar ${multiType.name} {\n${multiType.multi
        .split('|')
        .map((it: string): string => `  ${it.trim().toLowerCase()}: ${it.trim()}\n`)
        .join('')}}`
    })

    return graphQLSchema
  }
  /**
   * filter TsMeta schema for Model annotated classes
   */
  private filterModel(tsMeta: TsMeta): TsFile[] {
    const modelAnnotation: string = this.graphQLConfig.modelAnnotation || 'Model'

    const tsFiles: TsFile[] = []

    tsMeta.programs.forEach((tsProgram: TsProgram) => {
      tsProgram.files.forEach((tsFile: TsFile) => {
        if (
          tsFile.tsClass &&
          tsFile.tsClass.decorators &&
          tsFile.tsClass.decorators.some((tsDecorator: TsDecorator) => tsDecorator.name === modelAnnotation)
        ) {
          tsFiles.push(tsFile)
        }
      })
    })

    return tsFiles
  }
}

export { GraphQLGenerator }
