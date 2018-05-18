import { resolve as ResolvePath } from 'path'

/**
 * configuration json interfaces
 */

/**
 * interface BaseConfigJson
 */
export interface BaseConfig {
  create: boolean
  outputPath: string
  outputFilename: string
}
/**
 * interface MetaConfig
 */
export interface MetaConfig extends BaseConfig {
  compilerOptions: string
}
/**
 * interface CreateNodes
 */
export interface CreateNodes {
  packages: boolean
  classes: boolean
  interfaces: boolean
  methods: boolean
  properties: boolean
}
/**
 * interface SigmaConfig
 */
export interface SigmaConfig extends BaseConfig {
  createNodes: CreateNodes
}
/**
 * interface OasConfig
 */
export interface OasConfig extends BaseConfig {
  openapistring: string
  annotationsMap: { [key: string]: string }
}
/**
 * interface GraphQLConfig
 */
export interface GraphQLConfig extends BaseConfig {
  annotation: string
}
/**
 * interface TsMetaConfigJson
 */
export interface TsMetaConfig {
  basePackage: string
  metaConfig: MetaConfig
  sigmaConfig?: SigmaConfig
  oasConfig?: OasConfig
  graphQLConfig?: GraphQLConfig
}

/**
 * check config function
 */
const runPath: ((path: string) => string) = (path: string): string => {
  try {
    ResolvePath(path)

    return path
  } catch {
    throw new Error(`path: ${path} could not be resolved`)
  }
}

const runFilename: ((filename: string) => string) = (filename: string): string => {
  try {
    let newfilename: string = filename

    if (!filename.endsWith('.json')) {
      const filenameArray: string[] = filename.split('.')
      filenameArray.pop()

      newfilename = `${filenameArray.join('.')}.json`
    }

    return newfilename
  } catch {
    throw new Error(`filename: ${filename} invalid`)
  }
}

export {
  runPath as RunPath,
  runFilename as RunFilename
}
