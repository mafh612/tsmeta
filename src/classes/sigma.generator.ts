import { ElementTypes } from '../lib/element.types.enum'
import { SigmaData, SigmaEdge, SigmaNode } from '../lib/sigma'
import { SigmaConfig } from '../lib/tsmeta.config'
import { TsClass, TsFile, TsImport, TsMain, TsMeta, TsMethod, TsProgram, TsProperty } from '../lib/tsmeta.schema'
import { SigmaEdgeGenerator } from './sigma.generators/sigma.edge.generator'
import { SigmaNodeGenerator } from './sigma.generators/sigma.node.generator'

/**
 * class SigmaGenerator
 */
class SigmaGenerator {

  private sigmaNodeGenerator: SigmaNodeGenerator = new SigmaNodeGenerator()
  private sigmaEdgeGenerator: SigmaEdgeGenerator = new SigmaEdgeGenerator()

  private nodes: SigmaNode[] = []
  private edges: SigmaEdge[] = []

  constructor(private sigmaConfig: SigmaConfig) {}

  /**
   * generate SigmaData container
   * @param tsMeta
   */
  public generate(tsMeta: TsMeta): SigmaData {
    tsMeta.programs.forEach((tsProgram: TsProgram) => {
      tsProgram.files.forEach((tsFile: TsFile) => {
        this.generateNodesAndEdgesFromFile(tsFile)
      })
    })

    this.cleanNodes()
    this.randomizePositions()
    this.calculateSizes()

    return {
      nodes: this.nodes,
      edges: this.edges
    }
  }

  /**
   * generate SigmaNode from TsFile Element
   * @param tsFile
   */
  private generateNodesAndEdgesFromFile(tsFile: TsFile): void {
    if (tsFile.tsClass) this.nodeFromClass(tsFile.tsClass)

    if (tsFile.tsMains) this.nodesFromMains(tsFile.tsMains)

    if (tsFile.tsImports) this.edgesForImports(tsFile)
  }

  /**
   * generate SigmaNode from TsClass
   */
  private nodeFromClass(tsClass: TsClass): void {
    const id: string = tsClass.name
    const label: string = tsClass.name

    this.nodes.push(this.sigmaNodeGenerator.generate(id, label, ElementTypes.CLASS, 1))

    if (this.sigmaConfig.createNodes.properties && tsClass.properties) {
      this.nodes = this.nodes.concat(this.nodesFromProperties(tsClass))
      this.edges = this.edges.concat(this.edgesForProperties(tsClass))
    }

    if (this.sigmaConfig.createNodes.methods && tsClass.methods) {
      this.nodes = this.nodes.concat(this.nodesFromMethods(tsClass))
      this.edges = this.edges.concat(this.edgesForMethods(tsClass))
    }
  }

  /**
   * generate SigmaNodes from TsMains
   */
  private nodesFromMains(tsMains: TsMain[]): void {
    tsMains.forEach((tsMain: TsMain) => {
      if (tsMain.properties) {
        this.nodes = this.nodes.concat(this.nodesFromProperties(tsMain))
        this.edges = this.edges.concat(this.edgesForProperties(tsMain))
      }

      if (tsMain.methods) {
        this.nodes = this.nodes.concat(this.nodesFromMethods(tsMain))
        this.edges = this.edges.concat(this.edgesForMethods(tsMain))
      }
    })

    tsMains.forEach((tsMain: TsMain): void => {
      const id: string = tsMain.name
      const label: string = tsMain.name

      this.nodes.push(this.sigmaNodeGenerator.generate(id, label, ElementTypes.INTERFACE, 1))
    })
  }

  /**
   * generate SigmaNodes from Properties
   */
  private nodesFromProperties(tsMain: TsMain): SigmaNode[] {
    return tsMain.properties.map((tsProperty: TsProperty): SigmaNode => {
      const id: string = tsMain.name + tsProperty.name
      const label: string = tsProperty.name

      return this.sigmaNodeGenerator.generate(id, label, ElementTypes.PROPERTY, 1)
    })
  }

  /**
   * generate SigmaNodes from Methods
   */
  private nodesFromMethods(tsMain: TsMain): SigmaNode[] {
    return tsMain.methods.map((tsMethod: TsMethod): SigmaNode => {
      const id: string = tsMain.name + tsMethod.name
      const label: string = tsMethod.name

      return this.sigmaNodeGenerator.generate(id, label, ElementTypes.METHOD, 1)
    })
  }

  /**
   * generate SigmaEdges for TsImports
   */
  private edgesForImports(tsFile: TsFile): void {
    tsFile.tsImports.forEach((tsImport: TsImport): void => {
      const source: string = tsImport.fullpath ? tsImport.name : tsImport.source
      const target: string = tsFile.tsClass ? tsFile.tsClass.name : tsFile.filename

      this.edges.push(this.sigmaEdgeGenerator.generate(source, target))
    })
  }

  /**
   * generate SigmaEdges for TsImports
   */
  private edgesForProperties(tsMain: TsMain): SigmaEdge[] {
    return tsMain.properties.map((tsProperty: TsProperty): SigmaEdge => {
      const source: string = tsMain.name + tsProperty.name
      const target: string = tsMain.name

      return this.sigmaEdgeGenerator.generate(source, target)
    })
  }

  /**
   * generate SigmaEdges for TsImports
   */
  private edgesForMethods(tsMain: TsMain): SigmaEdge[] {
    return tsMain.methods.map((tsMethod: TsMethod): SigmaEdge => {
      const source: string = tsMain.name + tsMethod.name
      const target: string = tsMain.name

      return this.sigmaEdgeGenerator.generate(source, target)
    })
  }

  /**
   * remove duplicates
   */
  private cleanNodes(): void {
    this.nodes = this.nodes.filter((v: SigmaNode, i: number) => this.nodes.findIndex((s: SigmaNode) => s.id === v.id) === i)

    this.edges.forEach((edge: SigmaEdge) => {
      const packageSize: number = 1

      if (this.nodes.findIndex((node: SigmaNode) => node.id === edge.source) === -1) {
        this.nodes.push(this.sigmaNodeGenerator.generate(edge.source, edge.source, ElementTypes.PACKAGE, packageSize))
      }

      if (this.nodes.findIndex((node: SigmaNode) => node.id === edge.target) === -1) {
        this.nodes.push(this.sigmaNodeGenerator.generate(edge.target, edge.target, ElementTypes.PACKAGE, packageSize))
      }
    })

    this.edges = this.edges.filter((v: SigmaEdge, i: number) => this.edges.findIndex((s: SigmaEdge) => s.id === v.id) === i)
  }

  /**
   * randomize positions
   */
  private randomizePositions(): void {
    const randomize: boolean = true
    const initialSpread: number = 100

    this.nodes.forEach((sigmaNode: SigmaNode) => {
      if (randomize) {
        sigmaNode.x = Math.floor(Math.random() * initialSpread) // tslint:disable-line
        sigmaNode.y = Math.floor(Math.random() * initialSpread) // tslint:disable-line
      } else {
        switch (sigmaNode.etype) {
          case 'package':
            sigmaNode.x = 50 // tslint:disable-line no-magic-numbers
            break
          case 'class':
            sigmaNode.x = 30 // tslint:disable-line no-magic-numbers
            break
          case 'interface':
            sigmaNode.x = 10 // tslint:disable-line no-magic-numbers
            break
          case 'method':
            sigmaNode.x = -10 // tslint:disable-line no-magic-numbers
            break
          case 'porperty':
            sigmaNode.x = -30 // tslint:disable-line no-magic-numbers
            break
          default:
        }

        sigmaNode.y = sigmaNode.size * initialSpread
      }

    })
  }

  /**
   * count nodes with etype
   * @param nodeType
   */
  /* private countNodeTypes(nodeType: string): number {
    return this.nodes.filter((node: SigmaNode) => node.etype === nodeType).length
  } */

  /**
   * calculate node sizes acoording to thier edges
   */
  private calculateSizes(): void {
    const minSize: number = 10

    this.nodes.forEach((sigmaNode: SigmaNode): void => {
      const size: number = this.edges
        .filter((sigmaEdge: SigmaEdge) => sigmaEdge.source === sigmaNode.id || sigmaEdge.target === sigmaNode.id).length

      sigmaNode.size = size + minSize
      sigmaNode.label += ` | ${size}`
    })

    this.nodes = this.nodes.filter((node: SigmaNode) => node.size > minSize)
  }
}

export { SigmaGenerator }
