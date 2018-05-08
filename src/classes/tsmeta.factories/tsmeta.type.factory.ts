import { TypeNode } from 'typescript'
import { TypeNodeToTsType } from '../../lib/ts.methods'
import { TsType } from '../../resources/tsmeta.schema'
import { TypescriptTypes } from '../../resources/typescript.types.enum'

/**
 * class TsMetaTypeFactory
 */
class TsMetaTypeFactory {

  /**
   * build TsType element
   */
  public build(typeNode: TypeNode): TsType {
    if (!typeNode) {
      return {
        basicType: 'not typed',
        typescriptType: TypescriptTypes.UNTYPED
      }
    }

    return <TsType> TypeNodeToTsType(typeNode)
  }
}

export { TsMetaTypeFactory }
