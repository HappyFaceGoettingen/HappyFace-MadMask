# Building iPhone Application
## Build environments
 * OS:  OSX Sierra ver. 10.12.6
 * XCode:  ver. 9.2
 * Nodejs:  ver. 10.0.0
 * NPM:  ver. 5.6.0
 * Cordova:  ver. 8.0.0
 * Ionic:  ver. 3.20.0
 * cordova-ios plugin: ver. 4.5.4


## Opening SSH server

* In Mac: [Apple Icon] --> System Preference --> Sharing --> Enable 'Remote Login'
* SSh port forwarding (10.0.2.2 is a VM host/gantry node)

      $ remote_host=10.0.2.2   ## For a VM
      $ reverse_port=10000
      $ ssh -R $reverse_port:localhost:22 $remote_host
      

## Installing Nodejs, NPM, Cordova and Ionic (by using [Homebrew](https://treehouse.github.io/installation-guides/mac/homebrew))

* Homebrew and Nodejs

      $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
      $ brew	update
      $ brew install node
      
     
* Cordova and Ionic

      $ sudo npm install -g cordova@8.0.0
      $ sudo npm install -g ionic@3.20.0


## Installing XCode ver. 9.2

* Extract Xcode_9.2.xip --> 'Xcode.app' is created

      $ sudo mv Xcode.app /Library
      $ sudo chown -R root:wheel /Library/Xcode.app
      $ sudo xcode-select -s /Library/Xcode.app/Contents/Developer
      
* Execute Xcode at once, accept the license and install some required packages


# A builder script in MacOSX

In Mac OSX, the following builder command can install the above-mentioned packages/platforms and can build an iPhone application.

       $ ./build-apk4ios.sh [options]
      
       * Preparation
       -I:  install Ionic
       -X:  install Xcode
       -U:  Update this script (/usr/bin/build-apk4ios.sh)
      
       * Git location
       -R:  set a git repo [default: https://github.com/HappyFaceGoettingen/HappyFace-MadMask]
       -B:  set a branch name [defaut: gen_development]
      
       * Application Build
       -i:  set a build ID [default: 20180511-093337]
       -b:  build iPhone App in a tmp dir [/tmp/HappyFace-MadMask4iOS/ios/gen_development.20180511-093337]
      
       * Example
       ./build-apk4ios.sh -B master -b
      

# iTunes connect and Testflight
* Open iTunes Connect https://itunesconnect.apple.com/
* A video of TestFlight: https://itunespartner.apple.com/en/apps/overview#testflight-beta-testing

