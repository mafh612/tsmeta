// tslint:disable no-unnecessary-class
/**
 * ElementType enum
 */
class ElementTypes {
  public static FILE: { name: string; color: string } = { name: 'file', color: '#999999' }
  public static PACKAGE: { name: string; color: string } = { name:  'package', color: '#ffffff' }
  public static CLASS: { name: string; color: string } = { name:  'class', color: '#ff0000' }
  public static INTERFACE: { name: string; color: string } = { name:  'interface', color: '#ff9900' }
  public static METHOD: { name: string; color: string } = { name:  'method', color: '#9999ff' }
  public static PROPERTY: { name: string; color: string } = { name:  'property', color: '#b3ffb3' }
  public static IMPORT: { name: string; color: string } = { name:  'import', color: '#00ff00' }
  public static EXPORT: { name: string; color: string } = { name:  'import', color: '#0000ff' }
  public name: string
  public color: string
}

export { ElementTypes }
