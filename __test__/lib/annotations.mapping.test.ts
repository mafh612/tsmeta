import 'jest'

import { GetMappedAnnotation, SetAnnoationsMapping } from '../../src/lib/annotations.mapping'

beforeAll(() => {
  SetAnnoationsMapping({ Get: 'GetMapping' })
})

/**
 * annotations mapping test
 */
describe('annotations mapping test', () => {
  test('GetMappedAnnotation', () => {
    expect(GetMappedAnnotation('Get')).toBe('GetMapping')
  })

  test('GetMappedAnnotation', () => {
    expect(GetMappedAnnotation('PostMapping')).toBe('PostMapping')
  })
})
