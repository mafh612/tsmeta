"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const element_types_enum_1 = require("../../lib/enums/element.types.enum");
const sigma_edge_generator_1 = require("./main/sigma.edge.generator");
const sigma_node_generator_1 = require("./main/sigma.node.generator");
/**
 * SigmaFilesGenerator class
 */
class SigmaFilesGenerator {
    constructor() {
        this.sigmaNodeGenerator = new sigma_node_generator_1.SigmaNodeGenerator();
        this.sigmaEdgeGenerator = new sigma_edge_generator_1.SigmaEdgeGenerator();
    }
    /**
     * generate from TsFile
     */
    generate(tsFile) {
        const nodes = [];
        const edges = [];
        if (!!tsFile.tsClass) {
            nodes.push(this.sigmaNodeGenerator.generate(tsFile.tsClass.name, tsFile.tsClass.name, element_types_enum_1.ElementTypes.FILE, 1));
            edges.push(this.sigmaEdgeGenerator.generate(tsFile.filename, tsFile.tsClass.name, tsFile.tsClass.name));
        }
        if (!!tsFile.tsMains)
            tsFile.tsMains
                .forEach((tsMain) => {
                nodes.push(this.sigmaNodeGenerator.generate(tsMain.name, tsMain.name, element_types_enum_1.ElementTypes.INTERFACE, 1));
                edges.push(this.sigmaEdgeGenerator.generate(tsFile.filename, tsMain.name, tsMain.name));
            });
        if (!!tsFile.tsImports)
            tsFile.tsImports
                .forEach((tsImport) => {
                nodes.push(this.sigmaNodeGenerator.generate(tsImport.name, tsImport.name, element_types_enum_1.ElementTypes.IMPORT, 1));
                edges.push(this.sigmaEdgeGenerator.generate(tsFile.filename, tsImport.name, tsImport.name));
            });
        if (!!tsFile.tsExports)
            tsFile.tsExports
                .forEach((tsExports) => {
                nodes.push(this.sigmaNodeGenerator.generate(tsExports.name, tsExports.name, element_types_enum_1.ElementTypes.IMPORT, 1));
                edges.push(this.sigmaEdgeGenerator.generate(tsFile.filename, tsExports.name, tsExports.name));
            });
        return {
            edges,
            nodes
        };
    }
}
exports.SigmaFilesGenerator = SigmaFilesGenerator;
//# sourceMappingURL=sigma.files.generator.js.map