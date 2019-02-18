import { Decorator, Identifier, ParameterDeclaration } from 'typescript'
import { TsDecorator, TsParameter, TsType } from '../../lib/interfaces/tsmeta.schema'
import { IdentifierToString } from '../../lib/ts.methods'
import { TsMetaDecoratorFactory } from './tsmeta.decorator.factory'
import { TsMetaTypeFactory } from './tsmeta.type.factory'

/**
 * class TsMetaParameterFactory
 */
class TsMetaParameterFactory {

  private tsMetaTypeFactory: TsMetaTypeFactory = new TsMetaTypeFactory()
  private tsMetaDecoratorFactory: TsMetaDecoratorFactory = new TsMetaDecoratorFactory()

  /**
   * build TsParameter element
   */
  public build(parameterDeclaration: ParameterDeclaration): TsParameter {
    const name: string = IdentifierToString(parameterDeclaration.name as Identifier)
    const decorators: TsDecorator[] = parameterDeclaration.decorators
      ? parameterDeclaration.decorators.map((decorator: Decorator) => this.tsMetaDecoratorFactory.build(decorator))
      : undefined
    const tstype: TsType = this.tsMetaTypeFactory.build(parameterDeclaration.type)

    return {
      decorators,
      name,
      tstype
    }
  }
}

export { TsMetaParameterFactory }
