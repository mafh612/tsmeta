"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
const tsmeta_class_factory_1 = require("./tsmeta.class.factory");
const tsmeta_export_factory_1 = require("./tsmeta.export.factory");
const tsmeta_import_factory_1 = require("./tsmeta.import.factory");
const tsmeta_main_factory_1 = require("./tsmeta.main.factory");
/**
 * class TsMetaFileFactory
 */
class TsMetaFileFactory {
    constructor() {
        this.tsMetaClassFactory = new tsmeta_class_factory_1.TsMetaClassFactory();
        this.tsMetaMainFactory = new tsmeta_main_factory_1.TsMetaMainFactory();
        this.tsMetaExportFactory = new tsmeta_export_factory_1.TsMetaExportFactory();
        this.tsMetaImportFactory = new tsmeta_import_factory_1.TsMetaImportFactory();
    }
    /**
     * build TsFile element
     */
    build(sourceFile) {
        const sourceFilenameArray = sourceFile.fileName.split('/');
        const filename = sourceFilenameArray
            .pop()
            .replace('.ts', '');
        const path = sourceFilenameArray.join('/');
        let tsExports = [];
        let tsImports = [];
        let tsMains = [];
        let tsClass;
        sourceFile.forEachChild((node) => {
            switch (node.kind) {
                case typescript_1.SyntaxKind.Unknown:
                    break;
                case typescript_1.SyntaxKind.EndOfFileToken:
                    break;
                case typescript_1.SyntaxKind.SingleLineCommentTrivia:
                    break;
                case typescript_1.SyntaxKind.VariableStatement:
                    break;
                case typescript_1.SyntaxKind.ClassDeclaration:
                    tsClass = this.tsMetaClassFactory.build(node);
                    break;
                case typescript_1.SyntaxKind.InterfaceDeclaration:
                    tsMains = tsMains.concat(this.tsMetaMainFactory.build(node));
                    break;
                case typescript_1.SyntaxKind.ExportDeclaration:
                    tsExports = tsExports.concat(this.tsMetaExportFactory.build(node));
                    break;
                case typescript_1.SyntaxKind.ImportDeclaration:
                    tsImports = tsImports.concat(this.tsMetaImportFactory.build(node));
                    break;
                case typescript_1.SyntaxKind.ExpressionStatement:
                    break;
                default:
                    process.stderr.write(`node type ${node.kind.toString()} was not processed\n`);
            }
        });
        return {
            filename,
            path,
            tsClass,
            tsExports,
            tsImports,
            tsMains
        };
    }
}
exports.TsMetaFileFactory = TsMetaFileFactory;
//# sourceMappingURL=tsmeta.file.factory.js.map