import { TypescriptTypes } from '../lib/enums/typescript.types.enum'
import { TsDecorator, TsMain, TsMeta, TsProperty } from '../lib/interfaces/tsmeta.schema'
import { BuildValue } from './api.build.value'
import { ExtractMains } from './api.extract.mains'

/**
 * interface KeySignature
 */
interface KeySignature {
  [key: string]: any
}

const literals: string[] = ['boolean', 'number', 'string']

let tsMains: TsMain[]

/**
 * generateExample from class or interface
 */
const generateExample: ((exampleName: string, tsMetaJson: TsMeta, buildPath?: string) => any)
  = (exampleName: string, tsMetaJson: TsMeta, buildPath: string = ''): any => {
  buildPath += `^${exampleName}$`

  if (!tsMains) tsMains = ExtractMains(tsMetaJson)

  const tsMain: TsMain = tsMains.find((item: TsMain) => item.name === exampleName)
  const example: KeySignature = {}
  const repeated: boolean = buildPath.indexOf(`^${exampleName}$`) !== buildPath.lastIndexOf(`^${exampleName}$`)

  if (!tsMain) return undefined

  tsMain.properties.forEach((tsProperty: TsProperty) => {
    const tsDecorator: TsDecorator = tsProperty.decorators
      ? tsProperty.decorators.find((it: TsDecorator) => it.name === 'Property')
      : undefined

    switch (tsProperty.tstype.typescriptType) {
      case TypescriptTypes.BASIC:
        example[tsProperty.name] = BuildValue(tsProperty.tstype.basicType as string, tsDecorator)
        break
      case TypescriptTypes.MULTIPLE:
        example[tsProperty.name] = BuildValue(tsProperty.tstype.basicType[0], tsDecorator)
        break
      case TypescriptTypes.ARRAY:
        if (repeated) {
          example[tsProperty.name] = []
        } else if (tsProperty.tstype.basicType === 'array' && literals.includes(tsProperty.tstype.valueType as string)) {
            example[tsProperty.name] = [[BuildValue(tsProperty.tstype.valueType as string, tsDecorator)]]
        } else if (tsProperty.tstype.basicType === 'array' && !literals.includes(tsProperty.tstype.valueType as string)) {
          example[tsProperty.name] = [[generateExample(tsProperty.tstype.valueType as string, tsMetaJson, buildPath)]]
        } else if (literals.includes(tsProperty.tstype.basicType as string)) {
          example[tsProperty.name] = [BuildValue(tsProperty.tstype.basicType as string, tsDecorator)]
        } else example[tsProperty.name] = [generateExample(tsProperty.tstype.basicType as string, tsMetaJson, buildPath)]
        break
      case TypescriptTypes.MAP:
        if (literals.includes(tsProperty.tstype.valueType as string)) {
          example[tsProperty.name] = { key: BuildValue(tsProperty.tstype.valueType as string, tsDecorator) }
        } else if (repeated) {
          example[tsProperty.name] = {}
        } else example[tsProperty.name] = { key: generateExample(tsProperty.tstype.valueType as string, tsMetaJson, buildPath) }
        break
      case TypescriptTypes.REFERENCE:
        if (repeated) example[tsProperty.name] = {}
        else example[tsProperty.name] = generateExample(tsProperty.tstype.basicType as string, tsMetaJson, buildPath)
        break
      default:
        process.stdout.write(`could not generate example for type |${tsProperty.tstype.typescriptType}| of property |${tsProperty.name}|`)

    }
  })

  return example
}

export { generateExample as GenerateExample }
