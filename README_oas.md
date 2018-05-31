# OpenAPI Specification Examples
## Controller
```typescript
import {
  Controller,
  ControllerParam,
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
} from '../src'
import { Incoming } from './incoming.mock'
import { SomethingMock } from './something.mock'

/**
 * class ControllerMock
 */
@Controller('controller/mock/:tenant')
@ControllerParam({ name: 'tenant', required: true, in: 'path', schema: { type: 'string' } })
class ControllerMock {
}
```
```typescript
  /**
   * get something method
   * @param id
   */
  @GetRequest('/something/:id')
  @SuccessResponse({ statusCode: 200, ref: SomethingMock, version: 'v1'})
  public async getSomething(@PathVariable({ name: 'id', required: true }) id: string): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock(id))
  }
```
```typescript
  /**
   * get something method
   * @param id
   */
  @PostRequest('/something')
  @SuccessResponse({ statusCode: 200, ref: SomethingMock, version: 'v1'})
  public async postSomething(@RequestBody({ name: 'incoming', required: true}) incoming: Incoming): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock('any'))
  }
```
```typescript
  /**
   * get something method
   * @param id
   */
  @PutRequest('/something/:id')
  @SuccessResponse({ statusCode: 201, ref: SomethingMock, version: 'v1' })
  @ErrorResponse({ statusCode: 404, schema: { statusCode: 'number', statusMessage: 'string' }, example: { statusCode: 404, statusMessage: 'NOT_FOUND' } })
  public async putSomething(
    @PathVariable({ name: 'id', required: true }) id: string,
    @RequestBody({ name: 'incoming', required: true}) incoming: Incoming): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock(id))
  }
```
```typescript
  /**
   * get something method
   * @param id
   */
  @PatchRequest('/something')
  @SuccessResponse({ statusCode: 201, schema: { successful: 'boolean' }, example: { successful: true } })
  public async patchSomething(@RequestBody({ name: 'incoming', required: true}) incoming: Incoming): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock('any'))
  }
```
```typescript
  /**
   * get something method
   * @param id
   */
  @DeleteRequest('/something/:id')
  @SuccessResponse({ statusCode: 201 })
  public async deleteSomething(@PathVariable({ name: 'id', required: true }) id: string): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock(id))
  }
```
```typescript
  /**
   * get something method
   * @param id
   */
  @HeadRequest('/something')
  @SuccessResponse()
  public async headSomething(@PathVariable({ name: 'id', required: true }) id: string): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock(id))
  }
}
```
