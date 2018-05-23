import { SourceFile } from 'typescript'

/**
 * actual sourcefile
 */
let sourceFile: SourceFile

/**
 * actual sourcefile getter
 */
const getSourceFile: () => SourceFile = (): SourceFile => {
  return sourceFile
}

/**
 * actual sourcefile setter
 */
const setSourceFile: ((file: SourceFile) => void) = (file: SourceFile): void => {
  sourceFile = file
}

export { getSourceFile, setSourceFile }
