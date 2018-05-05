// tslint:disable no-console
import { readFileSync as ReadFileSync, writeFile as WriteFile } from 'fs'

import { SigmaGenerator } from './classes/sigma.generator'
import { TsMetaFactory } from './classes/tsmeta.factory'
import { SigmaData } from './resources/sigma'
// import { Openapi } from './resources/openapispec'
// import { SigmaData } from './resources/sigma'
import { TsMetaConfig } from './resources/tsmeta.config'
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

  constructor() {
    this.tsMetaConfig = this.loadConfigFile()

    this.tsMeta = this.createTsMetaSchema()

    // console.log(`TsMeta\n${this.tsMeta}`) // tslint:disable-line
    // console.log(`TsMeta\n${JSON.stringify(this.tsMeta, undefined, 2)}`) // tslint:disable-line

    this.sigmaData = this.createSigma()

    // console.log(`SigmaData\n${this.sigmaData}`) // tslint:disable-line
    // console.log(`SigmaData\n${JSON.stringify(this.sigmaData, undefined, 2)}`) // tslint:disable-line

    this.writeToFile()
  }

  /**
   * load config from tsmeta.config.json
   */
  private loadConfigFile(): TsMetaConfig {
    try {
      return JSON.parse(ReadFileSync('tsmeta.config.json', { encoding: 'utf8' }))
    } catch {
      console.error('failed to load config file')
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

  private writeToFile(): void {
    const indent: number = 2

    WriteFile('out/tsMeta.json', JSON.stringify(this.tsMeta, undefined, indent), { encoding: 'utf8' }, (err: Error) => {
      if (err) console.log(err)
      else console.log('saved tsMeta.json')
    })

    WriteFile('out/sigmaData.json', JSON.stringify(this.sigmaData, undefined, indent), { encoding: 'utf8' }, (err: Error) => {
      if (err) console.log(err)
      else console.log('saved sigmaData.json')
    })
  }
}

!new TsMetaExecution() // tslint:disable-line no-unused-expression
