import { Decorator, MethodDeclaration, MethodSignature, ParameterDeclaration } from 'typescript'
import { TsDecorator, TsMethod, TsParameter, TsType } from '../../lib/interfaces/tsmeta.schema'
import { PropertyNameToString } from '../../lib/utils/property.name.to.string'
import { TsMetaDecoratorFactory } from './tsmeta.decorator.factory'
import { TsMetaParameterFactory } from './tsmeta.parameter.factory'
import { TsMetaTypeFactory } from './tsmeta.type.factory'

/**
 * class TsMetaMethodFactory
 */
class TsMetaMethodFactory {

  private readonly tsMetaDecoratorFactory: TsMetaDecoratorFactory = new TsMetaDecoratorFactory()
  private readonly tsMetaParameterFactory: TsMetaParameterFactory = new TsMetaParameterFactory()
  private readonly tsMetaTypeFactory: TsMetaTypeFactory = new TsMetaTypeFactory()

  /**
   * build TsMethod element
   */
  public build(method: MethodDeclaration|MethodSignature): TsMethod {
    const name: string = PropertyNameToString(method.name)
    const decorators: TsDecorator[] = method.decorators
      ? method.decorators.map((decorator: Decorator) => this.tsMetaDecoratorFactory.build(decorator))
      : undefined

    const parameters: TsParameter[] = method.parameters
      ? method.parameters.map((parameterDeclaration: ParameterDeclaration) => this.tsMetaParameterFactory.build(parameterDeclaration))
      : undefined

    const tstype: TsType = this.tsMetaTypeFactory.build(method.type)

    return {
      decorators,
      name,
      parameters,
      tstype
    }
  }
}

export { TsMetaMethodFactory }
