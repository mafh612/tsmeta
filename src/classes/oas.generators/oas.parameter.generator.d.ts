import { Parameter } from 'oasmodel';
import { TsParameter } from '../../lib/interfaces/tsmeta.schema';
/**
 * class OasParameterGenerator
 */
declare class OasParameterGenerator {
    private readonly parameterAnnotations;
    private readonly parameterAnnotationMap;
    /**
     * generate Parameter
     */
    generate(tsParameter: TsParameter): Parameter;
    /**
     * collect from required field
     */
    private requiredFields;
}
export { OasParameterGenerator };
//# sourceMappingURL=oas.parameter.generator.d.ts.map