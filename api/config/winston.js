const winston = require('winston');

// your centralized logger object
const logger = winston.createLogger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger;
