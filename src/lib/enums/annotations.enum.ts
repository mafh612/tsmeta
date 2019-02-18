// tslint:disable no-unnecessary-class
// istanbul ignore file
/**
 * class AnnotationsEnum
 */
class AnnotationsEnum {

  public static get CONTROLLER(): string { return 'Controller' }
  public static get CONTROLLERPARAM(): string { return 'ControllerParam' }
  public static get MODEL(): string { return 'Model' }
  public static get GETREQUEST(): string { return 'GetRequest' }
  public static get POSTREQUEST(): string { return 'PostRequest' }
  public static get PUTREQUEST(): string { return 'PutRequest' }
  public static get PATCHREQUEST(): string { return 'PatchRequest' }
  public static get DELETEREQUEST(): string { return 'DeleteRequest' }
  public static get OPTIONSREQUEST(): string { return 'OptionsRequest' }
  public static get HEADREQUEST(): string { return 'HeadRequest' }
  public static get SUCCESSRESPONSE(): string { return 'SuccessResponse' }
  public static get ERRORRESPONSE(): string { return 'ErrorResponse' }
  public static get DEPRECATED(): string { return 'Deprecated' }
  public static get SECURED(): string { return 'Secured' }
  public static get PROPERTY(): string { return 'Property' }
  public static get PATHVARIABLE(): string { return 'PathVariable' }
  public static get REQUESTPARAM(): string { return 'RequestParam' }
  public static get REQUESTPARAMS(): string { return 'RequestParams' }
  public static get REQUESTBODY(): string { return 'RequestBody' }
}

export {
  AnnotationsEnum
}
