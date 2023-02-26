const { BaseEnvironment } = require("bindings")("android-os.node");
const { SystemProperties } = require("./SystemProperties.js");

class Environment extends BaseEnvironment {
  constructor() {
    super();
  }

  static setenv(name, value, overrid = 1) {
    if (!name) throw new TypeError("Undefined name");
    if (!value) throw new TypeError("Undefined value");
    super.setenv(String(name), String(value), Number(overrid));
  }

  static getenv(name) {
    if (!name) throw new TypeError("Undefined name");
    return super.getenv(String(name));
  }

  static rootfs() {
    return SystemProperties.get("persist.mkshrc.rootfs", "/data/mkuser");
  }

  static whoami() {
    return super.whoami();
  }

  static homedir() {
    if (this.whoami() == "root") {
      return this.rootfs() + "/root";
    } else {
      return this.rootfs() + "/home/" + this.whoami();
    }
  }

  static tmpdir() {
    return this.rootfs() + "/tmp";
  }
}

module.exports = { Environment };
