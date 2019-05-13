"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const annotations_mapping_1 = require("../lib/annotations.mapping");
const array_reducer_1 = require("../lib/array.reducer");
const typescript_types_enum_1 = require("../lib/enums/typescript.types.enum");
const oas_parameter_generator_1 = require("./oas.generators/oas.parameter.generator");
const oas_path_generator_1 = require("./oas.generators/oas.path.generator");
const oas_schema_generator_1 = require("./oas.generators/oas.schema.generator");
/**
 * class OasGenerator
 */
class OasGenerator {
    constructor(oasConfig) {
        this.oasConfig = oasConfig;
    }
    /**
     * generate openapi specification
     */
    generate(tsMeta) {
        const controllerFiles = this.filterController(tsMeta);
        const modelFiles = this.filterModel(tsMeta);
        const components = {};
        const info = undefined;
        const paths = this.constructPaths(controllerFiles);
        components.schemas = this.constructSchemas(modelFiles);
        const openapi = this.oasConfig.openapistring || '3.0.0';
        const security = undefined;
        const servers = undefined;
        const tags = undefined;
        return {
            components,
            info,
            openapi,
            paths,
            security,
            servers,
            tags
        };
    }
    /**
     * filter TsMeta schema for Controller annotated classes
     */
    filterController(tsMeta) {
        const tsFiles = [];
        tsMeta.programs.forEach((tsProgram) => {
            tsProgram.files.forEach((tsFile) => {
                if (tsFile.tsClass && tsFile.tsClass.decorators && tsFile.tsClass.decorators.some((tsDecorator) => tsDecorator.name === annotations_mapping_1.GetMappedAnnotation('Controller'))) {
                    tsFiles.push(tsFile);
                }
            });
        });
        return tsFiles;
    }
    /**
     * filter TsMeta schema for Model annotated classes
     */
    filterModel(tsMeta) {
        const tsFiles = [];
        tsMeta.programs.forEach((tsProgram) => {
            tsProgram.files.forEach((tsFile) => {
                if (tsFile.tsClass && tsFile.tsClass.decorators && tsFile.tsClass.decorators.some((tsDecorator) => tsDecorator.name === annotations_mapping_1.GetMappedAnnotation('Model'))) {
                    tsFiles.push(tsFile);
                }
            });
        });
        return tsFiles;
    }
    /**
     * construct pathItems from TsFile
     */
    constructPaths(files) {
        this.oasPathGenerator = new oas_path_generator_1.OasPathGenerator(this.oasConfig);
        let paths = {};
        files.forEach((tsFile) => {
            const controllerDecorator = tsFile.tsClass.decorators.find((tsDecorator) => tsDecorator.name === annotations_mapping_1.GetMappedAnnotation('Controller'));
            const controllerParams = tsFile.tsClass.decorators
                .filter((tsDecorator) => tsDecorator.name === annotations_mapping_1.GetMappedAnnotation('ControllerParam'))
                .map((tsDecorator) => this.createControllerParams(tsDecorator));
            const controllerArgument = controllerDecorator.tsarguments.reduce(array_reducer_1.last);
            tsFile.tsClass.methods.forEach((tsMethod) => {
                const path = this.oasPathGenerator.generate(tsFile.tsClass.name, controllerArgument.representation, tsMethod, controllerParams);
                paths = lodash_1.merge(paths, path);
            });
        });
        return paths;
    }
    /**
     * create controller params from TsDecorator
     */
    createControllerParams(controllerParamDecorator) {
        this.oasParameterGenerator = new oas_parameter_generator_1.OasParameterGenerator();
        const tsParameter = {
            decorators: [controllerParamDecorator],
            name: controllerParamDecorator.tsarguments[0].representation.name,
            tstype: {
                basicType: 'string',
                typescriptType: typescript_types_enum_1.TypescriptTypes.BASIC
            }
        };
        return this.oasParameterGenerator.generate(tsParameter);
    }
    /**
     * construct schemas from  TsFile
     */
    constructSchemas(files) {
        this.oasSchemaGenerator = new oas_schema_generator_1.OasSchemaGenerator();
        const schemas = {};
        files.forEach((tsFile) => {
            const modelDecorator = tsFile.tsClass.decorators.find((tsDecorator) => tsDecorator.name === annotations_mapping_1.GetMappedAnnotation('Model'));
            const modelParam = modelDecorator.tsarguments ? modelDecorator.tsarguments.reduce(array_reducer_1.last).representation : {};
            const version = modelParam && modelParam.version ? `_${modelParam.version}` : '';
            const schemaName = `${tsFile.tsClass.name}${version}`;
            let properties = {};
            schemas[schemaName] = {};
            tsFile.tsClass.properties.forEach((tsProperty) => {
                properties = {
                    ...properties,
                    ...this.oasSchemaGenerator.generate(modelParam, tsProperty)
                };
            });
            const example = modelParam.example;
            schemas[schemaName] = {
                example,
                properties,
                type: 'object'
            };
        });
        return schemas;
    }
}
exports.OasGenerator = OasGenerator;
//# sourceMappingURL=oas.generator.js.map