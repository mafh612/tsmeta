import { TypeNode } from 'typescript'
import { TypescriptTypes } from '../../lib/enums/typescript.types.enum'
import { TsType } from '../../lib/interfaces/tsmeta.schema'
import { TypeNodeToTsType } from '../../lib/ts.methods'

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
