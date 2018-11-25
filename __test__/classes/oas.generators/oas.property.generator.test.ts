import { OasPropertyGenerator } from '../../../src/classes/oas.generators/oas.property.generator'
import { ParameterParam, PropertyParam } from '../../../src/lib/annotation.schema'
import { TsProperty } from '../../../src/lib/tsmeta.schema'

let oasPropertyGenerator: OasPropertyGenerator

beforeAll(() => {
  oasPropertyGenerator = new OasPropertyGenerator()
})

/**
 * oas arameter generator test
 */
describe('oas arameter generator test', () => {
  test('constructor', async () => {
    expect(oasPropertyGenerator).toBeInstanceOf(OasPropertyGenerator)
  })

  test('generate()', async () => {
    const property: TsProperty = {
      decorators: [
        {
          name: 'Property',
          tsarguments: [
            { representation: 'Model[]' }
          ]
        }
      ],
      name: 'Test',
      tstype: {
        basicType: 'Model',
        typescriptType: 'array'
      }
    }

    const propertyParam: PropertyParam = {
      required: true,
      version: 'v1'
    }

    expect(oasPropertyGenerator.generate(property, propertyParam)).toEqual({items: {$ref: '#/components/schemas/Model_v1'}, type: 'array'})
  })
})
