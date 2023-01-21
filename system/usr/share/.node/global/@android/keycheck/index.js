const addon = require("./native/__native_keycheck.node");
class Keycheck {
  static SYN_REPORT = 0;
  static SYN_CONFIG = 1;
  static SYN_MT_REPORT = 2;
  static SYN_DROPPED = 3;
  static SYN_TIME_SEC = 4;
  static SYN_TIME_NSEC = 5;
  /*
   * Keys and buttons
   *
   * Most of the keys/buttons are modeled after USB HUT 1.12
   * (see http://www.usb.org/developers/hidpage).
   * Abbreviations in the comments:
   * AC - Application Control
   * AL - Application Launch Button
   * SC - System Control
   */
  static KEY_RESERVED = 0;
  static KEY_ESC = 1;
  static KEY_1 = 2;
  static KEY_2 = 3;
  static KEY_3 = 4;
  static KEY_4 = 5;
  static KEY_5 = 6;
  static KEY_6 = 7;
  static KEY_7 = 8;
  static KEY_8 = 9;
  static KEY_9 = 10;
  static KEY_0 = 11;
  static KEY_MINUS = 12;
  static KEY_EQUAL = 13;
  static KEY_BACKSPACE = 14;
  static KEY_TAB = 15;
  static KEY_Q = 16;
  static KEY_W = 17;
  static KEY_E = 18;
  static KEY_R = 19;
  static KEY_T = 20;
  static KEY_Y = 21;
  static KEY_U = 22;
  static KEY_I = 23;
  static KEY_O = 24;
  static KEY_P = 25;
  static KEY_LEFTBRACE = 26;
  static KEY_RIGHTBRACE = 27;
  static KEY_ENTER = 28;
  static KEY_LEFTCTRL = 29;
  static KEY_A = 30;
  static KEY_S = 31;
  static KEY_D = 32;
  static KEY_F = 33;
  static KEY_G = 34;
  static KEY_H = 35;
  static KEY_J = 36;
  static KEY_K = 37;
  static KEY_L = 38;
  static KEY_SEMICOLON = 39;
  static KEY_APOSTROPHE = 40;
  static KEY_GRAVE = 41;
  static KEY_LEFTSHIFT = 42;
  static KEY_BACKSLASH = 43;
  static KEY_Z = 44;
  static KEY_X = 45;
  static KEY_C = 46;
  static KEY_V = 47;
  static KEY_B = 48;
  static KEY_N = 49;
  static KEY_M = 50;
  static KEY_COMMA = 51;
  static KEY_DOT = 52;
  static KEY_SLASH = 53;
  static KEY_RIGHTSHIFT = 54;
  static KEY_KPASTERISK = 55;
  static KEY_LEFTALT = 56;
  static KEY_SPACE = 57;
  static KEY_CAPSLOCK = 58;
  static KEY_F1 = 59;
  static KEY_F2 = 60;
  static KEY_F3 = 61;
  static KEY_F4 = 62;
  static KEY_F5 = 63;
  static KEY_F6 = 64;
  static KEY_F7 = 65;
  static KEY_F8 = 66;
  static KEY_F9 = 67;
  static KEY_F10 = 68;
  static KEY_NUMLOCK = 69;
  static KEY_SCROLLLOCK = 70;
  static KEY_KP7 = 71;
  static KEY_KP8 = 72;
  static KEY_KP9 = 73;
  static KEY_KPMINUS = 74;
  static KEY_KP4 = 75;
  static KEY_KP5 = 76;
  static KEY_KP6 = 77;
  static KEY_KPPLUS = 78;
  static KEY_KP1 = 79;
  static KEY_KP2 = 80;
  static KEY_KP3 = 81;
  static KEY_KP0 = 82;
  static KEY_KPDOT = 83;
  static KEY_ZENKAKUHANKAKU = 85;
  static KEY_102ND = 86;
  static KEY_F11 = 87;
  static KEY_F12 = 88;
  static KEY_RO = 89;
  static KEY_KATAKANA = 90;
  static KEY_HIRAGANA = 91;
  static KEY_HENKAN = 92;
  static KEY_KATAKANAHIRAGANA = 93;
  static KEY_MUHENKAN = 94;
  static KEY_KPJPCOMMA = 95;
  static KEY_KPENTER = 96;
  static KEY_RIGHTCTRL = 97;
  static KEY_KPSLASH = 98;
  static KEY_SYSRQ = 99;
  static KEY_RIGHTALT = 100;
  static KEY_LINEFEED = 101;
  static KEY_HOME = 102;
  static KEY_UP = 103;
  static KEY_PAGEUP = 104;
  static KEY_LEFT = 105;
  static KEY_RIGHT = 106;
  static KEY_END = 107;
  static KEY_DOWN = 108;
  static KEY_PAGEDOWN = 109;
  static KEY_INSERT = 110;
  static KEY_DELETE = 111;
  static KEY_MACRO = 112;
  static KEY_MUTE = 113;
  static KEY_VOLUMEDOWN = 114;
  static KEY_VOLUMEUP = 115;
  static KEY_POWER = 116;
  /* SC System Power Down */
  static KEY_KPEQUAL = 117;
  static KEY_KPPLUSMINUS = 118;
  static KEY_PAUSE = 119;
  static KEY_SCALE = 120;
  /* AL Compiz Scale (Expose) */
  static KEY_KPCOMMA = 121;
  static KEY_HANGEUL = 122;
  static KEY_HANJA = 123;
  static KEY_YEN = 124;
  static KEY_LEFTMETA = 125;
  static KEY_RIGHTMETA = 126;
  static KEY_COMPOSE = 127;
  static KEY_STOP = 128;
  /* AC Stop */
  static KEY_AGAIN = 129;
  static KEY_PROPS = 130;
  /* AC Properties */
  static KEY_UNDO = 131;
  /* AC Undo */
  static KEY_FRONT = 132;
  static KEY_COPY = 133;
  /* AC Copy */
  static KEY_OPEN = 134;
  /* AC Open */
  static KEY_PASTE = 135;
  /* AC Paste */
  static KEY_FIND = 136;
  /* AC Search */
  static KEY_CUT = 137;
  /* AC Cut */
  static KEY_HELP = 138;
  /* AL Integrated Help Center */
  static KEY_MENU = 139;
  /* Menu (show menu) */
  static KEY_CALC = 140;
  /* AL Calculator */
  static KEY_SETUP = 141;
  static KEY_SLEEP = 142;
  /* SC System Sleep */
  static KEY_WAKEUP = 143;
  /* System Wake Up */
  static KEY_FILE = 144;
  /* AL Local Machine Browser */
  static KEY_SENDFILE = 145;
  static KEY_DELETEFILE = 146;
  static KEY_XFER = 147;
  static KEY_PROG1 = 148;
  static KEY_PROG2 = 149;
  static KEY_WWW = 150;
  /* AL Internet Browser */
  static KEY_MSDOS = 151;
  static KEY_COFFEE = 152;
  /* AL Terminal Lock/Screensaver */
  // KEY_SCREENLOCK: KEY_COFFEE
  static KEY_DIRECTION = 153;
  static KEY_CYCLEWINDOWS = 154;
  static KEY_MAIL = 155;
  static KEY_BOOKMARKS = 156;
  /* AC Bookmarks */
  static KEY_COMPUTER = 157;
  static KEY_BACK = 158;
  /* AC Back */
  static KEY_FORWARD = 159;
  /* AC Forward */
  static KEY_CLOSECD = 160;
  static KEY_EJECTCD = 161;
  static KEY_EJECTCLOSECD = 162;
  static KEY_NEXTSONG = 163;
  static KEY_PLAYPAUSE = 164;
  static KEY_PREVIOUSSONG = 165;
  static KEY_STOPCD = 166;
  static KEY_RECORD = 167;
  static KEY_REWIND = 168;
  static KEY_PHONE = 169;
  /* Media Select Telephone */
  static KEY_ISO = 170;
  static KEY_CONFIG = 171;
  /* AL Consumer Control Configuration */
  static KEY_HOMEPAGE = 172;
  /* AC Home */
  static KEY_REFRESH = 173;
  /* AC Refresh */
  static KEY_EXIT = 174;
  /* AC Exit */
  static KEY_MOVE = 175;
  static KEY_EDIT = 176;
  static KEY_SCROLLUP = 177;
  static KEY_SCROLLDOWN = 178;
  static KEY_KPLEFTPAREN = 179;
  static KEY_KPRIGHTPAREN = 180;
  static KEY_NEW = 181;
  /* AC New */
  static KEY_REDO = 182;
  /* AC Redo/Repeat */
  static KEY_F13 = 183;
  static KEY_F14 = 184;
  static KEY_F15 = 185;
  static KEY_F16 = 186;
  static KEY_F17 = 187;
  static KEY_F18 = 188;
  static KEY_F19 = 189;
  static KEY_F20 = 190;
  static KEY_F21 = 191;
  static KEY_F22 = 192;
  static KEY_F23 = 193;
  static KEY_F24 = 194;
  static KEY_PLAYCD = 200;
  static KEY_PAUSECD = 201;
  static KEY_PROG3 = 202;
  static KEY_PROG4 = 203;
  static KEY_DASHBOARD = 204;
  /* AL Dashboard */
  static KEY_SUSPEND = 205;
  static KEY_CLOSE = 206;
  /* AC Close */
  static KEY_PLAY = 207;
  static KEY_FASTFORWARD = 208;
  static KEY_BASSBOOST = 209;
  static KEY_PRINT = 210;
  /* AC Print */
  static KEY_HP = 211;
  static KEY_CAMERA = 212;
  static KEY_SOUND = 213;
  static KEY_QUESTION = 214;
  static KEY_EMAIL = 215;
  static KEY_CHAT = 216;
  static KEY_SEARCH = 217;
  static KEY_CONNECT = 218;
  static KEY_FINANCE = 219;
  /* AL Checkbook/Finance */
  static KEY_SPORT = 220;
  static KEY_SHOP = 221;
  static KEY_ALTERASE = 222;
  static KEY_CANCEL = 223;
  /* AC Cancel */
  static KEY_BRIGHTNESSDOWN = 224;
  static KEY_BRIGHTNESSUP = 225;
  static KEY_MEDIA = 226;
  static KEY_SWITCHVIDEOMODE = 227;
  /* Cycle between available video outputs
                                   (Monitor/LCD/TV-out/etc) */
  static KEY_KBDILLUMTOGGLE = 228;
  static KEY_KBDILLUMDOWN = 229;
  static KEY_KBDILLUMUP = 230;
  static KEY_SEND = 231;
  /* AC Send */
  static KEY_REPLY = 232;
  /* AC Reply */
  static KEY_FORWARDMAIL = 233;
  /* AC Forward Msg */
  static KEY_SAVE = 234;
  /* AC Save */
  static KEY_DOCUMENTS = 235;
  static KEY_BATTERY = 236;
  static KEY_BLUETOOTH = 237;
  static KEY_WLAN = 238;
  static KEY_UWB = 239;
  static KEY_UNKNOWN = 240;
  static KEY_VIDEO_NEXT = 241;
  /* drive next video source */
  static KEY_VIDEO_PREV = 242;
  /* drive previous video source */
  static KEY_BRIGHTNESS_CYCLE = 243;
  /* brightness up, after max is min */
  static KEY_BRIGHTNESS_ZERO = 244;
  /* brightness off, use ambient */
  static KEY_DISPLAY_OFF = 245;
  /* display device to off state */
  static KEY_WIMAX = 246;
  static KEY_RFKILL = 247;
  /* Key that controls all radios */
  static KEY_MICMUTE = 248;
  /* Mute / unmute the microphone */
  constructor() {}
  check() {
    const event = addon.__native_keycheck();
    return {
      code: event.code,
      value: event.value,
    };
  }
}
function keycheck() {
  const __keycheck = addon.__native_keycheck();

  if (__keycheck.value != 0) {
    return __keycheck.code;
  }
}
module.exports = { Keycheck, keycheck };
