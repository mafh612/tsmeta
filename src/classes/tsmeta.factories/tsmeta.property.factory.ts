import { Decorator, PropertyDeclaration, PropertySignature } from 'typescript'
import { PropertyNameToString } from '../../lib/ts.methods'
import { TsDecorator, TsProperty, TsType } from '../../lib/tsmeta.schema'
import { TsMetaDecoratorFactory } from './tsmeta.decorator.factory'
import { TsMetaTypeFactory } from './tsmeta.type.factory'

/**
 * class TsMetaPropertyFactory
 */
class TsMetaPropertyFactory {

  private tsMetaTypeFactory: TsMetaTypeFactory = new TsMetaTypeFactory()
  private tsMetaDecoratorFactory: TsMetaDecoratorFactory = new TsMetaDecoratorFactory()

  /**
   * build TsProperty element
   */
  public build(property: PropertyDeclaration|PropertySignature): TsProperty {
    let decorators: TsDecorator[]

    if (property.decorators) {
      decorators = property.decorators.map((decorator: Decorator) => this.tsMetaDecoratorFactory.build(decorator))
    }

    const name: string = PropertyNameToString(property.name)
    const tstype: TsType = this.tsMetaTypeFactory.build(property.type)

    return {
      decorators,
      name,
      tstype
    }
  }
}

export { TsMetaPropertyFactory }
