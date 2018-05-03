import { TsPackage } from '../../resources/tsmeta.schema';
/**
 * class TsMetaPackageFactory
 */
declare class TsMetaPackageFactory {
    /**
     * build TsPackage element
     */
    build(filename: string): TsPackage;
    /**
     * read package.json from filename
     */
    readPackageJson(filename: string): TsPackage;
}
export { TsMetaPackageFactory };
