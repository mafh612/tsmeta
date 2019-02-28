import 'jest'

import * as fs from 'fs'
import { CompilerOptions } from 'typescript'

import { CreateTypescriptProgram } from '../../../src/lib/utils/create.typescript.program'

let compilerOptions: CompilerOptions

beforeAll(() => {
  compilerOptions = JSON.parse(fs.readFileSync('tsconfig.json', { encoding: 'utf8' }))
})

/**
 * annotations mapping test
 */
describe('ts methods test', () => {
  test('CreateTypescriptProgram', () => {
    expect(CreateTypescriptProgram(['../../../src/index.ts'], compilerOptions))
      .toEqual({})
  })
})
