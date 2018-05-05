import { Model } from '../resources/annotations'
import { SimpleMock } from './simple.mock'

/**
 * class SomethingMock
 */
@Model({
  version: 'v1',
  example: {
    greeting: 'hello world'
  }
})
class SomethingMock {

  public truth: boolean
  public count: number
  public text: string
  public many: string[]
  public manyOther: SimpleMock[]
  public that: { [key: string]: string }
  public thatOther: { [key: string]: SimpleMock }
  public mops: Map<string, string>
  public mopsOther: Map<string, SimpleMock>

  constructor(text: string) {
    this.text = `hello ${text}`
  }
}

export { SomethingMock }
