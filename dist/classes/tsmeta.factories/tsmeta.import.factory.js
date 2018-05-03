"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const typescript_1 = require("typescript");
const ts_methods_1 = require("../../lib/ts.methods");
/**
 * class TsMetaImportFactory
 */
class TsMetaImportFactory {
    /**
     * build TsImport element
     * @param importDeclaration
     */
    build(importDeclaration) {
        const tsImports = [];
        const importClause = importDeclaration.importClause;
        const moduleSpecifier = importDeclaration.moduleSpecifier;
        importClause.namedBindings.forEachChild((node) => {
            tsImports.push(this.createTsImport(node, moduleSpecifier));
        });
        return tsImports;
    }
    /**
     * create single TsImport
     */
    createTsImport(importSpecifier, moduleSpecifier) {
        let name;
        let alias;
        let fullpath;
        let source;
        if (typescript_1.isIdentifier(importSpecifier)) {
            name = ts_methods_1.IdentifierToString(importSpecifier);
        }
        else {
            if (importSpecifier.propertyName) {
                name = ts_methods_1.IdentifierToString(importSpecifier.propertyName);
                alias = ts_methods_1.IdentifierToString(importSpecifier.name);
            }
            else {
                name = ts_methods_1.IdentifierToString(importSpecifier.name);
            }
        }
        const fromLiteral = ts_methods_1.ExpressionToString(moduleSpecifier);
        if (fromLiteral.startsWith('.')) {
            fullpath = path_1.resolve(fromLiteral);
        }
        source = fromLiteral.split('/').pop();
        return {
            alias,
            fullpath,
            name,
            source
        };
    }
}
exports.TsMetaImportFactory = TsMetaImportFactory;
