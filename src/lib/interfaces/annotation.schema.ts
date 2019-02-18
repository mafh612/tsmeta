import { OasFormat } from '../enums/oas.format.enum'
/**
 * interface PropertyParam
 */
export interface PropertyParam {
  version?: string
  required?: boolean
  format?: OasFormat
}
/**
 * interface ParameterParam
 */
export interface ParameterParam {
  name: string
  description?: string
  required: (boolean|string)[]|boolean
  in?: string // tslint:disable-line no-reserved-keywords
  ref?: any
  version?: string
  schema?: any
  example?: any
}
/**
 * interface SuccessResponseParam
 */
export interface ResponseParam {
  description?: string
  example?: any
  ref?: any
  response_ref?: any
  schema?: any
  statusCode?: number
  version?: string
}
/**
 * interface ModelParam
 */
export interface ModelParam {
  version?: string
  example?: any
}
