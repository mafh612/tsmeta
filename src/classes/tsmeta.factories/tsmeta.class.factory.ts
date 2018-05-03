import { ClassDeclaration, ClassElement, Decorator, isMethodDeclaration, isPropertyDeclaration } from 'typescript'
import { IdentifierToString } from '../../lib/ts.methods'
import { TsClass, TsDecorator, TsMethod, TsProperty } from '../../resources/tsmeta.schema'
import { TsMetaDecoratorFactory } from './tsmeta.decorator.factory'
import { TsMetaMethodFactory } from './tsmeta.method.factory'
import { TsMetaPropertyFactory } from './tsmeta.property.factory'

/**
 * class TsMetaClassFactory
 */
class TsMetaClassFactory {

  private tsMetaDecoratorFactory: TsMetaDecoratorFactory = new TsMetaDecoratorFactory()
  private tsMetaMethdoFactory: TsMetaMethodFactory = new TsMetaMethodFactory()
  private tsMetaPropertyFactory: TsMetaPropertyFactory = new TsMetaPropertyFactory()

  /**
   * build TsClass element
   * @param classDeclaration
   */
  public build(classDeclaration: ClassDeclaration): TsClass {
    const name: string = IdentifierToString(classDeclaration.name)
    const decorators: TsDecorator[] = classDeclaration.decorators
      ? classDeclaration.decorators.map((decorator: Decorator): TsDecorator => this.tsMetaDecoratorFactory.build(decorator))
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
      properties
    }
  }
}

export { TsMetaClassFactory }
