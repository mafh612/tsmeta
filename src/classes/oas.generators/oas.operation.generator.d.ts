import { Operation, Parameter } from 'oasmodel';
import { TsMethod } from '../../lib/interfaces/tsmeta.schema';
/**
 * class OasOperationGenerator
 */
declare class OasOperationGenerator {
    private oasParameterGenerator;
    private oasResponseGenerator;
    private oasRequestbodyGenerator;
    /**
     * generate Operation
     */
    generate(controllerName: string, tsMethod: TsMethod, controllerParameters: Parameter[]): Operation;
}
export { OasOperationGenerator };
//# sourceMappingURL=oas.operation.generator.d.ts.map