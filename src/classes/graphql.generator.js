"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_schema_generator_1 = require("./graphql.generators/graphql.schema.generator");
/**
 * class GraphQLGenerator
 */
class GraphQLGenerator {
    constructor(graphQLConfig) {
        this.graphQLConfig = graphQLConfig;
        this.graphQLSchemaGenerator = new graphql_schema_generator_1.GraphQLSchemaGenerator(this.graphQLConfig);
    }
    /**
     * generate GraphQLSchema files
     */
    generate(tsMeta) {
        const graphQLSchema = {};
        const models = this.filterModel(tsMeta);
        graphQLSchema.Any = 'scalar Any {\n\tstring: String\n\tboolean: Boolean\n\tint: Int\n\tfloat: Float\n}';
        models.forEach((model) => {
            graphQLSchema[model.tsClass.name] = this.graphQLSchemaGenerator.generate(model.tsClass);
        });
        return graphQLSchema;
    }
    /**
     * filter TsMeta schema for Model annotated classes
     */
    filterModel(tsMeta) {
        const modelAnnotation = this.graphQLConfig.modelAnnotation || 'Model';
        const tsFiles = [];
        tsMeta.programs.forEach((tsProgram) => {
            tsProgram.files.forEach((tsFile) => {
                if (tsFile.tsClass
                    && tsFile.tsClass.decorators
                    && tsFile.tsClass.decorators.some((tsDecorator) => tsDecorator.name === modelAnnotation)) {
                    tsFiles.push(tsFile);
                }
            });
        });
        return tsFiles;
    }
}
exports.GraphQLGenerator = GraphQLGenerator;
//# sourceMappingURL=graphql.generator.js.map