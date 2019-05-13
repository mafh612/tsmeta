"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const annotations_mapping_1 = require("../../lib/annotations.mapping");
const array_reducer_1 = require("../../lib/array.reducer");
const annotations_enum_1 = require("../../lib/enums/annotations.enum");
const mapping_annotation_enum_1 = require("../../lib/enums/mapping.annotation.enum");
const oas_operation_generator_1 = require("./oas.operation.generator");
/**
 * class OasPathGenerator
 */
class OasPathGenerator {
    constructor(oasConfig) {
        this.oasConfig = oasConfig;
        this.standardMappingAnnotations = [
            annotations_enum_1.AnnotationsEnum.GETMAPPING,
            annotations_enum_1.AnnotationsEnum.POSTMAPPING,
            annotations_enum_1.AnnotationsEnum.PUTMAPPING,
            annotations_enum_1.AnnotationsEnum.PATCHMAPPING,
            annotations_enum_1.AnnotationsEnum.DELETEMAPPING,
            annotations_enum_1.AnnotationsEnum.HEADMAPPING
        ];
    }
    /**
     * generated PathItem
     */
    generate(controllerName, controllerPath, tsMethod, controllerParameters) {
        annotations_mapping_1.SetAnnoationsMapping(this.oasConfig.annotationsMap);
        const pathItem = {};
        const mappingDecorator = tsMethod.decorators
            .find((it) => this.standardMappingAnnotations.includes(annotations_mapping_1.GetMappedAnnotation(it.name)));
        if (!mappingDecorator)
            return;
        const methodPath = mappingDecorator.tsarguments.reduce(array_reducer_1.last).representation;
        const fullPath = this.createFullPath(controllerPath, methodPath);
        this.oasOperationGeneration = new oas_operation_generator_1.OasOperationGenerator();
        switch (annotations_mapping_1.GetMappedAnnotation(mappingDecorator.name)) {
            case mapping_annotation_enum_1.MappingAnnotations.GET.name:
                pathItem[fullPath] = { get: this.oasOperationGeneration.generate(controllerName, tsMethod, controllerParameters) };
                break;
            case mapping_annotation_enum_1.MappingAnnotations.POST.name:
                pathItem[fullPath] = { post: this.oasOperationGeneration.generate(controllerName, tsMethod, controllerParameters) };
                break;
            case mapping_annotation_enum_1.MappingAnnotations.PUT.name:
                pathItem[fullPath] = { put: this.oasOperationGeneration.generate(controllerName, tsMethod, controllerParameters) };
                break;
            case mapping_annotation_enum_1.MappingAnnotations.PATCH.name:
                pathItem[fullPath] = { patch: this.oasOperationGeneration.generate(controllerName, tsMethod, controllerParameters) };
                break;
            case mapping_annotation_enum_1.MappingAnnotations.DELETE.name:
                pathItem[fullPath] = { delete: this.oasOperationGeneration.generate(controllerName, tsMethod, controllerParameters) };
                break;
            case mapping_annotation_enum_1.MappingAnnotations.HEAD.name:
                pathItem[fullPath] = { head: this.oasOperationGeneration.generate(controllerName, tsMethod, controllerParameters) };
                break;
            default:
        }
        return pathItem;
    }
    /**
     * create full pathing
     */
    createFullPath(controllerPath, methodPath) {
        const controllerPathArray = controllerPath
            .split('/')
            .filter((part) => part !== '');
        const methodPathArray = methodPath && methodPath
            .split('/')
            .filter((part) => part !== '') || [];
        let fullPathArray = controllerPathArray.concat(methodPathArray);
        fullPathArray = fullPathArray.map((pathString) => {
            if (pathString.startsWith(':'))
                return `{${pathString.replace(':', '')}}`; // tslint:disable-line
            return pathString;
        });
        return `/${fullPathArray.join('/')}`;
    }
}
exports.OasPathGenerator = OasPathGenerator;
//# sourceMappingURL=oas.path.generator.js.map