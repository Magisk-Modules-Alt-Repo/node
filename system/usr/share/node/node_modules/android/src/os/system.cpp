#include <napi.h>
#include <stdlib.h>
#include <cstdio>
#include <iostream>
#include <memory>
#include <stdexcept>
#include <string>
#include <array>

#include <sys/utsname.h>
#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <pwd.h>
#include <sys/stat.h>
#include <stdlib.h>
#include <sys/stat.h> 
#include <conio.h>
#include <unistd.h>
#include <stdlib.h>
#include <iostream>
#include <string>
#include <vector>
#include <internal/os/system.h>

using namespace std;
using namespace Napi;

Napi::Object BaseSystem::Init(Napi::Env env, Napi::Object exports) {
    // This method is used to hook the accessor and method callbacks
    Napi::Function func = DefineClass(env, "BaseSystem", {
        StaticMethod<&BaseSystem::GetEnv>("getenv", static_cast<napi_property_attributes>(napi_writable | napi_configurable)),
        StaticMethod<&BaseSystem::SetEnv>("setenv", static_cast<napi_property_attributes>(napi_writable | napi_configurable)),
        StaticMethod<&BaseSystem::Cmd>("cmd", static_cast<napi_property_attributes>(napi_writable | napi_configurable)),
        StaticMethod<&BaseSystem::Spawn>("spawn", static_cast<napi_property_attributes>(napi_writable | napi_configurable)),
        StaticMethod<&BaseSystem::CreateNewItem>("CreateNewItem", static_cast<napi_property_attributes>(napi_writable | napi_configurable)),
    });

    Napi::FunctionReference* constructor = new Napi::FunctionReference();

    // Create a persistent reference to the class constructor. This will allow
    // a function called on a class prototype and a function
    // called on instance of a class to be distinguished from each other.
    *constructor = Napi::Persistent(func);
    exports.Set("BaseSystem", func);

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

BaseSystem::BaseSystem(const Napi::CallbackInfo& info) :
    Napi::ObjectWrap<BaseSystem>(info) {
  Napi::Env env = info.Env();
}

// Dep
Napi::Value BaseSystem::GetEnv(const Napi::CallbackInfo& info) {
 Napi::Env env = info.Env();
  
  if (info.Length() < 1) {
    Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
    return env.Null();
  }
  
  if (!info[0].IsString()) {
    Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }
  
  std::string name = info[0].As<Napi::String>();
  
  return Napi::String::New(env, getenv(name.c_str()));
}

// Dep
Napi::Value BaseSystem::SetEnv(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  
  if (info.Length() < 3) {
    Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
    return env.Null();
  }
  
  if (!info[0].IsString() || !info[1].IsString() || !info[2].IsNumber()) {
    Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }
  
  string name = info[0].As<String>();
  string value = info[1].As<String>();
  int overrid = info[2].As<Number>();
  
  setenv(name.c_str(), value.c_str(), overrid);
  
  return Napi::String::New(env, getenv(name.c_str()));
}

Napi::Value BaseSystem::Cmd(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  
  if (info.Length() < 1) {
    Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
    return env.Null();
  }
  
  if (!info[0].IsString()) {
    Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }
  
  string cmd = info[0].As<Napi::String>();
  
  array<char, 128> buffer;
  string result;
  unique_ptr<FILE, decltype(&pclose)> pipe(popen(cmd.c_str(), "r"), pclose);
  
  if (!pipe) {
    Napi::TypeError::New(env, "popen() failed!").ThrowAsJavaScriptException();
    return env.Null();
  }
  
  while (fgets(buffer.data(), buffer.size(), pipe.get()) != nullptr) {
    result += buffer.data();
  }
  
  return Napi::String::New(env, result);
}

Napi::Value BaseSystem::Spawn(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  
  if (info.Length() < 2) {
    Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
    return env.Null();
  }
  
  if (!info[0].IsString()) {
    Napi::TypeError::New(env, "The command should be an string").ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!info[1].IsFunction()) {
    Napi::TypeError::New(env, "the calback should be an function").ThrowAsJavaScriptException();
    return env.Null();
  }
  
  string cmd = info[0].As<Napi::String>();
  Napi::Function cb = info[1].As<Napi::Function>();

  array<char, 128> buffer;
  unique_ptr<FILE, decltype(&pclose)> pipe(popen(cmd.c_str(), "r"), pclose);
  
  if (!pipe) {
    Napi::TypeError::New(env, "popen() failed!").ThrowAsJavaScriptException();
    return env.Null();
  }
  
  while (fgets(buffer.data(), buffer.size(), pipe.get()) != nullptr) {
    cb.Call(env.Global(), {Napi::String::New(env, buffer.data())});
  }
  
  return env.Null();
}

// Create a new item using the constructor stored during Init.
Napi::Value BaseSystem::CreateNewItem(const Napi::CallbackInfo& info) {
  // Retrieve the instance data we stored during `Init()`. We only stored the
  // constructor there, so we retrieve it here to create a new instance of the
  // JS class the constructor represents.
  Napi::FunctionReference* constructor = info.Env().GetInstanceData<Napi::FunctionReference>();
  return constructor->New({ Napi::Number::New(info.Env(), 42) });
}
