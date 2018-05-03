import { Model } from '../resources/annotations'

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

  public greeting: string

  constructor(text: string) {
    this.greeting = `hello ${text}`
  }
}

export { SomethingMock }
