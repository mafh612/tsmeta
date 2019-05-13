"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * function annoationsMapping
 */
let annoationsMapping = {};
/**
 * get mapped annotation
 */
const getMappedAnnotation = (map) => {
    return annoationsMapping && annoationsMapping[map] || map;
};
exports.GetMappedAnnotation = getMappedAnnotation;
/**
 * set annoation mapping
 */
const setAnnoationsMapping = (mapping) => {
    annoationsMapping = mapping;
};
exports.SetAnnoationsMapping = setAnnoationsMapping;
//# sourceMappingURL=annotations.mapping.js.map