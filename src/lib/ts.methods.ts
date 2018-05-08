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
  SyntaxKind,
  TypeElement,
  TypeLiteralNode,
  TypeNode,
  TypeReferenceNode,
  UnionTypeNode
} from 'typescript'
import { TsType } from '../resources/tsmeta.schema'
import { TypescriptTypes } from '../resources/typescript.types.enum'
import { TsTypeClass } from './ts.type.class'

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
    case SyntaxKind.IndexSignature:
      tsType = indexSignaturToTsType(<IndexSignatureDeclaration> typeNode)
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
      return (<TypeLiteralNode> typeNode).members.map((typeElement: TypeElement) => <TsType> typeNodeToTsType(typeElement)).pop()
    case SyntaxKind.TypeReference:
      const basicType: string = identifierToString(<Identifier> (<TypeReferenceNode> typeNode).typeName)
      tsType = new TsTypeClass({ basicType, typescriptType: TypescriptTypes.REFERENCE })
      break
    default:
  }

  if ('createRepresentation' in tsType) (<TsTypeClass> tsType).createRepresentation()

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
