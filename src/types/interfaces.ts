export declare namespace TsMeta {
  /**
   * interface Options
   */
  interface Config {
    [key: string]: string | boolean | number
    project?: string
    silent?: boolean
  }
}

export declare namespace Openapi {
  /**
   * interface Document
   */
  interface Document {
    openapi: string
  }
}
