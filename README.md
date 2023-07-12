[nodejs]: https://nodejs.org/en/
[foxmmm]: https://github.com/Fox2Code/FoxMagiskModuleManager

<p align="center">
  <a href="https://nodejs.org/" noIcon>
    <img
      alt="Node.js"
      src="https://github.com/DerGoogler/cdn/blob/master/images/Node.js.Cover.png?raw=true"
    />
  </a>
</p>

# Systemless Node.js

**Disclaimer**  
[Node.js][nodejs] are able to read and write the entire system, I'm not responsible for any stolen data, accounts or something. Install it at your own rist!

# Important!

Since version `1.1.4` requires this module [Systemless mksh.rc](https://github.com/Magisk-Modules-Alt-Repo/mkshrc) to be installed.

## Information

- Some binaries can't be used when `/system` it not linked into `/usr`. You need to charge from `#!/usr/bin/env node` to `#!/system/bin/env node`
- `node-gyp` isn't available. Someone need to ports `python`
  - [Learn more](https://github.com/Magisk-Modules-Alt-Repo/node/wiki/Install-Code-Server-and-run-it) how to make `node-gyp` work
- Do not update `yarn` itself. This can break the functionality.
<!-- - Do not use `npm`, you can install it via `yarn global add npm`, but `npm` isn't right configured for Android root usage.-->
- Please don't execute global installed binaries on boot. This module need link `/system` to `/usr` first!
- This module uses an own `mkshrc` file, this causes problems with some other modules, like Terminal modifications. Be uninstalling these modules before using this!

## Running service files

Files must be located in `/system/etc/node.d` and running on every boot after 2 minutes.

Valid file extensions:

- `*.js`
- `*.cjs`
- `*.mjs`

## Installing NPM

Since 1.1.4 NPM is useable!

```shell
# Install npm via yarn
yarn global add npm

# npm will only works when /system is into /usr linked
# If not - you have to change from "#!/usr/bin/env node" to "#!/system/bin/env node"
nano $(realpath $(which npm))
```

## Googler's Fetcher (grf)

This is an small binary that just executes npm in a short way

### Usage

```shell
grf add wget
# grf add audiotools
# grf add bash
```

More can you find in [Googlers-Repo/addons](https://github.com/Googlers-Repo/addons)

## Module development

If you want develop global libraries for usage use please:

```shell
#!/system/bin/env node
```

or this (not recommended)

```shell
#!/usr/bin/env node
```

> `/system` is linked to `/usr` which makes it possible to execute `npm` or `nodemon`

## Installation

Node.js version: 16.15.1

Yarn version: 1.23.0

Module can be downloaded from [FoxMMM][foxmmm]. The instalation should be always be in [FoxMMM][foxmmm].

**Included binaries**

- `yarn`
- `node`

# Node API

## Get some properties..

```javascript
const { SystemProperties, Build } = require("android");

const id = SystemProperties.get("ro.build.id");
console.log(id);
// alternatively can you use:
console.log(Build.ID);

// List props
const props = SystemProperties.list();
// With own callback
// SystemProperties.list((prop)=> {
//   console.log(prop)
// });
console.log(props);
```

## Logging

Logging in JavaScript is 1:1 the same as in Java

```javascript
const { Log } = require("android");

const TAG = "TEST";

Log.i(TAG, "Logging from JavaScript, %s!", "Kevin");
```

Check in logs

```shell
logcat -s TEST:*
```

## Environment

Logging in JavaScript is 1:1 the same as in Java

```javascript
const { Environment } = require("android");

const user = Environment.whoami();
const rootfs = Environment.rootfs();
const home = Environment.homedir();
const tmp = Environment.tmpdir();

console.log({
  user,
  home,
  rootfs,
  tmp,
});

// 'System.getenv()' is deprecated
const home = Environment.getenv("HOME");
console.log(home);
```

> ROOTFS is customizable via `setprop`    
> Example: `setprop persist.mkshrc.rootfs /data/<NEW_NAME>`
