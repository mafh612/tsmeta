import { ModelParam, ParameterParam, PropertyParam, ResponseParam } from './interfaces/annotation.schema'

/**
 * decorator functions
 */
const classFunction: (target: any) => any = (target: any): any => target
const methodFunction: (target: any, key: string | Symbol) => any = (target: any, key: string | Symbol): any =>
  target[key as string]
const propertyFunction: (target: any, key: string | Symbol) => any = (target: any, key: string | Symbol): any =>
  target[key as string]
const parameterFunction: (target: any, key: string | Symbol, index: number) => any = (
  target: any,
  key: string | Symbol,
  index: number
): any => target[key as string][index]
/**
 * class annotations
 */
const controller: (name: string) => ClassDecorator = (name: string): ClassDecorator => classFunction
const controllerParam: (parameterParam: ParameterParam) => ClassDecorator = (
  parameterParam: ParameterParam
): ClassDecorator => classFunction
const model: (modelParam: ModelParam | any) => ClassDecorator = (modelParam: ModelParam | any): ClassDecorator =>
  classFunction
/**
 * method annotations
 */
const getMapping: (path: string) => MethodDecorator = (path: string): MethodDecorator => methodFunction
const postMapping: (path: string) => MethodDecorator = (path: string): MethodDecorator => methodFunction
const putMapping: (path: string) => MethodDecorator = (path: string): MethodDecorator => methodFunction
const patchMapping: (path: string) => MethodDecorator = (path: string): MethodDecorator => methodFunction
const deleteMapping: (path: string) => MethodDecorator = (path: string): MethodDecorator => methodFunction
const headMapping: (path: string) => MethodDecorator = (path: string): MethodDecorator => methodFunction
const optionsMapping: (path: string) => MethodDecorator = (path: string): MethodDecorator => methodFunction
const successResponse: (responseParam?: ResponseParam) => MethodDecorator = (
  responseParam?: ResponseParam
): MethodDecorator => methodFunction
const errorResponse: (responseParam?: ResponseParam) => MethodDecorator = (
  responseParam?: ResponseParam
): MethodDecorator => methodFunction
const secured: (securityKey: string) => MethodDecorator = (securityKey: string): MethodDecorator => methodFunction
const deprecated: MethodDecorator = methodFunction
/**
 * propertyannotations
 */
const property: (propertyParam: PropertyParam) => PropertyDecorator = (
  propertyParam: PropertyParam
): PropertyDecorator => propertyFunction
const ignoreProperty: (target: any, key: string | Symbol) => any = (target: any, key: string | Symbol): any =>
  target[key as string]
/**
 * parameter annotations
 */
const pathVariable: (parameterParam: ParameterParam) => ParameterDecorator = (
  parameterParam: ParameterParam
): ParameterDecorator => parameterFunction
const requestParam: (parameterParam: ParameterParam) => ParameterDecorator = (
  parameterParam: ParameterParam
): ParameterDecorator => parameterFunction
const requestParams: (parameterParam: ParameterParam) => ParameterDecorator = (
  parameterParam: ParameterParam
): ParameterDecorator => parameterFunction
const requestBody: (parameterParam: ParameterParam) => ParameterDecorator = (
  parameterParam: ParameterParam
): ParameterDecorator => parameterFunction

export {
  controller as Controller,
  controllerParam as ControllerParam,
  model as Model,
  getMapping as GetMapping,
  postMapping as PostMapping,
  putMapping as PutMapping,
  patchMapping as PatchMapping,
  deleteMapping as DeleteMapping,
  optionsMapping as OptionsMapping,
  headMapping as HeadMapping,
  successResponse as SuccessResponse,
  errorResponse as ErrorResponse,
  deprecated as Deprecated,
  secured as Secured,
  property as Property,
  ignoreProperty as IgnoreProperty,
  pathVariable as PathVariable,
  requestParam as RequestParam,
  requestParams as RequestParams,
  requestBody as RequestBody
}
