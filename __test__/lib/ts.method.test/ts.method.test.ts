import 'jest'

import * as fs from 'fs'
import { CompilerOptions, Program } from 'typescript'

import {
  CreateTypescriptProgram/* ,
  ExpressionToString,
  IdentifierToString,
  InitializerToString,
  ObjectLiteralExpressionToString,
  PropertyNameToString,
  TokenToString,
  TypeNodeToTsType */
} from '../../../src/lib/ts.methods'

let compilerOptions: CompilerOptions

beforeAll(() => {
  compilerOptions = JSON.parse(fs.readFileSync('tsconfig.json', { encoding: 'utf8' }))
})

/**
 * annotations mapping test
 */
describe('ts methods test', () => {
  test('CreateTypescriptProgram', () => {
    expect(CreateTypescriptProgram(['../../../src/index.ts'], compilerOptions)).toEqual({})
  })
})
