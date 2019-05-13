import { GraphQLConfig } from '../../lib/interfaces/tsmeta.config';
import { TsClass } from '../../lib/interfaces/tsmeta.schema';
/**
 * class GraphQLSchemaGenerator
 */
declare class GraphQLSchemaGenerator {
    private readonly graphQLConfig;
    private graphQLPropertyGenerator;
    constructor(graphQLConfig: GraphQLConfig);
    /**
     * generate GraphQL schema
     */
    generate(tsClass: TsClass): string;
}
export { GraphQLSchemaGenerator };
//# sourceMappingURL=graphql.schema.generator.d.ts.map