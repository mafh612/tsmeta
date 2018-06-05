import { ClassDeclaration, ExportDeclaration, ImportDeclaration, InterfaceDeclaration, Node, SourceFile, SyntaxKind } from 'typescript'
import { TsClass, TsExport, TsFile, TsImport, TsMain } from '../../lib/tsmeta.schema'
import { TsMetaClassFactory } from './tsmeta.class.factory'
import { TsMetaExportFactory } from './tsmeta.export.factory'
import { TsMetaImportFactory } from './tsmeta.import.factory'
import { TsMetaMainFactory } from './tsmeta.main.factory'

/**
 * class TsMetaFileFactory
 */
class TsMetaFileFactory {

  private tsMetaClassFactory: TsMetaClassFactory = new TsMetaClassFactory()
  private tsMetaMainFactory: TsMetaMainFactory = new TsMetaMainFactory()
  private tsMetaExportFactory: TsMetaExportFactory = new TsMetaExportFactory()
  private tsMetaImportFactory: TsMetaImportFactory = new TsMetaImportFactory()

  /**
   * build TsFile element
   * @param sourceFile
   */
  public build(sourceFile: SourceFile): TsFile {
    const sourceFilenameArray: string[] = sourceFile.fileName.split('/')

    const filename: string = sourceFilenameArray.pop().replace('.ts', '')
    const path: string = sourceFilenameArray.join('/')
    let tsExports: TsExport[] = []
    let tsImports: TsImport[] = []
    let tsMains: TsMain[] = []
    let tsClass: TsClass

    sourceFile.forEachChild((node: Node) => {
      switch (node.kind) {
        case SyntaxKind.Unknown:
          break
        case SyntaxKind.EndOfFileToken:
          break
        case SyntaxKind.SingleLineCommentTrivia:
          break
        case SyntaxKind.VariableStatement:
          break
        case SyntaxKind.ClassDeclaration:
          tsClass = this.tsMetaClassFactory.build(<ClassDeclaration> node)
          break
        case SyntaxKind.InterfaceDeclaration:
          tsMains = tsMains.concat(this.tsMetaMainFactory.build(<InterfaceDeclaration> node))
          break
        case SyntaxKind.ExportDeclaration:
          tsExports = tsExports.concat(this.tsMetaExportFactory.build(<ExportDeclaration> node))
          break
        case SyntaxKind.ImportDeclaration:
          tsImports = tsImports.concat(this.tsMetaImportFactory.build(<ImportDeclaration> node))
          break
        case SyntaxKind.ExpressionStatement:
          break
        default:
          process.stderr.write(`node type ${node.kind.toString()} was not processed\n`)
      }
    })

    return {
      path,
      filename,
      tsExports,
      tsImports,
      tsClass,
      tsMains
    }
  }
}

export { TsMetaFileFactory }
