import { defaultConfig } from './config/tsmeta.default.config'
import { TsMeta } from './types/interfaces'

const [, , ...parameter] = process.argv

console.log(parameter)

const config: TsMeta.Config = defaultConfig
const configs: TsMeta.Config[] = []

console.log(
  parameter
    .map((it: string, index: number, array: string[]): [string, string | boolean | number] => {
      switch (it) {
        case '-p':
        case '--project':
          return ['project', array[index + 1]]
        case '-s':
        case '--silent':
          return ['silent', Boolean(array[index + 1])]
        default:
          return
      }
    }, configs)
    .filter((it) => !!it)
    .forEach(([key, value]: [string, string]) => {
      config[key] = value
    })
)

console.log(config)
