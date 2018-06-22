// tslint:disable
import { ExtractMains } from './api.extract.mains'
import { TsMain, TsMeta, TsProperty } from '../lib/tsmeta.schema'

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
        example[tsProperty.name] = BuildValue(tsProperty.tstype.basicType as string)
        break
      case TypescriptTypes.ARRAY:
        if (literals.includes(tsProperty.tstype.basicType as string)) example[tsProperty.name] = [BuildValue(tsProperty.tstype.basicType as string)]
        else example[tsProperty.name] = [generateExample(tsProperty.tstype.basicType as string, tsMetaJson)]
        break
      case TypescriptTypes.REFERENCE:
        example[tsProperty.name] = generateExample(tsProperty.tstype.basicType as string, tsMetaJson)
        break
      default:

    }
  })

  return example
}

export { generateExample as GenerateExample }

import * as fs from 'fs'
import { TypescriptTypes } from '../lib/typescript.types.enum';
import { BuildValue } from './api.build.value';
const myTsMeta: TsMeta = JSON.parse(fs.readFileSync('__mocks__/schema/tsmeta.mock.json', { encoding: 'utf8' }))
const example: any = generateExample('SomethingMock', myTsMeta)

console.log(`example - ${JSON.stringify(example, undefined, 2)}`)
