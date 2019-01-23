/**
 * class CommandLineParams
 */
class CommandLineParams {

  private project: string

  constructor(args: string[]) {
    if (process.env.NODE_ENV === 'test') {
      console.log(args) // tslint:disable-line no-console
      console.log(this.project) // tslint:disable-line no-console
    }
  }
}

export {
  CommandLineParams
}
