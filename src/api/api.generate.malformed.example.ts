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

let tsMains: TsMain[]

/**
 * generateExample from class or interface
 */
const generateMalformedExample: ((exampleName: string, tsMetaJson: TsMeta) => any)
  = (exampleName: string, tsMetaJson: TsMeta): any => {
  if (!tsMains) tsMains = ExtractMains(tsMetaJson)
  const tsMain: TsMain = tsMains.find((item: TsMain) => item.name === exampleName)
  const example: KeySignature = {}

  if (!tsMain) return undefined

  tsMain.properties.forEach((tsProperty: TsProperty) => {
    const tsDecorator: TsDecorator = tsProperty.decorators ? tsProperty.decorators.find((it: TsDecorator) => it.name === 'Property') : undefined

    switch (tsProperty.tstype.typescriptType) {
      case TypescriptTypes.BASIC:
        example[tsProperty.name] = BuildMalformedValue(<string> tsProperty.tstype.basicType, tsDecorator)
        break
      case TypescriptTypes.MULTIPLE:
        example[tsProperty.name] = BuildMalformedValue((<string[]> tsProperty.tstype.basicType)[0], tsDecorator)
        break
      case TypescriptTypes.ARRAY:
        example[tsProperty.name] = true
        break
      case TypescriptTypes.MAP:
        example[tsProperty.name] = true
        break
      case TypescriptTypes.REFERENCE:
        example[tsProperty.name] = true
        break
      default:
        process.stdout.write(`could not generate example for type |${tsProperty.tstype.typescriptType}| of property |${tsProperty.name}|`)
    }
  })

  return example
}

export { generateMalformedExample as GenerateMalformedExample }
