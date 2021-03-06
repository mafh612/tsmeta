import { ElementTypes } from '../../lib/enums/element.types.enum'
import { SigmaData, SigmaEdge, SigmaNode } from '../../lib/interfaces/sigma'
import { TsMain, TsMethod, TsProperty } from '../../lib/interfaces/tsmeta.schema'
import { SigmaEdgeGenerator } from './main/sigma.edge.generator'
import { SigmaNodeGenerator } from './main/sigma.node.generator'

/**
 * SigmaClassesGenerator class
 */
class SigmaInterfacesGenerator {

  private readonly sigmaNodeGenerator: SigmaNodeGenerator = new SigmaNodeGenerator()
  private readonly sigmaEdgeGenerator: SigmaEdgeGenerator = new SigmaEdgeGenerator()

  /**
   * generate from TsMain
   */
  public generate(tsMain: TsMain): SigmaData {
    const nodes: SigmaNode[] = []
    const edges: SigmaEdge[] = []

    if (!!tsMain.methods) {
      tsMain.methods.forEach((tsMethod: TsMethod) => {
        nodes.push(this.sigmaNodeGenerator.generate(tsMethod.name, tsMethod.name, ElementTypes.METHOD, 1))
        edges.push(this.sigmaEdgeGenerator.generate(tsMain.name, tsMethod.name, tsMethod.name))
      })
    }

    if (!!tsMain.properties) {
      tsMain.properties.forEach((tsProperty: TsProperty) => {
        nodes.push(this.sigmaNodeGenerator.generate(tsProperty.name, tsProperty.name, ElementTypes.PROPERTY, 1))
        edges.push(this.sigmaEdgeGenerator.generate(tsMain.name, tsProperty.name, tsProperty.name))
      })
    }

    return {
      edges,
      nodes
    }
  }
}

export { SigmaInterfacesGenerator }
