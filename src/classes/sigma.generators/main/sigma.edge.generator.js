"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * class SigmaNodeGenerator
 */
class SigmaEdgeGenerator {
    /**
     * generate single SigmaEdge Element
     */
    generate(source, target, label) {
        return {
            id: source + target,
            label,
            source,
            target
        };
    }
}
exports.SigmaEdgeGenerator = SigmaEdgeGenerator;
//# sourceMappingURL=sigma.edge.generator.js.map