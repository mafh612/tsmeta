import { SigmaEdge } from '../../../lib/interfaces/sigma'

/**
 * class SigmaNodeGenerator
 */
class SigmaEdgeGenerator {

  /**
   * generate single SigmaEdge Element
   */
  public generate(source: string, target: string, label?: string): SigmaEdge {
    return {
      id: source + target,
      label,
      source,
      target
    }
  }
}

export { SigmaEdgeGenerator }
