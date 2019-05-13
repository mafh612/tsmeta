import { InterfaceDeclaration } from 'typescript';
import { TsMain } from '../../lib/interfaces/tsmeta.schema';
/**
 * class TsMetaMainFactory
 */
declare class TsMetaMainFactory {
    private readonly tsMetaMethodFactory;
    private readonly tsMetaPropertyFactory;
    /**
     * build TsClass element
     */
    build(declaration: InterfaceDeclaration): TsMain;
}
export { TsMetaMainFactory };
//# sourceMappingURL=tsmeta.main.factory.d.ts.map