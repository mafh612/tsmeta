"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * decorator functions
 */
const classFunction = (target) => target;
const methodFunction = (target, key) => target[key];
const parameterFunction = (target, key, index) => target[key][index]; // tslint:disable-line
/**
 * class annotations
 */
const controller = (name) => classFunction;
exports.Controller = controller;
const model = (modelParam) => classFunction;
exports.Model = model;
/**
 * method annotations
 */
const getRequest = (path) => methodFunction;
exports.GetRequest = getRequest;
const postRequest = (path) => methodFunction;
exports.PostRequest = postRequest;
const putRequest = (path) => methodFunction;
exports.PutRequest = putRequest;
const patchRequest = (path) => methodFunction;
exports.PatchRequest = patchRequest;
const deleteRequest = (path) => methodFunction;
exports.DeleteRequest = deleteRequest;
const headRequest = (path) => methodFunction;
exports.HeadRequest = headRequest;
const successResponse = (responseParam) => methodFunction;
exports.SuccessResponse = successResponse;
/**
 * parameter annotations
 */
const pathVariable = (parameterParam) => parameterFunction;
exports.PathVariable = pathVariable;
const reqParam = (parameterParam) => parameterFunction;
exports.ReqParam = reqParam;
const reqBody = (parameterParam) => parameterFunction;
exports.ReqBody = reqBody;
