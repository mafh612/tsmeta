// tslint:disable no-use-before-declare
// tslint:disable max-file-line-count
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
import { getSourceFile } from './source.file.container'
import { TsType } from './tsmeta.schema'
import { TsTypeClass } from './tstype.class'
import { TypescriptTypes } from './typescript.types.enum'

/**
 * create typescript program file from rootNames
 */
const createTypescriptProgram: ((rootNames: ReadonlyArray<string>, compilerOptions: CompilerOptions) => Program) = CreateProgram

/**
 * string eval
 */
const evaluate: ((forEvaluation: string) => any) = (forEvaluation: string): any => {
  let evaluated: any
  try {
    evaluated = eval(`() => { return ${forEvaluation}}`)() // tslint:disable-line
  } catch (err) {
    process.stderr.write(err.toString())
  }

  return evaluated
}

/**
 * extract text from token
 * @param token<Identifier>
 */
const tokenToString: ((token: Identifier) => string) = (token: Identifier): string => token.text

/**
 * extract text from identifier
 * @param identifier<Identifier>
 */
const identifierToString: (identifier: Identifier) => string
  = (identifier: Identifier): string => identifier.escapedText ? identifier.escapedText.toString() : ''

/**
 * extract text from initializer
 * @param initializer<Identifier>
 */
const initializerToString: ((initializer: Expression) => string|number|boolean) = (initializer: Expression): string|number|boolean => {
  switch (initializer.kind) {
    case SyntaxKind.StringLiteral: return tokenToString(initializer as Identifier)
    case SyntaxKind.NumericLiteral: return +tokenToString(initializer as Identifier)
    case SyntaxKind.TrueKeyword: return true
    case SyntaxKind.FalseKeyword: return false
    case SyntaxKind.ObjectLiteralExpression: return objectLiteralExpressionToString(initializer as ObjectLiteralExpression)
    default: return tokenToString(initializer as Identifier)
  }
}

/**
 * extract text from token
 * @param propertyName<PropertyName>
 */
const propertyNameToString: ((propertyName: PropertyName) => string)
  = (propertyName: PropertyName): string => (propertyName as Identifier).text

/**
 * extract text from ObjectLiteralExpression
 * @param expression<ObjectLiteralExpression>
 */
const objectLiteralExpressionToString: ((expression: ObjectLiteralExpression) => any) = (expression: ObjectLiteralExpression): any => {
  const expressionString: string = expression.getFullText(getSourceFile())
  let obj: { [key: string]: any } = {}

  try {
    obj = evaluate(expressionString)
  } catch {
    expression.properties.forEach((propertyAssignment: PropertyAssignment): any => {
      obj[identifierToString(propertyAssignment.name as Identifier)] = initializerToString(propertyAssignment.initializer)
    })
  }

  return obj
}

/**
 * extract text from token
 * @param identifier<Identifier>
 */
const expressionToString: ((expression: Expression) => string) = (expression: Expression): string => (expression as Identifier).text

/**
 * extract TsType from IndexSignature
 */
const indexSignaturToTsType: (indexSignature: IndexSignatureDeclaration) => TsType
  = (indexSignature: IndexSignatureDeclaration): TsType => {
    const tsType: TsType = new TsTypeClass({ basicType: 'key', typescriptType: TypescriptTypes.MAP})
    tsType.keyType = typeNodeToTsType(indexSignature.parameters[0].type).basicType as string
    tsType.valueType = typeNodeToTsType(indexSignature.type).basicType as string

    return tsType
}

/**
 * extract TsType from PropertySignature
 */
const propertySignaturToTsType: ((propertySignature: PropertySignature) => TsType) = (propertySignature: PropertySignature): TsType => {
    const tsType: TsType = new TsTypeClass({ basicType: 'key', typescriptType: TypescriptTypes.MAP})
    tsType.keyType = identifierToString(propertySignature.name as Identifier)
    tsType.valueType = typeNodeToTsType(propertySignature.type).basicType as string

    return tsType
}

/**
 * extract TsType from TypeNode
 */
// tslint:disable cyclomatic-complexity
const typeNodeToTsType: (
  typeNode: TypeNode|TypeElement|IndexSignatureDeclaration|ArrayTypeNode|UnionTypeNode) => TsType
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
      tsType = indexSignaturToTsType(typeNode as IndexSignatureDeclaration)
      break
    case SyntaxKind.PropertySignature:
      tsType = propertySignaturToTsType(typeNode as PropertySignature)
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
      const unionTypes: TsType[] = (typeNode as UnionTypeNode).types.map(typeNodeToTsType).filter((_tsType: TsType) => !!_tsType)
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
      let basicType: string = identifierToString((typeNode as TypeReferenceNode).typeName as Identifier)
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
  createTypescriptProgram as CreateTypescriptProgram,
  expressionToString as ExpressionToString,
  identifierToString as IdentifierToString,
  initializerToString as InitializerToString,
  objectLiteralExpressionToString as ObjectLiteralExpressionToString,
  propertyNameToString as PropertyNameToString,
  tokenToString as TokenToString,
  typeNodeToTsType as TypeNodeToTsType
}
