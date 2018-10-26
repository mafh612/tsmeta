import { TsMeta } from '../../src/lib/tsmeta.schema'

let tsMeta: TsMeta

beforeAll(() => {
  tsMeta = new TsMeta()
})

/**
 * test TsMetaFactory class
 */
describe('TsMetaFactory test', () => {
  test('TsMetaFactory constructor', async () => {
    expect(tsMeta).toBeInstanceOf(TsMeta)
  })
})
