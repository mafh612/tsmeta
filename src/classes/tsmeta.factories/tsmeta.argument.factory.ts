import { Expression, ObjectLiteralExpression, SyntaxKind } from 'typescript'
import { ExpressionToString, ObjectLiteralExpressionToString } from '../../lib/ts.methods'
import { TsArgument, TsType } from '../../resources/tsmeta.schema'

/**
 * class TsMetaArgumentFactory
 */
class TsMetaArgumentFactory {

  /**
   * build TsArgument element
   */
  public build(expression: Expression): TsArgument {
    let representation: string
    switch (expression.kind) {
      case SyntaxKind.NumericLiteral:
        representation = ExpressionToString(expression)
        break
      case SyntaxKind.StringLiteral:
        representation = ExpressionToString(expression)
        break
      case SyntaxKind.ObjectLiteralExpression:
        representation = ObjectLiteralExpressionToString(<ObjectLiteralExpression> expression)
        break
      default:
    }
    const tstype: TsType = undefined

    return {
      representation,
      tstype
    }
  }
}

export { TsMetaArgumentFactory }
