"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const lodash_1 = require("lodash");
const path_1 = require("path");
const YAML = require("yamljs");
const graphql_generator_1 = require("./classes/graphql.generator");
const oas_generator_1 = require("./classes/oas.generator");
const sigma_generator_1 = require("./classes/sigma.generator");
const tsmeta_factory_1 = require("./classes/tsmeta.factory");
/**
 * class TsMeta
 */
class TsMetaExecution {
    constructor(tsMetaConfigFilename) {
        this.tsMetaConfigFilename = 'tsmeta.config.json';
        if (tsMetaConfigFilename)
            this.tsMetaConfigFilename = tsMetaConfigFilename;
    }
    /**
     * execute tsmeta
     */
    execute() {
        this.tsMetaConfig = this.loadConfigFile();
        this.tsMeta = this.createTsMetaSchema();
        if (this.tsMetaConfig.sigmaConfig && this.tsMetaConfig.sigmaConfig.create) {
            this.sigmaGenerator = new sigma_generator_1.SigmaGenerator(this.tsMetaConfig.sigmaConfig);
            this.sigmaData = this.createSigma();
        }
        if (this.tsMetaConfig.oasConfig && this.tsMetaConfig.oasConfig.create) {
            this.oasGenerator = new oas_generator_1.OasGenerator(this.tsMetaConfig.oasConfig);
            this.openapi = this.createOpenapispec();
        }
        if (this.tsMetaConfig.graphQLConfig && this.tsMetaConfig.graphQLConfig.create) {
            this.graphQLGenerator = new graphql_generator_1.GraphQLGenerator(this.tsMetaConfig.graphQLConfig);
            this.graphQLSchemas = this.createGraphQL();
        }
        this.writeAllToFile();
    }
    /**
     * load config from tsmeta.config.json
     */
    loadConfigFile() {
        try {
            return JSON.parse(fs_1.readFileSync(path_1.resolve(this.tsMetaConfigFilename), { encoding: 'utf8' }));
        }
        catch (err) {
            if (err)
                process.stderr.write(err.toString());
            else
                process.stderr.write('failed to load config file');
        }
    }
    /**
     * use factories to create tsMetaSchema
     */
    createTsMetaSchema() {
        this.tsMetaFactory = new tsmeta_factory_1.TsMetaFactory(this.tsMetaConfig);
        return this.tsMetaFactory.build();
    }
    /**
     * use tsMetaSchema to create Sigma container
     */
    createSigma() {
        return this.sigmaGenerator.generate(lodash_1.cloneDeep(this.tsMeta));
    }
    /**
     * use tsMetaSchema to create Sigma container
     */
    createOpenapispec() {
        return this.oasGenerator.generate(lodash_1.cloneDeep(this.tsMeta));
    }
    /**
     * use tsMetaSchema to create Sigma container
     */
    createGraphQL() {
        return this.graphQLGenerator.generate(lodash_1.cloneDeep(this.tsMeta));
    }
    /**
     * write all data to files
     */
    writeAllToFile() {
        if (this.tsMetaConfig.metaConfig && this.tsMetaConfig.metaConfig.create) {
            this.writeToFile(this.tsMetaConfig.metaConfig.outputPath, this.tsMetaConfig.metaConfig.outputFilename, this.tsMeta);
        }
        if (this.tsMetaConfig.sigmaConfig && this.tsMetaConfig.sigmaConfig.create) {
            this.writeToFile(this.tsMetaConfig.sigmaConfig.outputPath, this.tsMetaConfig.sigmaConfig.outputFilename, this.sigmaData);
        }
        if (this.tsMetaConfig.oasConfig && this.tsMetaConfig.oasConfig.create) {
            switch (this.tsMetaConfig.oasConfig.outputFormat) {
                case 'json':
                    this.writeToFile(this.tsMetaConfig.oasConfig.outputPath, `${this.tsMetaConfig.oasConfig.outputFilename}.json`, this.openapi);
                    break;
                case 'yaml':
                    this.writeToFile(this.tsMetaConfig.oasConfig.outputPath, `${this.tsMetaConfig.oasConfig.outputFilename}.yml`, this.openapi, true);
                    break;
                default:
                    this.writeToFile(this.tsMetaConfig.oasConfig.outputPath, `${this.tsMetaConfig.oasConfig.outputFilename}.json`, this.openapi);
                    this.writeToFile(this.tsMetaConfig.oasConfig.outputPath, `${this.tsMetaConfig.oasConfig.outputFilename}.yml`, this.openapi, true);
            }
        }
        if (this.tsMetaConfig.graphQLConfig && this.tsMetaConfig.graphQLConfig.create) {
            Object.keys(this.graphQLSchemas)
                .forEach((key) => {
                this.writeToFile(this.tsMetaConfig.graphQLConfig.outputPath, `${key}.graphql`, this.graphQLSchemas[key]);
            });
        }
    }
    /**
     * write json or yaml to file
     */
    writeToFile(path, filename, data, yaml = false) {
        const resolvedPath = path_1.resolve(path);
        if (!fs_1.existsSync(resolvedPath))
            fs_1.mkdirSync(resolvedPath);
        const indent = 2;
        if (yaml) {
            const inline = 10;
            const yamlDataString = typeof data === 'string' ? data : YAML.stringify(data, inline, indent);
            fs_1.writeFile(`${resolvedPath}/${filename}`, yamlDataString, { encoding: 'utf8' }, (err) => {
                if (err)
                    process.stderr.write(err.toString());
                else {
                    if (this.tsMetaConfig.showWrittenFiles)
                        process.stdout.write(`\nsaved ${filename}\n`);
                }
            });
        }
        else {
            const jsonDataString = typeof data === 'string' ? data : JSON.stringify(data, undefined, indent);
            fs_1.writeFile(`${resolvedPath}/${filename}`, jsonDataString, { encoding: 'utf8' }, (err) => {
                if (err)
                    process.stderr.write(err.toString());
                else {
                    if (this.tsMetaConfig.showWrittenFiles)
                        process.stdout.write(`\nsaved ${filename}\n`);
                }
            });
        }
    }
}
exports.TsMetaExecution = TsMetaExecution;
//# sourceMappingURL=tsmeta.execute.js.map