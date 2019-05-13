import { Openapi } from 'oasmodel';
import { OasConfig } from '../lib/interfaces/tsmeta.config';
import { TsMeta } from '../lib/interfaces/tsmeta.schema';
/**
 * class OasGenerator
 */
declare class OasGenerator {
    private readonly oasConfig;
    private oasPathGenerator;
    private oasParameterGenerator;
    private oasSchemaGenerator;
    constructor(oasConfig: OasConfig);
    /**
     * generate openapi specification
     */
    generate(tsMeta: TsMeta): Openapi;
    /**
     * filter TsMeta schema for Controller annotated classes
     */
    private filterController;
    /**
     * filter TsMeta schema for Model annotated classes
     */
    private filterModel;
    /**
     * construct pathItems from TsFile
     */
    private constructPaths;
    /**
     * create controller params from TsDecorator
     */
    private createControllerParams;
    /**
     * construct schemas from  TsFile
     */
    private constructSchemas;
}
export { OasGenerator };
//# sourceMappingURL=oas.generator.d.ts.map