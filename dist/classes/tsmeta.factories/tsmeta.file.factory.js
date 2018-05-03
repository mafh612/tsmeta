"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
const tsmeta_class_factory_1 = require("./tsmeta.class.factory");
const tsmeta_export_factory_1 = require("./tsmeta.export.factory");
const tsmeta_import_factory_1 = require("./tsmeta.import.factory");
/**
 * class TsMetaFileFactory
 */
class TsMetaFileFactory {
    constructor() {
        this.tsMetaClassFactory = new tsmeta_class_factory_1.TsMetaClassFactory();
        this.tsMetaExportFactory = new tsmeta_export_factory_1.TsMetaExportFactory();
        this.tsMetaImportFactory = new tsmeta_import_factory_1.TsMetaImportFactory();
    }
    /**
     * build TsFile element
     * @param sourceFile
     */
    build(sourceFile) {
        const sourceFilenameArray = sourceFile.fileName.split('/');
        const filename = sourceFilenameArray.pop();
        const path = sourceFilenameArray.join('/');
        let tsexports = [];
        let tsimports = [];
        const tsMains = [];
        let tsClass;
        sourceFile.forEachChild((node) => {
            switch (node.kind) {
                case typescript_1.SyntaxKind.ClassDeclaration:
                    tsClass = this.tsMetaClassFactory.build(node);
                    break;
                case typescript_1.SyntaxKind.ExportDeclaration:
                    tsexports = tsexports.concat(this.tsMetaExportFactory.build(node));
                    break;
                case typescript_1.SyntaxKind.ImportDeclaration:
                    tsimports = tsimports.concat(this.tsMetaImportFactory.build(node));
                    break;
                default:
            }
        });
        return {
            path,
            filename,
            tsexports,
            tsimports,
            tsClass,
            tsMains
        };
    }
}
exports.TsMetaFileFactory = TsMetaFileFactory;
