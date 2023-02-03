#!/system/bin/sh

export NODE_PATH="$NODE_PATH:/system/usr/share/node/node_modules"

log() {
  if command -v log >/dev/null; then
    log -p "$1" "$2" -t "nodejs"
  fi
}

notify() {
  su -lp 2000 -c "cmd notification post -S bigtext -t '$1' '$RANDOM' '$2'"
}

main() {
  local TITLE="Node.js Service Startup"
  local NODE_D="/system/etc/node.d"
  local NODE_D_USER="/data/adb/node.d"

  if ! command -v nohup >/dev/null; then
    notify "$TITLE" "The \"nohup\" binary was not found! Please ensure you have it installed."
    log "e" "nohup binary wasn't found"
    exit 1
  fi

  notify "$TITLE" "Start executing scripts in /system/etc/node.d and /data/adb/node.d"

  if [ -d "$NODE_D_USER" ]; then
    for script_u in $(ls $NODE_D_USER/* | egrep '\.js$|\.cjs$|\.mjs$'); do
      if [ -f $script_u ]; then
        nohup node $script_u >/dev/null 2>&1 &
        log "i" "$script_u has been executed with \"nohup\""
      fi
    done
  else
    log "w" "unable to find $NODE_D_USER folder"
  fi

  if [ -d "$NODE_D" ]; then
    for script_s in $(ls $NODE_D/* | egrep '\.js$|\.cjs$|\.mjs$'); do
      if [ -f $script_s ]; then
        nohup node $script_s >/dev/null 2>&1 &
        log "i" "$script_s has been executed with \"nohup\""
      fi
    done
  else
    log "w" "unable to find $NODE_D folder"
  fi

  unset script_s script_u
}

while [[ $(getprop sys.boot_completed) -ne 1 ]]; do
  sleep 1
done

sleep 120
main "$@"
