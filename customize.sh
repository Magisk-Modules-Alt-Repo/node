#!/system/bin/sh

chmodBin() {
    chmod +x $MODPATH/system/bin/$@
}

systemWrite() {
    if [ $1 = true ]; then
        mount -o rw,remount /
        ui_print "+ System is now read/write"
        elif [ $1 = false ]; then
        mount -o ro,remount /
        ui_print "+ System is now read-only"
    else
        ui_print "! System not writeable"
    fi
}

#if [ ! "$ANSI_SUPPORT" == "true" ] || [ ! -n "$MMM_EXT_SUPPORT" ]; then
#    abort "! This module need to be executed in Fox's Magisk Module Manager with ANSI support"
#    exit 1
#fi

if [ -n "$MMM_EXT_SUPPORT" ]; then
    ui_print "#!useExt"
    mmm_exec() {
        ui_print "$(echo "#!$@")"
    }
else
    mmm_exec() { true; }
    abort "! This module need to be executed in Fox's Magisk Module Manager"
    exit 1
fi

systemWrite true

for bin in transfer zip bash wget aapt pip python node yarn systemWrite
do
    #ui_print "\e[38;5;82mMaking \e[34m${bin} \e[38;5;198mExecuteable"
    ui_print "* Making ${bin} Executeable"
    chmodBin $bin
done

systemWrite false
