import { readFileSync as ReadFileSync } from 'fs'
import { TsMeta } from '../../src'
import { GenerateMalformedExample } from '../../src/api/api.generate.malformed.example'

const tsmeta: TsMeta = JSON.parse(ReadFileSync('__mocks__/schema/tsmeta.mock.json', { encoding: 'utf8' }))
const expectedExample: any = {
  count: 'text',
  dump: [[true]],
  dumper: [[{baseDirContent: []}]],
  many: [true],
  manyOther: [{baseDirContent: []}],
  mapped: {key: true},
  mappedOther: {key: {baseDirContent: []}},
  much: [true],
  muchOther: [{baseDirContent: [true]}],
  percent: 'text',
  text: true,
  that: {key: true},
  thatOther: {key: {baseDirContent: []}},
  truth: 1,
  whatever: undefined
}

/**
 * generate example test
 */
describe('GenerateExample test', () => {
  test('generateExample', async () => {
    const example: any = GenerateMalformedExample('SomethingMock', tsmeta)

    expect(example).toEqual(expectedExample)
  })
})
