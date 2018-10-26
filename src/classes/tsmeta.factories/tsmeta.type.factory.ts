import { TypeNode } from 'typescript'
import { TypeNodeToTsType } from '../../lib/ts.methods'
import { TsType } from '../../lib/tsmeta.schema'
import { TypescriptTypes } from '../../lib/typescript.types.enum'

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

    return TypeNodeToTsType(typeNode) as TsType
  }
}

export { TsMetaTypeFactory }
