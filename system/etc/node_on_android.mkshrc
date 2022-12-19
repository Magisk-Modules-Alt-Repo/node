## Node.js module requirements
export PATH="$PATH:/system/usr/share/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin"

# Symlink /system into /usr. This is only a requirement for the Node.js module, to make binaries work.
sudo mount -o rw,remount /
if [ ! -d "/usr" ]; then
  sudo ln -s -T /system /usr
fi
sudo mount -o ro,remount /