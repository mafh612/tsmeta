import { TsMetaConfig } from '../resources/tsmeta.config';
import { TsMeta } from '../resources/tsmeta.schema';
/**
 * class TsMetaFactory
 */
declare class TsMetaFactory {
    private tsMetaPackageFactory;
    private tsMetaFileFactory;
    /**
     * build TsMeta element
     */
    build(tsMetaConfig: TsMetaConfig): TsMeta;
    /**
     * scan dependencies and devDependencies for linked packages
     * @param baseTsPackage
     */
    private scanAdditionalPackages(baseTsPackage);
    /**
     * add main program to programs
     */
    private createMainProgram(tsMetaConfig, baseTsPackage);
}
export { TsMetaFactory };
