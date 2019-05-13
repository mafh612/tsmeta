"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * class SigmaNodeGenerator
 */
class SigmaNodeGenerator {
    /**
     * generate single SigmaNode
     */
    generate(id, label, elementType, size) {
        const color = elementType.color;
        const etype = elementType.name;
        const x = 0;
        const y = 0;
        return {
            color,
            etype,
            id,
            label,
            size,
            x,
            y
        };
    }
}
exports.SigmaNodeGenerator = SigmaNodeGenerator;
//# sourceMappingURL=sigma.node.generator.js.map