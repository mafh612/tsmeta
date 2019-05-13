/**
 * configuration json interfaces
 * interface BaseConfigJson
 */
export interface BaseConfig {
    create: boolean;
    outputPath: string;
    outputFilename?: string;
}
/**
 * interface MetaConfig
 */
export interface MetaConfig extends BaseConfig {
    compilerOptions: string;
}
/**
 * interface CreateNodes
 */
export interface CreateNodes {
    packages: boolean;
    files: boolean;
    classes: boolean;
    interfaces: boolean;
    functions: boolean;
    methods: boolean;
    properties: boolean;
}
/**
 * interface SigmaConfig
 */
export interface SigmaConfig extends BaseConfig {
    createNodes: CreateNodes;
}
/**
 * interface OasConfig
 */
export interface OasConfig extends BaseConfig {
    openapistring: string;
    outputFormat: 'json' | 'yaml' | 'both';
    annotationsMap: {
        [key: string]: string;
    };
}
/**
 * interface GraphQLConfig
 */
export interface GraphQLConfig extends BaseConfig {
    modelAnnotation: string;
    propertyAnnotation: string;
}
/**
 * interface TsMetaConfigJson
 */
export interface TsMetaConfig {
    basePackage: string;
    scanAdditionalPackages: string[];
    showScannedFiles: boolean;
    showWrittenFiles: boolean;
    metaConfig: MetaConfig;
    sigmaConfig?: SigmaConfig;
    oasConfig?: OasConfig;
    graphQLConfig?: GraphQLConfig;
}
//# sourceMappingURL=tsmeta.config.d.ts.map