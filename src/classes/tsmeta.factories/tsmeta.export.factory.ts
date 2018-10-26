import { ExportDeclaration, ExportSpecifier, Identifier } from 'typescript'
import { TokenToString } from '../../lib/ts.methods'
import { TsExport } from '../../lib/tsmeta.schema'

/**
 * class TsMetaExportFactory
 */
class TsMetaExportFactory {

  /**
   * build TsExport element
   */
  public build(exportDeclaration: ExportDeclaration): TsExport[] {
    if (exportDeclaration.moduleSpecifier) {
      return [this.createTsExport(exportDeclaration.moduleSpecifier as Identifier)]
    }

    if (exportDeclaration.exportClause) {
      return exportDeclaration.exportClause.elements
        .map((exportSpecifier: ExportSpecifier) =>
          this.createTsExport(exportSpecifier.name as Identifier, exportSpecifier.propertyName as Identifier))
    }

    return undefined
  }

  /**
   * create single TsExport
   */
  public createTsExport(nameObj: Identifier, aliasObj?: Identifier): TsExport {
    const alias: string = undefined
    const name: string = TokenToString(nameObj)

    return {
      alias,
      name
    }
  }
}

export { TsMetaExportFactory }
