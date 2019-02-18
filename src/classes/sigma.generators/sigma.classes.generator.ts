import { ElementTypes } from '../../lib/enums/element.types.enum'
import { SigmaData, SigmaEdge, SigmaNode } from '../../lib/interfaces/sigma'
import { TsClass, TsMethod, TsProperty } from '../../lib/interfaces/tsmeta.schema'
import { SigmaEdgeGenerator } from './main/sigma.edge.generator'
import { SigmaNodeGenerator } from './main/sigma.node.generator'

/**
 * SigmaClassesGenerator class
 */
class SigmaClassesGenerator {

  private sigmaNodeGenerator: SigmaNodeGenerator = new SigmaNodeGenerator()
  private sigmaEdgeGenerator: SigmaEdgeGenerator = new SigmaEdgeGenerator()

  /**
   * generate
   */
  public generate(tsClass: TsClass): SigmaData {
    const nodes: SigmaNode[] = []
    const edges: SigmaEdge[] = []

    if (!!tsClass.methods) {
      tsClass.methods.forEach((tsMethod: TsMethod) => {
        nodes.push(this.sigmaNodeGenerator.generate(tsMethod.name, tsMethod.name, ElementTypes.METHOD, 1))
        edges.push(this.sigmaEdgeGenerator.generate(tsClass.name, tsMethod.name, tsMethod.name))
      })
    }

    if (!!tsClass.properties) {
      tsClass.properties.forEach((tsProperty: TsProperty) => {
        nodes.push(this.sigmaNodeGenerator.generate(tsProperty.name, tsProperty.name, ElementTypes.PROPERTY, 1))
        edges.push(this.sigmaEdgeGenerator.generate(tsClass.name, tsProperty.name, tsProperty.name))
      })
    }

    return {
      edges,
      nodes
    }
  }
}

export { SigmaClassesGenerator }
