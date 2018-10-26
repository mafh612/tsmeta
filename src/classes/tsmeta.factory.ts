import { readFileSync as ReadFileSync } from 'fs'
import { resolve as Resolve } from 'path'
import { CompilerOptions, Program, SourceFile } from 'typescript'
import { setSourceFile } from '../lib/source.file.container'
import { CreateTypescriptProgram } from '../lib/ts.methods'
import { TsMetaConfig } from '../lib/tsmeta.config'
import { TsFile, TsMeta, TsPackage, TsProgram } from '../lib/tsmeta.schema'
import { TsMetaFileFactory } from './tsmeta.factories/tsmeta.file.factory'
import { TsMetaPackageFactory } from './tsmeta.factories/tsmeta.package.factory'

/**
 * class TsMetaFactory
 */
class TsMetaFactory {

  private tsMetaPackageFactory: TsMetaPackageFactory = new TsMetaPackageFactory()
  private tsMetaFileFactory: TsMetaFileFactory = new TsMetaFileFactory()

  constructor(private tsMetaConfig: TsMetaConfig) {}

  /**
   * build TsMeta element
   */
  public build(): TsMeta {
    const baseTsPackage: TsPackage = this.tsMetaPackageFactory.build(this.tsMetaConfig.basePackage)
    let additionalTsPackages: TsPackage[]
    const programs: TsProgram[] = [this.createProgram(baseTsPackage)]

    if (this.tsMetaConfig.scanAdditionalPackages) additionalTsPackages = this.scanAdditionalPackages(baseTsPackage)

    if (additionalTsPackages) {
      additionalTsPackages.forEach((tsPackage: TsPackage) => {
        programs.push(this.createProgram(tsPackage))
      })
    }

    return {
      additionalTsPackages,
      baseTsPackage,
      programs
    }
  }

  /**
   * scan dependencies and devDependencies for linked packages
   */
  private scanAdditionalPackages(baseTsPackage: TsPackage): TsPackage[] {
    let packagePaths: string[] = []

    if (baseTsPackage.dependencies) packagePaths = packagePaths.concat(Object.keys(baseTsPackage.dependencies))
    if (baseTsPackage.devDependencies) packagePaths = packagePaths.concat(Object.keys(baseTsPackage.devDependencies))

    return packagePaths
      .filter((packagePath: string) => this.tsMetaConfig.scanAdditionalPackages.some((tag: string) => packagePath.includes(tag)))
      .map((dependency: string): TsPackage => {
        const tsPackage: TsPackage = this.tsMetaPackageFactory.build(`node_modules/${dependency}/package.json`)
        tsPackage.source = `node_modules/${dependency}/${tsPackage.source}`

        return tsPackage
      })
      .filter((pckg: TsPackage) => pckg && pckg.source)
  }

  /**
   * add main program to programs
   */
  private createProgram(pckg: TsPackage): TsProgram {
    const baseSourcePathArry: string[] = Resolve(pckg.source).split('/')
    baseSourcePathArry.pop()
    const baseSourcePath: string = baseSourcePathArry.join('/')

    const compilerOptions: CompilerOptions = JSON.parse(ReadFileSync(this.tsMetaConfig.metaConfig.compilerOptions, { encoding: 'utf8' }))
    const program: Program = CreateTypescriptProgram([Resolve(pckg.source)], compilerOptions)

    return {
      files: program.getSourceFiles()
        .filter((sourceFile: SourceFile) => sourceFile.fileName.includes(baseSourcePath))
        .map((sourceFile: SourceFile): TsFile => {
          setSourceFile(sourceFile)
          if (process.env.NODE_ENV !== 'test' && this.tsMetaConfig.showScannedFiles) {
            process.stdout.write(` - ${sourceFile.fileName.split('/').pop()}\n`)
          }

          return this.tsMetaFileFactory.build(sourceFile)
        }),
      name: pckg.name
    }
  }
}

export { TsMetaFactory }
