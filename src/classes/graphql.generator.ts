import { buildSchema, GraphQLSchema } from 'graphql'
import { GraphQLConfig } from '../lib/tsmeta.config'
import { TsDecorator, TsFile, TsMeta, TsProgram } from '../lib/tsmeta.schema'
// import { GraphQLSchemaGenerator } from './graphql.generators/graphql.schema.generator'

/**
 * class GraphQLGenerator
 */
class GraphQLGenerator {

  private graphQLConfig: GraphQLConfig
  // private graphQLSchemaGenerator: GraphQLSchemaGenerator = new GraphQLSchemaGenerator()

  /**
   * generate GraphQLSchema files
   * @param tsMeta
   */
  public generate(tsMeta: TsMeta, graphQLConfig: GraphQLConfig): { [key: string]: GraphQLSchema } {
    this.graphQLConfig = graphQLConfig
    const graphQLSchema: { [key: string]: GraphQLSchema } = {}

    const models: TsFile[] = this.filterModel(tsMeta)

    console.log(models) // tslint:disable-line

    graphQLSchema.Any = buildSchema('union Any: Boolean | Int | Float | String')

    /* models.forEach((model: TsFile) => {
      graphQLSchema[model.tsClass.name] = this.graphQLSchemaGenerator.generate(model.tsClass)
    }) */

    return graphQLSchema
  }
  /**
   * filter TsMeta schema for Model annotated classes
   */
  private filterModel(tsMeta: TsMeta): TsFile[] {
    const modelAnnotation: string = this.graphQLConfig.annotation || 'Model'

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
}

export { GraphQLGenerator }
