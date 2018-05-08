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


### SSh port forwarding (10.0.2.2 is a VM host/gantry node)
     $ remote_host=10.0.2.2   ## For a VM
     $ ssh -R 10000:localhost:22 $remote_host


## Installing NPM and Nodejs (https://treehouse.github.io/installation-guides/mac/homebrew)
### Homebrew and Nodejs
     $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
     $ brew	update
     $ brew install node

     
### Cordova and Ionic
     $ sudo npm install -g cordova@8.0.0
     $ sudo npm install -g ionic@3.20.0


## Insttalling XCode Ver. 9.2
      ## Extract Xcode_9.2.xip --> 'Xcode.app' is created
      $ sudo mv Xcode.app /Library
      $ sudo chown -R root:wheel /Library/Xcode.app
      $ sudo xcode-select -s /Library/Xcode.app/Contents/Developer


