import { TsArgument, TsDecorator } from '../lib'

const _boolean: boolean = true
const _string: string = 'text'
const _int: number = 1
const _float: number = 0.1

/**
 * build value by literal types
 */
const buildValue: (propertyType: string, decorator: TsDecorator) => boolean|number|string = (propertyType: string, decorator: TsDecorator): boolean|number|string => {
  const arg: TsArgument = decorator && decorator.tsarguments ? decorator.tsarguments.pop() : undefined
  switch (propertyType) {
    case 'boolean': return _boolean
    case 'number':
      if (arg.representation && arg.representation.format === 'float') return _float
      else return _int
    case 'string': return _string
    default: return undefined
  }
}

export { buildValue as BuildValue }
