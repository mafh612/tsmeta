import {
  InterfaceDeclaration,
  isMethodSignature,
  isPropertySignature,
  TypeElement
} from 'typescript'
import { IdentifierToString } from '../../lib/ts.methods'
import { TsMain, TsMethod, TsProperty } from '../../lib/tsmeta.schema'
import { TsMetaMethodFactory } from './tsmeta.method.factory'
import { TsMetaPropertyFactory } from './tsmeta.property.factory'

/**
 * class TsMetaMainFactory
 */
class TsMetaMainFactory {

  private tsMetaMethodFactory: TsMetaMethodFactory = new TsMetaMethodFactory()
  private tsMetaPropertyFactory: TsMetaPropertyFactory = new TsMetaPropertyFactory()

  /**
   * build TsClass element
   */
  public build(declaration: InterfaceDeclaration): TsMain {
    const name: string = IdentifierToString(declaration.name)

    const methods: TsMethod[] = []
    const properties: TsProperty[] = []

    declaration.members.forEach((typeElement: TypeElement) => {
      if (isMethodSignature(typeElement)) methods.push(this.tsMetaMethodFactory.build(typeElement))
      if (isPropertySignature(typeElement)) properties.push(this.tsMetaPropertyFactory.build(typeElement))
    })

    return {
      methods,
      name,
      properties
    }
  }
}

export { TsMetaMainFactory }
