import { OasOperationGenerator } from '../../../src/classes/oas.generators/oas.operation.generator'

/**
 * OasOperationGenerator test
 */
describe('test OasOperationGenerator', () => {
  test('OasOperationGenerator constructor', async () => {
    expect(new OasOperationGenerator()).toBeInstanceOf(OasOperationGenerator)
  })

  test('OasOperationGenerator', async () => {
    const oasOperationGenerator: OasOperationGenerator = new OasOperationGenerator()

    expect(oasOperationGenerator.generate()).toBeInstanceOf(OasOperationGenerator)
  })
})
