import { Controller, GetRequest } from '../../src/lib/annotations'

import { ModelMock } from './model.mock'

/**
 * class ControllerMock
 */
@Controller('controllerMock')
class ControllerMock {

  /**
   * findAll Models
   */
  @GetRequest('/findAll')
  public async findAll(): Promise<ModelMock[]> {
    return [new ModelMock()]
  }
}

export {
  ControllerMock
}
