#!/usr/bin/env node
'use strict' // tslint:disable-line
import { existsSync } from 'fs'
import logger from './logger/logger'
import { TsMetaExecution } from './tsmeta.execute'

/**
 * bin file
 */
const projectFilenameIndex: number = +process.argv.findIndex((it: string): boolean => it === '--project' || it === '-p')
const tsMetaConfigFilename: string =
  projectFilenameIndex !== -1 ? process.argv[projectFilenameIndex + 1] : 'tsmeta.config.json'

if (!existsSync(tsMetaConfigFilename)) {
  logger.error('no config file - please create tsmeta.config.json')
  process.exit(0)
}

if (process.env.NODE_ENV !== 'test') {
  const tsMetaExecution: TsMetaExecution = new TsMetaExecution(tsMetaConfigFilename)
  tsMetaExecution.execute()
}
