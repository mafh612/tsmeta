import { TsMetaConfig } from '../lib/interfaces/tsmeta.config';
import { TsMeta } from '../lib/interfaces/tsmeta.schema';
/**
 * class TsMetaFactory
 */
declare class TsMetaFactory {
    private readonly tsMetaConfig;
    private readonly tsMetaPackageFactory;
    private readonly tsMetaFileFactory;
    constructor(tsMetaConfig: TsMetaConfig);
    /**
     * build TsMeta element
     */
    build(): TsMeta;
    /**
     * scan dependencies and devDependencies for linked packages
     */
    private scanAdditionalPackages;
    /**
     * add main program to programs
     */
    private createProgram;
}
export { TsMetaFactory };
//# sourceMappingURL=tsmeta.factory.d.ts.map