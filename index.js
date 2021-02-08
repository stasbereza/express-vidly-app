const express = require('express');
const winston = require('winston');

const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

const transport = new winston.transports.Console();
const logger = winston.createLogger({
  transports: [transport],
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => logger.info(`Listening on PORT ${PORT}`));

module.exports = server;
