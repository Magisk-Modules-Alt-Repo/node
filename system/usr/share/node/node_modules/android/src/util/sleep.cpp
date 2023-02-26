#include <android/log.h>
#include <napi.h>
#include <internal/util/sleep.h>
#include <unistd.h>

using namespace std;
using namespace Napi;

Value Sleep(const CallbackInfo& info) {
  Env env = info.Env();
  
  if (info.Length() < 1) {
    TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
    return env.Null();
  }
  
  if (!info[0].IsNumber()) {
    TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }
  
  int secs = info[0].As<Number>().Int32Value();
  
  sleep(secs);
  
  return env.Null();
}
