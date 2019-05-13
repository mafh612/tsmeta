"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const typescript_1 = require("typescript");
const expression_to_string_1 = require("../../lib/utils/expression.to.string");
const identifier_to_string_1 = require("../../lib/utils/identifier.to.string");
/**
 * class TsMetaImportFactory
 */
class TsMetaImportFactory {
    /**
     * build TsImport element
     */
    build(importDeclaration) {
        const tsImports = [];
        const importClause = importDeclaration.importClause;
        const moduleSpecifier = importDeclaration.moduleSpecifier;
        if (!importDeclaration.importClause) {
            return [
                {
                    alias: undefined,
                    fullpath: undefined,
                    name: expression_to_string_1.ExpressionToString(moduleSpecifier),
                    source: expression_to_string_1.ExpressionToString(moduleSpecifier)
                }
            ];
        }
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
            name = identifier_to_string_1.IdentifierToString(importSpecifier);
        }
        else {
            if (importSpecifier.propertyName) {
                name = identifier_to_string_1.IdentifierToString(importSpecifier.propertyName);
                alias = identifier_to_string_1.IdentifierToString(importSpecifier.name);
            }
            else {
                name = identifier_to_string_1.IdentifierToString(importSpecifier.name);
            }
        }
        const fromLiteral = expression_to_string_1.ExpressionToString(moduleSpecifier);
        if (fromLiteral.startsWith('.')) {
            fullpath = path_1.resolve(fromLiteral);
        }
        source = fromLiteral
            .split('/')
            .pop();
        return {
            alias,
            fullpath,
            name,
            source
        };
    }
}
exports.TsMetaImportFactory = TsMetaImportFactory;
//# sourceMappingURL=tsmeta.import.factory.js.map