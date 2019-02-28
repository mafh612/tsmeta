import { IndexSignatureDeclaration } from 'typescript'
import { TypescriptTypes } from '../enums/typescript.types.enum'
import { TsType } from '../interfaces/tsmeta.schema'
import { TsTypeClass } from '../tstype.class'
import { TypeNodeToTsType } from './type.node.to.ts.type'

/**
 * extract TsType from IndexSignature
 */
const indexSignaturToTsType: (indexSignature: IndexSignatureDeclaration) => TsType
  = (indexSignature: IndexSignatureDeclaration): TsType => {
    const tsType: TsType = new TsTypeClass({ basicType: 'key', typescriptType: TypescriptTypes.MAP})
    tsType.keyType = TypeNodeToTsType(indexSignature.parameters[0].type).basicType as string
    tsType.valueType = TypeNodeToTsType(indexSignature.type).basicType as string

    return tsType
}

export {
  indexSignaturToTsType as IndexSignaturToTsType
}
