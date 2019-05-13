"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_reducer_1 = require("../../lib/array.reducer");
const oas_property_generator_1 = require("./oas.property.generator");
/**
 * class OasRequestbodyGenerator
 */
class OasRequestbodyGenerator {
    /**
     * generate RequestBody
     */
    generate(reqBodyParameter) {
        this.oasPropertyGenerator = new oas_property_generator_1.OasPropertyGenerator();
        const decorator = reqBodyParameter.decorators.reduce(array_reducer_1.last);
        const parameterParam = (decorator && decorator.tsarguments.length)
            ? decorator.tsarguments.reduce(array_reducer_1.last).representation
            : undefined;
        const description = undefined;
        let schema;
        if (parameterParam.ref) {
            const version = parameterParam.version ? `_${parameterParam.version}` : '';
            schema = { $ref: `#/components/schemas/${parameterParam.ref}${version}` };
        }
        else {
            schema = this.oasPropertyGenerator.generate(reqBodyParameter, undefined, parameterParam);
        }
        const requiredFields = this.requiredFields(parameterParam);
        const required = requiredFields.shift();
        schema.required = requiredFields;
        return {
            content: {
                'application/json': {
                    schema
                }
            },
            description,
            required
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
exports.OasRequestbodyGenerator = OasRequestbodyGenerator;
//# sourceMappingURL=oas.requestbody.generator.js.map