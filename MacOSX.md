# Building iPhone Application
## Build environments
 * OS:  OSX Sierra Ver. 10.12.6
 * XCode:  Ver. 9.2
 * Nodejs:  Ver. 10.0.0
 * NPM:  Ver. 5.6.0
 * Cordova:  Ver. 8.0.0
 * Ionic:  Ver. 3.20.0


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


## Installing XCode Ver. 9.2

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
      
       * Application Build
       -i:  set a build ID [default: 20180510-231852]
       -B:  set a branch name [defaut: gen_development]
       -b:  build iPhone App in a tmp dir [/tmp/HappyFace-MadMask4iOS/ios/gen_development.20180510-231852]
      
       * Example
       ./build-apk4ios.sh -b
      
