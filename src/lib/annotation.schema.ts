import { OasFormat } from './oas.format.enum'
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
  required: boolean
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
  statusCode?: number
  ref?: any
  version?: string
  schema?: any
  example?: any
}
/**
 * interface ModelParam
 */
export interface ModelParam {
  version?: string
  example?: any
}
