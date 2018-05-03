import { Decorator } from 'typescript';
import { TsDecorator } from '../../resources/tsmeta.schema';
/**
 * class TsMetaDecoratorFactory
 */
declare class TsMetaDecoratorFactory {
    private tsMetaArgumentFactory;
    /**
     * build TsDecorator element
     * @param decorator
     */
    build(decorator: Decorator): TsDecorator;
}
export { TsMetaDecoratorFactory };
