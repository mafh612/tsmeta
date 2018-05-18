import { ExportDeclaration, ExportSpecifier, Identifier } from 'typescript'
import { TokenToString } from '../../lib/ts.methods'
import { TsExport } from '../../lib/tsmeta.schema'

/**
 * class TsMetaExportFactory
 */
class TsMetaExportFactory {

  /**
   * build TsExport element
   * @param exportDeclaration
   */
  public build(exportDeclaration: ExportDeclaration): TsExport[] {
    if (exportDeclaration.moduleSpecifier) {
      return [this.createTsExport(<Identifier> exportDeclaration.moduleSpecifier)]
    }

    if (exportDeclaration.exportClause) {
      return exportDeclaration.exportClause.elements
        .map((exportSpecifier: ExportSpecifier) =>
          this.createTsExport(<Identifier> exportSpecifier.name, <Identifier> exportSpecifier.propertyName))
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
