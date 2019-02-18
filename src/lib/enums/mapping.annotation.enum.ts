// tslint:disable no-unnecessary-class
/**
 * interface MappingAnnotation
 */
export interface MappingAnnotation {
  name: string
  method: string
}
/**
 * MappingAnnotation enum
 */
class MappingAnnotations {
  public static GET: MappingAnnotation = { name: 'GetMapping', method: 'get' }
  public static POST: MappingAnnotation = { name:  'PostMapping', method: 'post' }
  public static PUT: MappingAnnotation = { name:  'PutMapping', method: 'put' }
  public static PATCH: MappingAnnotation = { name:  'PatchMapping', method: 'patch' }
  public static DELETE: MappingAnnotation = { name:  'DeleteMapping', method: 'delete' }
  public static HEAD: MappingAnnotation = { name:  'HeadMapping', method: 'head' }
  public name: string
  public method: string
}

export { MappingAnnotations }
