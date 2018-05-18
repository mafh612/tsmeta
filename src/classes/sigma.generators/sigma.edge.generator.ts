import { SigmaEdge } from '../../lib/sigma'

/**
 * class SigmaNodeGenerator
 */
class SigmaEdgeGenerator {

  /**
   * generate single SigmaEdge Element
   * @param source
   * @param target
   */
  public generate(source: string, target: string): SigmaEdge {
    return {
      id: source + target,
      source,
      target
    }
  }
}

export { SigmaEdgeGenerator }
