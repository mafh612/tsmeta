"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const array_reducer_1 = require("../lib/array.reducer");
const source_file_container_1 = require("../lib/source.file.container");
const create_typescript_program_1 = require("../lib/utils/create.typescript.program");
const tsmeta_file_factory_1 = require("./tsmeta.factories/tsmeta.file.factory");
const tsmeta_package_factory_1 = require("./tsmeta.factories/tsmeta.package.factory");
/**
 * class TsMetaFactory
 */
class TsMetaFactory {
    constructor(tsMetaConfig) {
        this.tsMetaConfig = tsMetaConfig;
        this.tsMetaPackageFactory = new tsmeta_package_factory_1.TsMetaPackageFactory();
        this.tsMetaFileFactory = new tsmeta_file_factory_1.TsMetaFileFactory();
    }
    /**
     * build TsMeta element
     */
    build() {
        const baseTsPackage = this.tsMetaPackageFactory.build(this.tsMetaConfig.basePackage);
        let additionalTsPackages;
        const programs = [this.createProgram(baseTsPackage)];
        if (this.tsMetaConfig.scanAdditionalPackages)
            additionalTsPackages = this.scanAdditionalPackages(baseTsPackage);
        if (additionalTsPackages) {
            additionalTsPackages.forEach((tsPackage) => {
                programs.push(this.createProgram(tsPackage));
            });
        }
        return {
            additionalTsPackages,
            baseTsPackage,
            programs
        };
    }
    /**
     * scan dependencies and devDependencies for linked packages
     */
    scanAdditionalPackages(baseTsPackage) {
        let packagePaths = [];
        if (baseTsPackage.dependencies)
            packagePaths = packagePaths.concat(Object.keys(baseTsPackage.dependencies));
        if (baseTsPackage.devDependencies)
            packagePaths = packagePaths.concat(Object.keys(baseTsPackage.devDependencies));
        return packagePaths
            .filter((packagePath) => this.tsMetaConfig.scanAdditionalPackages.some((tag) => packagePath.includes(tag)))
            .map((dependency) => {
            const tsPackage = this.tsMetaPackageFactory.build(`node_modules/${dependency}/package.json`);
            tsPackage.source = `node_modules/${dependency}/${tsPackage.source}`;
            return tsPackage;
        })
            .filter((pckg) => pckg && pckg.source);
    }
    /**
     * add main program to programs
     */
    createProgram(pckg) {
        const baseSourcePathArray = path_1.resolve(pckg.source)
            .split('/');
        baseSourcePathArray.pop();
        const baseSourcePath = baseSourcePathArray.join('/');
        const compilerOptions = JSON.parse(fs_1.readFileSync(this.tsMetaConfig.metaConfig.compilerOptions, { encoding: 'utf8' }));
        const program = create_typescript_program_1.CreateTypescriptProgram([path_1.resolve(pckg.source)], compilerOptions);
        return {
            files: program.getSourceFiles()
                .filter((sourceFile) => sourceFile.fileName.includes(baseSourcePath))
                .map((sourceFile) => {
                source_file_container_1.setSourceFile(sourceFile);
                if (process.env.NODE_ENV !== 'test' && this.tsMetaConfig.showScannedFiles) {
                    process.stdout.write(` - ${sourceFile.fileName
                        .split('/')
                        .reduce(array_reducer_1.last)}\n`);
                }
                return this.tsMetaFileFactory.build(sourceFile);
            }),
            name: pckg.name
        };
    }
}
exports.TsMetaFactory = TsMetaFactory;
//# sourceMappingURL=tsmeta.factory.js.map