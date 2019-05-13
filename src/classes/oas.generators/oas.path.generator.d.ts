import { Parameter, PathItem } from 'oasmodel';
import { OasConfig } from '../../lib/interfaces/tsmeta.config';
import { TsMethod } from '../../lib/interfaces/tsmeta.schema';
/**
 * class OasPathGenerator
 */
declare class OasPathGenerator {
    private readonly oasConfig;
    private oasOperationGeneration;
    private readonly standardMappingAnnotations;
    constructor(oasConfig: OasConfig);
    /**
     * generated PathItem
     */
    generate(controllerName: string, controllerPath: string, tsMethod: TsMethod, controllerParameters: Parameter[]): {
        [key: string]: PathItem;
    };
    /**
     * create full pathing
     */
    private createFullPath;
}
export { OasPathGenerator };
//# sourceMappingURL=oas.path.generator.d.ts.map