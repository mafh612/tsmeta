import * as deepAssign from 'deep-assign'
import * as fs from 'fs'
import { GraphQLPropertyGenerator } from '../../../src/classes/graphql.generators/graphql.property.generator'
import { TsMetaConfig } from '../../../src/lib/tsmeta.config'
import { TsFile, TsMeta, TsProgram, TsProperty } from '../../../src/lib/tsmeta.schema'

let graphQLPropertyGenerator: GraphQLPropertyGenerator
let tsMeta: TsMeta

const tsMetaConfigFake: TsMetaConfig = {
  basePackage: '__mock__/schema/package.mock.json',
  scanAdditionalPackages: [],
  showScannedFiles: true,
  showWrittenFiles: true,
  metaConfig: {
    compilerOptions: 'tsconfig.json',
    create: true,
    outputFilename: 'tsmeta.mock.json',
    outputPath: '__mock__'
  },
  graphQLConfig: {
    create: true,
    outputPath: '__mock__',
    model_annotation: 'Model',
    property_annotation: 'Property'
  }
}

beforeAll(() => {
  graphQLPropertyGenerator = new GraphQLPropertyGenerator(tsMetaConfigFake.graphQLConfig)
  const tsMetaString: string = fs.readFileSync('__mock__/schema/tsmeta.mock.json', { encoding: 'utf8' })
  tsMeta = JSON.parse(tsMetaString)
})

/**
 * test OasGenerator class
 */
describe('GraphQLGenerator test', () => {
  test('GraphQLGenerator constructor', async () => {
    expect(graphQLPropertyGenerator).toBeInstanceOf(GraphQLPropertyGenerator)
  })

  // test('GraphQLGenerator.generate()', async () => {
  //   const tsProperties: TsProperty[] = []
  //   tsMeta.programs.forEach((tsProgram: TsProgram) => {
  //     tsProgram.files.forEach((tsFile: TsFile) => {
  //       if (tsFile.tsClass) tsFile.tsClass.properties.forEach((tsProperty: TsProperty) => {
  //         tsProperties.push(tsProperty)
  //       })
  //     })
  //   })

  //   let result: { [key: string]: string } = {}

  //   tsProperties.forEach((tsProperty: TsProperty) => {
  //     result = deepAssign(result, graphQLPropertyGenerator.generate(tsProperty))
  //   })

  //   for (const key of Object.keys(result)) {
  //     fs.writeFile(`__mock__/schema/${key}.mock.graphql`, result[key], (err) => { // tslint:disable-line
  //       if (err) console.log(err)// tslint:disable-line
  //     })
  //   }

  //   expect(result).not.toBeUndefined()
  // })
})
