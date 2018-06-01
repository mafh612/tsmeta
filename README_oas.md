# OpenAPI Specification Examples
- [oasConfig](#user-content-oasconfig)

- [controller annotations](#user-content-controller-annotations)
  - [@Controller](#user-content-@controller)
  - [@ControllerParam](#user-content-controllerparam)

- [method annotations](#user-content-method-annotations)
  - [@GetRequst @HeadRequest @DeleteRequest @OptionsRequest](#user-content-getrequest-headrequest-deleterequest-optionsrequest)
  - [@PostRequst @PutRequst @PatchRequst](#user-content-postrequest-putrequest-patchrequest)
- [parameter annotations](#user-content-parameter-annotations)
  - [@PathVariable](#user-content-pathvariable)
  - [@RequestParam](#user-content-requestparam)
  - [@RequestBody](#user-content-requestbody)
- [model annotation](#user-content-model-annotation)
- [property annotation](#user-content-property-annotation)
---
[to top](/README_oas.md)

## oasConfig
```javascript
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
[to top](/README_oas.md)

---

## controller annotations
`@Controller` annotations are required for OpenAPI specification. Only `@Controller` annotated classes and the methods therein will be processed for the OpenAPI specification file.
### @Controller
using the `annotationsMap` object of the `oasConfig` object you can map your functional annotation (e.g. `@Con`) to the `@Controller` annotation to trigger creation of the OpenAPI sepcification. However `@Controller`/`@Con` expects the first decorator argument to be a string with the basic path for the controller.
```javascript
{
  "oasConfig": {
    ...
    "annotationsMap": {
      "Controller": "Con"
    }
  }
}
```
annotation of your controller class like this ...
```typescript
@Controller('controller/mock') // or @Con if mapped
class ControllerMock {
  ...
}
```
...will result in a OpenAPI schema as this:
```javascript
{
  "paths": {
    "controller/mock/##MethodMapping##": { // ##MethodMapping## - mapping of methods see below

    }
  }
}
```

[to top](/README_oas.md)
### @ControllerParam
If you use a variable like `version` in the controller path you have to `@ControllerParam` annotate this variable to be set to the `parameters` array of all `operations` for this `path`.

Using the `annotationsMap` object of the `oasConfig` object you can map your functional annotation (e.g. `@BasicPathParam`) to the `@ControllerParam` annotation. However `@ControllerParam`/`@BasicPathParam` expects the
first decorator argument to be an object like this:
```typescript
  name: string
  required: boolean
  in: string
  schema?: Schema
  example?: any
```
annotation of your controller class like this ...
```typescript
@Controller(':version/controller/mock')
@ControllerParam({ name: 'version', required: true, in: 'path', schema: { type: 'string', enum: ['v1', 'v2'] } }) // or @BasicPathParam if mapped
class ControllerMock {
  ...
}
```
...will result in a OpenAPI schema as this:
```javascript
{
  "paths": {
    "/{version}/controller/mock/##MethodMapping##": { // ##MethodMapping## - mapping of methods see below
      "get": {
        "parameters": [
          {
            "allowEmptyValue": false,
            "deprecated": false,
            "description": "ControllerParam version",
            "in": "path",
            "name": "version",
            "required": true,
            "schema": {
                "type": "string"
            }
          }
        ]
      }
    }
  }
}
```

[to top](/README_oas.md)

---
## method annotations

Method annotations include `@GetRequest`, `@PostRequest`, `@PutRequest`, `@PatchRequest`, `@DeleteRequest`, `@HeadRequest` and `@OptionsRequest` to map your class methods to the respective HttpMethod, as well as `@SuccessResponse` and `@ErrorResponse` to create a response object for the operation.
### @GetRequest, @HeadRequest, @DeleteRequest, @OptionsRequest
Using the `annotationsMap` object of the `oasConfig` object you can map your functional annotation (e.g. `@Get`) to the `@GetRequest` annotation.
However `@GetRequest`/`@Get` expects the first decorator argument to be a string defining the path.

annotation of your controller class and method like this ...
```typescript
@Controller(':version/controller/mock')
@ControllerParam({ name: 'version', required: true, in: 'path', schema: { type: 'string' } })
class ControllerMock {

  /**
   * get something method
   */
  @GetRequest('/something/:id') // or @Get if mapped
  public async getSomething(
    @PathVariable({ // @PathVariable in detail see parameter annotations below
      name: 'id',
      required: true,
      schema: {
        type: 'string'
      }
    }) id: string): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock(id))
  }
}
```

...will result in a OpenAPI schema as this:
```javascript
{
  "paths": {
    "/{version}/controller/mock/something": {
      "get": {
        "parameters": [
          {
            controllerparam
          },
          {
            "allowEmptyValue": false,
            "deprecated": false,
            "description": "PathVariable id",
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
                "type": "string"
            }
          }
        ],
        "responses": { // see @SuccessResponse & @ErrorResponse below
          "200": {
            "description":  "no content"
          }
        }
      }
    }
  }
}
```

[to top](/README_oas.md)
### @PostRequest, @PutRequest, @PatchRequest
Using the `annotationsMap` object of the `oasConfig` object you can map your functional annotation (e.g. `@Post`) to the `@PostRequest` annotation.
However `@PostRequest`/`@Post` expects the first decorator argument to be a string defining the path.

annotation of your controller class and method like this ...
```typescript
@Controller(':version/controller/mock')
@ControllerParam({ name: 'version', required: true, in: 'path', schema: { type: 'string' } })
class ControllerMock {
  /**
   * get something method
   * @param id
   */
  @PostRequest('/something') // or @Post if mapped
  public async postSomething(
    @RequestBody({
      name: 'incoming',
      required: true,
      ref: 'Incoming'
    }) incoming: Incoming): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock('any'))
  }
}
```
- @RequestBody in detail see parameter annotations below

...will result in a OpenAPI schema as this:
```javascript
{
  "paths": {
    "/{version}/controller/mock/something": {
      "post": {
        "requestObject": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Incoming"
              }
            }
          }
        },
        "responses": { // see @SuccessResponse & @ErrorResponse below
          "200": {
            "description":  "no content"
          }
        }
      }
    }
  }
}
```

### @SuccessResponse & @ErrorResponse
Using the `annotationsMap` object of the `oasConfig` object you can map your functional annotation (e.g. `@Success`) to the `@SuccessResponse` annotation.
However `@SuccessResponse`/`@Success` expects the first decorator argument to be an object like this:
```typescript
  statusCode?: number // if omitted status code will be 200
  ref?: any
  version?: string
  schema?: any
  example?: any
  // if neither "ref" nor "schema" is given, the response object will have only the description field "no content"
```
annotation of your controller class and method like this ...
```typescript
@Controller(':version/controller/mock')
@ControllerParam({ name: 'version', required: true, in: 'path', schema: { type: 'string' } })
class ControllerMock {
  /**
   * get something method
   * @param id
   */
  @PostRequest('/something')
  @SuccessResponse({ statusCode: 200, ref: 'SomethingMock', version: 'v1' }) // or @Success if mapped
  public async postSomething(
    @RequestBody({
      name: 'incoming',
      required: true,
      ref: 'Incoming'
    }) incoming: Incoming): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock('any'))
  }
}
```
- @RequestBody in detail see parameter annotations below

...will result in a OpenAPI schema as this:
```javascript
{
  "paths": {
    "/{version}/controller/mock/something": {
      "post": {
        "requestObject": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Incoming"
              }
            }
          }
        },
        "responses": {
            "200": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SomethingMock_v1"
                  }
                }
              },
              "description": "SuccessResponse"
            }
          }
        }
      }
    }
  }
}
```
annotation of your controller class and method like this ...
```typescript
@Controller(':version/controller/mock')
@ControllerParam({ name: 'version', required: true, in: 'path', schema: { type: 'string' } })
class ControllerMock {
  /**
   * get something method
   * @param id
   */
  @PostRequest('/something')
  @SuccessResponse({ // or @Success if mapped
    statusCode: 200,
    schema: {
      properties: {
        email: {
          type: 'string'
        },
        password: {
          type: 'string'
        }
      }
    },
    example: {
      email: 'somebody@something.net',
      password: '12345678'
    }
  })
  public async postSomething(
    @RequestBody({ // @RequestBody in detail see parameter annotations below
      name: 'incoming',
      required: true,
      ref: 'Incoming'
    }) incoming: Incoming): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock(incoming.email))
  }
}
```

...will result in a OpenAPI schema as this:
```javascript
{
  "paths": {
    "/{version}/controller/mock/something": {
      "post": {
        "requestObject": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/Incoming"
              }
            }
          }
        },
        "responses": {
            "200": {
              "content": {
                "application/json": {
                  "schema": {
                    "properties": {
                      "email": {
                        "type": "string"
                      },
                      "password": {
                        "type": "string"
                      }
                    },
                    "example": {
                      "email": "somebody@something.net",
                      "password": "12345678"
                    }
                  }
                }
              },
              "description": "SuccessResponse"
            }
          }
        }
      }
    }
  }
}
```

[to top](/README_oas.md)

---
## parameter annotations
Parameter annotations are to define the expected parameters of the method and map their respective source.
### @PathVariable
Using the `annotationsMap` object of the `oasConfig` object you can map your functional annotation (e.g. `@PathParam`) to the `@PathVariable` annotation.
However `@PathVariable`/`@PathParam` expects the first decorator argument to be an object like this:
```typescript
  name: string
  required: boolean
  ref?: any
  version?: string
  schema?: any
  example?: any
```

annotation of your controller class and method like this ...
```typescript
@Controller(':version/controller/mock')
@ControllerParam({ name: 'version', required: true, in: 'path', schema: { type: 'string' } })
class ControllerMock {

  /**
   * get something method
   */
  @GetRequest('/something/:id')
  public async getSomething(
    @PathVariable({ // or @PathParam if mapped
      name: 'id',
      required: true,
      schema: {
        type: 'string'
      }
    }) id: string): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock(id))
  }
}
```
...will result in a OpenAPI schema as this:
```javascript
{
  "paths": {
    "/{version}/controller/mock/something/{id}": {
      "get": {
        "parameters": [
          ...
          {
            "allowEmptyValue": false,
            "deprecated": false,
            "description": "PathVariable id",
            "in": "path",
            "name": "id",
            "required": true,
            "schema": {
                "type": "string"
            }
          }
        ],
        ...
      }
    }
  }
}
```

[to top](/README_oas.md)

### @RequestParam
Using the `annotationsMap` object of the `oasConfig` object you can map your functional annotation (e.g. `@QueryParam`) to the `@RequestParam` annotation.
However `@RequestParam`/`@QueryParam` expects the first decorator argument to be an object like this:
```typescript
  name: string
  required: boolean
  ref?: any
  version?: string
  schema?: any
  example?: any
```

annotation of your controller class and method like this ...
```typescript
@Controller(':version/controller/mock')
@ControllerParam({ name: 'version', required: true, in: 'path', schema: { type: 'string' } })
class ControllerMock {

  /**
   * get something method
   */
  @GetRequest('/something')
  public async getSomething(
    @RequestParam({ // or @QueryParam if mapped
      name: 'id',
      required: false,
      schema: {
        type: 'string'
      }
    }) id: string): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock(id))
  }
}
```
...will result in a OpenAPI schema as this:
```javascript
{
  "paths": {
    "/{version}/controller/mock/something/{id}": {
      "get": {
        "parameters": [
          ...
          {
            "allowEmptyValue": true,
            "deprecated": false,
            "description": "PathVariable id",
            "in": "query",
            "name": "id",
            "required": false,
            "schema": {
                "type": "string"
            }
          }
        ],
        ...
      }
    }
  }
}
```

[to top](/README_oas.md)

### @RequestBody
Using the `annotationsMap` object of the `oasConfig` object you can map your functional annotation (e.g. `@Body`) to the `@RequestBody` annotation.
However `@RequestBody`/`@Body` expects the first decorator argument to be an object like this:
```typescript
  name: string
  required: boolean
  ref?: any
  version?: string
  schema?: any
  example?: any
```

annotation of your controller class and method like this ...
```typescript
@Controller(':version/controller/mock')
@ControllerParam({ name: 'version', required: true, in: 'path', schema: { type: 'string' } })
class ControllerMock {

  /**
   * get something method
   */
  @GetRequest('/something')
  public async getSomething(
    @RequestBody({ // or @Body if mapped
      name: 'id',
      required: false,
      ref: 'SimpleMock'
    }) simpleMock: SimpleMock): Promise<SomethingMock> {
    return Promise.resolve(new SomethingMock(simpleMock.id))
  }
}
```
...will result in a OpenAPI schema as this:
```javascript
{
  "paths": {
    "/{version}/controller/mock/something/{id}": {
      "get": {
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SimpleMock"
              }
            }
          }
        }
        ...
      }
    }
  }
}
```

[to top](/README_oas.md)

---
## model annoation

to use references to `#/components/schemas/##your class##` you have to create model classes

[to top](/README_oas.md)
## property annoation
[to top](/README_oas.md)
