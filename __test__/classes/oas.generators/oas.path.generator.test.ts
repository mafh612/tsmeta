import 'jest'

import { OasPathGenerator } from '../../../src/classes/oas.generators/oas.path.generator'
import { OasConfig } from '../../../src/lib/tsmeta.config'

let oasPathGenerator: OasPathGenerator
const oasConfig: OasConfig = {
  annotationsMap: {
    Body: 'RequestBody',
    Get: 'GetRequest',
    PathParam: 'PathVariable',
    Post: 'PostRequest',
    QueryParam: 'RequestParam'
  },
  create: true,
  openapistring: '3.0.0',
  outputFilename: 'oaspec.api-module-products-v1-core',
  outputFormat: 'json',
  outputPath: 'schema'
}

beforeAll(() => {
  oasPathGenerator = new OasPathGenerator(oasConfig)
})

/**
 * oas path generator test
 */
describe('oas path generator test', () => {
  test('oas.path.generator class', async () => {
    expect(oasPathGenerator).toBeInstanceOf(OasPathGenerator)
  })

  test('oas.path.generator class', async () => {
    expect(oasPathGenerator.generate('ControllerMock', 'controllerMock', )).toBeInstanceOf(OasPathGenerator)
  })
})
