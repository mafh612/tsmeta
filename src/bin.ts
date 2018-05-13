// tslint:disable no-console
import { existsSync as ExistsSync, mkdirSync as MkdirSync, readFileSync as ReadFileSync, writeFile as WriteFile } from 'fs'
import { resolve as ResolvePath } from 'path'

import { SigmaGenerator } from './classes/sigma.generator'
import { TsMetaFactory } from './classes/tsmeta.factory'
import { SigmaData } from './resources/sigma'
// import { Openapi } from './resources/openapispec'
// import { SigmaData } from './resources/sigma'
import { RunFilename, RunPath, TsMetaConfig } from './resources/tsmeta.config'
import { TsMeta } from './resources/tsmeta.schema'

/**
 * class TsMeta
 */
class TsMetaExecution {

  private tsMetaConfig: TsMetaConfig
  private tsMeta: TsMeta
  private tsMetaFactory: TsMetaFactory

  private sigmaData: SigmaData

  private sigmaGenerator: SigmaGenerator = new SigmaGenerator()

  /**
   * execute tsmeta
   */
  public execute(): void {
    this.tsMetaConfig = this.loadConfigFile()

    this.tsMeta = this.createTsMetaSchema()

    if (this.tsMetaConfig.sigmaConfig && this.tsMetaConfig.sigmaConfig.create) this.sigmaData = this.createSigma()

    this.writeAllToFile()
  }

  /**
   * load config from tsmeta.config.json
   */
  private loadConfigFile(): TsMetaConfig {
    try {
      const configFile: TsMetaConfig = JSON.parse(ReadFileSync(ResolvePath('tsmeta.config.json'), { encoding: 'utf8' }))

      if (configFile.metaConfig && configFile.metaConfig.create) {
        configFile.metaConfig.outputPath = RunPath(configFile.metaConfig.outputPath)
        configFile.sigmaConfig.outputFilename = RunFilename(configFile.sigmaConfig.outputFilename)
      }

      if (configFile.sigmaConfig && configFile.sigmaConfig.create) {
        configFile.sigmaConfig.outputPath = RunPath(configFile.sigmaConfig.outputPath)
        configFile.sigmaConfig.outputFilename = RunFilename(configFile.sigmaConfig.outputFilename)
      }

      if (configFile.oasConfig && configFile.oasConfig.create) {
        configFile.oasConfig.outputPath = RunPath(configFile.oasConfig.outputPath)
        configFile.oasConfig.outputFilename = RunFilename(configFile.oasConfig.outputFilename)
      }

      if (configFile.graphqlConfig && configFile.graphqlConfig.create) {
        configFile.graphqlConfig.outputPath = RunPath(configFile.graphqlConfig.outputPath)
        configFile.graphqlConfig.outputFilename = RunFilename(configFile.graphqlConfig.outputFilename)
      }

      return configFile
    } catch (err) {
      if (err) console.error(err)
      else console.error('failed to load config file')
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
    return this.sigmaGenerator.generate(this.tsMeta)
  }

  /**
   * use tsMetaSchema to create Sigma container
   */
  /* private createOpenapispec(): Openapi {
  } */

  /**
   * use tsMetaSchema to create Sigma container
   */
  /* private createGraphQL(): string {
  } */

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

    /* if (this.tsMetaConfig.oasConfig && this.tsMetaConfig.oasConfig.create) {
      this.writeToFile(this.tsMetaConfig.oasConfig.outputPath, this.tsMetaConfig.oasConfig.outputFilename, this.openapi)
    } */

    /* if (this.tsMetaConfig.graphqlConfig && this.tsMetaConfig.graphqlConfig.create) {
      this.writeToFile(this.tsMetaConfig.graphqlConfig.outputPath, this.tsMetaConfig.graphqlConfig.outputFilename, this.graphql)
    } */
  }

  /**
   * write file
   */
  private writeToFile(path: string, filename: string, data: any): void {
    const indent: number = 2

    const resolvedPath: string = ResolvePath(path)

    if (!ExistsSync(resolvedPath)) MkdirSync(resolvedPath)

    WriteFile(`${resolvedPath}/${filename}`, JSON.stringify(data, undefined, indent), { encoding: 'utf8' }, (err: Error) => {
      if (err) console.log(err)
      else console.log(`\nsaved ${filename}`)
    })
  }
}

export { TsMetaExecution }

if (process.env.NODE_ENV !== 'test') {
  const tsMetaExecution: TsMetaExecution = new TsMetaExecution()
  tsMetaExecution.execute()
}
