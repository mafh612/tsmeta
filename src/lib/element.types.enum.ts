// tslint:disable no-unnecessary-class
/**
 * interface ElementType
 */
export interface ElementType {
  name: string
  color: string
}
/**
 * ElementType enum
 */
class ElementTypes {
  public static FILE: ElementType = { name: 'file', color: '#999999' }
  public static PACKAGE: ElementType = { name:  'package', color: '#ffffff' }
  public static CLASS: ElementType = { name:  'class', color: '#ff0000' }
  public static INTERFACE: ElementType = { name:  'interface', color: '#ff9900' }
  public static METHOD: ElementType = { name:  'method', color: '#9999ff' }
  public static PROPERTY: ElementType = { name:  'property', color: '#b3ffb3' }
  public static IMPORT: ElementType = { name:  'import', color: '#00ff00' }
  public static EXPORT: ElementType = { name:  'import', color: '#0000ff' }
  public name: string
  public color: string
}

export { ElementTypes }
