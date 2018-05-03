"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
/**
 * class TsMetaPackageFactory
 */
class TsMetaPackageFactory {
    /**
     * build TsPackage element
     */
    build(filename) {
        return this.readPackageJson(filename);
    }
    /**
     * read package.json from filename
     */
    readPackageJson(filename) {
        return JSON.parse(fs_1.readFileSync(filename, { encoding: 'utf8' }));
    }
}
exports.TsMetaPackageFactory = TsMetaPackageFactory;
