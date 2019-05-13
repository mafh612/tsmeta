"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
const identifier_to_string_1 = require("../../lib/utils/identifier.to.string");
const tsmeta_decorator_factory_1 = require("./tsmeta.decorator.factory");
const tsmeta_method_factory_1 = require("./tsmeta.method.factory");
const tsmeta_property_factory_1 = require("./tsmeta.property.factory");
/**
 * class TsMetaClassFactory
 */
class TsMetaClassFactory {
    constructor() {
        this.tsMetaDecoratorFactory = new tsmeta_decorator_factory_1.TsMetaDecoratorFactory();
        this.tsMetaMethdoFactory = new tsmeta_method_factory_1.TsMetaMethodFactory();
        this.tsMetaPropertyFactory = new tsmeta_property_factory_1.TsMetaPropertyFactory();
    }
    /**
     * build TsClass element
     */
    build(classDeclaration) {
        const name = identifier_to_string_1.IdentifierToString(classDeclaration.name);
        const decorators = classDeclaration.decorators
            ? classDeclaration.decorators.map((decorator) => this.tsMetaDecoratorFactory.build(decorator))
            : undefined;
        const methods = [];
        const properties = [];
        classDeclaration.members.forEach((classElement) => {
            if (typescript_1.isMethodDeclaration(classElement))
                methods.push(this.tsMetaMethdoFactory.build(classElement));
            if (typescript_1.isPropertyDeclaration(classElement))
                properties.push(this.tsMetaPropertyFactory.build(classElement));
        });
        return {
            decorators,
            methods,
            name,
            properties
        };
    }
}
exports.TsMetaClassFactory = TsMetaClassFactory;
//# sourceMappingURL=tsmeta.class.factory.js.map