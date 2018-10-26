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
        this.representation = this.basicType as string
        break
      case TypescriptTypes.MULTIPLE:
        this.representation = (this.basicType as string[]).join('|')
        break
      case TypescriptTypes.ARRAY:
        this.representation = `${this.basicType}[]` as string
        break
      case TypescriptTypes.MAP:
        if (Array.isArray(this.valueType))  this.representation = `Map<${this.keyType}, ${this.valueType.join('|')}>` as string
        else this.representation = `Map<${this.keyType}, ${this.valueType}>` as string
        break
      case TypescriptTypes.REFERENCE:
        this.representation = this.basicType as string
        break
      case TypescriptTypes.PROMISE:
        this.representation = `Promise<${this.valueType}>`
        break
      case TypescriptTypes.PROP:
        const propTypes: string = (this.keyType as string[])
          .map((keyType: string, i: number) => `${keyType}: ${this.valueType[i]}`).join('; ')
        this.representation = `{ ${propTypes} }`
        break
      case TypescriptTypes.UNTYPED:
        this.representation = this.basicType as string
        break
      default:
    }
  }
}

export { TsTypeClass }
