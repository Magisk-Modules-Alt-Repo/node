#!/system/bin/sh

notify() {
  su -lp 2000 -c "cmd notification post -S bigtext -t '$1' '$RANDOM' '$2'"
}

TITLE="Node.js Service Startup"
SPATH="$PREFIX/etc/node.d"

while [[ `getprop sys.boot_completed` -ne 1 ]]
do
  sleep 1
done

sleep 120

if ! command -v nohup > /dev/null;then
    notify "$TITLE" "The \"nohup\" binary was not found! Please ensure you have it installed."
    exit 1
fi

if [ ! -d "$SPATH" ]; then
  mkdir $SPATH
  echo "console.log(\"Log!\")" >$SPATH/log.js
fi

if [ -d "$SPATH" ]; then
  FILE_COUNT=$(ls $SPATH/*.js | wc -l)
  for script in $SPATH/*.js; do
    if [ -f $script ]; then
      nohup node $script >/dev/null 2>&1 &
    fi
  done
  notify "$TITLE" "$FILE_COUNT file/s has been detected, unknown if all has been executed."
fi

unset FILE_COUNT script SPATH TITLE notify
