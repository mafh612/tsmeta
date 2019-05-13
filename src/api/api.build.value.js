"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_reducer_1 = require("../lib/array.reducer");
const _boolean = true;
const _string = 'text';
const _int = 1;
const _float = 0.1;
/**
 * build value by literal types
 */
const buildValue = (propertyType, decorator, modelDecorator) => {
    const arg = decorator && decorator.tsarguments && decorator.tsarguments.reduce(array_reducer_1.last);
    const modelArg = modelDecorator && modelDecorator.tsarguments && modelDecorator.tsarguments.reduce(array_reducer_1.last);
    switch (propertyType) {
        case 'boolean': return _boolean;
        case 'number':
            if (arg && arg.representation && arg.representation.format === 'float')
                return _float;
            else
                return _int;
        case 'string':
            return modelArg
                && modelArg.representation
                && modelArg.representation.enum
                && modelArg.representation.enum.reduce(array_reducer_1.first)
                || _string;
        default: return undefined;
    }
};
exports.BuildValue = buildValue;
const buildMalformedValue = (propertyType, decorator) => {
    const arg = decorator && decorator.tsarguments && decorator.tsarguments.reduce(array_reducer_1.last);
    switch (propertyType) {
        case 'boolean': return _int;
        case 'number':
            if (arg && arg.representation && arg.representation.format === 'float')
                return _string;
            else
                return _string;
        case 'string': return _boolean;
        default: return _boolean;
    }
};
exports.BuildMalformedValue = buildMalformedValue;
//# sourceMappingURL=api.build.value.js.map