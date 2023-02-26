#include <napi.h>
#include <internal/os/environment.h>
#include <iostream>
#include <cstdlib>
#include <stdlib.h>
#include <pwd.h>
#include <stdio.h>
#include <sys/utsname.h>
#include <unistd.h>

using namespace std;
using namespace Napi;

Napi::Object BaseEnvironment::Init(Napi::Env env, Napi::Object exports) {
    // This method is used to hook the accessor and method callbacks
    Napi::Function func = DefineClass(env, "BaseEnvironment", {
        StaticMethod<&BaseEnvironment::GetEnv>("getenv", static_cast<napi_property_attributes>(napi_writable | napi_configurable)),
        StaticMethod<&BaseEnvironment::SetEnv>("setenv", static_cast<napi_property_attributes>(napi_writable | napi_configurable)),
        StaticMethod<&BaseEnvironment::Uname>("uname", static_cast<napi_property_attributes>(napi_writable | napi_configurable)),
        StaticMethod<&BaseEnvironment::WhoAmI>("whoami", static_cast<napi_property_attributes>(napi_writable | napi_configurable)),
        StaticMethod<&BaseEnvironment::CreateNewItem>("CreateNewItem", static_cast<napi_property_attributes>(napi_writable | napi_configurable)),
    });

    Napi::FunctionReference* constructor = new Napi::FunctionReference();

    // Create a persistent reference to the class constructor. This will allow
    // a function called on a class prototype and a function
    // called on instance of a class to be distinguished from each other.
    *constructor = Napi::Persistent(func);
    exports.Set("BaseEnvironment", func);

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

BaseEnvironment::BaseEnvironment(const Napi::CallbackInfo& info) :
    Napi::ObjectWrap<BaseEnvironment>(info) {
  Napi::Env env = info.Env();
}


Napi::Value BaseEnvironment::GetEnv(const Napi::CallbackInfo& info) {
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

Napi::Value BaseEnvironment::SetEnv(const Napi::CallbackInfo& info) {
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

Napi::Value BaseEnvironment::Uname(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  
  struct utsname buffer;
  
  if (uname(&buffer) == -1) {
    Napi::TypeError::New(env, "uname call failed!").ThrowAsJavaScriptException();
    return env.Null();
  }

  Object obj = Object::New(env);
  
  obj.Set("sysname"  , Napi::String::New(env, buffer.sysname  ));
  obj.Set("nodename" , Napi::String::New(env, buffer.nodename ));
  obj.Set("release"  , Napi::String::New(env, buffer.release  ));
  obj.Set("version"  , Napi::String::New(env, buffer.version  ));
  obj.Set("machine"  , Napi::String::New(env, buffer.machine  ));

  #ifdef _GNU_SOURCE
    obj.Set("domainname", Napi::String::New(env, buffer.domainname));
  #endif

  return obj;
}

Napi::Value BaseEnvironment::WhoAmI(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  register struct passwd *pw;
  register uid_t uid;

  uid = geteuid();
  pw = getpwuid(uid);
  if (pw) {
    return Napi::String::New(env, pw->pw_name);
  }
  char buffer [50];
  sprintf(buffer, "Cannot find username for UID %u", (unsigned) uid);
  Napi::TypeError::New(env, buffer).ThrowAsJavaScriptException();
  return env.Null();
}

// Create a new item using the constructor stored during Init.
Napi::Value BaseEnvironment::CreateNewItem(const Napi::CallbackInfo& info) {
  // Retrieve the instance data we stored during `Init()`. We only stored the
  // constructor there, so we retrieve it here to create a new instance of the
  // JS class the constructor represents.
  Napi::FunctionReference* constructor = info.Env().GetInstanceData<Napi::FunctionReference>();
  return constructor->New({ Napi::Number::New(info.Env(), 42) });
}