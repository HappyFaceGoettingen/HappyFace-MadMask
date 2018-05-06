# Building iPhone Application
## Build environments
 * OS: OSX Sierra 10.12
 * XCode: Ver. 9.2
 * Nodejs: 
 * NPM: 
 * Cordova: Ver. 8.0.0
 * Ionic: Ver. 3.20.0

## Opening SSH server
* In Mac: [Apple Icon] --> System Preference --> Sharing --> Enable 'Remote Login'

### SSh port forwarding (10.0.2.2 is a VM host/gantry node)
     $ ssh -R 10000:localhost:22 10.0.2.2


## Installing NPM and Nodejs (https://treehouse.github.io/installation-guides/mac/homebrew)
### Homebrew and Nodejs
     $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
     $ brew	update
     $ brew install node
     
### Cordova and Ionic
     $ sudo npm install -g cordova@8.0.0
     $ sudo npm install -g ionic@3.20.0


