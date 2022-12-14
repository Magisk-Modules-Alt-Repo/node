[nodejs]: https://nodejs.org/en/
[foxmmm]: https://github.com/Fox2Code/FoxMagiskModuleManager

<p align="center">
  <a href="https://nodejs.org/">
    <img
      alt="Node.js"
      src="https://nodejs.org/static/images/logo-light.svg"
      width="400"
    />
  </a>
</p>

# Node.js

**Disclaimer**  
[Node.js][nodejs] are able to read and write the entire system, I'm not responsible for any stolen data, accounts or something. Install it at your own rist!

# Important!

Since version `1.1.4` requires this module [Systemless mksh.rc](https://github.com/Magisk-Modules-Alt-Repo/mkshrc) to be installed.

## Information

- Some binaries can't be used when `/system` it not linked into `/usr`. You need to charge from `#!/usr/bin/env node` to `#!/system/bin/env node`
- `node-gyp` isn't available. Someone need to ports `python`
- Do not update `yarn` itself. This can break the functionality.
<!-- - Do not use `npm`, you can install it via `yarn global add npm`, but `npm` isn't right configured for Android root usage.-->
- Please don't execute global installed binaries on boot. This module need link `/system` to `/usr` first!
- This module uses an own `mkshrc` file, this causes problems with some other modules, like Terminal modifications. Be uninstalling these modules before using this!

## Running service files

Files must be located in `/data/chuser/root/usr/etc/node.d` and running on every boot after 2 minutes.

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
# grf add xh
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

Module can be downloaded from [FoxMMM][foxmmm] or [MMRL][mmrl]. The instalation should be always be in [FoxMMM][foxmmm].

**Included binaries**

- `yarn`
- `node`
