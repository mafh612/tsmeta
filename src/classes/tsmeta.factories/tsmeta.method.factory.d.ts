import { MethodDeclaration, MethodSignature } from 'typescript';
import { TsMethod } from '../../lib/interfaces/tsmeta.schema';
/**
 * class TsMetaMethodFactory
 */
declare class TsMetaMethodFactory {
    private readonly tsMetaDecoratorFactory;
    private readonly tsMetaParameterFactory;
    private readonly tsMetaTypeFactory;
    /**
     * build TsMethod element
     */
    build(method: MethodDeclaration | MethodSignature): TsMethod;
}
export { TsMetaMethodFactory };
//# sourceMappingURL=tsmeta.method.factory.d.ts.map