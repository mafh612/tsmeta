import { Decorator, MethodDeclaration, MethodSignature, ParameterDeclaration } from 'typescript'
import { PropertyNameToString } from '../../lib/ts.methods'
import { TsDecorator, TsMethod, TsParameter, TsType } from '../../resources/tsmeta.schema'
import { TsMetaDecoratorFactory } from './tsmeta.decorator.factory'
import { TsMetaParameterFactory } from './tsmeta.parameter.factory'
import { TsMetaTypeFactory } from './tsmeta.type.factory'

/**
 * class TsMetaMethodFactory
 */
class TsMetaMethodFactory {

  private tsMetaDecoratorFactory: TsMetaDecoratorFactory = new TsMetaDecoratorFactory()
  private tsMetaParameterFactory: TsMetaParameterFactory = new TsMetaParameterFactory()
  private tsMetaTypeFactory: TsMetaTypeFactory = new TsMetaTypeFactory()

  /**
   * build TsMethod element
   * @param methodDeclaration
   */
  public build(method: MethodDeclaration|MethodSignature): TsMethod {
    const name: string = PropertyNameToString(method.name)
    const decorators: TsDecorator[] = method.decorators
      ? method.decorators.map((decorator: Decorator) => this.tsMetaDecoratorFactory.build(decorator))
      : undefined

    const parameters: TsParameter[] = method.parameters
      ? method.parameters
        .map((parameterDeclaration: ParameterDeclaration) => this.tsMetaParameterFactory.build(parameterDeclaration))
      : undefined

    const tstype: TsType = this.tsMetaTypeFactory.build(method.type)

    return {
      name,
      decorators,
      parameters,
      tstype
    }
  }
}

export { TsMetaMethodFactory }
