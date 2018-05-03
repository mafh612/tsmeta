import { Expression } from 'typescript';
import { TsArgument } from '../../resources/tsmeta.schema';
/**
 * class TsMetaArgumentFactory
 */
declare class TsMetaArgumentFactory {
    /**
     * build TsArgument element
     */
    build(expression: Expression): TsArgument;
}
export { TsMetaArgumentFactory };
