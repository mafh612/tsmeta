import { Discriminator, ExternalDocumentation, Reference, XML } from 'oasmodel'

export interface Schema extends Reference {
  additionalProperties?: boolean | Schema
  allOf?: string | Schema | Array<string | Schema>
  anyOf?: string | Schema | Array<string | Schema>
  default?: any
  deprecated?: boolean
  description?: string
  discriminator?: Discriminator
  enum?: string[]
  example?: any
  exclusiveMaximum?: number
  exclusiveMinimum?: number
  externalDocs?: ExternalDocumentation
  format?: string
  items?: string | Schema
  maxItems?: number
  maxLength?: number
  maxProperties?: number
  maximum?: number
  minItems?: number
  minLength?: number
  minProperties?: number
  minimum?: number
  multipleOf?: string
  not?: string | Schema
  nullable?: boolean
  oneOf?: string | Schema | Array<string | Schema>
  pattern?: RegExp | string
  properties?: {
    readOnly?: boolean
    required?: string[]
    title?: string
    type?: string | Schema
    uniqueItems?: number
    writeOnly?: boolean
    xml?: XML
  }
  type?: string | string[] | Schema
}
