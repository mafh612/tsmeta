/**
 * get mock
 */

const methodFunction: ((target: any, key: string|Symbol) => any) = (target: any, key: string|Symbol): any => target[<string> key]
const getRequest: ((path: string) => any) = (path: string): Function => methodFunction

export {
  getRequest as Get
}
