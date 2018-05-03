import { MethodDeclaration } from 'typescript';
import { TsMethod } from '../../resources/tsmeta.schema';
/**
 * class TsMetaMethodFactory
 */
declare class TsMetaMethodFactory {
    private tsMetaDecoratorFactory;
    private tsMetaParameterFactory;
    /**
     * build TsMethod element
     * @param methodDeclaration
     */
    build(methodDeclaration: MethodDeclaration): TsMethod;
}
export { TsMetaMethodFactory };
