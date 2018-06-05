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
  etype: string
  x: number
  y: number
}

/**
 * interface SigmaData
 */
export interface SigmaEdge {
  id: string
  source: string
  target: string
  label: string
}
