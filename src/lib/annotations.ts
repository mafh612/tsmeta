import { ModelParam, ParameterParam, PropertyParam, ResponseParam } from './interfaces/annotation.schema'

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
const getMapping: ((path: string) => any) = (path: string): MethodDecorator => methodFunction
const postMapping: ((path: string) => any) = (path: string): MethodDecorator => methodFunction
const putMapping: ((path: string) => any) = (path: string): MethodDecorator => methodFunction
const patchMapping: ((path: string) => any) = (path: string): MethodDecorator => methodFunction
const deleteMapping: ((path: string) => any) = (path: string): MethodDecorator => methodFunction
const headMapping: ((path: string) => any) = (path: string): MethodDecorator => methodFunction
const optionsMapping: ((path: string) => any) = (path: string): MethodDecorator => methodFunction
const successResponse: ((responseParam?: ResponseParam) => any) = (responseParam: ResponseParam): MethodDecorator => methodFunction
const errorResponse: ((responseParam?: ResponseParam) => any) = (responseParam: ResponseParam): MethodDecorator => methodFunction
const secured: (securityMethod: string) => MethodDecorator = (securityMethod: string): MethodDecorator => methodFunction
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
const requestBody: ((parameterParam: ParameterParam) => any) = (parameterParam: ParameterParam): ParameterDecorator => parameterFunction

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
  secured as Secured,
  deprecated as Deprecated,
  property as Property,
  pathVariable as PathVariable,
  requestParam as RequestParam,
  requestBody as RequestBody
}
