#!/system/bin/sh

_getprop() {
	exec /system/bin/getprop $@
}

NODE_PATH="$NODE_PATH:/system/usr/share/node/node_modules"

ROOTFS=$(_getprop "persist.mkshrc.rootfs" "/data/mkuser")
DISABLE_SERVICE=$(_getprop "persist.nodejs.service" "true")
DISABLE_NOTIFY=$(_getprop "persist.nodejs.notify" "true")
ENABLE_LOGGING=$(_getprop "persist.nodejs.logging" "false")

PIDS_DIR="$ROOTFS/var/nodeservice"
PIDS_FILE="$PIDS_DIR/pids.prop"


_log() {
	if [ "$ENABLE_LOGGING" = "true" ];then
		if command -v log >/dev/null ; then
			log -p "$1" "$2" -t "NodeJs"
		fi
	fi
}

notify() {
	if [ ! "$DISABLE_NOTIFY" = "false" ]; then
		su -lp 2000 -c "cmd notification post -S bigtext -t '$1' '$RANDOM' '$2'"
	fi
}

_setmkservice() {
	if [ ! -d "$PIDS_DIR" ]; then
		mkdir "$PIDS_DIR"
	fi
	
	if [ ! -f "$PIDS_FILE" ]; then
		touch "$PIDS_FILE"
	fi
	
	local thekey="$1"
	local newvalue="$2"
	
	if ! grep -R "^[#]*\s*${thekey}=.*" $PIDS_FILE > /dev/null; then
		_log "w" "APPENDING because '${thekey}' not found"
		echo "$thekey=$newvalue" >> $PIDS_FILE
	else
		_log "w" "SETTING because '${thekey}' found already"
		sed -ir "s/^[#]*\s*${thekey}=.*/$thekey=$newvalue/" $PIDS_FILE
	fi
}

_getmkservice() {
	grep "${1}" "$PIDS_FILE" | cut -d'=' -f2
}

main() {
	if [ -f "$PIDS_FILE" ]; then
		rm $PIDS_FILE
	fi

	local TITLE="Node.js Service Startup"
	local NODE_D="/system/etc/node.d"
	local NODE_D_USER="/data/adb/node.d"

	if ! command -v nohup >/dev/null; then
		notify "$TITLE" "The \"nohup\" binary was not found! Please ensure you have it installed."
		_log "e" "nohup binary wasn't found"
		exit 1
	fi

	notify "$TITLE" "Start executing scripts in $NODE_D and $NODE_D_USER"

	if [ -d "$NODE_D_USER" ]; then
		for script_u in $(ls $NODE_D_USER/* | egrep '\.js$|\.cjs$|\.mjs$'); do
			if [ -f $script_u ]; then
				nohup node $script_u >/dev/null 2>&1 &
				_setmkservice "user_$(basename ${script_u%.*})" "$!"
				_log "i" "$script_u has been executed with \"nohup\""
			fi
		done
	else
		_log "w" "unable to find $NODE_D_USER folder"
	fi

	if [ -d "$NODE_D" ]; then
		for script_s in $(ls $NODE_D/* | egrep '\.js$|\.cjs$|\.mjs$'); do
			if [ -f $script_s ]; then
				nohup node $script_s >/dev/null 2>&1 &
				_setmkservice "$(basename ${script_d%.*})" "$!"
				_log "i" "$script_s has been executed with \"nohup\""
			fi
		done
	else
		_log "w" "unable to find $NODE_D folder"
	fi

	unset script_s script_u
}

while [[ $(getprop sys.boot_completed) -ne 1 ]]; do
	sleep 1
done

sleep 120
main "$@"
