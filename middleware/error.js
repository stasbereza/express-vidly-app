const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

module.exports = function (err, req, res, next) {
  const logger = createLogger({
    level: 'error',
    format: combine(
      label({ label: 'error middleware!' }),
      timestamp(),
      prettyPrint()
    ),
    transports: [
      new transports.File({ filename: 'error.log' }),
      new transports.Console({
        handleExceptions: true,
      }),
    ],
  });

  logger.log('error', err.message, err);

  res.status(500).send('Something failed.');
};
