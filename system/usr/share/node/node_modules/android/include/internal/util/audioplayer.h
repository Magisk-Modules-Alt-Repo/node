#ifndef AUDIOPLAYER_H
#define AUDIOPLAYER_H

#include <napi.h>
#include <SLES/OpenSLES.h>
#include <SLES/OpenSLES_Android.h>

using namespace Napi;

class BaseAudioPlayer : public Napi::ObjectWrap<BaseAudioPlayer> {
    public:
        static Napi::Object Init(Napi::Env env, Napi::Object exports);
		BaseAudioPlayer(const Napi::CallbackInfo& info);
		~BaseAudioPlayer();
        static Napi::Value CreateNewItem(const Napi::CallbackInfo& info);
		// void play(char const* uri);



		/**
		 * This allows setting the stream type (default:SL_ANDROID_STREAM_MEDIA):
		 * SL_ANDROID_STREAM_ALARM - same as android.media.AudioManager.STREAM_ALARM
		 * SL_ANDROID_STREAM_MEDIA - same as android.media.AudioManager.STREAM_MUSIC
	 	 * SL_ANDROID_STREAM_NOTIFICATION - same as android.media.AudioManager.STREAM_NOTIFICATION
		 * SL_ANDROID_STREAM_RING - same as android.media.AudioManager.STREAM_RING
		 * SL_ANDROID_STREAM_SYSTEM - same as android.media.AudioManager.STREAM_SYSTEM
		 * SL_ANDROID_STREAM_VOICE - same as android.media.AudioManager.STREAM_VOICE_CALL
		 */
		// void setStreamType(SLint32 streamType) { this->androidStreamType = streamType; }
	private:
        int streamType;
        Napi::Value Play(const Napi::CallbackInfo& info);
        Napi::Value SetStreamType(const Napi::CallbackInfo& info);
		SLObjectItf mSlEngineObject{NULL};
		SLEngineItf mSlEngineInterface{NULL};
		SLObjectItf mSlOutputMixObject{NULL};
		SLint32 androidStreamType{SL_ANDROID_STREAM_MEDIA};
};

#endif