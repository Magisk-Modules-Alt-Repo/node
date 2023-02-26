#ifndef ENVIRONNMENT_H
#define ENVIRONNMENT_H

#include <napi.h>

using namespace Napi;

class BaseEnvironment : public Napi::ObjectWrap<BaseEnvironment> {
  public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    BaseEnvironment(const Napi::CallbackInfo& info);
    static Napi::Value CreateNewItem(const Napi::CallbackInfo& info);

  private:
    static Napi::Value GetEnv(const Napi::CallbackInfo& info);
    static Napi::Value SetEnv(const Napi::CallbackInfo& info);
    static Napi::Value Uname(const Napi::CallbackInfo& info);
    static Napi::Value WhoAmI(const Napi::CallbackInfo& info);
};

#endif