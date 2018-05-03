"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const ts_methods_1 = require("../lib/ts.methods");
const tsmeta_file_factory_1 = require("./tsmeta.factories/tsmeta.file.factory");
const tsmeta_package_factory_1 = require("./tsmeta.factories/tsmeta.package.factory");
/**
 * class TsMetaFactory
 */
class TsMetaFactory {
    constructor() {
        this.tsMetaPackageFactory = new tsmeta_package_factory_1.TsMetaPackageFactory();
        this.tsMetaFileFactory = new tsmeta_file_factory_1.TsMetaFileFactory();
    }
    /**
     * build TsMeta element
     */
    build(tsMetaConfig) {
        const baseTsPackage = this.tsMetaPackageFactory.build('package.json');
        const additionalTsPackages = this.scanAdditionalPackages(baseTsPackage);
        const programs = [this.createMainProgram(tsMetaConfig, baseTsPackage)];
        return {
            additionalTsPackages,
            baseTsPackage,
            programs
        };
    }
    /**
     * scan dependencies and devDependencies for linked packages
     * @param baseTsPackage
     */
    scanAdditionalPackages(baseTsPackage) {
        const packagePaths = Object.keys(baseTsPackage.dependencies).concat(Object.keys(baseTsPackage.devDependencies));
        return packagePaths
            .map((dependency) => this.tsMetaPackageFactory.build(`node_modules/${dependency}/package.json`))
            .filter((pckg) => pckg && pckg.source);
    }
    /**
     * add main program to programs
     */
    createMainProgram(tsMetaConfig, baseTsPackage) {
        const compilerOptions = JSON.parse(fs_1.readFileSync(tsMetaConfig.compilerOptions, { encoding: 'utf8' }));
        const program = ts_methods_1.CreateTypescriptProgram([baseTsPackage.source], compilerOptions);
        return {
            files: program.getSourceFiles()
                .filter((sourceFile) => !sourceFile.fileName.includes('/node_modules/'))
                .map((sourceFile) => this.tsMetaFileFactory.build(sourceFile))
        };
    }
}
exports.TsMetaFactory = TsMetaFactory;
