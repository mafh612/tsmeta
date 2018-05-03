import { SourceFile } from 'typescript';
import { TsFile } from '../../resources/tsmeta.schema';
/**
 * class TsMetaFileFactory
 */
declare class TsMetaFileFactory {
    private tsMetaClassFactory;
    private tsMetaExportFactory;
    private tsMetaImportFactory;
    /**
     * build TsFile element
     * @param sourceFile
     */
    build(sourceFile: SourceFile): TsFile;
}
export { TsMetaFileFactory };
