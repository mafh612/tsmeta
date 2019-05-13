"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const element_types_enum_1 = require("../../lib/enums/element.types.enum");
const sigma_edge_generator_1 = require("./main/sigma.edge.generator");
const sigma_node_generator_1 = require("./main/sigma.node.generator");
/**
 * SigmaClassesGenerator class
 */
class SigmaClassesGenerator {
    constructor() {
        this.sigmaNodeGenerator = new sigma_node_generator_1.SigmaNodeGenerator();
        this.sigmaEdgeGenerator = new sigma_edge_generator_1.SigmaEdgeGenerator();
    }
    /**
     * generate from TsClass
     */
    generate(tsClass) {
        const nodes = [];
        const edges = [];
        if (!!tsClass.methods) {
            tsClass.methods.forEach((tsMethod) => {
                nodes.push(this.sigmaNodeGenerator.generate(tsMethod.name, tsMethod.name, element_types_enum_1.ElementTypes.METHOD, 1));
                edges.push(this.sigmaEdgeGenerator.generate(tsClass.name, tsMethod.name, tsMethod.name));
            });
        }
        if (!!tsClass.properties) {
            tsClass.properties.forEach((tsProperty) => {
                nodes.push(this.sigmaNodeGenerator.generate(tsProperty.name, tsProperty.name, element_types_enum_1.ElementTypes.PROPERTY, 1));
                edges.push(this.sigmaEdgeGenerator.generate(tsClass.name, tsProperty.name, tsProperty.name));
            });
        }
        return {
            edges,
            nodes
        };
    }
}
exports.SigmaClassesGenerator = SigmaClassesGenerator;
//# sourceMappingURL=sigma.classes.generator.js.map