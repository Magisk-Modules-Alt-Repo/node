const { __native_logger } = require("./native/__native_logger.node");
const { Transform } = require("stream");
const { Console } = require("console");
/**
 * @typedef {Object} Options
 * @property {boolean} debug - enables debug logging
 * Class to log into Android's logger.
 */
class Logger extends __native_logger {
  _opt = undefined;
  /**
   * @param {Options=} opt
   */
  constructor(opt) {
    super(0);
    this._opt = opt || {
      debug: false,
    };
  }
  /**
   * Send a DEBUG log message
   * @param {String} tag Used to identify the source of a log message.
   * @param {String} msg The message you would like logged.
   */
  d(tag, msg) {
    if (!tag || !msg) throw new Error("Tag or message is undefined");
    // Log only if debug has been enabled
    if (this._opt.debug) {
      super.d(String(tag), String(msg));
    }
  }
  /**
   * Send a ERROR log message
   * @param {String} tag Used to identify the source of a log message.
   * @param {String} msg The message you would like logged.
   */
  e(tag, msg) {
    if (!tag || !msg) throw new Error("Tag or message is undefined");
    super.e(String(tag), String(msg));
  }
  /**
   * Send a INFO log message
   * @param {String} tag Used to identify the source of a log message.
   * @param {String} msg The message you would like logged.
   */
  i(tag, msg) {
    if (!tag || !msg) throw new Error("Tag or message is undefined");
    super.i(String(tag), String(msg));
  }
  /**
   * Send a VERBOSE log message
   * @param {String} tag Used to identify the source of a log message.
   * @param {String} msg The message you would like logged.
   */
  v(tag, msg) {
    if (!tag || !msg) throw new Error("Tag or message is undefined");
    super.v(String(tag), String(msg));
  }
  /**
   * Send a WARN log message
   * @param {String} tag Used to identify the source of a log message.
   * @param {String} msg The message you would like logged.
   */
  w(tag, msg) {
    if (!tag || !msg) throw new Error("Tag or message is undefined");
    super.w(String(tag), String(msg));
  }
  /**
   * Send a DEBUG log message
   * @param {String} tag Used to identify the source of a log message.
   * @param {String} msg The message you would like logged.
   */
  debug(tag, msg) {
    if (!tag || !msg) throw new Error("Tag or message is undefined");
    // Log only if debug has been enabled
    if (this._opt.debug) {
      super.d(String(tag), String(msg));
    }
  }
  /**
   * Send a ERROR log message
   * @param {String} tag Used to identify the source of a log message.
   * @param {String} msg The message you would like logged.
   */
  error(tag, msg) {
    if (!tag || !msg) throw new Error("Tag or message is undefined");
    super.e(String(tag), String(msg));
  }
  /**
   * Send a INFO log message
   * @param {String} tag Used to identify the source of a log message.
   * @param {String} msg The message you would like logged.
   */
  info(tag, msg) {
    if (!tag || !msg) throw new Error("Tag or message is undefined");
    super.i(String(tag), String(msg));
  }
  /**
   * Send a VERBOSE log message
   * @param {String} tag Used to identify the source of a log message.
   * @param {String} msg The message you would like logged.
   */
  verbose(tag, msg) {
    if (!tag || !msg) throw new Error("Tag or message is undefined");
    super.v(String(tag), String(msg));
  }
  /**
   * Send a WARN log message
   * @param {String} tag Used to identify the source of a log message.
   * @param {String} msg The message you would like logged.
   */
  warn(tag, msg) {
    if (!tag || !msg) throw new Error("Tag or message is undefined");
    super.w(String(tag), String(msg));
  }
  /**
   * Send a INFO log message
   * @param {String} tag Used to identify the source of a log message.
   * @param {String} data The table you would like logged.
   */
  table(tag, data) {
    if (!tag || !data) throw new Error("Tag or message is undefined");
    const ts = new Transform({
      transform(chunk, enc, cb) {
        cb(null, chunk);
      },
    });
    const logger = new Console({ stdout: ts });
    logger.table(data);
    const table = (ts.read() || "").toString();
    let result = "";
    for (let row of table.split(/[\r\n]+/)) {
      let r = row.replace(/[^┬]*┬/, "┌");
      r = r.replace(/^├─*┼/, "├");
      r = r.replace(/│[^│]*/, "");
      r = r.replace(/^└─*┴/, "└");
      r = r.replace(/'/g, " ");
      result += `${r}\n`;
    }
    super.i(String(tag), String(result));
  }
}
module.exports = Logger;
