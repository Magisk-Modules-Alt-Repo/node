#include <napi.h>
#include <internal/os/system.h>
#include <internal/os/properties.h>
#include <internal/os/environment.h>

using namespace Napi;

Object Init(Env env, Object exports) {
  BaseProperties::Init(env, exports);
  BaseSystem::Init(env, exports);
  BaseEnvironment::Init(env, exports);
  return exports;
}

NODE_API_MODULE(addon, Init)
