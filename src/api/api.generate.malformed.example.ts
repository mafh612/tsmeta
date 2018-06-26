import { TsDecorator, TsMain, TsMeta, TsProperty } from '../lib/tsmeta.schema'
import { TypescriptTypes } from '../lib/typescript.types.enum'
import { BuildMalformedValue } from './api.build.value'
import { ExtractMains } from './api.extract.mains'

/**
 * interface KeySignature
 */
interface KeySignature {
  [key: string]: any
}

const literals: string[] = ['boolean', 'number', 'string']

let tsMains: TsMain[]
let lastExampleName: string

/**
 * generateExample from class or interface
 */
const generateMalformedExample: ((exampleName: string, tsMetaJson: TsMeta) => any)
  = (exampleName: string, tsMetaJson: TsMeta): any => {
  if (!tsMains) tsMains = ExtractMains(tsMetaJson)
  const tsMain: TsMain = tsMains.find((item: TsMain) => item.name === exampleName)
  const example: KeySignature = {}
  const repeated: boolean = exampleName === lastExampleName
  lastExampleName = exampleName

  if (!tsMain) return undefined

  tsMain.properties.forEach((tsProperty: TsProperty) => {
    const tsDecorator: TsDecorator = tsProperty.decorators ? tsProperty.decorators.find((it: TsDecorator) => it.name === 'Property') : undefined

    switch (tsProperty.tstype.typescriptType) {
      case TypescriptTypes.BASIC:
        example[tsProperty.name] = BuildMalformedValue(<string> tsProperty.tstype.basicType, tsDecorator)
        break
      case TypescriptTypes.ARRAY:
        if (repeated) example[tsProperty.name] = []
        else if (tsProperty.tstype.basicType === 'array' && literals.includes(<string> tsProperty.tstype.valueType)) example[tsProperty.name] = [[BuildMalformedValue(<string> tsProperty.tstype.valueType, tsDecorator)]]
        else if (tsProperty.tstype.basicType === 'array' && !literals.includes(<string> tsProperty.tstype.valueType)) example[tsProperty.name] = [[generateMalformedExample(<string> tsProperty.tstype.valueType, tsMetaJson)]]
        else if (literals.includes(<string> tsProperty.tstype.basicType)) example[tsProperty.name] = [BuildMalformedValue(<string> tsProperty.tstype.basicType, tsDecorator)]
        else example[tsProperty.name] = [generateMalformedExample(<string> tsProperty.tstype.basicType, tsMetaJson)]
        break
      case TypescriptTypes.MAP:
        if (literals.includes(<string> tsProperty.tstype.valueType)) example[tsProperty.name] = { key: BuildMalformedValue(<string> tsProperty.tstype.valueType, tsDecorator) }
        else if (repeated) example[tsProperty.name] = {}
        else example[tsProperty.name] = { key: generateMalformedExample(<string> tsProperty.tstype.valueType, tsMetaJson) }
        break
      case TypescriptTypes.REFERENCE:
        if (repeated) example[tsProperty.name] = {}
        else example[tsProperty.name] = generateMalformedExample(<string> tsProperty.tstype.basicType, tsMetaJson)
        break
      default:

    }
  })

  return example
}

export { generateMalformedExample as GenerateMalformedExample }
