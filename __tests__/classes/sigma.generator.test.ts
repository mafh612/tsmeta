import * as fs from 'fs'
import { SigmaData, SigmaGenerator } from '../../src'
import { TsMetaConfig } from '../../src/lib/tsmeta.config'
import { TsMeta } from '../../src/lib/tsmeta.schema'

let sigmaGenerator: SigmaGenerator
let tsMeta: TsMeta

const tsMetaConfigFake: TsMetaConfig = {
  basePackage: '__mocks__/schema/package.mock.json',
  metaConfig: {
    compilerOptions: 'tsconfig.json',
    create: true,
    outputFilename: 'tsmeta.mock.json',
    outputPath: '__mocks__'
  },
  sigmaConfig: {
    create: true,
    outputPath: 'schema',
    outputFilename: 'sigma_data.json',
    createNodes: {
      packages: true,
      classes: true,
      interfaces: true,
      methods: false,
      properties: false
    }
  }
}

beforeAll(() => {
  sigmaGenerator = new SigmaGenerator(tsMetaConfigFake.sigmaConfig)
  const tsMetaString: string = fs.readFileSync('__mocks__/schema/tsmeta.mock.json', { encoding: 'utf8' })
  tsMeta = JSON.parse(tsMetaString)
})

/**
 * test SigmaGenerator class
 */
describe('SigmaGenerator test', () => {
  test('SigmaGenerator constructor', async () => {
    expect(sigmaGenerator).toBeInstanceOf(SigmaGenerator)
  })

  test('SigmaGenerator.generate()', async () => {
    const result: SigmaData = sigmaGenerator.generate(tsMeta)

    fs.writeFile('__mocks__/schema/sigma.mock.json', JSON.stringify(result, undefined, 4), (err) => { // tslint:disable-line
      if (err) console.log(err)// tslint:disable-line
    })

    expect(result).not.toBeUndefined()
  })
})
