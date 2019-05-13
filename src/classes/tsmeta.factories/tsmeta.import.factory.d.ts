import { Expression, ImportDeclaration, ImportSpecifier } from 'typescript';
import { TsImport } from '../../lib/interfaces/tsmeta.schema';
/**
 * class TsMetaImportFactory
 */
declare class TsMetaImportFactory {
    /**
     * build TsImport element
     */
    build(importDeclaration: ImportDeclaration): TsImport[];
    /**
     * create single TsImport
     */
    createTsImport(importSpecifier: ImportSpecifier, moduleSpecifier: Expression): TsImport;
}
export { TsMetaImportFactory };
//# sourceMappingURL=tsmeta.import.factory.d.ts.map