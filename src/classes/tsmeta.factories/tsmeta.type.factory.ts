import { SyntaxKind, TypeNode } from 'typescript'
import { TsType } from '../../resources/tsmeta.schema'

/**
 * class TsMetaTypeFactory
 */
class TsMetaTypeFactory {

  /**
   * build TsType element
   */
  public build(typeNode: TypeNode): TsType {
    let representation: string

    switch (typeNode.kind) {
      case SyntaxKind.BooleanKeyword:
        representation = 'boolean'
        break
      case SyntaxKind.NumberKeyword:
        representation = 'number'
        break
      case SyntaxKind.StringKeyword:
        representation = 'string'
        break
      case SyntaxKind.ArrayType:
        // console.log('ArrayType') // tslint:disable-line
        // console.log(typeNode) // tslint:disable-line
        break
      case SyntaxKind.TypeLiteral:
        // console.log('TypeLiteral') // tslint:disable-line
        // console.log(typeNode) // tslint:disable-line
        break
      case SyntaxKind.TypeReference:
        // console.log('TypeReference') // tslint:disable-line
        // console.log(typeNode) // tslint:disable-line
        break
      default:
        // console.log('-----------') // tslint:disable-line
        // console.log(typeNode.kind) // tslint:disable-line
        // console.log('-----------') // tslint:disable-line
    }

    return {
      representation
    }
  }
}

export { TsMetaTypeFactory }
