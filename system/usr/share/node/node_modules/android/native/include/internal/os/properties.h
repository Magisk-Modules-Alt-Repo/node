#ifndef PROPERTIES_H
#define PROPERTIES_H

#include <napi.h>

using namespace Napi;

Value GetProp(const CallbackInfo& info);
Value SetProp(const CallbackInfo& info);

#endif