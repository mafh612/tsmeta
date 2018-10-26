import { ElementTypes } from '../lib/element.types.enum'
import { SigmaData, SigmaEdge, SigmaNode } from '../lib/sigma'
import { SigmaConfig } from '../lib/tsmeta.config'
import { TsClass, TsFile, TsMain, TsMeta, TsProgram } from '../lib/tsmeta.schema'
import { SigmaNodeGenerator } from './sigma.generators/main/sigma.node.generator'
import { SigmaClassesGenerator } from './sigma.generators/sigma.classes.generator'
import { SigmaFilesGenerator } from './sigma.generators/sigma.files.generator'
import { SigmaInterfacesGenerator } from './sigma.generators/sigma.interfaces.generator'

/**
 * class SigmaGenerator
 */
class SigmaGenerator {

  private sigmaNodeGenerator: SigmaNodeGenerator = new SigmaNodeGenerator()

  private sigmaFilesGenerator: SigmaFilesGenerator = new SigmaFilesGenerator()
  private sigmaClassesGenerator: SigmaClassesGenerator = new SigmaClassesGenerator()
  private sigmaInterfacesGenerator: SigmaInterfacesGenerator = new SigmaInterfacesGenerator()

  private nodes: SigmaNode[] = []
  private edges: SigmaEdge[] = []

  constructor(private sigmaConfig: SigmaConfig) {}

  /**
   * generate SigmaData container
   */
  public generate(tsMeta: TsMeta): SigmaData {
    if (this.sigmaConfig.createNodes.files) {
      const tsFiles: TsFile[] = this.filesFromMeta(tsMeta)

      tsFiles.forEach((tsFile: TsFile) => {
        const filesSigmaData: SigmaData = this.sigmaFilesGenerator.generate(tsFile)

        this.nodes = this.nodes.concat(filesSigmaData.nodes)
        this.edges = this.edges.concat(filesSigmaData.edges)
      })
    }

    if (this.sigmaConfig.createNodes.classes) {
      const tsClasses: TsClass[] = this.classesFromMeta(tsMeta)

      tsClasses
        .filter((tsClass: TsClass) => !!tsClass)
        .forEach((tsClass: TsClass) => {
        const classSigmaData: SigmaData = this.sigmaClassesGenerator.generate(tsClass)

        this.nodes = this.nodes.concat(classSigmaData.nodes)
        this.edges = this.edges.concat(classSigmaData.edges)
      })
    }

    if (this.sigmaConfig.createNodes.interfaces) {
      const tsMains: TsMain[] = this.mainsFromMeta(tsMeta)

      tsMains
        .filter((tsMain: TsMain) => !!tsMain)
        .forEach((tsMain: TsMain) => {
        const classSigmaData: SigmaData = this.sigmaInterfacesGenerator.generate(tsMain)

        this.nodes = this.nodes.concat(classSigmaData.nodes)
        this.edges = this.edges.concat(classSigmaData.edges)
      })
    }

    return {
      edges: this.calculateEdges(),
      nodes: this.calculateNodes()
    }
  }

  /**
   * collect TsFiles from tsMeta schema
   */
  private filesFromMeta(tsMeta: TsMeta): TsFile[] {
    const tsFiles: TsFile[] = []

    tsMeta.programs.forEach((tsProgram: TsProgram) => {
      tsProgram.files.forEach((tsFile: TsFile) => {
        tsFiles.push(tsFile)
      })
    })

    return tsFiles
  }

  /**
   * collect TsClasses from tsMeta schema
   */
  private classesFromMeta(tsMeta: TsMeta): TsClass[] {
    const tsClasses: TsClass[] = []

    tsMeta.programs.forEach((tsProgram: TsProgram) => {
      tsProgram.files.forEach((tsFile: TsFile) => {
        if (tsFile.tsClass) tsClasses.push(tsFile.tsClass)
      })
    })

    return tsClasses
  }

  /**
   * collect TsMains from tsMeta schema
   */
  private mainsFromMeta(tsMeta: TsMeta): TsMain[] {
    const tsMains: TsMain[] = []

    tsMeta.programs.forEach((tsProgram: TsProgram) => {
      tsProgram.files.forEach((tsFile: TsFile) => {
        tsFile.tsMains.forEach((tsMain: TsMain) => {
          tsMains.push(tsMain)
        })
      })
    })

    return tsMains
  }

  /**
   * calculate edges
   */
  private calculateEdges(): SigmaEdge[] {
    const edges: SigmaEdge[] = []

    this.edges.forEach((sigmaEdge: SigmaEdge, sidx: number) => {
      const index: number = edges.findIndex((edge: SigmaEdge, idx: number) => edge.id === sigmaEdge.id && sidx !== idx)

      if (index === -1) edges.push(sigmaEdge)
    })

    edges.forEach((edge: SigmaEdge) => {
      if (this.nodes.some((node: SigmaNode) => edge.source === node.id)) {
        this.nodes.push(this.sigmaNodeGenerator.generate(edge.source, edge.source, ElementTypes.PACKAGE, 1))
      }
      if (this.nodes.some((node: SigmaNode) => edge.target === node.id)) {
        this.nodes.push(this.sigmaNodeGenerator.generate(edge.source, edge.source, ElementTypes.PACKAGE, 1))
      }
    })

    return edges
  }
  /**
   * calculate nodes
   */
  private calculateNodes(): SigmaNode[] {
    const nodes: SigmaNode[] = []

    this.nodes.forEach((sigmaNode: SigmaNode, sidx: number) => {
      const index: number = nodes.findIndex((node: SigmaNode, idx: number) => node.id === sigmaNode.id && sidx !== idx)

      if (index === -1) nodes.push(sigmaNode)
    })

    nodes.forEach((node: SigmaNode) => {
      node.x = Math.floor(Math.random() * 10) // tslint:disable-line
      node.y = Math.floor(Math.random() * 10) // tslint:disable-line
      node.size = 10 + this.edges.filter((edge: SigmaEdge) => edge.source === node.id).length // tslint:disable-line
    })

    return nodes
  }
}

export { SigmaGenerator }
