"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotations_mapping_1 = require("../../lib/annotations.mapping");
const array_reducer_1 = require("../../lib/array.reducer");
const annotations_enum_1 = require("../../lib/enums/annotations.enum");
/**
 * class OasParameterGenerator
 */
class OasParameterGenerator {
    constructor() {
        this.parameterAnnotations = [
            annotations_enum_1.AnnotationsEnum.PATHVARIABLE,
            annotations_enum_1.AnnotationsEnum.REQUESTPARAM,
            annotations_enum_1.AnnotationsEnum.REQUESTHEADER,
            annotations_enum_1.AnnotationsEnum.COOKIEVALUE,
            annotations_enum_1.AnnotationsEnum.CONTROLLERPARAM
        ];
        this.parameterAnnotationMap = {
            CookieValue: 'cookie',
            PathVariable: 'path',
            RequestHeader: 'header',
            RequestParam: 'query'
        };
    }
    /**
     * generate Parameter
     */
    generate(tsParameter) {
        let parameterDecorator;
        if (tsParameter.decorators) {
            parameterDecorator = tsParameter.decorators
                .find((tsDecorator) => this.parameterAnnotations.includes(annotations_mapping_1.GetMappedAnnotation(tsDecorator.name)));
        }
        if (!parameterDecorator)
            return undefined;
        const parameterArgument = parameterDecorator.tsarguments.reduce(array_reducer_1.last).representation;
        const $ref = parameterArgument.ref ? parameterArgument.ref : undefined;
        const allowEmptyValue = !parameterArgument.required;
        const deprecated = false;
        const description = parameterArgument.description
            ? parameterArgument.description
            : `${parameterDecorator.name} ${tsParameter.name}`;
        const example = parameterArgument.example;
        const _in = parameterArgument.in
            ? parameterArgument.in
            : this.parameterAnnotationMap[annotations_mapping_1.GetMappedAnnotation(parameterDecorator.name)];
        const name = parameterArgument.name;
        const requiredFields = this.requiredFields(parameterArgument);
        const required = requiredFields.shift();
        const schema = parameterArgument.schema || { type: 'string' };
        return {
            $ref,
            allowEmptyValue,
            deprecated,
            description,
            example,
            in: _in,
            name,
            required,
            schema
        };
    }
    /**
     * collect from required field
     */
    requiredFields(parameterParam) {
        if (!parameterParam || !parameterParam.required)
            return [false];
        if (!Array.isArray(parameterParam.required))
            return [parameterParam.required];
        return parameterParam.required;
    }
}
exports.OasParameterGenerator = OasParameterGenerator;
//# sourceMappingURL=oas.parameter.generator.js.map