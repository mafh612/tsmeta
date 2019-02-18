// tslint:disable no-unnecessary-class
// istanbul ignore file
/**
 * class AnnotationsEnum
 */
class AnnotationsEnum {

  public static get CONTROLLER(): string { return 'Controller' }
  public static get CONTROLLERPARAM(): string { return 'ControllerParam' }
  public static get MODEL(): string { return 'Model' }
  public static get GETMAPPING(): string { return 'GetMapping' }
  public static get POSTMAPPING(): string { return 'PostMapping' }
  public static get PUTMAPPING(): string { return 'PutMapping' }
  public static get PATCHMAPPING(): string { return 'PatchMapping' }
  public static get DELETEMAPPING(): string { return 'DeleteMapping' }
  public static get OPTIONSMAPPING(): string { return 'OptionsMapping' }
  public static get HEADMAPPING(): string { return 'HeadMapping' }
  public static get SUCCESSRESPONSE(): string { return 'SuccessResponse' }
  public static get ERRORRESPONSE(): string { return 'ErrorResponse' }
  public static get DEPRECATED(): string { return 'Deprecated' }
  public static get SECURED(): string { return 'Secured' }
  public static get PROPERTY(): string { return 'Property' }
  public static get PATHVARIABLE(): string { return 'PathVariable' }
  public static get REQUESTHEADER(): string { return 'RequestHeader' }
  public static get REQUESTPARAM(): string { return 'RequestParam' }
  public static get REQUESTPARAMS(): string { return 'RequestParams' }
  public static get REQUESTBODY(): string { return 'RequestBody' }
  public static get COOKIEVALUE(): string { return 'CookieValue' }
}

export {
  AnnotationsEnum
}
