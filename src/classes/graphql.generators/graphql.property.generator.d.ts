import { GraphQLConfig } from '../../lib/interfaces/tsmeta.config';
import { TsProperty } from '../../lib/interfaces/tsmeta.schema';
/**
 * class GraphQLPropertyGenerator
 */
declare class GraphQLPropertyGenerator {
    private readonly graphQLConfig;
    constructor(graphQLConfig: GraphQLConfig);
    /**
     * generate single schema property
     */
    generate(tsProperty: TsProperty): string;
    /**
     * map typescript types to graphql types
     */
    private mapTypeToGraphQLType;
}
export { GraphQLPropertyGenerator };
//# sourceMappingURL=graphql.property.generator.d.ts.map