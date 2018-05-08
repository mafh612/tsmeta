import { TsType } from '../resources/tsmeta.schema'
import { TypescriptTypes } from '../resources/typescript.types.enum'

/**
 * class TsTypeFactory
 */
class TsTypeClass implements TsType {

  public representation?: string
  public basicType: string|string[]
  public keyType?: string
  public valueType?: string
  public typescriptType: TypescriptTypes

  constructor(tsType: TsType) {
    this.typescriptType = tsType.typescriptType

    this.basicType = tsType.basicType
    this.keyType = tsType.keyType
    this.valueType = tsType.valueType
  }

  /**
   * create representation from type strings
   */
  public createRepresentation(): void {
    switch (this.typescriptType) {
      case TypescriptTypes.BASIC:
        this.representation = <string> this.basicType
        break
      case TypescriptTypes.MULTIPLE:
        this.representation = (<string[]> this.basicType).join('|')
        break
      case TypescriptTypes.ARRAY:
        this.representation = <string> `${this.basicType}[]`
        break
      case TypescriptTypes.MAP:
        this.representation = <string> `Map<${this.keyType}, ${this.valueType}>`
        break
      case TypescriptTypes.REFERENCE:
        this.representation = <string> this.basicType
        break
      case TypescriptTypes.UNTYPED:
        this.representation = <string> this.basicType
        break
      default:
    }
  }
}

export { TsTypeClass }
