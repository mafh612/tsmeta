// tslint:disable missing-jsdoc no-any no-reserved-keywords completed-docs no-use-before-declare
export interface Callback {
  expression: PathItem
}

export interface Components {
  schemas?: { [key: string]: Schema }
  responses?: { [key: string]: Response }
  parameters?: { [key: string]: Parameter }
  examples?: { [key: string]: Example }
  requestBodies?: { [key: string]: RequestBody }
  headers?: { [key: string]: Header }
  securitySchemes?: { [key: string]: SecurityScheme }
  links?: { [key: string]: Link }
  callbacks?: { [key: string]: Callback }
}

export interface Contact {
  name: string
  url: string
  email: string
}

export interface Discriminator {
  propertyName: string
  mapping: { [key: string]: string }
}

export interface Encoding {
  contentType: string
  headers: { [key: string]: Header }
  style: string
  explode: boolean
  allowReserved: boolean
}

export interface Example {
  summary: string
  description: string
  value: any
  externalValue: string
}

export interface ExternalDocumentation {
  description: string
  url: string
}

export interface Header {
  description: string
  schema: Schema
}

export interface Info {
  title: string
  description: string
  termsOfService: string
  contact: Contact
  license: License
  version: string
}

export interface License {
  name: string
  url: string
}

export interface Link {
  operationRef: string
  operationId: string
  parameters: { [key: string]: any }
  requestBody: any
  description: string
  server: Server
}

export interface MediaType {
  schema: Schema
  example?: any
  examples?: { [key: string]: any }
  encoding?: { [key: string]: Encoding }
}

export interface OAuthFlow {
  authorizationUrl: string
  tokenUrl: string
  refreshUrl: string
  scopes: { [key: string]: string }
}

export interface OAuthFlows {
  implicit: OAuthFlow
  password: OAuthFlow
  clientCredentials: OAuthFlow
  authorizationCode: OAuthFlow
}

export interface Openapi {
  openapi: string
  info: Info
  servers: Server[]
  paths: { [key: string]: PathItem }
  components: Components
  security: SecurityRequirement[]
  tags?: Tag[]
}

export interface Operation {
  tags?: string[]
  summary?: string
  description?: string
  externalDocs?: ExternalDocumentation
  operationId?: string
  parameters: Parameter[]
  requestBody?: RequestBody
  responses: { [key: number]: Response }
  callbacks?: { [key: string]: Callback }
  deprecated?: boolean
  security?: SecurityRequirement[]
  servers?: Server[]
}

export interface Parameter extends Reference {
  name?: string
  in?: string
  schema?: Schema
  example?: any
  description?: string
  required?: boolean
  deprecated?: boolean
  allowEmptyValue?: boolean
}

export interface OperationIS {
  [key: string]: Operation|any
}

export interface PathItem extends Reference, OperationIS {
  summary?: string
  description?: string
  get?: Operation
  put?: Operation
  post?: Operation
  delete?: Operation
  options?: Operation
  head?: Operation
  patch?: Operation
  trace?: Operation
  servers?: Server[]
  parameters?: Parameter[]
}

export interface Reference {
  $ref?: string
}

export interface RequestBody {
  description: string
  content: { [key: string]: MediaType }
  required: boolean
}

export interface Response extends Reference {
  description?: string
  headers?: { [key: string]: Header }
  content?: { [key: string]: MediaType }
  links?: { [key: string]: Link | object }
}

export interface Schema extends Reference {

  title?: string
  multipleOf?: string
  maximum?: number
  exclusiveMaximum?: number
  minimum?: number
  exclusiveMinimum?: number
  maxLength?: number
  minLength?: number
  pattern?: RegExp | string
  maxItems?: number
  minItems?: number
  uniqueItems?: number
  maxProperties?: number
  minProperties?: number
  required?: string[]
  enum?: string[]
  type?: string | Schema
  allOf?: string | Schema
  oneOf?: string | Schema
  anyOf?: string | Schema
  not?: string | Schema
  items?: string | Schema
  properties?: { [key: string]: Schema }
  additionalProperties?: boolean | Schema
  description?: string
  format?: string
  default?: any
  nullable?: boolean
  discriminator?: Discriminator
  readOnly?: boolean
  writeOnly?: boolean
  xml?: XML
  externalDocs?: ExternalDocumentation
  example?: any
  deprecated?: boolean
}

export interface SecurityRequirement {
  name: string
}

export interface SecurityScheme {
  type: string
  description: string
  name: string
  in: string
  scheme: string
  bearerFormat: string
  flows: OAuthFlows
  openIdConnectUrl: string
}

export interface Server {
  url: string
  description: string
  variables: { [key: string]: string }
}

export interface Tag {
  name: string
  description: string
  externalDocs: ExternalDocumentation
}

export interface XML {
  name: string
  namespace: string
  prefix: string
  attribute: boolean
  wrapped: boolean
}
