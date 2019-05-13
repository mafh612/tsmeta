"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_property_generator_1 = require("./graphql.property.generator");
/**
 * class GraphQLSchemaGenerator
 */
class GraphQLSchemaGenerator {
    constructor(graphQLConfig) {
        this.graphQLConfig = graphQLConfig;
    }
    /**
     * generate GraphQL schema
     */
    generate(tsClass) {
        this.graphQLPropertyGenerator = new graphql_property_generator_1.GraphQLPropertyGenerator(this.graphQLConfig);
        const properties = tsClass.properties
            .map((tsProperty) => this.graphQLPropertyGenerator.generate(tsProperty))
            .filter((line) => !!line);
        return `type ${tsClass.name} {\n\t${properties.join('\n\t')}\n}`;
    }
}
exports.GraphQLSchemaGenerator = GraphQLSchemaGenerator;
//# sourceMappingURL=graphql.schema.generator.js.map