import { Schema as OasModelSchema } from 'oasmodel'

export interface Schema extends OasModelSchema {
  oneOf?: string | string[] | OasModelSchema
  allOf?: string | string[] | OasModelSchema
  anyOf?: string | string[] | OasModelSchema
}
