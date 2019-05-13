import { ClassDeclaration } from 'typescript';
import { TsClass } from '../../lib/interfaces/tsmeta.schema';
/**
 * class TsMetaClassFactory
 */
declare class TsMetaClassFactory {
    private readonly tsMetaDecoratorFactory;
    private readonly tsMetaMethdoFactory;
    private readonly tsMetaPropertyFactory;
    /**
     * build TsClass element
     */
    build(classDeclaration: ClassDeclaration): TsClass;
}
export { TsMetaClassFactory };
//# sourceMappingURL=tsmeta.class.factory.d.ts.map