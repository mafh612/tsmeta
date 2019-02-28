import {
  InterfaceDeclaration,
  isMethodSignature,
  isPropertySignature,
  TypeElement
} from 'typescript'
import { TsMain, TsMethod, TsProperty } from '../../lib/interfaces/tsmeta.schema'
import { IdentifierToString } from '../../lib/utils/identifier.to.string'
import { TsMetaMethodFactory } from './tsmeta.method.factory'
import { TsMetaPropertyFactory } from './tsmeta.property.factory'

/**
 * class TsMetaMainFactory
 */
class TsMetaMainFactory {

  private readonly tsMetaMethodFactory: TsMetaMethodFactory = new TsMetaMethodFactory()
  private readonly tsMetaPropertyFactory: TsMetaPropertyFactory = new TsMetaPropertyFactory()

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
