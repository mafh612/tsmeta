import { TsFile, TsMain, TsMeta, TsProgram } from '../lib/interfaces/tsmeta.schema'

/**
 * extract mains from tsmeta.json
 */
const extractMains: ((tsMetaJson: TsMeta) => TsMain[])
  = (tsMetaJson: TsMeta): TsMain[] => {
  const tsMains: TsMain[] = []

  tsMetaJson.programs.forEach((tsProgram: TsProgram) => {
    tsProgram.files.forEach((tsFile: TsFile) => {
      if (tsFile.tsClass) {
        tsMains.push(tsFile.tsClass)
      }

      tsFile.tsMains.forEach((tsMain: TsMain) => {
        tsMains.push(tsMain)
      })
    })
  })

  return tsMains
}

export { extractMains as ExtractMains }
