import { Model, Property } from '../src'
import { SimpleMock } from './simple.mock'

/**
 * class SomethingMock
 */
@Model({
  version: 'v1',
  example: {
    whatever: 'any',
    indifferent: 'boolean|number|string|SimpleMock',
    truth: true,
    count: 5,
    text: 'string',
    much: ['string1', 'string2'],
    muchOther: [{ baseDirContent: ['nothing'] }],
    many: ['string1', 'string2'],
    manyOther: [{ baseDirContent: ['nothing'] }],
    that: { that: 'this' },
    thatOther: '{ [key: string]: SimpleMock }',
    mapped: 'Map<string, string>',
    mappedOther: 'Map<string, SimpleMock>',
    prop: '{ name: string; tel: number }',
    propOther: '{ name: string; tel: number; simple: SimpleMock }'
  }
})
class SomethingMock {

  public whatever: any
  public indifferent: boolean|number|string|SimpleMock
  public truth: boolean
  public count: number
  public text: string
  public much: string[]
  @Property({ format: 'base64', version: 'v2' })
  public muchOther: SimpleMock[]
  public many: Array<string> //tslint:disable-line
  public manyOther: Array<SimpleMock> //tslint:disable-line
  public that: { [key: string]: string }
  public thatOther: { [key: string]: SimpleMock }
  public mapped: Map<string, string>
  public mappedOther: Map<string, SimpleMock>
  public prop: { name: string; tel: number }
  public propOther: { name: string; tel: number; simple: SimpleMock }

  constructor(text: string) {
    this.text = `hello ${text}`
  }
}

export { SomethingMock }
