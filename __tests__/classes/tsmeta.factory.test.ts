import * as fs from 'fs'
import { TsMetaFactory } from '../../src/classes/tsmeta.factory'
import { TsMetaConfig } from '../../src/resources/tsmeta.config'
import { TsMeta } from '../../src/resources/tsmeta.schema'

let tsMetaFactory: TsMetaFactory
const tsMetaConfigFake: TsMetaConfig = {
  basePackage: '__mocks__/schema/package.mock.json',
  metaConfig: {
    compilerOptions: 'tsconfig.json',
    create: true,
    outputFilename: 'tsmeta.mock.json',
    outputPath: '__mocks__'
  }
}

beforeAll(() => {
  tsMetaFactory = new TsMetaFactory()
})

/**
 * test TsMetaFactory class
 */
describe('TsMetaFactory test', () => {
  test('TsMetaFactory constructor', async () => {
    expect(tsMetaFactory).toBeInstanceOf(TsMetaFactory)
  })

  test('TsMetaFactory.build()', async () => {
    const result: TsMeta = tsMetaFactory.build(tsMetaConfigFake)

    fs.writeFile('__mocks__/schema/tsmeta.mock.json', JSON.stringify(result, undefined, 4), (err) => { // tslint:disable-line
      if (err) console.log(err)// tslint:disable-line
    })

    expect(result).not.toBeUndefined()
  })
})
