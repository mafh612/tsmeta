import { Schema } from 'oasmodel';
import { ParameterParam, PropertyParam } from '../../lib/interfaces/annotation.schema';
import { TsProperty } from '../../lib/interfaces/tsmeta.schema';
/**
 * class OasPropertyGenerator
 */
declare class OasPropertyGenerator {
    /**
     * generate property schema
     */
    generate(tsProperty: TsProperty, propertyParam: PropertyParam, parameterParam?: ParameterParam): Schema;
    /**
     * create array schema for property
     */
    private createArraySchema;
    /**
     * create map schema for property
     */
    private createMapSchema;
    /**
     * create prop schema for property
     */
    private createPropSchema;
}
export { OasPropertyGenerator };
//# sourceMappingURL=oas.property.generator.d.ts.map