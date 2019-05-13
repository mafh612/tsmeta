"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotations_mapping_1 = require("../../lib/annotations.mapping");
const annotations_enum_1 = require("../../lib/enums/annotations.enum");
const oas_parameter_generator_1 = require("./oas.parameter.generator");
const oas_requestbody_generator_1 = require("./oas.requestbody.generator");
const oas_response_generator_1 = require("./oas.response.generator");
/**
 * class OasOperationGenerator
 */
class OasOperationGenerator {
    /**
     * generate Operation
     */
    generate(controllerName, tsMethod, controllerParameters) {
        this.oasParameterGenerator = new oas_parameter_generator_1.OasParameterGenerator();
        this.oasResponseGenerator = new oas_response_generator_1.OasResponseGenerator();
        this.oasRequestbodyGenerator = new oas_requestbody_generator_1.OasRequestbodyGenerator();
        let parameters;
        let requestBody;
        parameters = tsMethod.parameters
            .filter((tsParameter) => !!tsParameter.decorators)
            .map((tsParameter) => this.oasParameterGenerator.generate(tsParameter))
            .filter((parameter) => !!parameter);
        if (controllerParameters)
            parameters = parameters.concat(controllerParameters);
        const reqBodyParameter = tsMethod.parameters
            .filter((tsParameter) => !!tsParameter.decorators)
            .find((tsParameter) => tsParameter.decorators
            .some((tsDecorator) => tsDecorator && annotations_mapping_1.GetMappedAnnotation(tsDecorator.name) === annotations_enum_1.AnnotationsEnum.REQUESTBODY));
        if (reqBodyParameter) {
            requestBody = this.oasRequestbodyGenerator.generate(reqBodyParameter);
        }
        const responses = this.oasResponseGenerator.generate(tsMethod);
        const deprecated = tsMethod.decorators
            .some((it) => annotations_mapping_1.GetMappedAnnotation(it.name) === annotations_enum_1.AnnotationsEnum.DEPRECATED) || undefined;
        let security = tsMethod.decorators
            .filter((it) => annotations_mapping_1.GetMappedAnnotation(it.name) === annotations_enum_1.AnnotationsEnum.SECURED)
            .map((it) => {
            const securityObject = {};
            securityObject[it.tsarguments[0].representation] = [];
            return securityObject;
        });
        if (security.length < 1)
            security = undefined;
        return {
            deprecated,
            parameters,
            requestBody,
            responses,
            security,
            tags: [controllerName]
        };
    }
}
exports.OasOperationGenerator = OasOperationGenerator;
//# sourceMappingURL=oas.operation.generator.js.map