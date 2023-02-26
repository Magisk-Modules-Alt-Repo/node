#ifndef LOG_H
#define LOG_H

#include <napi.h>

using namespace Napi;

class BaseLog : public Napi::ObjectWrap<BaseLog> {
  public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    BaseLog(const Napi::CallbackInfo& info);
    static Napi::Value CreateNewItem(const Napi::CallbackInfo& info);

  private:
    static Napi::Value NativeLog(const Napi::CallbackInfo& info);
};

#endif