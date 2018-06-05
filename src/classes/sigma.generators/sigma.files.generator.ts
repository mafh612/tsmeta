import { ElementTypes } from '../../lib/element.types.enum'
import { SigmaData, SigmaEdge, SigmaNode } from '../../lib/sigma'
import { TsExport, TsFile, TsImport, TsMain } from '../../lib/tsmeta.schema'
import { SigmaEdgeGenerator } from './main/sigma.edge.generator'
import { SigmaNodeGenerator } from './main/sigma.node.generator'

/**
 * SigmaFilesGenerator class
 */
class SigmaFilesGenerator {

  private sigmaNodeGenerator: SigmaNodeGenerator = new SigmaNodeGenerator()
  private sigmaEdgeGenerator: SigmaEdgeGenerator = new SigmaEdgeGenerator()

  /**
   * generate
   */
  public generate(tsFile: TsFile): SigmaData {
    const nodes: SigmaNode[] = []
    const edges: SigmaEdge[] = []

    if (!!tsFile.tsClass) {
      nodes.push(this.sigmaNodeGenerator.generate(tsFile.tsClass.name, tsFile.tsClass.name, ElementTypes.FILE, 1))
      edges.push(this.sigmaEdgeGenerator.generate(tsFile.filename, tsFile.tsClass.name, tsFile.tsClass.name))
    }

    if (!!tsFile.tsMains) tsFile.tsMains
      .forEach((tsMain: TsMain) => {
        nodes.push(this.sigmaNodeGenerator.generate(tsMain.name, tsMain.name, ElementTypes.INTERFACE, 1))
        edges.push(this.sigmaEdgeGenerator.generate(tsFile.filename, tsMain.name, tsMain.name))
      })

    if (!!tsFile.tsImports) tsFile.tsImports
      .forEach((tsImport: TsImport) => {
        nodes.push(this.sigmaNodeGenerator.generate(tsImport.name, tsImport.name, ElementTypes.IMPORT, 1))
        edges.push(this.sigmaEdgeGenerator.generate(tsFile.filename, tsImport.name, tsImport.name))
      })

    if (!!tsFile.tsExports) tsFile.tsExports
      .forEach((tsExports: TsExport) => {
        nodes.push(this.sigmaNodeGenerator.generate(tsExports.name, tsExports.name, ElementTypes.IMPORT, 1))
        edges.push(this.sigmaEdgeGenerator.generate(tsFile.filename, tsExports.name, tsExports.name))
    })

    return {
      edges,
      nodes
    }
  }
}

export { SigmaFilesGenerator }
