import * as fs from 'fs'
import { TsMetaFactory } from '../../src/classes/tsmeta.factory'
import { TsMetaConfig } from '../../src/lib/tsmeta.config'
import { TsMeta } from '../../src/lib/tsmeta.schema'

let tsMetaFactory: TsMetaFactory
const tsMetaConfigFake: TsMetaConfig = {
  basePackage: '__mock__/package.mock.json',
  scanAdditionalPackages: [],
  showScannedFiles: true,
  showWrittenFiles: true,
  metaConfig: {
    compilerOptions: 'tsconfig.json',
    create: true,
    outputFilename: 'tsmeta.mock.json',
    outputPath: '__mock__'
  }
}

beforeAll(() => {
  tsMetaFactory = new TsMetaFactory(tsMetaConfigFake)
})

/**
 * test TsMetaFactory class
 */
describe('TsMetaFactory test', () => {
  test('TsMetaFactory constructor', async () => {
    expect(tsMetaFactory).toBeInstanceOf(TsMetaFactory)
  })

  test('TsMetaFactory.build()', async () => {
    const result: TsMeta = tsMetaFactory.build()

    fs.writeFile('__mock__/schema/tsmeta.mock.json', JSON.stringify(result, undefined, 2), (err) => { // tslint:disable-line
      if (err) console.log(err)// tslint:disable-line
    })

    expect(result).not.toBeUndefined()
  })
})
