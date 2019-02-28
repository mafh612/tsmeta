import { CallExpression, Decorator, Expression, Identifier, isCallExpression } from 'typescript'
import { TsArgument, TsDecorator } from '../../lib/interfaces/tsmeta.schema'
import { IdentifierToString } from '../../lib/utils/identifier.to.string'
import { TsMetaArgumentFactory } from './tsmeta.argument.factory'

/**
 * class TsMetaDecoratorFactory
 */
class TsMetaDecoratorFactory {

  private readonly tsMetaArgumentFactory: TsMetaArgumentFactory = new TsMetaArgumentFactory()

  /**
   * build TsDecorator element
   */
  public build(decorator: Decorator): TsDecorator {
    let expression: any
    if (isCallExpression(decorator.expression)) {
      expression = decorator.expression as CallExpression
    } else {
      expression = decorator.expression as Identifier
    }

    let name: string
    let tsarguments: TsArgument[]

    if (expression.expression) name = IdentifierToString(expression.expression as Identifier)
    else name = IdentifierToString(expression as Identifier)

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
