import { OasFormat } from './oas.format.enum'
/**
 * interface PropertyParam
 */
export interface PropertyParam {
  version: string
  format: OasFormat
}
/**
 * interface ParameterParam
 */
export interface ParameterParam {
  name: string
  required: boolean
}
/**
 * interface SuccessResponseParam
 */
export interface ResponseParam {
  statusCode?: number
  ref?: any
  version?: string
  res?: any
  example?: any
}
/**
 * interface ModelParam
 */
export interface ModelParam {
  version: string
  example?: any
}
