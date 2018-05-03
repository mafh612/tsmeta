import { Expression, ImportDeclaration, ImportSpecifier } from 'typescript';
import { TsImport } from '../../resources/tsmeta.schema';
/**
 * class TsMetaImportFactory
 */
declare class TsMetaImportFactory {
    /**
     * build TsImport element
     * @param importDeclaration
     */
    build(importDeclaration: ImportDeclaration): TsImport[];
    /**
     * create single TsImport
     */
    createTsImport(importSpecifier: ImportSpecifier, moduleSpecifier: Expression): TsImport;
}
export { TsMetaImportFactory };
