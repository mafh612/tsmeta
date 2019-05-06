import { TsArgument, TsDecorator } from '../lib'
import { first, last } from '../lib/array.reducer'

const _boolean: boolean = true
const _string: string = 'text'
const _int: number = 1
const _float: number = 0.1

/**
 * build value by literal types
 */
const buildValue: (propertyType: string, decorator: TsDecorator, modelDecorator: TsDecorator) => boolean|number|string
  = (propertyType: string, decorator: TsDecorator, modelDecorator: TsDecorator): boolean|number|string => {
  const arg: TsArgument = decorator && decorator.tsarguments && decorator.tsarguments.reduce(last)
  const modelArg: TsArgument = modelDecorator && modelDecorator.tsarguments && modelDecorator.tsarguments.reduce(last)

  if (modelDecorator) console.log(modelDecorator) // tslint:disable-line

  switch (propertyType) {
    case 'boolean': return _boolean
    case 'number':
      if (arg && arg.representation && arg.representation.format === 'float') return _float
      else return _int
    case 'string':
      return modelArg
        && modelArg.representation
        && modelArg.representation.enum
        && modelArg.representation.enum.reduce(first)
        || _string
    default: return undefined
  }
}

const buildMalformedValue: (propertyType: string, decorator: TsDecorator) => boolean|number|string
  = (propertyType: string, decorator: TsDecorator): boolean|number|string => {
  const arg: TsArgument = decorator && decorator.tsarguments && decorator.tsarguments.reduce(last)

  switch (propertyType) {
    case 'boolean': return _int
    case 'number':
      if (arg && arg.representation && arg.representation.format === 'float') return _string
      else return _string
    case 'string': return _boolean
    default: return _boolean
  }
}

export { buildValue as BuildValue, buildMalformedValue as BuildMalformedValue }
