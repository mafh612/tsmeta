import { ElementTypes } from '../../resources/element.types.enum'
import { SigmaNode } from '../../resources/sigma'

/**
 * class SigmaNodeGenerator
 */
class SigmaNodeGenerator {

  /**
   * generate single SigmaNode
   * @param id
   * @param label
   * @param elementType
   * @param size
   */
  public generate(id: string, label: string, elementType: ElementTypes, size: number): SigmaNode {
    const color: string = elementType.color
    const etype: string = elementType.name
    const x: number = 0
    const y: number = 0

    return {
      color,
      id,
      label,
      size,
      etype,
      x,
      y
    }
  }
}

export { SigmaNodeGenerator }
