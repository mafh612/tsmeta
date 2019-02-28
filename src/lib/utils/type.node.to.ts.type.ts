import {
  ArrayTypeNode, Identifier, IndexSignatureDeclaration, PropertySignature, SyntaxKind,
  TypeElement, TypeLiteralNode, TypeNode, TypeReferenceNode, UnionTypeNode } from 'typescript'
import { TypescriptTypes } from '../enums/typescript.types.enum'
import { TsType } from '../interfaces/tsmeta.schema'
import { TsTypeClass } from '../tstype.class'
import { IdentifierToString } from './identifier.to.string'
import { IndexSignaturToTsType } from './index.signature.to.ts.type'
import { PropertySignaturToTsType } from './property.signature.to.ts.type'

/**
 * extract TsType from TypeNode
 */
// tslint:disable cyclomatic-complexity
const typeNodeToTsType: (
  typeNode: TypeNode|TypeElement|IndexSignatureDeclaration|ArrayTypeNode|UnionTypeNode) => TsType
  // tslint:disable-next-line:max-func-body-length
    = (typeNode: TypeNode|TypeElement|IndexSignatureDeclaration|ArrayTypeNode|UnionTypeNode): TsType => {
  let tsType: TsType

  switch (typeNode.kind) {
    case SyntaxKind.AnyKeyword:
      tsType = new TsTypeClass({basicType: 'any', typescriptType: TypescriptTypes.BASIC })
      break
    case SyntaxKind.BooleanKeyword:
      tsType = new TsTypeClass({ basicType: 'boolean', typescriptType: TypescriptTypes.BASIC })
      break
    case SyntaxKind.NumberKeyword:
      tsType = new TsTypeClass({ basicType: 'number', typescriptType: TypescriptTypes.BASIC })
      break
    case SyntaxKind.StringKeyword:
      tsType = new TsTypeClass({ basicType: 'string', typescriptType: TypescriptTypes.BASIC })
      break
    case SyntaxKind.ObjectKeyword:
      tsType = new TsTypeClass({ basicType: 'object', typescriptType: TypescriptTypes.BASIC })
      break
    case SyntaxKind.IndexSignature:
      tsType = IndexSignaturToTsType(typeNode as IndexSignatureDeclaration)
      break
    case SyntaxKind.PropertySignature:
      tsType = PropertySignaturToTsType(typeNode as PropertySignature)
      break
    case SyntaxKind.ArrayType:
      const arrayType: TsType = new TsTypeClass(typeNodeToTsType((typeNode as ArrayTypeNode).elementType))

      if ((typeNode as ArrayTypeNode).elementType.kind === SyntaxKind.ArrayType) {
        arrayType.valueType = arrayType.basicType
        arrayType.basicType = 'array'
      }

      arrayType.typescriptType = TypescriptTypes.ARRAY
      tsType = arrayType
      break
    case SyntaxKind.UnionType:
      const unionTypes: TsType[] = (typeNode as UnionTypeNode).types
        .map(typeNodeToTsType)
        .filter((_tsType: TsType) => !!_tsType)
      let mappedUnionTypes: string|string[] = ''

      if (unionTypes) mappedUnionTypes = unionTypes.map((ut: TsType): string => ut.basicType as string)

      tsType = new TsTypeClass({ basicType: mappedUnionTypes, typescriptType: TypescriptTypes.MULTIPLE })

      break
    case SyntaxKind.TypeLiteral:
      const tsTypes: TsType[] = (typeNode as TypeLiteralNode).members
        .map((typeElement: TypeElement) => typeNodeToTsType(typeElement) as TsType)

      if (tsTypes.length > 1) {
        tsType = tsTypes.reduce((prev: TsType, curr: TsType) => {
          if (Array.isArray(prev.keyType)) prev.keyType.push(curr.keyType as string)
          else prev.keyType = [prev.keyType, curr.keyType as string]

          if (Array.isArray(prev.valueType)) prev.valueType.push(curr.valueType as string)
          else prev.valueType = [prev.valueType, curr.valueType as string]

          return prev
        })

        tsType.typescriptType = TypescriptTypes.PROP
      } else tsType = tsTypes.pop()

      break
    case SyntaxKind.TypeReference:
      let basicType: string = IdentifierToString((typeNode as TypeReferenceNode).typeName as Identifier)
      let keyType: string
      let valueType: string
      let typescriptType: TypescriptTypes = TypescriptTypes.REFERENCE

      if ((typeNode as TypeReferenceNode).typeArguments && basicType === 'Array') {
        basicType = typeNodeToTsType((typeNode as TypeReferenceNode).typeArguments[0]).basicType as string
        typescriptType = TypescriptTypes.ARRAY
      }

      if ((typeNode as TypeReferenceNode).typeArguments && basicType === 'Map') {
        keyType = typeNodeToTsType((typeNode as TypeReferenceNode).typeArguments[0]).basicType as string
        valueType = typeNodeToTsType((typeNode as TypeReferenceNode).typeArguments[1]).basicType as string
        typescriptType = TypescriptTypes.MAP
      }

      if ((typeNode as TypeReferenceNode).typeArguments && basicType === 'Promise') {
        valueType = typeNodeToTsType((typeNode as TypeReferenceNode).typeArguments[0]).basicType as string
        typescriptType = TypescriptTypes.PROMISE
      }

      tsType = new TsTypeClass({ basicType, keyType, valueType, typescriptType })

      break
    case SyntaxKind.VoidKeyword:
      tsType = undefined
      break
    default:
      tsType = new TsTypeClass({ basicType: 'undefined', typescriptType: TypescriptTypes.UNTYPED })
  }

  if (tsType && 'createRepresentation' in tsType) (tsType as TsTypeClass).createRepresentation()

  return tsType
}

export {
  typeNodeToTsType as TypeNodeToTsType
}
