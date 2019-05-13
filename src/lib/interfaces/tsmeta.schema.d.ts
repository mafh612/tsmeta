import { TypescriptTypes } from '../enums/typescript.types.enum';
/**
 * ts-meta model
 */
/**
 * TsFile interface
 */
declare class TsMeta {
    baseTsPackage: TsPackage;
    additionalTsPackages: TsPackage[];
    programs: TsProgram[];
}
export { TsMeta };
/**
 * TsPackage interface
 */
export interface TsPackage {
    author: string;
    description: string;
    license: string;
    main: string;
    name: string;
    source: string;
    types: string;
    version: string;
    dependencies: {
        [key: string]: string;
    };
    devDependencies: {
        [key: string]: string;
    };
}
/**
 * TsProgram interface
 */
export interface TsProgram {
    name: string;
    files: TsFile[];
}
/**
 * TsFile interface
 */
export interface TsFile {
    path: string;
    filename: string;
    tsClass: TsClass;
    tsMains: TsMain[];
    tsImports: TsImport[];
    tsExports: TsExport[];
}
/**
 * TsMain interface
 */
export interface TsMain {
    name: string;
    properties: TsProperty[];
    methods: TsMethod[];
}
/**
 * TsClass interface
 */
export interface TsClass extends TsMain {
    decorators: TsDecorator[];
}
/**
 * TsImports interface
 */
export interface TsImport {
    /**
     * import strict
     */
    name: string;
    /**
     * import as alias
     */
    alias: string;
    /**
     * source file / package
     */
    source: string;
    /**
     * full import path
     */
    fullpath: string;
}
/**
 * TsExports interface
 */
export interface TsExport {
    name: string;
    alias: string;
}
/**
 * TsDecorators interface
 */
export interface TsDecorator {
    name: string;
    tsarguments: TsArgument[];
}
/**
 * TsProperty interface
 */
export interface TsProperty {
    name: string;
    decorators: TsDecorator[];
    tstype: TsType;
}
/**
 * TsMethod interface
 */
export interface TsMethod {
    name: string;
    decorators: TsDecorator[];
    parameters: TsParameter[];
    tstype: TsType;
}
/**
 * TsParameter interface
 */
export interface TsParameter {
    name: string;
    decorators: TsDecorator[];
    tstype: TsType;
}
/**
 * TsArgument interface
 */
export interface TsArgument {
    representation: any;
}
/**
 * TsType
 */
export interface TsType {
    representation?: string;
    basicType: string | string[];
    keyType?: string | string[];
    valueType?: string | string[];
    typescriptType: TypescriptTypes;
}
//# sourceMappingURL=tsmeta.schema.d.ts.map