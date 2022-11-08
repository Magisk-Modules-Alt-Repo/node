[nodejs]: https://nodejs.org/en/
[foxmmm]: https://github.com/Fox2Code/FoxMagiskModuleManager

<p align="center"><img width="140" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1920px-Node.js_logo.svg.png"></p>

# Node.js

**Disclaimer**  
[Node.js][nodejs] are able to read and write the entire system, I'm not responsible for any stolen data, accounts or something. Install it at your own rist!

## Information

- Do not use `npm`, you can install it via `yarn global add npm`, but `npm` isn't right configured for Android root usage.
- Please don't execute global installed binaries on boot. This module need link `/system` to `/usr` first!
- This module uses an own `mkshrc` file, this causes problems with some other modules, like Terminal modifications or Systemless mkshrc. Be uninstalling these modules before using this!

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

Node.js version: 14.16.0
Yarn version: 1.22.19

Module can be downloaded from [FoxMMM][foxmmm] or [MMRL][mmrl]. The instalation should be always be in [FoxMMM][foxmmm], for ~[ANSI][ansi] text support~.

**Included binaries**

- `yarn`
- `node`
