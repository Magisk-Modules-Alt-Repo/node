#!/system/bin/sh
# Please don't hardcode /magisk/modname/... ; instead, please use $MODDIR/...
# This will make your scripts compatible even if Magisk change its mount point in the future
MODDIR=${0%/*}

# This is required because "#!/usr/bin/env node" cannot loaded.
ln -s -T /system /usr

# This script will be executed in late_start service mode
# More info in the main Magisk thread