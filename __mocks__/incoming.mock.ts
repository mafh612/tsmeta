import { Model } from '../src/resources/annotations'

/**
 * class Incoming
 */
@Model({
  version: 'v1',
  example: {
    name: 'name',
    identifier: 'identifier'
  }
})
class Incoming {

  public name: string
  public identifier: string
}

export { Incoming }
