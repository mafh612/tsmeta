import { TsType } from './tsmeta.schema'
import { TypescriptTypes } from './typescript.types.enum'

/**
 * class TsTypeFactory
 */
class TsTypeClass implements TsType {

  public representation?: string
  public basicType: string|string[]
  public keyType?: string|string[]
  public valueType?: string|string[]
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
        if (Array.isArray(this.valueType))  this.representation = <string> `Map<${this.keyType}, ${this.valueType.join('|')}>`
        else this.representation = <string> `Map<${this.keyType}, ${this.valueType}>`
        break
      case TypescriptTypes.REFERENCE:
        this.representation = <string> this.basicType
        break
      case TypescriptTypes.PROMISE:
        this.representation = `Promise<${this.valueType}>`
        break
      case TypescriptTypes.PROP:
        const propTypes: string = (<string[]> this.keyType).map((keyType: string, i: number) => `${keyType}: ${this.valueType[i]}`).join('; ')
        this.representation = `{ ${propTypes} }`
        break
      case TypescriptTypes.UNTYPED:
        this.representation = <string> this.basicType
        break
      default:
    }
  }
}

export { TsTypeClass }
