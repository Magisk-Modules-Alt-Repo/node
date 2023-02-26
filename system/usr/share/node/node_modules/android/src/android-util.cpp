#include <napi.h>
#include <internal/util/log.h>
#include <internal/util/sleep.h>
// #include <internal/util/audioplayer.h>

using namespace Napi;

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(String::New(env, "sleep"), Napi::Function::New(env, Sleep));
  BaseLog::Init(env, exports);
  // BaseAudioPlayer::Init(env, exports);
  return exports;
}

NODE_API_MODULE(addon, Init)