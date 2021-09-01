const jonesLogger = require('./jonesLogger')

let logger = null;

if (process.env.NODE_ENV !== 'production') {
    logger = jonesLogger()
  }

  module.exports = logger