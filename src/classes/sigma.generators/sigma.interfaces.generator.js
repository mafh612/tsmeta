"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const element_types_enum_1 = require("../../lib/enums/element.types.enum");
const sigma_edge_generator_1 = require("./main/sigma.edge.generator");
const sigma_node_generator_1 = require("./main/sigma.node.generator");
/**
 * SigmaClassesGenerator class
 */
class SigmaInterfacesGenerator {
    constructor() {
        this.sigmaNodeGenerator = new sigma_node_generator_1.SigmaNodeGenerator();
        this.sigmaEdgeGenerator = new sigma_edge_generator_1.SigmaEdgeGenerator();
    }
    /**
     * generate from TsMain
     */
    generate(tsMain) {
        const nodes = [];
        const edges = [];
        if (!!tsMain.methods) {
            tsMain.methods.forEach((tsMethod) => {
                nodes.push(this.sigmaNodeGenerator.generate(tsMethod.name, tsMethod.name, element_types_enum_1.ElementTypes.METHOD, 1));
                edges.push(this.sigmaEdgeGenerator.generate(tsMain.name, tsMethod.name, tsMethod.name));
            });
        }
        if (!!tsMain.properties) {
            tsMain.properties.forEach((tsProperty) => {
                nodes.push(this.sigmaNodeGenerator.generate(tsProperty.name, tsProperty.name, element_types_enum_1.ElementTypes.PROPERTY, 1));
                edges.push(this.sigmaEdgeGenerator.generate(tsMain.name, tsProperty.name, tsProperty.name));
            });
        }
        return {
            edges,
            nodes
        };
    }
}
exports.SigmaInterfacesGenerator = SigmaInterfacesGenerator;
//# sourceMappingURL=sigma.interfaces.generator.js.map