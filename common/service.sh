#!/system/bin/sh
(
  logi() {
    if command -v log >/dev/null; then
      log -p i "$1" -t "nodejs"
    fi
  }
  loge() {
    if command -v log >/dev/null; then
      log -p e "$1" -t "nodejs"
    fi
  }
  notify() {
    su -lp 2000 -c "cmd notification post -S bigtext -t '$1' '$RANDOM' '$2'"
  }
  TITLE="Node.js Service Startup"
  SPATH="/system/etc/node.d"
  while [[ $(getprop sys.boot_completed) -ne 1 ]]; do
    sleep 1
  done
  sleep 120
  if [ -f "/system/etc/mkshrc" ]; then
    source /system/etc/mkshrc
  fi
  if ! command -v nohup >/dev/null; then
    notify "$TITLE" "The \"nohup\" binary was not found! Please ensure you have it installed."
    loge "nohup binary wasn't found"
    exit 1
  fi
  if [ -d "$SPATH" ]; then
    FILE_COUNT=$(ls $SPATH/* | egrep '\.js$|\.cjs$|\.mjs$' | wc -l)
    for script in $(ls $SPATH/* | egrep '\.js$|\.cjs$|\.mjs$'); do
      if [ -f $script ]; then
        nohup node $script >/dev/null 2>&1 &
        logi "$script has been executed with \"nohup\""
      fi
    done
    notify "$TITLE" "$FILE_COUNT file/s has been detected, unknown if all has been executed."
    logi "$FILE_COUNT file/s has been detected"
  fi
)
