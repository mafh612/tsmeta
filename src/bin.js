#!/usr/bin/env node
'use strict'; // tslint:disable-line
Object.defineProperty(exports, "__esModule", { value: true });
const tsmeta_execute_1 = require("./tsmeta.execute");
/**
 * bin file
 */
const projectFilenameIndex = +process.argv.findIndex((it) => (it === '--project' || it === '-p')) + 1;
const tsMetaConfigFilename = process.argv[projectFilenameIndex] || 'tsmeta.config.json';
if (process.env.NODE_ENV !== 'test') {
    const tsMetaExecution = new tsmeta_execute_1.TsMetaExecution(tsMetaConfigFilename);
    tsMetaExecution.execute();
}
//# sourceMappingURL=bin.js.map