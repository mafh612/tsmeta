import * as fs from 'fs'
import { GraphQLGenerator } from '../../src/classes/graphql.generator'
import { TsMetaConfig } from '../../src/lib/tsmeta.config'
import { TsMeta } from '../../src/lib/tsmeta.schema'

let graphQLGenerator: GraphQLGenerator
let tsMeta: TsMeta

const tsMetaConfigFake: TsMetaConfig = {
  basePackage: '__mock__/schema/package.mock.json',
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
  graphQLGenerator = new GraphQLGenerator(tsMetaConfigFake.graphQLConfig)
  const tsMetaString: string = fs.readFileSync('__mock__/schema/tsmeta.mock.json', { encoding: 'utf8' })
  tsMeta = JSON.parse(tsMetaString)
})

/**
 * test OasGenerator class
 */
describe('GraphQLGenerator test', () => {
  test('GraphQLGenerator constructor', async () => {
    expect(graphQLGenerator).toBeInstanceOf(GraphQLGenerator)
  })

  test('GraphQLGenerator.generate()', async () => {
    const result: { [key: string]: string } = graphQLGenerator.generate(tsMeta)

    for (const key of Object.keys(result)) {
      fs.writeFile(`__mock__/schema/${key}.mock.graphql`, result[key], (err) => { // tslint:disable-line
        if (err) console.log(err)// tslint:disable-line
      })
    }

    expect(result).not.toBeUndefined()
  })
})
