import { Controller, GetRequest, PostRequest as Post, Secured } from '../../src/lib/annotations'

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
  @Secured
  public async findAll(): Promise<ModelMock[]> {
    return [new ModelMock()]
  }

  /**
   * saveOne
   */
  @Secured
  @Post('/saveOne')
  public async saveOnde(): Promise<ModelMock> {
    return new ModelMock()
  }
}

export {
  ControllerMock
}
