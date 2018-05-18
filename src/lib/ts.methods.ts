// tslint:disable no-use-before-declare
import {
  ArrayTypeNode,
  CompilerOptions,
  createProgram as CreateProgram,
  Expression,
  Identifier,
  IndexSignatureDeclaration,
  ObjectLiteralExpression,
  Program,
  PropertyAssignment,
  PropertyName,
  PropertySignature,
  SyntaxKind,
  TypeElement,
  TypeLiteralNode,
  TypeNode,
  TypeReferenceNode,
  UnionTypeNode
} from 'typescript'
import { TsTypeClass } from './ts.type.class'
import { TsType } from './tsmeta.schema'
import { TypescriptTypes } from './typescript.types.enum'

/**
 * create typescript program file from rootNames
 * @param rootNames
 * @param compilerOptions
 */
const createTypescriptProgram: ((rootNames: ReadonlyArray<string>, compilerOptions: CompilerOptions) => Program) = CreateProgram

/**
 * extract text from token
 * @param token<Identifier>
 */
const tokenToString: ((token: Identifier) => string) = (token: Identifier): string => token.text

/**
 * extract text from identifier
 * @param identifier<Identifier>
 */
const identifierToString: ((identifier: Identifier) => string) = (identifier: Identifier): string => identifier.escapedText.toString()

/**
 * extract text from initializer
 * @param initializer<Identifier>
 */
const initializerToString: ((initializer: Expression) => string|number|boolean) = (initializer: Expression): string|number|boolean => {
  switch (initializer.kind) {
    case SyntaxKind.StringLiteral: return tokenToString(<Identifier> initializer)
    case SyntaxKind.NumericLiteral: return +tokenToString(<Identifier> initializer)
    case SyntaxKind.TrueKeyword: return true
    case SyntaxKind.FalseKeyword: return false
    case SyntaxKind.ObjectLiteralExpression: return objectLiteralExpressionToString(<ObjectLiteralExpression> initializer)
    default: return tokenToString(<Identifier> initializer)
  }
}

/**
 * extract text from token
 * @param propertyName<PropertyName>
 */
const propertyNameToString: ((propertyName: PropertyName) => string)
  = (propertyName: PropertyName): string => (<Identifier> propertyName).text

/**
 * extract text from ObjectLiteralExpression
 * @param expression<ObjectLiteralExpression>
 */
const objectLiteralExpressionToString: ((expression: ObjectLiteralExpression) => any)
  = (expression: ObjectLiteralExpression): any => {
    const obj: {} = {}
    expression.properties.forEach((propertyAssignment: PropertyAssignment): any => {
      obj[identifierToString(<Identifier> propertyAssignment.name)] = initializerToString(propertyAssignment.initializer)
    })

    return obj
  }

/**
 * extract text from token
 * @param identifier<Identifier>
 */
const expressionToString: ((expression: Expression) => string) = (expression: Expression): string => (<Identifier> expression).text

/**
 * extract TsType from IndexSignature
 */
const indexSignaturToTsType: ((indexSignature: IndexSignatureDeclaration) => TsType) = (indexSignature: IndexSignatureDeclaration): TsType => {
    const tsType: TsType = new TsTypeClass({ basicType: 'key', typescriptType: TypescriptTypes.MAP})
    tsType.keyType = <string> typeNodeToTsType(indexSignature.parameters[0].type).basicType
    tsType.valueType = <string> typeNodeToTsType(indexSignature.type).basicType

    return tsType
}

/**
 * extract TsType from PropertySignature
 */
const propertySignaturToTsType: ((propertySignature: PropertySignature) => TsType) = (propertySignature: PropertySignature): TsType => {
    const tsType: TsType = new TsTypeClass({ basicType: 'key', typescriptType: TypescriptTypes.MAP})
    tsType.keyType = identifierToString(<Identifier> propertySignature.name)
    tsType.valueType = <string> typeNodeToTsType(propertySignature.type).basicType

    return tsType
}

/**
 * extract TsType from TypeNode
 */
const typeNodeToTsType: (
  (typeNode: TypeNode|TypeElement|IndexSignatureDeclaration|ArrayTypeNode|UnionTypeNode) => TsType)
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
      tsType = indexSignaturToTsType(<IndexSignatureDeclaration> typeNode)
      break
    case SyntaxKind.PropertySignature:
      tsType = propertySignaturToTsType(<PropertySignature> typeNode)
      break
    case SyntaxKind.ArrayType:
      const arrayType: TsType = new TsTypeClass(typeNodeToTsType((<ArrayTypeNode> typeNode).elementType))
      arrayType.typescriptType = TypescriptTypes.ARRAY
      tsType = arrayType
      break
    case SyntaxKind.UnionType:
      const unionTypes: TsType[] = (<UnionTypeNode> typeNode).types.map(typeNodeToTsType)
      tsType = new TsTypeClass({ basicType: unionTypes.map((ut: TsType): string => <string> ut.basicType), typescriptType: TypescriptTypes.MULTIPLE })
      break
    case SyntaxKind.TypeLiteral:
      const tsTypes: TsType[] = (<TypeLiteralNode> typeNode).members.map((typeElement: TypeElement) => <TsType> typeNodeToTsType(typeElement))

      if (tsTypes.length > 1) {
        tsType = tsTypes.reduce((prev: TsType, curr: TsType) => {
          if (Array.isArray(prev.keyType)) prev.keyType.push(<string> curr.keyType)
          else prev.keyType = [prev.keyType, <string> curr.keyType]

          if (Array.isArray(prev.valueType)) prev.valueType.push(<string> curr.valueType)
          else prev.valueType = [prev.valueType, <string> curr.valueType]

          return prev
        })

        tsType.typescriptType = TypescriptTypes.PROP
      } else tsType = tsTypes.pop()

      break
    case SyntaxKind.TypeReference:
      let basicType: string = identifierToString(<Identifier> (<TypeReferenceNode> typeNode).typeName)
      let keyType: string
      let valueType: string
      let typescriptType: TypescriptTypes = TypescriptTypes.REFERENCE

      if ((<TypeReferenceNode> typeNode).typeArguments && basicType === 'Array') {
        basicType = <string> typeNodeToTsType((<TypeReferenceNode> typeNode).typeArguments[0]).basicType
        typescriptType = TypescriptTypes.ARRAY
      }

      if ((<TypeReferenceNode> typeNode).typeArguments && basicType === 'Map') {
        keyType = <string> typeNodeToTsType((<TypeReferenceNode> typeNode).typeArguments[0]).basicType
        valueType = <string> typeNodeToTsType((<TypeReferenceNode> typeNode).typeArguments[1]).basicType
        typescriptType = TypescriptTypes.MAP
      }

      if ((<TypeReferenceNode> typeNode).typeArguments && basicType === 'Promise') {
        valueType = <string> typeNodeToTsType((<TypeReferenceNode> typeNode).typeArguments[0]).basicType
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

  if (tsType && 'createRepresentation' in tsType) (<TsTypeClass> tsType).createRepresentation()

  return tsType
}

export {
  createTypescriptProgram as CreateTypescriptProgram,
  expressionToString as ExpressionToString,
  identifierToString as IdentifierToString,
  initializerToString as InitializerToString,
  objectLiteralExpressionToString as ObjectLiteralExpressionToString,
  propertyNameToString as PropertyNameToString,
  tokenToString as TokenToString,
  typeNodeToTsType as TypeNodeToTsType
}
