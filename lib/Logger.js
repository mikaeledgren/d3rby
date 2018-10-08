const log4js = require('log4js');
const log4jsExtend = require('log4js-extend');

log4jsExtend(log4js, {
  path: process.cwd(),
  format: '(@file:@name:@line:@column)'
});

/**
 *
 */
class Logger {

  /**
   *
   * @param name
   * @returns {Logger}
   */
  getLogger(name) {
    const theLogger = log4js.getLogger(name);
    theLogger.level = 'trace';
    return theLogger;
  };
}

const logger = new Logger();
module.exports = logger;
