import { RequestBody } from 'oasmodel';
import { TsParameter } from '../../lib/interfaces/tsmeta.schema';
/**
 * class OasRequestbodyGenerator
 */
declare class OasRequestbodyGenerator {
    private oasPropertyGenerator;
    /**
     * generate RequestBody
     */
    generate(reqBodyParameter: TsParameter): RequestBody;
    /**
     * collect from required field
     */
    private requiredFields;
}
export { OasRequestbodyGenerator };
//# sourceMappingURL=oas.requestbody.generator.d.ts.map