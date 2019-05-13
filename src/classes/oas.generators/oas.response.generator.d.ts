import { Response } from 'oasmodel';
import { TsMethod } from '../../lib/interfaces/tsmeta.schema';
/**
 * class OasResponseGenerator
 */
declare class OasResponseGenerator {
    private readonly httpStatusOK;
    /**
     * generate Response
     */
    generate(tsMethod: TsMethod): {
        [key: number]: Response;
    };
    /**
     * create description string
     */
    private createDescription;
    /**
     * create response content
     */
    private createContent;
}
export { OasResponseGenerator };
//# sourceMappingURL=oas.response.generator.d.ts.map