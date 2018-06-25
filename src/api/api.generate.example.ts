import { TsMain, TsMeta, TsProperty } from '../lib/tsmeta.schema'
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

/**
 * generateExample from class or interface
 */
const generateExample: ((exampleName: string, tsMetaJson: TsMeta) => any)
  = (exampleName: string, tsMetaJson: TsMeta): any => {
  const tsMains: TsMain[] = ExtractMains(tsMetaJson)
  const tsMain: TsMain = tsMains.find((item: TsMain) => item.name === exampleName)
  const example: KeySignature = {}

  if (!tsMain) return undefined

  tsMain.properties.forEach((tsProperty: TsProperty) => {
    switch (tsProperty.tstype.typescriptType) {
      case TypescriptTypes.BASIC:
        example[tsProperty.name] = BuildValue(<string> tsProperty.tstype.basicType)
        break
      case TypescriptTypes.ARRAY:
        if (tsProperty.tstype.basicType === 'array' && literals.includes(<string> tsProperty.tstype.valueType)) example[tsProperty.name] = [[BuildValue(<string> tsProperty.tstype.valueType)]]
        else if (tsProperty.tstype.basicType === 'array' && !literals.includes(<string> tsProperty.tstype.valueType)) example[tsProperty.name] = [[generateExample(<string> tsProperty.tstype.valueType, tsMetaJson)]]
        else if (literals.includes(<string> tsProperty.tstype.basicType)) example[tsProperty.name] = [BuildValue(<string> tsProperty.tstype.basicType)]
        else example[tsProperty.name] = [generateExample(<string> tsProperty.tstype.basicType, tsMetaJson)]
        break
      case TypescriptTypes.MAP:
        if (literals.includes(<string> tsProperty.tstype.valueType)) example[tsProperty.name] = { key: BuildValue(<string> tsProperty.tstype.valueType) }
        else example[tsProperty.name] = { key: generateExample(<string> tsProperty.tstype.valueType, tsMetaJson) }
        break
      case TypescriptTypes.REFERENCE:
        example[tsProperty.name] = generateExample(<string> tsProperty.tstype.basicType, tsMetaJson)
        break
      default:

    }
  })

  return example
}

export { generateExample as GenerateExample }
/*
import * as fs from 'fs'

const myTsMeta: TsMeta = JSON.parse(fs.readFileSync('__mocks__/schema/tsmeta.mock.json', { encoding: 'utf8' }))
const example: any = generateExample('SomethingMock', myTsMeta)

console.log(`example - ${JSON.stringify(example, undefined, 2)}`) */
