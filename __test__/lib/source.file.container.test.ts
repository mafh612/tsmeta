import 'jest'

import { getSourceFile, setSourceFile } from '../../src/lib/source.file.container'

beforeAll(() => {
  setSourceFile(Object.create({ fileName: 'test' }))
})

/**
 * source file container test
 */
describe('source file container test', () => {
  test('getSourceFile', () => {
    expect(getSourceFile().fileName).toBe('test')
  })
})
