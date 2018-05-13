import * as fs from 'fs'

/**
 * class SimpleMock
 */
class SimpleMock {

  public baseDirContent: string[]

  constructor() {
    this.readBaseDir()
  }

  /**
   * mock method
   */
  public readBaseDir(): void {
    console.log(fs.readdirSync('./', { encoding: 'utf8' })) // tslint:disable-line
  }
}

export { SimpleMock }
