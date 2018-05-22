import { ModelParam, ParameterParam, PropertyParam, ResponseParam } from './annotation.schema'

/**
 * decorator functions
 */
const classFunction: ((target: any) => any) = (target: any): any => target
const methodFunction: ((target: any, key: string|Symbol) => any) = (target: any, key: string|Symbol): any => target[<string> key]
const propertyFunction: ((target: any, key: string|Symbol) => any) = (target: any, key: string|Symbol): any => target[<string> key]
const parameterFunction: ((target: any, key: string|Symbol, index: number) => any) = (target: any, key: string|Symbol, index: number): any => target[<string> key][index] // tslint:disable-line
/**
 * class annotations
 */
const controller: ((name: string) => any) = (name: string): Function => classFunction
const model: ((modelParam: ModelParam) => any) = (modelParam: ModelParam): Function => classFunction
/**
 * method annotations
 */
const getRequest: ((path: string) => any) = (path: string): Function => methodFunction
const postRequest: ((path: string) => any) = (path: string): Function => methodFunction
const putRequest: ((path: string) => any) = (path: string): Function => methodFunction
const patchRequest: ((path: string) => any) = (path: string): Function => methodFunction
const deleteRequest: ((path: string) => any) = (path: string): Function => methodFunction
const headRequest: ((path: string) => any) = (path: string): Function => methodFunction
const successResponse: ((responseParam?: ResponseParam) => any) = (responseParam: ResponseParam): Function => methodFunction
const errorResponse: ((responseParam?: ResponseParam) => any) = (responseParam: ResponseParam): Function => methodFunction
/**
 * property annotations
 */
const property: ((propertyParam: PropertyParam) => any) = (propertyParam: PropertyParam): Function => propertyFunction
/**
 * parameter annotations
 */
const pathVariable: ((parameterParam: ParameterParam) => any) = (parameterParam: ParameterParam): Function => parameterFunction
const requestParam: ((parameterParam: ParameterParam) => any) = (parameterParam: ParameterParam): Function => parameterFunction
const requestBody: ((parameterParam: ParameterParam) => any) = (parameterParam: ParameterParam): Function => parameterFunction

export {
  controller as Controller,
  model as Model,
  getRequest as GetRequest,
  postRequest as PostRequest,
  putRequest as PutRequest,
  patchRequest as PatchRequest,
  deleteRequest as DeleteRequest,
  headRequest as HeadRequest,
  successResponse as SuccessResponse,
  errorResponse as ErrorResponse,
  property as Property,
  pathVariable as PathVariable,
  requestParam as RequestParam,
  requestBody as RequestBody
}
