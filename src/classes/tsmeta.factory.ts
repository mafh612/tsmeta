import { readFileSync as ReadFileSync } from 'fs'
import { resolve as Resolve } from 'path'
import { CompilerOptions, Program, SourceFile } from 'typescript'

import { CreateTypescriptProgram } from '../lib/ts.methods'
import { TsMetaConfig } from '../resources/tsmeta.config'
import { TsFile, TsMeta, TsPackage, TsProgram } from '../resources/tsmeta.schema'
import { TsMetaFileFactory } from './tsmeta.factories/tsmeta.file.factory'
import { TsMetaPackageFactory } from './tsmeta.factories/tsmeta.package.factory'

/**
 * class TsMetaFactory
 */
class TsMetaFactory {

  private tsMetaPackageFactory: TsMetaPackageFactory = new TsMetaPackageFactory()
  private tsMetaFileFactory: TsMetaFileFactory = new TsMetaFileFactory()

  /**
   * build TsMeta element
   */
  public build(tsMetaConfig: TsMetaConfig): TsMeta {
    const baseTsPackage: TsPackage = this.tsMetaPackageFactory.build(tsMetaConfig.basePackage)
    const additionalTsPackages: TsPackage[] = this.scanAdditionalPackages(baseTsPackage)
    const programs: TsProgram[] = [this.createMainProgram(tsMetaConfig, baseTsPackage)]

    return {
      additionalTsPackages,
      baseTsPackage,
      programs
    }
  }

  /**
   * scan dependencies and devDependencies for linked packages
   * @param baseTsPackage
   */
  private scanAdditionalPackages(baseTsPackage: TsPackage): TsPackage[] {
    const packagePaths: string[] = Object.keys(baseTsPackage.dependencies).concat(Object.keys(baseTsPackage.devDependencies))

    return packagePaths
      .map((dependency: string): TsPackage => this.tsMetaPackageFactory.build(`node_modules/${dependency}/package.json`))
      .filter((pckg: TsPackage) => pckg && pckg.source)
  }

  /**
   * add main program to programs
   */
  private createMainProgram(tsMetaConfig: TsMetaConfig, baseTsPackage: TsPackage): TsProgram {
    const compilerOptions: CompilerOptions = JSON.parse(ReadFileSync(tsMetaConfig.metaConfig.compilerOptions, { encoding: 'utf8' }))
    const program: Program = CreateTypescriptProgram([Resolve(baseTsPackage.source)], compilerOptions)

    return {
      files: program.getSourceFiles()
        .filter((sourceFile: SourceFile) => !sourceFile.fileName.includes('/node_modules/'))
        .map((sourceFile: SourceFile): TsFile => {
          if (process.env.NODE_ENV !== 'test') console.log(` - ${sourceFile.fileName.split('/').pop()}`) // tslint:disable-line no-console

          return this.tsMetaFileFactory.build(sourceFile)
        })
    }
  }
}

export { TsMetaFactory }
