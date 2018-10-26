import { Model, Property } from '../../src/lib/annotations'
import { SimpleMock } from './simple.mock'

/**
 * class SomethingMock
 */
@Model({
  example: {
    count: 5,
    dump: [
      [
        'eins',
        'zwü',
        'drü'
      ]
    ],
    indifferent: 'boolean|number|string|SimpleMock',
    many: ['string1', 'string2'],
    manyOther: [{ baseDirContent: ['nothing'] }],
    mapped: 'Map<string, string>',
    mappedOther: 'Map<string, SimpleMock>',
    much: ['string1', 'string2'],
    muchOther: [{ baseDirContent: ['nothing'] }],
    prop: '{ name: string; tel: number }',
    propOther: '{ name: string; tel: number; simple: SimpleMock }',
    text: 'string',
    that: { that: 'this' },
    thatOther: '{ [key: string]: SimpleMock }',
    truth: true,
    whatever: 'any'
  },
  version: 'v1'
})
class SomethingMock {

  public whatever: any
  public indifferent: boolean|number|string|SimpleMock
  public truth: boolean
  public count: number
  @Property({ format: 'float' })
  public percent: number
  public text: string
  public much: string[]
  @Property({ version: 'v1' })
  public muchOther: SimpleMock[]
  public many: Array<string> //tslint:disable-line
  @Property({ version: 'v1' })
  public manyOther: Array<SimpleMock> //tslint:disable-line
  public that: { [key: string]: string }
  @Property({ version: 'v1' })
  public thatOther: { [key: string]: SimpleMock }
  public mapped: Map<string, string>
  @Property({ version: 'v1' })
  public mappedOther: Map<string, SimpleMock>
  public prop: { name: string; tel: number }
  @Property({ version: 'v1' })
  public propOther: { name: string; tel: number; simple: SimpleMock }
  public dump: string[][]
  public dumper: SimpleMock[][]

  constructor(text: string) {
    this.text = `hello ${text}`
  }
}

export { SomethingMock }
