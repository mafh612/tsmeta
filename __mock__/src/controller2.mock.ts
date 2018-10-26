import {
  Controller,
  DeleteRequest,
  ErrorResponse,
  GetRequest,
  HeadRequest,
  PatchRequest,
  PathVariable,
  PostRequest,
  PutRequest,
  RequestBody,
  SuccessResponse
} from '../../src/lib/annotations'
import { Incoming } from './incoming.mock'
import { SomethingMock } from './something.mock'

/**
 * class ControllerMock
 */
@Controller('controller/mock')
class ControllerMock {

  /**
   * get something method
   */
  @GetRequest('/something/:id')
  @SuccessResponse({ statusCode: 200, ref: SomethingMock, version: 'v1'})
  public async getSomething(@PathVariable({ name: 'id', required: true }) id: string): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock(id))
  }

  /**
   * get something method
   */
  @PostRequest('/something')
  @SuccessResponse({ statusCode: 200, ref: SomethingMock, version: 'v1'})
  public async postSomething(@RequestBody({ name: 'incoming', required: true}) incoming: Incoming): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock('any'))
  }

  /**
   * get something method
   */
  @PutRequest('/something/:id')
  @SuccessResponse({ statusCode: 201, ref: SomethingMock, version: 'v1' })
  @ErrorResponse({
    example: { statusCode: 404, statusMessage: 'NOT_FOUND' },
    schema: { statusCode: 'number', statusMessage: 'string' },
    statusCode: 404
  })
  public async putSomething(
    @PathVariable({ name: 'id', required: true }) id: string,
    @RequestBody({ name: 'incoming', required: true}) incoming: Incoming): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock(id))
  }

  /**
   * get something method
   */
  @PatchRequest('/something')
  @SuccessResponse({ statusCode: 201, schema: { successful: 'boolean' }, example: { successful: true } })
  public async patchSomething(@RequestBody({ name: 'incoming', required: true}) incoming: Incoming): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock('any'))
  }

  /**
   * get something method
   */
  @DeleteRequest('/something/:id')
  @SuccessResponse({ statusCode: 201 })
  public async deleteSomething(@PathVariable({ name: 'id', required: true }) id: string): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock(id))
  }

  /**
   * get something method
   */
  @HeadRequest('/something')
  @SuccessResponse()
  public async headSomething(@PathVariable({ name: 'id', required: true }) id: string): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock(id))
  }
}

export { ControllerMock }
