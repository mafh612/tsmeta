import { SourceFile } from 'typescript';
import { TsFile } from '../../lib/interfaces/tsmeta.schema';
/**
 * class TsMetaFileFactory
 */
declare class TsMetaFileFactory {
    private readonly tsMetaClassFactory;
    private readonly tsMetaMainFactory;
    private readonly tsMetaExportFactory;
    private readonly tsMetaImportFactory;
    /**
     * build TsFile element
     */
    build(sourceFile: SourceFile): TsFile;
}
export { TsMetaFileFactory };
//# sourceMappingURL=tsmeta.file.factory.d.ts.map