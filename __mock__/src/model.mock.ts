import { Model } from '../../src/lib/annotations'

/**
 * class ModelMock
 */
@Model
class ModelMock {

  public id: string
  public texts: string[]
}

export {
  ModelMock
}
