#ifndef SYSTEM_H
#define SYSTEM_H

#include <napi.h>

using namespace Napi;

class BaseSystem : public Napi::ObjectWrap<BaseSystem> {
  public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    BaseSystem(const Napi::CallbackInfo& info);
    static Napi::Value CreateNewItem(const Napi::CallbackInfo& info);

  private:
    static Napi::Value GetEnv(const Napi::CallbackInfo& info);
    static Napi::Value SetEnv(const Napi::CallbackInfo& info);
    static Napi::Value Cmd(const Napi::CallbackInfo& info);
    static Napi::Value Spawn(const Napi::CallbackInfo& info);
};

#endif