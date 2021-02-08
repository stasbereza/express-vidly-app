const { createLogger, format, transports } = require('winston');
const { combine, colorize, json, timestamp, label, prettyPrint } = format;
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
  const logger = createLogger({
    level: 'info',
    format: combine(
      colorize(),
      json(),
      label({ label: 'Uncaught Exception or Unhandled Rejection!' }),
      timestamp(),
      prettyPrint()
    ),
    transports: [
      new transports.Console({
        handleExceptions: true,
        handleRejections: true,
      }),
    ],
    exceptionHandlers: [new transports.File({ filename: 'exceptions.log' })],
    rejectionHandlers: [new transports.File({ filename: 'rejections.log' })],
  });

  logger.exceptions.handle(new transports.File({ filename: 'exceptions.log' }));

  logger.rejections.handle(new transports.File({ filename: 'rejections.log' }));
};
