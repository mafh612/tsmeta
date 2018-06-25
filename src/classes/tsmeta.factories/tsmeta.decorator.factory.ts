import { CallExpression, Decorator, Expression, Identifier, isCallExpression } from 'typescript'
import { IdentifierToString } from '../../lib/ts.methods'
import { TsArgument, TsDecorator } from '../../lib/tsmeta.schema'
import { TsMetaArgumentFactory } from './tsmeta.argument.factory'

/**
 * class TsMetaDecoratorFactory
 */
class TsMetaDecoratorFactory {

  private tsMetaArgumentFactory: TsMetaArgumentFactory = new TsMetaArgumentFactory()

  /**
   * build TsDecorator element
   * @param decorator
   */
  public build(decorator: Decorator): TsDecorator {
    let expression: any
    if (isCallExpression(decorator.expression)) {
      expression = <CallExpression> decorator.expression
    } else {
      expression = <Identifier> decorator.expression
    }

    let name: string
    let tsarguments: TsArgument[]

    if (expression.expression) name = IdentifierToString(<Identifier> expression.expression)
    else name = IdentifierToString(<Identifier> expression)

    if (expression.arguments) tsarguments = expression.arguments
      .map((xexpression: Expression) => this.tsMetaArgumentFactory.build(xexpression))
    else tsarguments = undefined

    return {
      name,
      tsarguments
    }
  }
}

export { TsMetaDecoratorFactory }
