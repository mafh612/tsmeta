"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_methods_1 = require("../../lib/ts.methods");
/**
 * class TsMetaExportFactory
 */
class TsMetaExportFactory {
    /**
     * build TsExport element
     * @param exportDeclaration
     */
    build(exportDeclaration) {
        if (exportDeclaration.moduleSpecifier) {
            return [this.createTsExport(exportDeclaration.moduleSpecifier)];
        }
        if (exportDeclaration.exportClause) {
            return exportDeclaration.exportClause.elements
                .map((exportSpecifier) => this.createTsExport(exportSpecifier.name, exportSpecifier.propertyName));
        }
        return undefined;
    }
    /**
     * create single TsExport
     */
    createTsExport(nameObj, aliasObj) {
        const alias = undefined;
        const name = ts_methods_1.TokenToString(nameObj);
        return {
            alias,
            name
        };
    }
}
exports.TsMetaExportFactory = TsMetaExportFactory;
