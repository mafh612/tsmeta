/**
 * interface ParameterParam
 */
export interface ParameterParam {
    name: string;
    required: boolean;
}
/**
 * interface SuccessResponseParam
 */
export interface ResponseParam {
    statusCode?: number;
    response: any;
    version: string;
}
/**
 * interface ModelParam
 */
export interface ModelParam {
    version: string;
    example?: any;
}
/**
 * class annotations
 */
declare const controller: ((name: string) => any);
declare const model: ((modelParam: ModelParam) => any);
/**
 * method annotations
 */
declare const getRequest: ((path: string) => any);
declare const postRequest: ((path: string) => any);
declare const putRequest: ((path: string) => any);
declare const patchRequest: ((path: string) => any);
declare const deleteRequest: ((path: string) => any);
declare const headRequest: ((path: string) => any);
declare const successResponse: ((responseParam: ResponseParam) => any);
/**
 * parameter annotations
 */
declare const pathVariable: ((parameterParam: ParameterParam) => any);
declare const reqParam: ((parameterParam: ParameterParam) => any);
declare const reqBody: ((parameterParam: ParameterParam) => any);
export { controller as Controller, model as Model, getRequest as GetRequest, postRequest as PostRequest, putRequest as PutRequest, patchRequest as PatchRequest, deleteRequest as DeleteRequest, headRequest as HeadRequest, successResponse as SuccessResponse, pathVariable as PathVariable, reqParam as ReqParam, reqBody as ReqBody };
