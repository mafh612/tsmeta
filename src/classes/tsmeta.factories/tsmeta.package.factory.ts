import { readFileSync as ReadFileSync } from 'fs'
import { TsPackage } from '../../resources/tsmeta.schema'

/**
 * class TsMetaPackageFactory
 */
class TsMetaPackageFactory {

  /**
   * build TsPackage element
   */
  public build(filename: string): TsPackage {
    return this.readPackageJson(filename)
  }

  /**
   * read package.json from filename
   */
  public readPackageJson(filename: string): TsPackage {
    return JSON.parse(ReadFileSync(filename, { encoding: 'utf8' }))
  }
}

export { TsMetaPackageFactory }
