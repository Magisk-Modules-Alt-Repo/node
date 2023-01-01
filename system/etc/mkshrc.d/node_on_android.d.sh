## Node.js module requirements
mkshrc-add-path /system/usr/share/.yarn/bin \
       $HOME/.config/yarn/global/node_modules/.bin

# Symlink /system into /usr. This is only a requirement for the Node.js module, to make binaries work.
sudo mount -o rw,remount /
if [ ! -d "/usr" ]; then
  sudo ln -s -T /system /usr
fi
sudo mount -o ro,remount /

# Ability for npm packages to inject into the environment
# NPM requires installed (yarn global add npm)
for rc in $PREFIX/lib/node_modules/*/mkshrc.sh; do
  if [ -f $rc ]; then
    . $rc
  fi
done
