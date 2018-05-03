/**
 * configuration json interfaces
 */
/**
 * interface BaseConfigJson
 */
export interface BaseConfig {
    outputPath: string;
}
/**
 * interface MetaConfig
 */
export interface MetaConfig extends BaseConfig {
    createMeta: boolean;
}
/**
 * interface SigmaConfig
 */
export interface SigmaConfig extends BaseConfig {
    createSigma: boolean;
}
/**
 * interface OasConfig
 */
export interface OasConfig extends BaseConfig {
    createOas: boolean;
}
/**
 * interface GraphQLConfig
 */
export interface GraphQLConfig extends BaseConfig {
    createGraphQL: boolean;
}
/**
 * interface TsMetaConfigJson
 */
export interface TsMetaConfig {
    basePackage: string;
    compilerOptions: string;
    metaConfig: MetaConfig;
    sigmaConfig: SigmaConfig;
    oasConfig: OasConfig;
    graphqlConfig: GraphQLConfig;
}
