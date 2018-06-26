import { readFileSync as ReadFileSync } from 'fs'
import { TsMeta } from '../../src'
import { GenerateExample } from '../../src/api/api.generate.example'

const tsmeta: TsMeta = JSON.parse(ReadFileSync('__mocks__/schema/tsmeta.mock.json', { encoding: 'utf8' }))
const expectedExample: any = {
  count: 1,
  dump: [['text']],
  dumper: [[{baseDirContent: []}]],
  many: ['text'],
  manyOther: [{baseDirContent: []}],
  mapped: {key: 'text'},
  mappedOther: {key: {baseDirContent: []}},
  much: ['text'],
  muchOther: [{baseDirContent: ['text']}],
  percent: 0.1,
  text: 'text',
  that: {key: 'text'},
  thatOther: {key: {baseDirContent: []}},
  truth: true,
  whatever: undefined
}

/**
 * generate example test
 */
describe('GenerateExample test', () => {
  test('generateExample', async () => {
    const example: any = GenerateExample('SomethingMock', tsmeta)

    expect(example).toEqual(expectedExample)
  })
})
