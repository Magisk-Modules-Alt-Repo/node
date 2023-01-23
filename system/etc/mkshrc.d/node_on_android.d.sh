## Node.js module requirements
export PATH="$PATH:/system/usr/share/yarn/bin:$HOME/.config/yarn/global/node_modules/.bin"
export NODE_PATH="$NODE_PATH:/system/usr/share/node/node_modules"

# Symlink /system into /usr. This is only a requirement for the Node.js module, to make binaries work.
sudo mount -o rw,remount / >/dev/null
if [ ! -d "/usr" ]; then
  sudo ln -s -T /system /usr >/dev/null
fi
sudo mount -o ro,remount / >/dev/null
