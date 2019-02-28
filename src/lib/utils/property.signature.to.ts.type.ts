import { Identifier, PropertySignature } from 'typescript'
import { TypescriptTypes } from '../enums/typescript.types.enum'
import { TsType } from '../interfaces/tsmeta.schema'
import { TsTypeClass } from '../tstype.class'
import { IdentifierToString } from './identifier.to.string'
import { TypeNodeToTsType } from './type.node.to.ts.type'

/**
 * extract TsType from PropertySignature
 */
const propertySignaturToTsType: ((propertySignature: PropertySignature) => TsType)
  = (propertySignature: PropertySignature): TsType => {
    const tsType: TsType = new TsTypeClass({ basicType: 'key', typescriptType: TypescriptTypes.MAP})
    tsType.keyType = IdentifierToString(propertySignature.name as Identifier)
    tsType.valueType = TypeNodeToTsType(propertySignature.type).basicType as string

    return tsType
}

export {
  propertySignaturToTsType as PropertySignaturToTsType
}
