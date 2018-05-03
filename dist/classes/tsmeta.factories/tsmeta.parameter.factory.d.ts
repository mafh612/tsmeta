import { ParameterDeclaration } from 'typescript';
import { TsParameter } from '../../resources/tsmeta.schema';
/**
 * class TsMetaParameterFactory
 */
declare class TsMetaParameterFactory {
    private tsMetaDecoratorFactory;
    /**
     * build TsParameter element
     */
    build(parameterDeclaration: ParameterDeclaration): TsParameter;
}
export { TsMetaParameterFactory };
