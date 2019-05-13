"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * extract mains from tsmeta.json
 */
const extractMains = (tsMetaJson) => {
    const tsMains = [];
    tsMetaJson.programs.forEach((tsProgram) => {
        tsProgram.files.forEach((tsFile) => {
            if (tsFile.tsClass) {
                tsMains.push(tsFile.tsClass);
            }
            tsFile.tsMains.forEach((tsMain) => {
                tsMains.push(tsMain);
            });
        });
    });
    return tsMains;
};
exports.ExtractMains = extractMains;
//# sourceMappingURL=api.extract.mains.js.map