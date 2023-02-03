#ifndef SYSTEM_H
#define SYSTEM_H

#include <napi.h>

using namespace Napi;

Value Get(const CallbackInfo& info);
Value Set(const CallbackInfo& info);
Value Cmd(const CallbackInfo& info);
Value Execve(const CallbackInfo& info);

#endif