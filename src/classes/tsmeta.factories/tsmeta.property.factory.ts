import { PropertyDeclaration, PropertySignature } from 'typescript'
import { PropertyNameToString } from '../../lib/ts.methods'
import { TsProperty, TsType } from '../../resources/tsmeta.schema'
import { TsMetaTypeFactory } from './tsmeta.type.factory'

/**
 * class TsMetaPropertyFactory
 */
class TsMetaPropertyFactory {

  private tsMetaTypeFactory: TsMetaTypeFactory = new TsMetaTypeFactory()

  /**
   * build TsProperty element
   * @param propertyDeclaration
   */
  public build(property: PropertyDeclaration|PropertySignature): TsProperty {

    const name: string = PropertyNameToString(property.name)
    const tstype: TsType = this.tsMetaTypeFactory.build(property.type)

    return {
      name,
      tstype
    }
  }
}

export { TsMetaPropertyFactory }
