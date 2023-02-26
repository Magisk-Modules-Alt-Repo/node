{
    "targets": [
        {
            "target_name": "android-os",
            "include_dirs": [
                "<!(sh -c \"echo \$PWD/include\")",
                "<!(node -p \"require('node-addon-api').include_dir\")",
            ],
            "sources": [
                "src/internal/properties.cpp",
                "src/os/system.cpp",
                "src/os/properties.cpp",
                "src/os/environment.cpp",
                "src/android-os.cpp",
            ],
            "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"],
        },
        {
            "target_name": "android-util",
            "include_dirs": [
                "<!(sh -c \"echo \$PWD/include\")",
                "<!(node -p \"require('node-addon-api').include_dir\")",
            ],    
            "cflags_cc!": [ "-Wno-exit-time-destructors" ],
            # "libraries": ["-llog", "-lOpenSLES"],
            "libraries": ["-llog"],
            "sources": [    
                "src/util/log.cpp",
                "src/util/sleep.cpp",
                # "src/util/audioplayer.cpp",
                "src/android-util.cpp",
            ],
            "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"],
        },
    ]
}
