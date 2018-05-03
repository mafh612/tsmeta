import { CallExpression, Decorator, Expression, Identifier } from 'typescript'

import { IdentifierToString } from '../../lib/ts.methods'
import { TsArgument, TsDecorator } from '../../resources/tsmeta.schema'
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
    // console.log(JSON.stringify(decorator, undefined, 4)) // tslint:disable-line
    const callExpression: CallExpression = <CallExpression> decorator.expression

    const name: string = IdentifierToString(<Identifier> callExpression.expression)
    const tsarguments: TsArgument[] = callExpression.arguments.map((expression: Expression) => this.tsMetaArgumentFactory.build(expression))

    return {
      name,
      tsarguments
    }
  }
}

export { TsMetaDecoratorFactory }
