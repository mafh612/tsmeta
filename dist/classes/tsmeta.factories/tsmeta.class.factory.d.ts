import { ClassDeclaration } from 'typescript';
import { TsClass } from '../../resources/tsmeta.schema';
/**
 * class TsMetaClassFactory
 */
declare class TsMetaClassFactory {
    private tsMetaDecoratorFactory;
    private tsMetaMethdoFactory;
    private tsMetaPropertyFactory;
    /**
     * build TsClass element
     * @param classDeclaration
     */
    build(classDeclaration: ClassDeclaration): TsClass;
}
export { TsMetaClassFactory };
