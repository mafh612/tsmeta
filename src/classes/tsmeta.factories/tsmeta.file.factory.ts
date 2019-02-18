import { ClassDeclaration, ExportDeclaration, ImportDeclaration, InterfaceDeclaration, Node, SourceFile, SyntaxKind } from 'typescript'
import { TsClass, TsExport, TsFile, TsImport, TsMain } from '../../lib/interfaces/tsmeta.schema'
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
          tsClass = this.tsMetaClassFactory.build(node as ClassDeclaration)
          break
        case SyntaxKind.InterfaceDeclaration:
          tsMains = tsMains.concat(this.tsMetaMainFactory.build(node as InterfaceDeclaration))
          break
        case SyntaxKind.ExportDeclaration:
          tsExports = tsExports.concat(this.tsMetaExportFactory.build(node as ExportDeclaration))
          break
        case SyntaxKind.ImportDeclaration:
          tsImports = tsImports.concat(this.tsMetaImportFactory.build(node as ImportDeclaration))
          break
        case SyntaxKind.ExpressionStatement:
          break
        default:
          process.stderr.write(`node type ${node.kind.toString()} was not processed\n`)
      }
    })

    return {
      filename,
      path,
      tsClass,
      tsExports,
      tsImports,
      tsMains
    }
  }
}

export { TsMetaFileFactory }
