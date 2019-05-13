"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const element_types_enum_1 = require("../lib/enums/element.types.enum");
const sigma_node_generator_1 = require("./sigma.generators/main/sigma.node.generator");
const sigma_classes_generator_1 = require("./sigma.generators/sigma.classes.generator");
const sigma_files_generator_1 = require("./sigma.generators/sigma.files.generator");
const sigma_interfaces_generator_1 = require("./sigma.generators/sigma.interfaces.generator");
/**
 * class SigmaGenerator
 */
class SigmaGenerator {
    constructor(sigmaConfig) {
        this.sigmaConfig = sigmaConfig;
        this.sigmaNodeGenerator = new sigma_node_generator_1.SigmaNodeGenerator();
        this.sigmaFilesGenerator = new sigma_files_generator_1.SigmaFilesGenerator();
        this.sigmaClassesGenerator = new sigma_classes_generator_1.SigmaClassesGenerator();
        this.sigmaInterfacesGenerator = new sigma_interfaces_generator_1.SigmaInterfacesGenerator();
        this.nodes = [];
        this.edges = [];
    }
    /**
     * generate SigmaData container
     */
    generate(tsMeta) {
        if (this.sigmaConfig.createNodes.files) {
            const tsFiles = this.filesFromMeta(tsMeta);
            tsFiles.forEach((tsFile) => {
                const filesSigmaData = this.sigmaFilesGenerator.generate(tsFile);
                this.nodes = this.nodes.concat(filesSigmaData.nodes);
                this.edges = this.edges.concat(filesSigmaData.edges);
            });
        }
        if (this.sigmaConfig.createNodes.classes) {
            const tsClasses = this.classesFromMeta(tsMeta);
            tsClasses
                .filter((tsClass) => !!tsClass)
                .forEach((tsClass) => {
                const classSigmaData = this.sigmaClassesGenerator.generate(tsClass);
                this.nodes = this.nodes.concat(classSigmaData.nodes);
                this.edges = this.edges.concat(classSigmaData.edges);
            });
        }
        if (this.sigmaConfig.createNodes.interfaces) {
            const tsMains = this.mainsFromMeta(tsMeta);
            tsMains
                .filter((tsMain) => !!tsMain)
                .forEach((tsMain) => {
                const classSigmaData = this.sigmaInterfacesGenerator.generate(tsMain);
                this.nodes = this.nodes.concat(classSigmaData.nodes);
                this.edges = this.edges.concat(classSigmaData.edges);
            });
        }
        return {
            edges: this.calculateEdges(),
            nodes: this.calculateNodes()
        };
    }
    /**
     * collect TsFiles from tsMeta schema
     */
    filesFromMeta(tsMeta) {
        const tsFiles = [];
        tsMeta.programs.forEach((tsProgram) => {
            tsProgram.files.forEach((tsFile) => {
                tsFiles.push(tsFile);
            });
        });
        return tsFiles;
    }
    /**
     * collect TsClasses from tsMeta schema
     */
    classesFromMeta(tsMeta) {
        const tsClasses = [];
        tsMeta.programs.forEach((tsProgram) => {
            tsProgram.files.forEach((tsFile) => {
                if (tsFile.tsClass)
                    tsClasses.push(tsFile.tsClass);
            });
        });
        return tsClasses;
    }
    /**
     * collect TsMains from tsMeta schema
     */
    mainsFromMeta(tsMeta) {
        const tsMains = [];
        tsMeta.programs.forEach((tsProgram) => {
            tsProgram.files.forEach((tsFile) => {
                tsFile.tsMains.forEach((tsMain) => {
                    tsMains.push(tsMain);
                });
            });
        });
        return tsMains;
    }
    /**
     * calculate all edges
     */
    calculateEdges() {
        const edges = [];
        this.edges.forEach((sigmaEdge, sidx) => {
            const index = edges.findIndex((edge, idx) => edge.id === sigmaEdge.id && sidx !== idx);
            if (index === -1)
                edges.push(sigmaEdge);
        });
        edges.forEach((edge) => {
            if (this.nodes.some((node) => edge.source === node.id)) {
                this.nodes.push(this.sigmaNodeGenerator.generate(edge.source, edge.source, element_types_enum_1.ElementTypes.PACKAGE, 1));
            }
            if (this.nodes.some((node) => edge.target === node.id)) {
                this.nodes.push(this.sigmaNodeGenerator.generate(edge.source, edge.source, element_types_enum_1.ElementTypes.PACKAGE, 1));
            }
        });
        return edges;
    }
    /**
     * calculate nodes
     */
    calculateNodes() {
        const nodes = [];
        this.nodes.forEach((sigmaNode, sidx) => {
            const index = nodes.findIndex((node, idx) => node.id === sigmaNode.id && sidx !== idx);
            if (index === -1)
                nodes.push(sigmaNode);
        });
        nodes.forEach((node) => {
            node.x = Math.floor(Math.random() * 10); // tslint:disable-line
            node.y = Math.floor(Math.random() * 10); // tslint:disable-line
            node.size = 10 + this.edges.filter((edge) => edge.source === node.id).length; // tslint:disable-line
        });
        return nodes;
    }
}
exports.SigmaGenerator = SigmaGenerator;
//# sourceMappingURL=sigma.generator.js.map