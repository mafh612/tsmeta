import * as fs from 'fs'
import { OasGenerator } from '../../src/classes/oas.generator'
import { Openapi } from '../../src/lib/openapispec'
import { TsMetaConfig } from '../../src/lib/tsmeta.config'
import { TsMeta } from '../../src/lib/tsmeta.schema'

let oasGenerator: OasGenerator
let tsMeta: TsMeta

const tsMetaConfigFake: TsMetaConfig = {
  basePackage: '__mocks__/schema/package.mock.json',
  metaConfig: {
    compilerOptions: 'tsconfig.json',
    create: true,
    outputFilename: 'tsmeta.mock.json',
    outputPath: '__mocks__'
  },
  oasConfig: {
    create: true,
    outputFilename: 'openapi.mock.json',
    outputPath: '__mocks__',
    annotationsMap: {}
  }
}

beforeAll(() => {
  oasGenerator = new OasGenerator()
  const tsMetaString: string = fs.readFileSync('__mocks__/schema/tsmeta.mock.json', { encoding: 'utf8' })
  tsMeta = JSON.parse(tsMetaString)
})

/**
 * test OasGenerator class
 */
describe('OasGenerator test', () => {
  test('OasGenerator constructor', async () => {
    expect(oasGenerator).toBeInstanceOf(OasGenerator)
  })

  test('OasGenerator.generate()', async () => {
    const result: Openapi = oasGenerator.generate(tsMeta, tsMetaConfigFake.oasConfig)

    fs.writeFile('__mocks__/schema/openapi.mock.json', JSON.stringify(result, undefined, 4), (err) => { // tslint:disable-line
      if (err) console.log(err)// tslint:disable-line
    })

    expect(result).not.toBeUndefined()
  })
})
