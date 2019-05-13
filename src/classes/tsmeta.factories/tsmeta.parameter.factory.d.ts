import { ParameterDeclaration } from 'typescript';
import { TsParameter } from '../../lib/interfaces/tsmeta.schema';
/**
 * class TsMetaParameterFactory
 */
declare class TsMetaParameterFactory {
    private readonly tsMetaTypeFactory;
    private readonly tsMetaDecoratorFactory;
    /**
     * build TsParameter element
     */
    build(parameterDeclaration: ParameterDeclaration): TsParameter;
}
export { TsMetaParameterFactory };
//# sourceMappingURL=tsmeta.parameter.factory.d.ts.map