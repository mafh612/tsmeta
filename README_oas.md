# OpenAPI Specification Examples
- [oasConfig](#user-content-oasconfig)
- [controller annotations](#user-content-controller-annotations)
  - [@Controller](#user-content-@controller)
  - [@ControllerParam](#user-content-controllerparam)
- [method annotations](#user-content-method-annotations)
  - [@GetRequst](#user-content-getrequest)
  - [@PostRequst](#user-content-postrequest)
  - [@PutRequst](#user-content-putrequest)
  - [@PatchRequst](#user-content-patchrequest)
  - [@DeleteRequst](#user-content-deleterequest)
  - [@HeadRequst](#user-content-headrequest)
  - [@OptionsRequst](#user-content-optionsrequest)
- [parameter annotations](#user-content-parameter-annotations)
  - [@PathVariable](#user-content-pathvariable)
  - [@RequestParam](#user-content-requestparam)
  - [@RequestBody](#user-content-requestbody)
- [model annotation](#user-content-model-annotation)
- [property annotation](#user-content-property-annotation)
---
[to top](/README_oas.md)
## oasConfig
```json
{
  "oasConfig": {
    "create": true,
    "outputPath": "schema",
    "outputFilename": "oas.output.json",
    "openapistring": "3.0.1",
    "annotationsMap": {
      "Body": "RequestBody",
      "QueryParam": "RequestParam",
      "Get": "RequestGet"
    }
  }
}
```
---
## controller annotations

|@Controller|[to top](/)|
|-:|-:|
```typescript
@Controller('controller/mock')
class ControllerMock {
  ...
}
```

```json
{
  "paths": {
    "controller/mock/...": { // ... = mapping of methods see below

    }
  }
}
```
[to top](#/)
### @ControllerParam
```typescript
@Controller(':version/controller/mock')
@ControllerParam({ name: 'version', required: true, in: 'path', schema: { type: 'string' } })
class ControllerMock {
  ...
}
```

```json
{
  "paths": {
    "/{version}/controller/mock/...": { // ... = mapping of methods see below

    }
  }
}
```
---
## method annotations
[to top](/)
### @GetRequest
```typescript
@Controller(':version/controller/mock')
@ControllerParam({ name: 'version', required: true, in: 'path', schema: { type: 'string' } })
class ControllerMock {

  /**
   * get something method
   */
  @GetRequest('/something')
  public async getSomething(): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock())
  }
}
```
```json
{
  "paths": {
    "/{version}/controller/mock/something": {
      "get": {
        "responses": {
          "200": {
            "description":  "no content" // see @SuccessResponse & @ErrorResponse below
          }
        }
      }
    }
  }
}
```
[to top](/)
### @PostRequest
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
[to top](/)
### @PutRequest
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
[to top](/)
### @PatchRequest
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
[to top](/)
### @DeleteRequest
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
[to top](/)
### @HeadRequest
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
[to top](/)
### @OptionsRequest
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
---
[to top](/)
## model annoation
[to top](/)
## property annoation
