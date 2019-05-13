import { GraphQLConfig } from '../lib/interfaces/tsmeta.config';
import { TsMeta } from '../lib/interfaces/tsmeta.schema';
/**
 * class GraphQLGenerator
 */
declare class GraphQLGenerator {
    private readonly graphQLConfig;
    private readonly graphQLSchemaGenerator;
    constructor(graphQLConfig: GraphQLConfig);
    /**
     * generate GraphQLSchema files
     */
    generate(tsMeta: TsMeta): {
        [key: string]: string;
    };
    /**
     * filter TsMeta schema for Model annotated classes
     */
    private filterModel;
}
export { GraphQLGenerator };
//# sourceMappingURL=graphql.generator.d.ts.map