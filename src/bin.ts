#!/usr/bin/env node
import { TsMetaExecution } from './tsmeta.execute' // tslint:disable-line

/**
 * bin file
 */
'use strict' // tslint:disable-line

const [, , ...args]: string[] = process.argv

const projectFilenameIndex: number = args.findIndex((it: string): boolean => (it === '--project' || it === '-p')) + 1
const tsMetaConfigFilename: string = args[projectFilenameIndex] || 'tsmeta.config.json'

if (process.env.NODE_ENV !== 'test') {
  const tsMetaExecution: TsMetaExecution = new TsMetaExecution(tsMetaConfigFilename)
  tsMetaExecution.execute()
}
