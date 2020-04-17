export interface MultiType {
  name: string
  multi: string
}

const multiTypes: MultiType[] = []

export const addMultiType: (multiType: MultiType) => void = (multiType: MultiType): void => {
  multiTypes.push(multiType)
}

export const getMultiTypes: () => MultiType[] = (): MultiType[] => multiTypes
