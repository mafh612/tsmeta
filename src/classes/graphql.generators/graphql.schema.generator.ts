import { GraphQLConfig } from '../../lib/interfaces/tsmeta.config'
import { TsClass, TsProperty } from '../../lib/interfaces/tsmeta.schema'
import { GraphQLPropertyGenerator } from './graphql.property.generator'

/**
 * class GraphQLSchemaGenerator
 */
class GraphQLSchemaGenerator {

  private graphQLPropertyGenerator: GraphQLPropertyGenerator

  constructor(private readonly graphQLConfig: GraphQLConfig) {}

  /**
   * generate GraphQL schema
   */
  public generate(tsClass: TsClass): string {
    this.graphQLPropertyGenerator = new GraphQLPropertyGenerator(this.graphQLConfig)

    const properties: string[] = tsClass.properties
      .map((tsProperty: TsProperty) => this.graphQLPropertyGenerator.generate(tsProperty))
      .filter((line: string) => !!line)

    return `type ${tsClass.name} {\n\t${properties.join('\n\t')}\n}`
  }
}

export { GraphQLSchemaGenerator }
