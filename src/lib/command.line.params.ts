/**
 * class CommandLineParams
 */
class CommandLineParams {

  private project: string

  constructor(args: string[]) {
    console.log(args) // tslint:disable-line no-console
    console.log(this.project) // tslint:disable-line no-console
  }
}

export {
  CommandLineParams
}
