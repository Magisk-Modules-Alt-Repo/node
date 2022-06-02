[foxmmm]: https://github.com/Fox2Code/FoxMagiskModuleManager
[mmrl]: https://github.com/DerGoogler/MMRL
[ansi]: https://github.com/Fox2Code/AndroidANSI
[nodejs]: https://nodejs.org/en/
[python]: https://www.python.org/

# Common-On-Android

**Disclaimer**  
[Node.js][nodejs] and [Python][python] are able to read and write the entire system, I'm not responsible for any stolen data, accounts or something. Install it at your own rist!

This is an module that's includes many binary's, listed are below

## Installation

Module can be downloaded from [FoxMMM][foxmmm] or [MMRL][mmrl]. The instalation should be always be in [FoxMMM][foxmmm], for [ANSIText][ansi] support.

## Binary's

- `transfer`
- `zip`
- `bash`
- `wget`
- `aapt`
- `node` (only version 9)
- `yarn` (npm nor works, yarn works not at all)
- `systemWrite` (an script to make the system writeable, be secure with `yarn`)

## Binary's that needs extra setup

### Python

```bash
python # CANNOT LINK EXECUTEABLE "python": library "libandroid-support.so" not found: needed by main executeable
```

It needs to be Termux installed. Setup Python inside Termux

```bash
pkg update # or apt update
```

```bash
pkg install python # or apt(-get) install python
```

When you get an error, try to change the repos with `termux-change-repo`

### PIP

The binary is already included, but it need extra setup to make it work.  
Do not run this in `su` env

```bash
python -m ensurepip --upgrade
```
