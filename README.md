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

## Information

- `node-gyp` isn't available. Someone need to ports `python`
- Do not update `yarn` itself. This can break the functionality.
- Do not use `npm`, you can install it via `yarn global add npm`, but `npm` isn't right configured for Android root usage.
- Please don't execute global installed binaries on boot. This module need link `/system` to `/usr` first!
- This module uses an own `mkshrc` file, this causes problems with some other modules, like Terminal modifications or Systemless mkshrc. Be uninstalling these modules before using this!

## Global Binaries

You can install binaries from NPM, you can use the following commands to install global libraries

```shell
# yarng is an alias of `yarn global`
yarng add com.googler.bash

# ot use like this
yarn global add com.googler.bash
```

> There are more addons like `bash`! You can also install `neofetch`!

## Module development

If you want develop global libraries for usage use please:

```shell
#!/system/bin/env node
```

or this

```shell
#!/usr/bin/env node
```

> `/system` is linked to `/usr` which makes it possible to execute `npm` or `nodemon`

## Installation

Node.js version: 16.15.1
Yarn version: 1.22.19

Module can be downloaded from [FoxMMM][foxmmm] or [MMRL][mmrl]. The instalation should be always be in [FoxMMM][foxmmm], for ~[ANSI][ansi] text support~.

**Included binaries**

- `yarn`
- `node`
