"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
/**
 * class SimpleMock
 */
class SimpleMock {
    constructor() {
        this.readBaseDir();
    }
    /**
     * mock method
     */
    readBaseDir() {
        console.log(fs.readdirSync('./', { encoding: 'utf8' })); // tslint:disable-line
    }
}
exports.SimpleMock = SimpleMock;
