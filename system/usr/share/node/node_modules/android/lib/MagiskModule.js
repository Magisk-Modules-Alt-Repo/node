const { File } = require("@android/util");

class MagiskModule {
  constructor(name) {
    this._name = name;
    this._root = Magisk.MODULEROOT + "/" + name;

    const r = new File(Magisk.MODULEROOT);
    if (!r.canAccess()) {
      throw new Error(r.canAccess());
    }

    const props = new File(this._root + "/module.prop");
    if (props.canAccess()) {
      try {
        // Objects are bad to handle, so we use "new Map()".
        this.info = new Map(
          props
            .read()
            .split("\n")
            .map((row) => row.split("="))
        );
      } catch (err) {
        throw new Error(err);
      }
    } else {
      throw new Error(props.canAccess());
    }
  }

  disable() {
    const disable = new File(this._root + "/disable");
    if (disable.canAccess()) {
      disable.write("");
    } else {
      throw new Error(disable.canAccess());
    }
  }

  enable() {
    const disable = new File(this._root + "/disable");
    if (disable.canAccess()) {
      disable.delete();
    } else {
      throw new Error(disable.canAccess());
    }
  }

  remove() {
    const remove = new File(this._root + "/remove");
    if (remove.canAccess()) {
      remove.write("");
    } else {
      throw new Error(remove.canAccess());
    }
  }

  unremove() {
    const remove = new File(this._root + "/remove");
    if (remove.canAccess()) {
      remove.delete();
    } else {
      throw new Error(remove.canAccess());
    }
  }
}

module.exports = { MagiskModule };
