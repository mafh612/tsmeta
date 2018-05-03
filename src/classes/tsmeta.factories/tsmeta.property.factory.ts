import { PropertyDeclaration } from 'typescript'
import { PropertyNameToString } from '../../lib/ts.methods'
import { TsProperty, TsType } from '../../resources/tsmeta.schema'

/**
 * class TsMetaPropertyFactory
 */
class TsMetaPropertyFactory {

  /**
   * build TsProperty element
   * @param propertyDeclaration
   */
  public build(propertyDeclaration: PropertyDeclaration): TsProperty {
    const name: string = PropertyNameToString(propertyDeclaration.name)
    const tstype: TsType = undefined

    return {
      name,
      tstype
    }
  }
}

export { TsMetaPropertyFactory }
