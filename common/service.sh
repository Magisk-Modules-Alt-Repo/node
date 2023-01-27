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
  local SPATH="/system/etc/node.d"
  
  if ! command -v nohup >/dev/null; then
    notify "$TITLE" "The \"nohup\" binary was not found! Please ensure you have it installed."
    log "e" "nohup binary wasn't found"
    exit 1
  fi
  
  if [ -d "$SPATH" ]; then
    FILE_COUNT=$(ls $SPATH/* | egrep '\.js$|\.cjs$|\.mjs$' | wc -l)
    for script in $(ls $SPATH/* | egrep '\.js$|\.cjs$|\.mjs$'); do
      if [ -f $script ]; then
        nohup node $script >/dev/null 2>&1 &
        log "i" "$script has been executed with \"nohup\""
      fi
    done
    notify "$TITLE" "$FILE_COUNT file/s has been detected, unknown if all has been executed."
    log "i" "$FILE_COUNT file/s has been detected"
  fi
}

while [[ $(getprop sys.boot_completed) -ne 1 ]]; do
  sleep 1
done
  
sleep 120
main
