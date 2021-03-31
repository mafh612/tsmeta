import { Decorator, PropertyDeclaration, PropertySignature } from 'typescript'
import { AnnotationsEnum } from '../../lib/enums/annotations.enum'
import { TsDecorator, TsProperty, TsType } from '../../lib/interfaces/tsmeta.schema'
import { PropertyNameToString } from '../../lib/utils/property.name.to.string'
import { TsMetaDecoratorFactory } from './tsmeta.decorator.factory'
import { TsMetaTypeFactory } from './tsmeta.type.factory'

/**
 * class TsMetaPropertyFactory
 */
class TsMetaPropertyFactory {
  private readonly tsMetaTypeFactory: TsMetaTypeFactory = new TsMetaTypeFactory()
  private readonly tsMetaDecoratorFactory: TsMetaDecoratorFactory = new TsMetaDecoratorFactory()

  /**
   * build TsProperty element
   */
  public build(property: PropertyDeclaration | PropertySignature): TsProperty {
    let decorators: TsDecorator[]

    if (property.decorators) {
      decorators = property.decorators.map((decorator: Decorator) => this.tsMetaDecoratorFactory.build(decorator))
    }

    const name: string = PropertyNameToString(property.name)
    const tstype: TsType = this.tsMetaTypeFactory.build(property.type)

    return decorators && decorators.some((it: TsDecorator): boolean => it.name === AnnotationsEnum.IGNORE_PROPERTY)
      ? undefined
      : {
          decorators,
          name,
          tstype
        }
  }
}

export { TsMetaPropertyFactory }
