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

systemWrite true

for bin in node npm npx
do
    ui_print "* Making ${bin} Executeable"
    chmodBin $bin
done

systemWrite false
