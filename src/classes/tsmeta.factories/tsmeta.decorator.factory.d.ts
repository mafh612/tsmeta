import { Decorator } from 'typescript';
import { TsDecorator } from '../../lib/interfaces/tsmeta.schema';
/**
 * class TsMetaDecoratorFactory
 */
declare class TsMetaDecoratorFactory {
    private readonly tsMetaArgumentFactory;
    /**
     * build TsDecorator element
     */
    build(decorator: Decorator): TsDecorator;
}
export { TsMetaDecoratorFactory };
//# sourceMappingURL=tsmeta.decorator.factory.d.ts.map