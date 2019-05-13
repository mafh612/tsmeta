/**
 * interface ElementType
 */
export interface ElementType {
    name: string;
    color: string;
}
/**
 * ElementType enum
 */
declare class ElementTypes {
    static FILE: ElementType;
    static PACKAGE: ElementType;
    static CLASS: ElementType;
    static INTERFACE: ElementType;
    static METHOD: ElementType;
    static PROPERTY: ElementType;
    static IMPORT: ElementType;
    static EXPORT: ElementType;
    name: string;
    color: string;
}
export { ElementTypes };
//# sourceMappingURL=element.types.enum.d.ts.map