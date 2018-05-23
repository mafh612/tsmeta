import { existsSync as ExistsSync, mkdirSync as MkdirSync, readFileSync as ReadFileSync, writeFile as WriteFile } from 'fs'
import { resolve as ResolvePath } from 'path'

import { GraphQLGenerator } from './classes/graphql.generator'
import { OasGenerator } from './classes/oas.generator'
import { SigmaGenerator } from './classes/sigma.generator'
import { TsMetaFactory } from './classes/tsmeta.factory'
import { Openapi } from './lib/openapispec'
import { SigmaData } from './lib/sigma'
import { TsMetaConfig } from './lib/tsmeta.config'
import { TsMeta } from './lib/tsmeta.schema'

/**
 * class TsMeta
 */
class TsMetaExecution {

  private tsMetaConfig: TsMetaConfig
  private tsMeta: TsMeta
  private tsMetaFactory: TsMetaFactory

  private sigmaData: SigmaData
  private sigmaGenerator: SigmaGenerator

  private openapi: Openapi
  private oasGenerator: OasGenerator

  private graphQLSchemas: { [key: string]: string }
  private graphQLGenerator: GraphQLGenerator

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
      return JSON.parse(ReadFileSync(ResolvePath('tsmeta.config.json'), { encoding: 'utf8' }))
    } catch (err) {
      if (err) process.stderr.write(err.toString())
      else process.stderr.write('failed to load config file')
    }
  }

  /**
   * use factories to create tsMetaSchema
   */
  private createTsMetaSchema(): TsMeta {
    this.tsMetaFactory = new TsMetaFactory()

    return this.tsMetaFactory.build(this.tsMetaConfig)
  }

  /**
   * use tsMetaSchema to create Sigma container
   */
  private createSigma(): SigmaData {
    const tsMetaInstance: TsMeta = new TsMeta(this.tsMeta)

    return this.sigmaGenerator.generate(tsMetaInstance)
  }

  /**
   * use tsMetaSchema to create Sigma container
   */
  private createOpenapispec(): Openapi {
    const tsMetaInstance: TsMeta = new TsMeta(this.tsMeta)

    return this.oasGenerator.generate(tsMetaInstance)
  }

  /**
   * use tsMetaSchema to create Sigma container
   */
  private createGraphQL(): { [key: string]: string } {
    const tsMetaInstance: TsMeta = new TsMeta(this.tsMeta)

    return this.graphQLGenerator.generate(tsMetaInstance)
  }

  /**
   * write all data to files
   */
  private writeAllToFile(): void {
    if (this.tsMetaConfig.metaConfig && this.tsMetaConfig.metaConfig.create) {
      this.writeToFile(this.tsMetaConfig.metaConfig.outputPath, this.tsMetaConfig.metaConfig.outputFilename, this.tsMeta)
    }

    if (this.tsMetaConfig.sigmaConfig && this.tsMetaConfig.sigmaConfig.create) {
      this.writeToFile(this.tsMetaConfig.sigmaConfig.outputPath, this.tsMetaConfig.sigmaConfig.outputFilename, this.sigmaData)
    }

    if (this.tsMetaConfig.oasConfig && this.tsMetaConfig.oasConfig.create) {
      this.writeToFile(this.tsMetaConfig.oasConfig.outputPath, this.tsMetaConfig.oasConfig.outputFilename, this.openapi)
    }

    if (this.tsMetaConfig.graphQLConfig && this.tsMetaConfig.graphQLConfig.create) {
      Object.keys(this.graphQLSchemas).forEach((key: string) => {
        this.writeToFile(this.tsMetaConfig.graphQLConfig.outputPath, `${key}.graphql`, this.graphQLSchemas[key])
      })
    }
  }

  /**
   * write file
   */
  private writeToFile(path: string, filename: string, data: any): void {
    const indent: number = 2

    const resolvedPath: string = ResolvePath(path)

    if (!ExistsSync(resolvedPath)) MkdirSync(resolvedPath)

    const dataString: string = typeof data === 'string' ? data : JSON.stringify(data, undefined, indent)

    WriteFile(`${resolvedPath}/${filename}`, dataString, { encoding: 'utf8' }, (err: Error) => {
      if (err) process.stderr.write(err.toString())
      else process.stdout.write(`\nsaved ${filename}\n`)
    })
  }
}

export { TsMetaExecution }

if (process.env.NODE_ENV !== 'test') {
  const tsMetaExecution: TsMetaExecution = new TsMetaExecution()
  tsMetaExecution.execute()
}
