"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotations_mapping_1 = require("../../lib/annotations.mapping");
const array_reducer_1 = require("../../lib/array.reducer");
/**
 * class OasResponseGenerator
 */
class OasResponseGenerator {
    constructor() {
        this.httpStatusOK = 200;
    }
    /**
     * generate Response
     */
    generate(tsMethod) {
        const responseDecorators = tsMethod.decorators
            .filter((tsDecorator) => tsDecorator.name.includes('Response'));
        const response = {};
        annotations_mapping_1.GetMappedAnnotation('any'); // tslint:disable-line
        responseDecorators.forEach((responseDecorator) => {
            const responseArgument = responseDecorator.tsarguments && responseDecorator.tsarguments.reduce(array_reducer_1.last, undefined);
            const responseParam = responseArgument
                ? responseArgument.representation
                : undefined;
            const statusCode = responseParam && responseParam.statusCode || this.httpStatusOK;
            response[statusCode] = { ...this.createContent(responseParam) };
            response[statusCode].description = responseParam && responseParam.description
                || this.createDescription(responseDecorator, responseParam);
            if ('$ref' in response[statusCode]) {
                response[statusCode] = { $ref: response[statusCode].$ref };
            }
        });
        return response;
    }
    /**
     * create description string
     */
    createDescription(tsDecorator, responseParam) {
        return !!responseParam ? tsDecorator.name : 'no content';
    }
    /**
     * create response content
     */
    createContent(responseParam) {
        let content;
        const version = (responseParam && responseParam.version) ? `_${responseParam.version}` : '';
        if (!responseParam) {
            content = undefined;
        }
        if (responseParam && responseParam.responseRef) {
            return { $ref: `#/components/responses/${responseParam.responseRef}${version}` };
        }
        if (responseParam && responseParam.ref) {
            content = {
                'application/json': {
                    schema: {
                        $ref: `#/components/schemas/${responseParam.ref}${version}`
                    }
                }
            };
        }
        if (responseParam && responseParam.schema) {
            const schema = {
                example: responseParam.example || undefined,
                properties: {}
            };
            Object.keys(responseParam.schema)
                .forEach((key) => {
                schema.properties[key] = { type: responseParam.schema[key] };
            });
            content = {
                'application/json': {
                    schema
                }
            };
        }
        return { content };
    }
}
exports.OasResponseGenerator = OasResponseGenerator;
//# sourceMappingURL=oas.response.generator.js.map