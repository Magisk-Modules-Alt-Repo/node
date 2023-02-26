const fs = require("fs");
const { Build } = require("./Build");
const { System } = require("./System");

class Magisk {
  static LOGFILE = "/cache/magisk.log";
  static UNBLOCKFILE = "/dev/.magisk_unblock";
  static SECURE_DIR = "/data/adb";
  static MODULEROOT = this.SECURE_DIR + "/modules";
  static MODULEUPGRADE = this.SECURE_DIR + "/modules_update";
  static DATABIN = this.SECURE_DIR + "/magisk";
  static MAGISKDB = this.SECURE_DIR + "/magisk.db";

  // tmpfs paths
  static MAGISKTMP = Build.SDK >= Build.VERSION_CODES.R ? System.cmd("magisk --path") : "/sbin";
  static INTLROOT = ".magisk";
  static MIRRDIR = this.INTLROOT + "/mirror";
  static RULESDIR = this.MIRRDIR + "/sepolicy.rules";
  static BLOCKDIR = this.INTLROOT + "/block";
  static WORKERDIR = this.INTLROOT + "/worker";
  static MODULEMNT = this.INTLROOT + "/modules";
  static BBPATH = this.INTLROOT + "/busybox";
  static ROOTOVL = this.INTLROOT + "/rootdir";
  static SHELLPTS = this.INTLROOT + "/pts";
  static ROOTMNT = this.ROOTOVL + "/.mount_list";
  static ZYGISKBIN = this.INTLROOT + "/zygisk";
  static SELINUXMOCK = this.INTLROOT + "/selinux";
  static APP_DATA_DIR = Build.SDK >= Build.VERSION_CODES.N ? "/data/user_de" : "/data/user";

  static installed() {
    const paths = [
      "/system/app/Superuser.apk",
      "/sbin/su",
      "/system/bin/su",
      "/system/xbin/su",
      "/data/local/xbin/su",
      "/data/local/bin/su",
      "/system/sd/xbin/su",
      "/system/bin/failsafe/su",
      "/data/local/su",
      "/su/bin/su",
    ];
    for (const path in paths) {
      if (fs.existsSync(path)) return true;
    }
    return false;
  }
}

module.exports = { Magisk };
