import { createLogger, format, Logger, LoggerOptions, transports } from 'winston'

const loggerOptions: LoggerOptions = {
  transports: [
    new transports.Console({
      format: format.simple()
    })
  ]
}
const logger: Logger = createLogger(loggerOptions)

export { logger as default }
