import * as fs from 'fs'
import { Model } from '../../src/lib/annotations'

/**
 * class SimpleMock
 */
@Model({
  example: {
    baseDirContent: ['hello']
  },
  version: 'v1'
})
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
