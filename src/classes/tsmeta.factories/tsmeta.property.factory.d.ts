import { PropertyDeclaration, PropertySignature } from 'typescript';
import { TsProperty } from '../../lib/interfaces/tsmeta.schema';
/**
 * class TsMetaPropertyFactory
 */
declare class TsMetaPropertyFactory {
    private readonly tsMetaTypeFactory;
    private readonly tsMetaDecoratorFactory;
    /**
     * build TsProperty element
     */
    build(property: PropertyDeclaration | PropertySignature): TsProperty;
}
export { TsMetaPropertyFactory };
//# sourceMappingURL=tsmeta.property.factory.d.ts.map