import { SigmaEdge } from '../../../lib/sigma'

/**
 * class SigmaNodeGenerator
 */
class SigmaEdgeGenerator {

  /**
   * generate single SigmaEdge Element
   * @param source
   * @param target
   * @param label
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
