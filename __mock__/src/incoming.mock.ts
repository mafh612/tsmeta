import { Model } from '../../src/lib/annotations'

/**
 * class Incoming
 */
@Model({
  example: {
    identifier: 'identifier',
    name: 'name'
  },
  version: 'v1'
})
class Incoming {

  public name: string
  public identifier: string
}

export { Incoming }
