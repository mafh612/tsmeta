// tslint:disable no-unnecessary-class no-reserved-keywords

/**
 * interface Format
 */
export interface Format {
  type: string
  format: string
}
/**
 * OasFormat enum
 */
class OasFormat {
  public static BINARY: Format = { type: 'string', format: 'binary' }
  public static BYTE: Format = { type: 'string', format: 'byte' }
  public static DOUBLE: Format = { type: 'number', format: 'double' }
  public static FLOAT: Format = { type: 'number', format: 'float' }
  public static INT32: Format = { type: 'integer', format: 'int32' }
  public static INT64: Format = { type: 'integer', format: 'int64' }
  public static DATE: Format = { type: 'string', format: 'date' }
  public static DATETIME: Format = { type: 'string', format: 'date-time' }
  public static PASSWORD: Format = { type: 'string', format: 'password' }

  public static type: string
  public static format: string
}

export { OasFormat }
