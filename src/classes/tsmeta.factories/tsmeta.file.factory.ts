import { ClassDeclaration, ExportDeclaration, ImportDeclaration, Node, SourceFile, SyntaxKind } from 'typescript'
import { TsClass, TsExport, TsFile, TsImport, TsMain } from '../../resources/tsmeta.schema'
import { TsMetaClassFactory } from './tsmeta.class.factory'
import { TsMetaExportFactory } from './tsmeta.export.factory'
import { TsMetaImportFactory } from './tsmeta.import.factory'

/**
 * class TsMetaFileFactory
 */
class TsMetaFileFactory {

  private tsMetaClassFactory: TsMetaClassFactory = new TsMetaClassFactory()
  private tsMetaExportFactory: TsMetaExportFactory = new TsMetaExportFactory()
  private tsMetaImportFactory: TsMetaImportFactory = new TsMetaImportFactory()

  /**
   * build TsFile element
   * @param sourceFile
   */
  public build(sourceFile: SourceFile): TsFile {
    const sourceFilenameArray: string[] = sourceFile.fileName.split('/')

    const filename: string = sourceFilenameArray.pop()
    const path: string = sourceFilenameArray.join('/')
    let tsexports: TsExport[] = []
    let tsimports: TsImport[] = []
    const tsMains: TsMain[] = []
    let tsClass: TsClass

    sourceFile.forEachChild((node: Node) => {
      switch (node.kind) {
        case SyntaxKind.ClassDeclaration:
          tsClass = this.tsMetaClassFactory.build(<ClassDeclaration> node)
          break
        case SyntaxKind.ExportDeclaration:
          tsexports = tsexports.concat(this.tsMetaExportFactory.build(<ExportDeclaration> node))
          break
        case SyntaxKind.ImportDeclaration:
          tsimports = tsimports.concat(this.tsMetaImportFactory.build(<ImportDeclaration> node))
          break
        default:
      }
    })

    return {
      path,
      filename,
      tsexports,
      tsimports,
      tsClass,
      tsMains
    }
  }
}

export { TsMetaFileFactory }
