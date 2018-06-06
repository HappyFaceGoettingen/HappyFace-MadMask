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
       -U:  Update this script (/usr/local/bin/build-apk4ios.sh)
       -c:  Connect to [vm|ph2|clouds] via ssh
      
       * Git location
       -R:  set a git repo [default: https://github.com/HappyFaceGoettingen/HappyFace-MadMask]
       -B:  set a branch name [defaut: gen_development]
       -C:  set a commit ID [default: ]
       -S:  set a stable nightly commit [default: gen_development - 4185dbaef0a65a81103135dd122d0f73cfd0e056]
      
       * Application Build
       -i:  set a build ID [default: 20180529-105519]
       -b:  build iPhone App in a tmp dir [/tmp/HappyFace-MadMask4iOS/ios/gen_development.20180529-105519]
      
       * Example
       ./build-apk4ios.sh -B master -b
       ./build-apk4ios.sh -S -b

      

# iTunes Connect and Testflight
* iTunes Connect: https://itunesconnect.apple.com
* Apple Developer: https://developer.apple.com
* TestFlight Overview: https://itunespartner.apple.com/en/apps/overview#testflight-beta-testing

## A procedure to upload a iPhone application onto iTunes Connect
After running and validating a build process of the iPhone application produced by the above mentioned script (build-apk4ios.sh), one can find a Xcode project file in the platform directory (e.g. /tmp/HappyFace-MadMask4iOS/ios/gen_development.20180529-105519/platform/ios) in Mac. A procedure putting the final application onto iTunes connect is the following:

0. Copy build files (e.g. to $HOME/Documents/ios)
1. Open XCode (ver. 9.2)
2. "File" -> "Open" a project file (typically, ios/HappyFace2.xcodeproj)
3. Put Bundle ID (see a configuration of HappyFace2 in iTunes Connect)
4. On top left panel, select 'Generic iOS Device'
5. "General" -> "Signing" -> Unselect 'Automaticaly manage signing'
6. "General" -> "Signing" -> Select 'Automaticaly manage signing'
7. "General" -> "Signing" -> "Team" -> Set an official iPhone developer key
8. "Build Settings" -> "Code Signing Identity" -> Select 'iOS Developer' (for all)
9. "Product" -> "Archive" (=> Get a message 'Build Succeeds')
10. "Validate" -> Push "Next" -> Push "Next" (Automatically manage signing) -> Push "Validate" (=> 'Validation Successful') -> "Done"
11. "Upload to App Store" -> Push "Next" -> Push "Next" (Automatically manage signing) -> "Upload" (=> 'Upload Successful') -> "Done"
12. In iTunes Connect -> "TestFlight" -> "iOS" -> Select one version you want to test, add a test group


Note: select a given certificate by an iPhone developer in the Apple Developer portal (https://developer.apple.com/account/ios/certificate).
