import { OasParameterGenerator } from '../../../src/classes/oas.generators/oas.parameter.generator'

let oasParameterGenerator: OasParameterGenerator

beforeAll(() => {
  oasParameterGenerator = new OasParameterGenerator()
})

/**
 * oas arameter generator test
 */
describe('oas arameter generator test', () => {
  test('constructor', async () => {
    expect(oasParameterGenerator).toBeInstanceOf(OasParameterGenerator)
  })
})
