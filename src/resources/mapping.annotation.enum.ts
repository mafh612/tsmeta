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
  public static GET: MappingAnnotation = { name: 'GetRequest', method: 'get' }
  public static POST: MappingAnnotation = { name:  'PostRequest', method: 'post' }
  public static PUT: MappingAnnotation = { name:  'PutRequest', method: 'put' }
  public static PATCH: MappingAnnotation = { name:  'PatchRequest', method: 'patch' }
  public static DELETE: MappingAnnotation = { name:  'DeleteRequest', method: 'delete' }
  public static HEAD: MappingAnnotation = { name:  'HeadRequest', method: 'head' }
  public name: string
  public method: string
}

export { MappingAnnotations }
