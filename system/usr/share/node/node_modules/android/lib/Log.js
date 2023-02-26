const util = require("util");
const { BaseLog } = require("bindings")("android-util.node");

class Log extends BaseLog {
  static VERBOSE = 2;
  static DEBUG = 3;
  static INFO = 4;
  static WARN = 5;
  static ERROR = 6;
  static v(tag, msg, ...data) {
    super.native_log(this.VERBOSE, String(tag), util.format(msg, ...data));
  }
  static d(tag, msg, ...data) {
    super.native_log(this.DEBUG, String(tag), util.format(msg, ...data));
  }
  static i(tag, msg, ...data) {
    super.native_log(this.INFO, String(tag), util.format(msg, ...data));
  }
  static w(tag, msg, ...data) {
    super.native_log(this.WARN, String(tag), util.format(msg, ...data));
  }
  static e(tag, msg, ...data) {
    super.native_log(this.ERROR, String(tag), util.format(msg, ...data));
  }
}

module.exports = { Log };
