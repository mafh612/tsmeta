import { ModelParam, ParameterParam, PropertyParam, ResponseParam } from './interfaces/annotation.schema'

/**
 * class annotations
 */
type Controller = ((name: string) => any)
type ControllerParam = ((parameterParam: ParameterParam) => any)
type Model = ((modelParam: ModelParam|any) => any)
/**
 * method annotations
 */
type GetRequest = ((path: string) => any)
type PostRequest = ((path: string) => any)
type PutRequest = ((path: string) => any)
type PatchRequest = ((path: string) => any)
type DeleteRequest = ((path: string) => any)
type HeadRequest = ((path: string) => any)
type OptionsRequest = ((path: string) => any)
type SuccessResponse = ((responseParam?: ResponseParam) => any)
type ErrorResponse = ((responseParam?: ResponseParam) => any)
type Secured = (securityKey: string) => MethodDecorator
type Deprecated = MethodDecorator
/**
 * property annotations
 */
type Property = ((propertyParam: PropertyParam) => any)
/**
 * parameter annotations
 */
type PathVariable = ((parameterParam: ParameterParam) => any)
type RequestParam = ((parameterParam: ParameterParam) => any)
type RequestParams = ((parameterParam: ParameterParam) => any)
type RequestBody = ((parameterParam: ParameterParam) => any)

export {
  Controller,
  ControllerParam,
  Model,
  GetRequest,
  PostRequest,
  PutRequest,
  PatchRequest,
  DeleteRequest,
  OptionsRequest,
  HeadRequest,
  SuccessResponse,
  ErrorResponse,
  Deprecated,
  Secured,
  Property,
  PathVariable,
  RequestParam,
  RequestParams,
  RequestBody
}
