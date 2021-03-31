import { ClassDeclaration, ClassElement, Decorator, isMethodDeclaration, isPropertyDeclaration } from 'typescript'
import { TsClass, TsDecorator, TsMethod, TsProperty } from '../../lib/interfaces/tsmeta.schema'
import { IdentifierToString } from '../../lib/utils/identifier.to.string'
import { TsMetaDecoratorFactory } from './tsmeta.decorator.factory'
import { TsMetaMethodFactory } from './tsmeta.method.factory'
import { TsMetaPropertyFactory } from './tsmeta.property.factory'

/**
 * class TsMetaClassFactory
 */
class TsMetaClassFactory {
  private readonly tsMetaDecoratorFactory: TsMetaDecoratorFactory = new TsMetaDecoratorFactory()
  private readonly tsMetaMethdoFactory: TsMetaMethodFactory = new TsMetaMethodFactory()
  private readonly tsMetaPropertyFactory: TsMetaPropertyFactory = new TsMetaPropertyFactory()

  /**
   * build TsClass element
   */
  public build(classDeclaration: ClassDeclaration): TsClass {
    const name: string = IdentifierToString(classDeclaration.name)
    const decorators: TsDecorator[] = classDeclaration.decorators
      ? classDeclaration.decorators.map(
          (decorator: Decorator): TsDecorator => this.tsMetaDecoratorFactory.build(decorator)
        )
      : undefined

    const methods: TsMethod[] = []
    const properties: TsProperty[] = []

    classDeclaration.members.forEach((classElement: ClassElement) => {
      if (isMethodDeclaration(classElement)) methods.push(this.tsMetaMethdoFactory.build(classElement))
      if (isPropertyDeclaration(classElement)) properties.push(this.tsMetaPropertyFactory.build(classElement))
    })

    return {
      decorators,
      methods,
      name,
      properties: properties.filter((it: TsProperty): boolean => !!it)
    }
  }
}

export { TsMetaClassFactory }
