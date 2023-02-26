const util = require("util");
const { BaseSystem } = require("bindings")("android-os.node");

class System extends BaseSystem {
  static cmd(c, ...data) {
    if (typeof c != "string") throw new TypeError("the command beeds to be an string");
    // Don't allow modules/libraries to change the battery state
    if (/((sudo)?\s?cmd\s?battery\s?(set|reset|unplug)?\s?(-f)?)/mg.test(c)) {
      throw new Error("'System.cmd()' are not allowed to change the battery state!")
    }
    return super.cmd(util.format(c, ...data)).trim();
  }

  static setenv(name, value, overrid = 1) {
    super.setenv(String(name), String(value), Number(overrid));
  }

  static getenv(name) {
    if (!name) throw new TypeError("Undefined name");
    return super.getenv(String(name));
  }

  static openApp(pkg, act) {
    return this.cmd("am start -n %s/.%s", pkg, act);
  }

  static openFile(file, mimeType) {
    return this.cmd("am start -a android.intent.action.VIEW -d file://%s -t %s", file, mimeType);
  }

  static openUrl(url) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    if (!pattern.test(url)) {
      throw new TypeError(`'${url}' is not a valid url!`);
    } else {
      return this.cmd("am start -a android.intent.action.VIEW -d %s", url);
    }
  }

  static uname() { return super.uname() }

  static notify(id, title, message, ...data) {
    if (typeof id != "number") throw new TypeError("The 'id' should be an number");
    if (typeof title != "string") throw new TypeError("The 'title' should be an string");
    if (typeof message != "string") throw new TypeError("The 'message' should be an string");
    return this.cmd(`su -lp 2000 -c "cmd notification post -S bigtext -t '${title}' '${id}' '${util.format(message, ...data)}'"`);
  }
}

module.exports = { System };
