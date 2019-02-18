import { ElementTypes } from '../../../lib/enums/element.types.enum'
import { SigmaNode } from '../../../lib/interfaces/sigma'

/**
 * class SigmaNodeGenerator
 */
class SigmaNodeGenerator {

  /**
   * generate single SigmaNode
   */
  public generate(id: string, label: string, elementType: ElementTypes, size: number): SigmaNode {
    const color: string = elementType.color
    const etype: string = elementType.name
    const x: number = 0
    const y: number = 0

    return {
      color,
      etype,
      id,
      label,
      size,
      x,
      y
    }
  }
}

export { SigmaNodeGenerator }
