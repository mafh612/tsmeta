// tslint:disable no-console
import { readFileSync as ReadFileSync } from 'fs'

import { TsMetaFactory } from './classes/tsmeta.factory'
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

  constructor() {
    this.tsMetaConfig = this.loadConfigFile()

    this.tsMeta = this.createTsMetaSchema()

    // console.log(`TsMeta\n${this.tsMeta}`) // tslint:disable-line
    console.log(`TsMeta\n${JSON.stringify(this.tsMeta, undefined, 2)}`) // tslint:disable-line
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
  /* private createSigma(): SigmaData {
  } */

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
}

!new TsMetaExecution() // tslint:disable-line no-unused-expression
