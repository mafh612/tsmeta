import { buildSchema, GraphQLSchema } from 'graphql'
import { TsClass, TsProperty } from '../../lib/tsmeta.schema'
import { GraphQLPropertyGenerator } from './graphql.property.generator'

/**
 * class GraphQLSchemaGenerator
 */
class GraphQLSchemaGenerator {

  private graphQLPropertyGenerator: GraphQLPropertyGenerator

  /**
   * generate GraphQL schema
   */
  public generate(tsClass: TsClass): GraphQLSchema {
    this.graphQLPropertyGenerator = new GraphQLPropertyGenerator()

    const properties: string[] = tsClass.properties
      .map((tsProperty: TsProperty) => this.graphQLPropertyGenerator.generate(tsProperty))
      .filter((line: string) => !!line)

    const schemaString: string = `type ${tsClass.name} {\n\t${properties.join('\n\t')}\n}`

    console.log(schemaString) // tslint:disable-line

    return buildSchema(schemaString)
  }
}

export { GraphQLSchemaGenerator }
