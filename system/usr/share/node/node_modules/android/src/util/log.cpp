#include <android/log.h>
#include <napi.h>
#include <internal/util/log.h>

using namespace std;
using namespace Napi;

Napi::Object BaseLog::Init(Napi::Env env, Napi::Object exports) {
    // This method is used to hook the accessor and method callbacks
    Napi::Function func = DefineClass(env, "BaseLog", {
        StaticMethod<&BaseLog::NativeLog>("native_log", static_cast<napi_property_attributes>(napi_writable | napi_configurable)),
        StaticMethod<&BaseLog::CreateNewItem>("CreateNewItem", static_cast<napi_property_attributes>(napi_writable | napi_configurable)),
    });

    Napi::FunctionReference* constructor = new Napi::FunctionReference();

    // Create a persistent reference to the class constructor. This will allow
    // a function called on a class prototype and a function
    // called on instance of a class to be distinguished from each other.
    *constructor = Napi::Persistent(func);
    exports.Set("BaseLog", func);

    // Store the constructor as the add-on instance data. This will allow this
    // add-on to support multiple instances of itself running on multiple worker
    // threads, as well as multiple instances of itself running in different
    // contexts on the same thread.
    //
    // By default, the value set on the environment here will be destroyed when
    // the add-on is unloaded using the `delete` operator, but it is also
    // possible to supply a custom deleter.
    env.SetInstanceData<Napi::FunctionReference>(constructor);

    return exports;
}

BaseLog::BaseLog(const Napi::CallbackInfo& info) : Napi::ObjectWrap<BaseLog>(info) {
  // Napi::Env env = info.Env();
}



Napi::Value BaseLog::NativeLog(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  
  if (info.Length() < 3) {
    Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
    return env.Null();
  }
  
  if (!info[0].IsNumber()) {
    Napi::TypeError::New(env, "The 'prio' should be an number").ThrowAsJavaScriptException();
    return env.Null();
  }
  
  if (!info[1].IsString()) {
    Napi::TypeError::New(env, "The 'tag' should be an string").ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!info[2].IsString()) {
    Napi::TypeError::New(env, "the 'msg' should be an string").ThrowAsJavaScriptException();
    return env.Null();
  }

  int prio = info[0].As<Napi::Number>().Int32Value();
  string tag = info[1].As<Napi::String>();
  string msg = info[2].As<Napi::String>();
  
  __android_log_write(prio, tag.c_str(), msg.c_str());
  
  return env.Null();
}

// Create a new item using the constructor stored during Init.
Napi::Value BaseLog::CreateNewItem(const Napi::CallbackInfo& info) {
  // Retrieve the instance data we stored during `Init()`. We only stored the
  // constructor there, so we retrieve it here to create a new instance of the
  // JS class the constructor represents.
  Napi::FunctionReference* constructor = info.Env().GetInstanceData<Napi::FunctionReference>();
  return constructor->New({ Napi::Number::New(info.Env(), 42) });
}