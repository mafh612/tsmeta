import { Decorator, MethodDeclaration, ParameterDeclaration } from 'typescript'
import { PropertyNameToString } from '../../lib/ts.methods'
import { TsDecorator, TsMethod, TsParameter, TsType } from '../../resources/tsmeta.schema'
import { TsMetaDecoratorFactory } from './tsmeta.decorator.factory'
import { TsMetaParameterFactory } from './tsmeta.parameter.factory'

/**
 * class TsMetaMethodFactory
 */
class TsMetaMethodFactory {

  private tsMetaDecoratorFactory: TsMetaDecoratorFactory = new TsMetaDecoratorFactory()
  private tsMetaParameterFactory: TsMetaParameterFactory = new TsMetaParameterFactory()

  /**
   * build TsMethod element
   * @param methodDeclaration
   */
  public build(methodDeclaration: MethodDeclaration): TsMethod {
    const name: string = PropertyNameToString(methodDeclaration.name)
    const decorators: TsDecorator[] = methodDeclaration.decorators
      ? methodDeclaration.decorators.map((decorator: Decorator) => this.tsMetaDecoratorFactory.build(decorator))
      : undefined

    const parameters: TsParameter[] = methodDeclaration.parameters
      ? methodDeclaration.parameters
        .map((parameterDeclaration: ParameterDeclaration) => this.tsMetaParameterFactory.build(parameterDeclaration))
      : undefined

    const tstype: TsType = undefined

    return {
      name,
      decorators,
      parameters,
      tstype
    }
  }
}

export { TsMetaMethodFactory }
