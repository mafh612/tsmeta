import {
  existsSync as ExistsSync,
  mkdirSync as MkdirSync,
  readFileSync as ReadFileSync,
  writeFile as WriteFile
} from 'fs'
import { cloneDeep } from 'lodash'
import { Openapi } from 'oasmodel'
import { resolve as ResolvePath } from 'path'
import * as YAML from 'yamljs'

import { GraphQLGenerator } from './classes/graphql.generator'
import { OasGenerator } from './classes/oas.generator'
import { SigmaGenerator } from './classes/sigma.generator'
import { TsMetaFactory } from './classes/tsmeta.factory'
import { SigmaData } from './lib/interfaces/sigma'
import { TsMetaConfig } from './lib/interfaces/tsmeta.config'
import { TsMeta } from './lib/interfaces/tsmeta.schema'

/**
 * class TsMeta
 */
class TsMetaExecution {
  private readonly tsMetaConfigFilename: string = 'tsmeta.config.json'
  private tsMetaConfig: TsMetaConfig
  private tsMeta: TsMeta
  private tsMetaFactory: TsMetaFactory

  private sigmaData: SigmaData
  private sigmaGenerator: SigmaGenerator

  private openapi: Openapi
  private oasGenerator: OasGenerator

  private graphQLSchemas: { [key: string]: string }
  private graphQLGenerator: GraphQLGenerator

  constructor(tsMetaConfigFilename?: string) {
    if (tsMetaConfigFilename) this.tsMetaConfigFilename = tsMetaConfigFilename
  }

  /**
   * execute tsmeta
   */
  public execute(): void {
    this.tsMetaConfig = this.loadConfigFile()

    this.tsMeta = this.createTsMetaSchema()

    if (this.tsMetaConfig.sigmaConfig && this.tsMetaConfig.sigmaConfig.create) {
      this.sigmaGenerator = new SigmaGenerator(this.tsMetaConfig.sigmaConfig)
      this.sigmaData = this.createSigma()
    }

    if (this.tsMetaConfig.oasConfig && this.tsMetaConfig.oasConfig.create) {
      this.oasGenerator = new OasGenerator(this.tsMetaConfig.oasConfig)
      this.openapi = this.createOpenapispec()
    }

    if (this.tsMetaConfig.graphQLConfig && this.tsMetaConfig.graphQLConfig.create) {
      this.graphQLGenerator = new GraphQLGenerator(this.tsMetaConfig.graphQLConfig)
      this.graphQLSchemas = this.createGraphQL()
    }

    this.writeAllToFile()
  }

  /**
   * load config from tsmeta.config.json
   */
  private loadConfigFile(): TsMetaConfig {
    try {
      return JSON.parse(ReadFileSync(ResolvePath(this.tsMetaConfigFilename), { encoding: 'utf8' }))
    } catch (err) {
      if (err) process.stderr.write(err.toString())
      else process.stderr.write('failed to load config file')
    }
  }

  /**
   * use factories to create tsMetaSchema
   */
  private createTsMetaSchema(): TsMeta {
    this.tsMetaFactory = new TsMetaFactory(this.tsMetaConfig)

    return this.tsMetaFactory.build()
  }

  /**
   * use tsMetaSchema to create Sigma container
   */
  private createSigma(): SigmaData {
    return this.sigmaGenerator.generate(cloneDeep<TsMeta>(this.tsMeta))
  }

  /**
   * use tsMetaSchema to create Sigma container
   */
  private createOpenapispec(): Openapi {
    return this.oasGenerator.generate(cloneDeep<TsMeta>(this.tsMeta))
  }

  /**
   * use tsMetaSchema to create Sigma container
   */
  private createGraphQL(): { [key: string]: string } {
    return this.graphQLGenerator.generate(cloneDeep<TsMeta>(this.tsMeta))
  }

  /**
   * write all data to files
   */
  private writeAllToFile(): void {
    if (this.tsMetaConfig.metaConfig && this.tsMetaConfig.metaConfig.create) {
      this.writeToFile(
        this.tsMetaConfig.metaConfig.outputPath,
        this.tsMetaConfig.metaConfig.outputFilename,
        this.tsMeta
      )
    }

    if (this.tsMetaConfig.sigmaConfig && this.tsMetaConfig.sigmaConfig.create) {
      this.writeToFile(
        this.tsMetaConfig.sigmaConfig.outputPath,
        this.tsMetaConfig.sigmaConfig.outputFilename,
        this.sigmaData
      )
    }

    if (this.tsMetaConfig.oasConfig && this.tsMetaConfig.oasConfig.create) {
      switch (this.tsMetaConfig.oasConfig.outputFormat) {
        case 'json':
          this.writeToFile(
            this.tsMetaConfig.oasConfig.outputPath,
            `${this.tsMetaConfig.oasConfig.outputFilename}.json`,
            this.openapi
          )
          break
        case 'yaml':
          this.writeToFile(
            this.tsMetaConfig.oasConfig.outputPath,
            `${this.tsMetaConfig.oasConfig.outputFilename}.yml`,
            this.openapi,
            true
          )
          break
        default:
          this.writeToFile(
            this.tsMetaConfig.oasConfig.outputPath,
            `${this.tsMetaConfig.oasConfig.outputFilename}.json`,
            this.openapi
          )
          this.writeToFile(
            this.tsMetaConfig.oasConfig.outputPath,
            `${this.tsMetaConfig.oasConfig.outputFilename}.yml`,
            this.openapi,
            true
          )
      }
    }

    if (this.tsMetaConfig.graphQLConfig && this.tsMetaConfig.graphQLConfig.create) {
      Object.keys(this.graphQLSchemas).forEach((key: string) => {
        this.writeToFile(this.tsMetaConfig.graphQLConfig.outputPath, `${key}.graphql`, this.graphQLSchemas[key])
      })
    }
  }

  /**
   * write json or yaml to file
   */
  private writeToFile(path: string, filename: string, data: any, yaml: boolean = false): void {
    const resolvedPath: string = ResolvePath(path)

    if (!ExistsSync(resolvedPath)) MkdirSync(resolvedPath)
    const indent: number = 2

    if (yaml) {
      const inline: number = 10

      const yamlDataString: string = typeof data === 'string' ? data : YAML.stringify(data, inline, indent)

      WriteFile(`${resolvedPath}/${filename}`, yamlDataString, { encoding: 'utf8' }, (err: Error) => {
        if (err) process.stderr.write(err.toString())
        else {
          if (this.tsMetaConfig.showWrittenFiles) process.stdout.write(`\nsaved ${filename}\n`)
        }
      })
    } else {
      const jsonDataString: string = typeof data === 'string' ? data : JSON.stringify(data, undefined, indent)

      WriteFile(`${resolvedPath}/${filename}`, jsonDataString, { encoding: 'utf8' }, (err: Error) => {
        if (err) process.stderr.write(err.toString())
        else {
          if (this.tsMetaConfig.showWrittenFiles) process.stdout.write(`\nsaved ${filename}\n`)
        }
      })
    }
  }
}

export { TsMetaExecution }
