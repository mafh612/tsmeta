/**
 * class TsMeta
 */
declare class TsMetaExecution {
    private readonly tsMetaConfigFilename;
    private tsMetaConfig;
    private tsMeta;
    private tsMetaFactory;
    private sigmaData;
    private sigmaGenerator;
    private openapi;
    private oasGenerator;
    private graphQLSchemas;
    private graphQLGenerator;
    constructor(tsMetaConfigFilename?: string);
    /**
     * execute tsmeta
     */
    execute(): void;
    /**
     * load config from tsmeta.config.json
     */
    private loadConfigFile;
    /**
     * use factories to create tsMetaSchema
     */
    private createTsMetaSchema;
    /**
     * use tsMetaSchema to create Sigma container
     */
    private createSigma;
    /**
     * use tsMetaSchema to create Sigma container
     */
    private createOpenapispec;
    /**
     * use tsMetaSchema to create Sigma container
     */
    private createGraphQL;
    /**
     * write all data to files
     */
    private writeAllToFile;
    /**
     * write json or yaml to file
     */
    private writeToFile;
}
export { TsMetaExecution };
//# sourceMappingURL=tsmeta.execute.d.ts.map