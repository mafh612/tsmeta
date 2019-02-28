import { resolve as ResolvePath } from 'path'
import { Expression, ImportClause, ImportDeclaration, ImportSpecifier, isIdentifier } from 'typescript'
import { TsImport } from '../../lib/interfaces/tsmeta.schema'
import { ExpressionToString } from '../../lib/utils/expression.to.string'
import { IdentifierToString } from '../../lib/utils/identifier.to.string'

/**
 * class TsMetaImportFactory
 */
class TsMetaImportFactory {

  /**
   * build TsImport element
   */
  public build(importDeclaration: ImportDeclaration): TsImport[] {
    const tsImports: TsImport[] = []

    const importClause: ImportClause = importDeclaration.importClause
    const moduleSpecifier: Expression = importDeclaration.moduleSpecifier

    if (!importDeclaration.importClause) {
      return [
        {
          alias: undefined,
          fullpath: undefined,
          name: ExpressionToString(moduleSpecifier),
          source: ExpressionToString(moduleSpecifier)
        }
      ]
    }

    importClause.namedBindings.forEachChild((node: ImportSpecifier) => {
      tsImports.push(this.createTsImport(node, moduleSpecifier))
    })

    return tsImports
  }

  /**
   * create single TsImport
   */
  public createTsImport(importSpecifier: ImportSpecifier, moduleSpecifier: Expression): TsImport {
    let name: string
    let alias: string
    let fullpath: string
    let source: string

    if (isIdentifier(importSpecifier)) {
      name = IdentifierToString(importSpecifier)
    } else {
      if (importSpecifier.propertyName) {
        name = IdentifierToString(importSpecifier.propertyName)
        alias = IdentifierToString(importSpecifier.name)
      } else {
        name = IdentifierToString(importSpecifier.name)
      }
    }

    const fromLiteral: string = ExpressionToString(moduleSpecifier)

    if (fromLiteral.startsWith('.')) {
      fullpath = ResolvePath(fromLiteral)
    }

    source = fromLiteral
      .split('/')
      .pop()

    return {
      alias,
      fullpath,
      name,
      source
    }
  }
}

export { TsMetaImportFactory }
