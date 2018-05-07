import { Controller, GetRequest, PathVariable, SuccessResponse } from '../resources/annotations'
import { SomethingMock } from './something.mock'

/**
 * class ControllerMock
 */
@Controller('controller/mock')
class ControllerMock {

  /**
   * get something method
   * @param text
   */
  @GetRequest('/something')
  @SuccessResponse()
  public async getSomething(@PathVariable({ name: 'text', required: true }) text: string): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock(text))
  }
}

export { ControllerMock }
