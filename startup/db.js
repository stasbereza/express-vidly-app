const config = require('config');
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function () {
  const transport = new winston.transports.Console();
  const logger = winston.createLogger({
    transports: [transport],
  });
  const db = config.get('db');

  mongoose.connect(db).then(() => logger.info(`Connected to ${db}...`));
};
