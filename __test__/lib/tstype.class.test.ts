import { TsType } from '../../src/lib/tsmeta.schema'
import { TsTypeClass } from '../../src/lib/tstype.class'
import { TypescriptTypes } from '../../src/lib/typescript.types.enum'

let tsTypeClass: TsTypeClass

/**
 * test TsMetaFactory class
 */
describe('TsMetaFactory test', () => {
  test('TsMetaFactory constructor', async () => {
    const tsType: TsType = Object.create({})
    tsTypeClass = new TsTypeClass(tsType)
    tsTypeClass.createRepresentation()

    expect(tsTypeClass).toBeInstanceOf(TsTypeClass)
  })

  test('TsMetaFactory basic', async () => {
    const tsType: TsType = {
      basicType: 'string',
      typescriptType: TypescriptTypes.BASIC
    }

    tsTypeClass = new TsTypeClass(tsType)
    tsTypeClass.createRepresentation()

    expect(tsTypeClass.representation).toEqual('string')
  })

  test('TsMetaFactory map', async () => {
    const tsType: TsType = {
      basicType: 'Map',
      keyType: 'string',
      valueType: ['string', 'number', 'boolean'],
      typescriptType: TypescriptTypes.MAP
    }

    tsTypeClass = new TsTypeClass(tsType)
    tsTypeClass.createRepresentation()

    expect(tsTypeClass.representation).toEqual('Map<string, string|number|boolean>')
  })

  test('TsMetaFactory untyped', async () => {
    const tsType: TsType = {
      basicType: undefined,
      typescriptType: TypescriptTypes.UNTYPED
    }

    tsTypeClass = new TsTypeClass(tsType)
    tsTypeClass.createRepresentation()

    expect(tsTypeClass.representation).toBeUndefined()
  })
})
