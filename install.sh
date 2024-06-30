SKIPMOUNT=false
PROPFILE=false
POSTFSDATA=false
LATESTARTSERVICE=true

print_modname() {
    ui_print "======================================="
    ui_print "                Node.js                "
    ui_print "---------------------------------------"
    ui_print "           Running Node.js on          "
    ui_print "            a Android device           "
    ui_print "---------------------------------------"
    ui_print "      Magisk-Modules-Alt-Repo/node     "
    ui_print "======================================="
}

YARN_HOME=/system/usr/share/yarn
NODE_HOME=/system/usr/share/node
SDK_VERSION=$(getprop ro.build.version.sdk)
MINSDK=23

MODULES=/data/adb/modules

require_modules() {
    for module in $@; do
        [ ! -d "$MODULES/$module" ] && abort "$module is missing, please install it to use this module."
    done
}

conflicting_modules() {
    for module in $@; do
        [ -d "$MODULES/$module" ] && abort "$module is installed, please remove it to use this module."
    done
}

on_install() {
    ui_print "- Checking Android SDK version"
    ui_print "- SDK version: $SDK_VERSION"
    if [ $SDK_VERSION -lt $MINSDK ]; then
        abort "Node.js requires Android 6 and above to work!"
    fi

    ui_print "- Extracting module files"
    unzip -o "$ZIPFILE" 'system/*' -d $MODPATH >&2

    conflicting_modules terminalmods
    require_modules mkshrc

    [ -d "$MODPATH/system/bin/" ] || mkdir -p "$MODPATH/system/bin/"

    ui_print "- Successfully installed Yarn"
    ui_print "- Please reboot where the \"yarn\" command will be available."
}


set_permissions() {
    # The following is the default rule, DO NOT remove
    set_perm_recursive $MODPATH 0 0 0755 0644
    set_perm $MODPATH/$NODE_HOME/bin/node 0 0 0755
    set_perm $MODPATH/system/system_ext/bin/node 0 0 0755
    set_perm $MODPATH/system/vendor/bin/node 0 0 0755
    set_perm $MODPATH/system/bin/grf 0 0 0755
    set_perm $MODPATH/$YARN_HOME/bin/yarn 0 0 0755
    set_perm $MODPATH/$YARN_HOME/bin/yarng 0 0 0755
    set_perm $MODPATH/$YARN_HOME/bin/yarn.js 0 0 0755
    set_perm $MODPATH/$YARN_HOME/bin/yarnpkg 0 0 0755
}
