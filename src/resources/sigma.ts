/**
 * sigma interfaces
 */

/**
 * interface SigmaData
 */
export interface SigmaData {
  nodes: SigmaNode[]
  edges: SigmaEdge[]
}

/**
 * interface SigmaData
 */
export interface SigmaNode {
  id: string
  label: string
  color: string
  size: number
  x: number
  y: number
}

/**
 * interface SigmaData
 */
export interface SigmaEdge {
  source: string
  target: string
}
