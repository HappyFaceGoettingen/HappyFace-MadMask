setup_android_sdk() {
    TOOLS=/usr/local/android-tools
    echo "Making Android SDK Env from [$TOOLS]"

    export ANDROID_HOME=$TOOLS/android/sdk
    export ANT_HOME=/opt/apache-ant

    export PATH=$ANDROID_HOME/platforms:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$ANT_HOME:$ANT_HOME/bin:$PATH
}
