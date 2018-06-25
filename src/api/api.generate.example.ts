import { TsDecorator, TsMain, TsMeta, TsProperty } from '../lib/tsmeta.schema'
import { TypescriptTypes } from '../lib/typescript.types.enum'
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
const generateExample: ((exampleName: string, tsMetaJson: TsMeta, repeated?: boolean) => any)
  = (exampleName: string, tsMetaJson: TsMeta, repeated: boolean = false): any => {
  if (!tsMains) tsMains = ExtractMains(tsMetaJson)
  const tsMain: TsMain = tsMains.find((item: TsMain) => item.name === exampleName)
  const example: KeySignature = {}

  if (!tsMain) return undefined

  tsMain.properties.forEach((tsProperty: TsProperty) => {
    const tsDecorator: TsDecorator = tsProperty.decorators ? tsProperty.decorators.find((it: TsDecorator) => it.name === 'Property') : undefined

    switch (tsProperty.tstype.typescriptType) {
      case TypescriptTypes.BASIC:
        example[tsProperty.name] = BuildValue(<string> tsProperty.tstype.basicType, tsDecorator)
        break
      case TypescriptTypes.ARRAY:
        if (repeated) example[tsProperty.name] = []
        else if (tsProperty.tstype.basicType === 'array' && literals.includes(<string> tsProperty.tstype.valueType)) example[tsProperty.name] = [[BuildValue(<string> tsProperty.tstype.valueType, tsDecorator)]]
        else if (tsProperty.tstype.basicType === 'array' && !literals.includes(<string> tsProperty.tstype.valueType)) example[tsProperty.name] = [[generateExample(<string> tsProperty.tstype.valueType, tsMetaJson, true)]]
        else if (literals.includes(<string> tsProperty.tstype.basicType)) example[tsProperty.name] = [BuildValue(<string> tsProperty.tstype.basicType, tsDecorator)]
        else example[tsProperty.name] = [generateExample(<string> tsProperty.tstype.basicType, tsMetaJson, true)]
        break
      case TypescriptTypes.MAP:
        if (literals.includes(<string> tsProperty.tstype.valueType)) example[tsProperty.name] = { key: BuildValue(<string> tsProperty.tstype.valueType, tsDecorator) }
        else if (repeated) example[tsProperty.name] = {}
        else example[tsProperty.name] = { key: generateExample(<string> tsProperty.tstype.valueType, tsMetaJson, true) }
        break
      case TypescriptTypes.REFERENCE:
        if (repeated) example[tsProperty.name] = {}
        else example[tsProperty.name] = generateExample(<string> tsProperty.tstype.basicType, tsMetaJson, true)
        break
      default:

    }
  })

  return example
}

export { generateExample as GenerateExample }
