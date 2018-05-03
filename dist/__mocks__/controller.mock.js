"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const annotations_1 = require("../resources/annotations");
const something_mock_1 = require("./something.mock");
/**
 * class ControllerMock
 */
let ControllerMock = class ControllerMock {
    /**
     * get something method
     * @param text
     */
    async getSomething(text) {
        return Promise.resolve(new something_mock_1.SomethingMock(text));
    }
};
__decorate([
    annotations_1.GetRequest('/something'),
    annotations_1.SuccessResponse({ response: something_mock_1.SomethingMock, statusCode: 200, version: 'v1' }),
    __param(0, annotations_1.PathVariable({ name: 'text', required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ControllerMock.prototype, "getSomething", null);
ControllerMock = __decorate([
    annotations_1.Controller('controller/mock')
], ControllerMock);
exports.ControllerMock = ControllerMock;
