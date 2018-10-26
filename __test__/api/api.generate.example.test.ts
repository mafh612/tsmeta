import { readFileSync as ReadFileSync } from 'fs'
import { TsMeta } from '../../src'
import { GenerateExample } from '../../src/api/api.generate.example'

const tsmeta: TsMeta = JSON.parse(ReadFileSync('__mock__/schema/tsmeta.mock.json', { encoding: 'utf8' }))
// tslint:disable-next-line no-any
const expectedExample: any = {
  count: 1,
  dump: [['text']],
  dumper: [[{baseDirContent: ['text']}]],
  indifferent: true,
  many: ['text'],
  manyOther: [{baseDirContent: ['text']}],
  mapped: {key: 'text'},
  mappedOther: {key: {baseDirContent: ['text']}},
  much: ['text'],
  muchOther: [{baseDirContent: ['text']}],
  percent: 0.1,
  text: 'text',
  that: {key: 'text'},
  thatOther: {key: {baseDirContent: ['text']}},
  truth: true,
  whatever: undefined
}

/**
 * generate example test
 */
describe('GenerateExample test', () => {
  test('generateExample', async () => {
    // tslint:disable-next-line no-any
    const example: any = GenerateExample('SomethingMock', tsmeta)

    expect(example.much).toEqual(expectedExample.much)
  })
})
