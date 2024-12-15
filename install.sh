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

findRequire() {
    local id="$1"  # Get the ID passed to the function

    # Check if the ID exists in BULK_MODULES
    local id_in_bulk=$(echo "$BULK_MODULES" | grep -qw "$id" && echo "true" || echo "false")

    # Check if the directory exists
    local id_dir_exists=$( [ -d "/data/adb/modules/$id" ] && echo "true" || echo "false" )

    # Return true only if both conditions are met
    if [ "$id_in_bulk" = "true" ] || [ "$id_dir_exists" = "true" ]; then
        echo "true"
    else
        echo "false"
    fi
}


on_install() {
    ui_print "- Checking Android SDK version"
    ui_print "- SDK version: $SDK_VERSION"
    if [ $SDK_VERSION -lt $MINSDK ]; then
        abort "Node.js requires Android 6 and above to work!"
    fi

    ui_print "- Extracting module files"
    unzip -o "$ZIPFILE" 'system/*' -d $MODPATH >&2

    if [ "$(findRequire mkshrc)" = "false" ]; then
        echo "! Unable to find Systemless Mkshrc is missing. Cannot find in /data/adb/modules or \$BULK_MODULES"
    fi

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
