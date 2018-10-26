import 'jest'
import { TsMetaExecution } from '../src/tsmeta.execute'

let tsMetaExecution: TsMetaExecution

beforeAll(() => {
  tsMetaExecution = new TsMetaExecution()
})

/**
 * test bin.ts class
 */
describe('bin.ts test', () => {
  test('TsMetaExecution constructor', async () => {
    expect(tsMetaExecution).toBeInstanceOf(TsMetaExecution)
  })
})
