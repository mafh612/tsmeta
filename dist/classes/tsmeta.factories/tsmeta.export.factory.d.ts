import { ExportDeclaration, Identifier } from 'typescript';
import { TsExport } from '../../resources/tsmeta.schema';
/**
 * class TsMetaExportFactory
 */
declare class TsMetaExportFactory {
    /**
     * build TsExport element
     * @param exportDeclaration
     */
    build(exportDeclaration: ExportDeclaration): TsExport[];
    /**
     * create single TsExport
     */
    createTsExport(nameObj: Identifier, aliasObj?: Identifier): TsExport;
}
export { TsMetaExportFactory };
