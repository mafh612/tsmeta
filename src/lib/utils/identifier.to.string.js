"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * extract text from identifier
 * @param identifier<Identifier>
 */
const identifierToString = (identifier) => identifier.escapedText ? identifier.escapedText.toString() : '';
exports.IdentifierToString = identifierToString;
//# sourceMappingURL=identifier.to.string.js.map