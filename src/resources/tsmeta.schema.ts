// tslint:disable no-reserved-keywords
/**
 * ts-meta model
 */

/**
 * TsFile interface
 */
export interface TsMeta {
  baseTsPackage: TsPackage
  additionalTsPackages: TsPackage[]
  programs: TsProgram[]
}
/**
 * TsPackage interface
 */
export interface TsPackage {
  author: string
  description: string
  license: string
  main: string
  name: string
  source: string
  types: string
  version: string
  dependencies: { [key: string]: string }
  devDependencies: { [key: string]: string }
}
/**
 * TsProgram interface
 */
export interface TsProgram {
  files: TsFile[]
}
/**
 * TsFile interface
 */
export interface TsFile {
  path: string
  filename: string
  tsClass: TsClass
  tsMains: TsMain[]
  tsimports: TsImport[]
  tsexports: TsExport[]
}
/**
 * TsMain interface
 */
export interface TsMain {
  name: string
  properties: TsProperty[]
  methods: TsMethod[]
}
/**
 * TsClass interface
 */
export interface TsClass extends TsMain {
  decorators: TsDecorator[]
}
/**
 * TsImports interface
 */
export interface TsImport {
  name: string
  alias: string
  source: string
  fullpath: string
}
/**
 * TsExports interface
 */
export interface TsExport {
  name: string
  alias: string
}
/**
 * TsDecorators interface
 */
export interface TsDecorator {
  name: string
  tsarguments: TsArgument[]
}
/**
 * TsProperty interface
 */
export interface TsProperty {
  name: string
  tstype: TsType
}
/**
 * TsMethod interface
 */
export interface TsMethod {
  name: string
  decorators: TsDecorator[]
  parameters: TsParameter[]
  tstype: TsType
}
/**
 * TsParameter interface
 */
export interface TsParameter {
  name: string
  decorators: TsDecorator[]
  tstype: TsType
}
/**
 * TsArgument interface
 */
export interface TsArgument {
  representation: string
  tstype: TsType
}
/**
 * TsType
 */
export interface TsType {
  representation: string
}
