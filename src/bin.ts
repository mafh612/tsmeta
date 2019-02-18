#!/usr/bin/env node
'use strict' // tslint:disable-line
import { TsMetaExecution } from './tsmeta.execute'

/**
 * bin file
 */
const projectFilenameIndex: number = +process.argv.findIndex((it: string): boolean => (it === '--project' || it === '-p')) + 1
const tsMetaConfigFilename: string = process.argv[projectFilenameIndex] || 'tsmeta.config.json'

if (process.env.NODE_ENV !== 'test') {
  const tsMetaExecution: TsMetaExecution = new TsMetaExecution(tsMetaConfigFilename)
  tsMetaExecution.execute()
}
