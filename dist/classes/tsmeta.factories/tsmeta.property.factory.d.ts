import { PropertyDeclaration } from 'typescript';
import { TsProperty } from '../../resources/tsmeta.schema';
/**
 * class TsMetaPropertyFactory
 */
declare class TsMetaPropertyFactory {
    /**
     * build TsProperty element
     * @param propertyDeclaration
     */
    build(propertyDeclaration: PropertyDeclaration): TsProperty;
}
export { TsMetaPropertyFactory };
