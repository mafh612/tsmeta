/**
 * interface MappingAnnotation
 */
export interface MappingAnnotation {
    name: string;
    method: string;
}
/**
 * MappingAnnotation enum
 */
declare class MappingAnnotations {
    static GET: MappingAnnotation;
    static POST: MappingAnnotation;
    static PUT: MappingAnnotation;
    static PATCH: MappingAnnotation;
    static DELETE: MappingAnnotation;
    static HEAD: MappingAnnotation;
    name: string;
    method: string;
}
export { MappingAnnotations };
//# sourceMappingURL=mapping.annotation.enum.d.ts.map