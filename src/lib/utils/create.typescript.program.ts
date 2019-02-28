import {
  CompilerOptions,
  createProgram as CreateProgram,
  Program
} from 'typescript'

/**
 * create typescript program file from rootNames
 */
const createTypescriptProgram: ((rootNames: ReadonlyArray<string>, compilerOptions: CompilerOptions) => Program) = CreateProgram

export {
  createTypescriptProgram as CreateTypescriptProgram
}
