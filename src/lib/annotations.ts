import { ModelParam, ParameterParam, PropertyParam, ResponseParam } from './annotation.schema'

/**
 * decorator functions
 */
const classFunction: (target: any) => any = (target: any): any => target
const methodFunction: (target: any, key: string|Symbol) => any = (target: any, key: string|Symbol): any => target[key as string]
const propertyFunction: (target: any, key: string|Symbol) => any = (target: any, key: string|Symbol): any => target[key as string]
const parameterFunction: (target: any, key: string|Symbol, index: number) => any = (target: any, key: string|Symbol, index: number): any => target[<string> key][index] // tslint:disable-line
/**
 * class annotations
 */
const controller: ((name: string) => any) = (name: string): ClassDecorator => classFunction
const controllerParam: ((parameterParam: ParameterParam) => any) = (parameterParam: ParameterParam): ClassDecorator => classFunction
const model: ((modelParam: ModelParam|any) => any) = (modelParam: ModelParam|any): ClassDecorator => classFunction
/**
 * method annotations
 */
const getRequest: ((path: string) => any) = (path: string): MethodDecorator => methodFunction
const postRequest: ((path: string) => any) = (path: string): MethodDecorator => methodFunction
const putRequest: ((path: string) => any) = (path: string): MethodDecorator => methodFunction
const patchRequest: ((path: string) => any) = (path: string): MethodDecorator => methodFunction
const deleteRequest: ((path: string) => any) = (path: string): MethodDecorator => methodFunction
const headRequest: ((path: string) => any) = (path: string): MethodDecorator => methodFunction
const optionsRequest: ((path: string) => any) = (path: string): MethodDecorator => methodFunction
const successResponse: ((responseParam?: ResponseParam) => any) = (responseParam: ResponseParam): MethodDecorator => methodFunction
const errorResponse: ((responseParam?: ResponseParam) => any) = (responseParam: ResponseParam): MethodDecorator => methodFunction
const secured: (securityKey: string) => MethodDecorator = (securityKey: string): MethodDecorator => methodFunction
const deprecated: MethodDecorator = methodFunction
/**
 * property annotations
 */
const property: ((propertyParam: PropertyParam) => any) = (propertyParam: PropertyParam): PropertyDecorator => propertyFunction
/**
 * parameter annotations
 */
const pathVariable: ((parameterParam: ParameterParam) => any) = (parameterParam: ParameterParam): ParameterDecorator => parameterFunction
const requestParam: ((parameterParam: ParameterParam) => any) = (parameterParam: ParameterParam): ParameterDecorator => parameterFunction
const requestParams: ((parameterParam: ParameterParam) => any) = (parameterParam: ParameterParam): ParameterDecorator => parameterFunction
const requestBody: ((parameterParam: ParameterParam) => any) = (parameterParam: ParameterParam): ParameterDecorator => parameterFunction

export {
  controller as Controller,
  controllerParam as ControllerParam,
  model as Model,
  getRequest as GetRequest,
  postRequest as PostRequest,
  putRequest as PutRequest,
  patchRequest as PatchRequest,
  deleteRequest as DeleteRequest,
  optionsRequest as OptionsRequest,
  headRequest as HeadRequest,
  successResponse as SuccessResponse,
  errorResponse as ErrorResponse,
  deprecated as Deprecated,
  secured as Secured,
  property as Property,
  pathVariable as PathVariable,
  requestParam as RequestParam,
  requestParams as RequestParams,
  requestBody as RequestBody
}
