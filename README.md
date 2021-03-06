# HappyFace Mobile Application and its HappyFace Modules

--------------------------
## HappyFaceMobile
HappyFace mobile application and its web server based on the Ionic framework. The Ionic builder can generate the HappyFace mobile phone application. To avoid confusion, this Ionic web server in HappyFace instance is called '*MadMask*' and a symbolic link of '*HappyFaceMobile*' is created. The '*madmask*' command is called , for example, by the '*madmask daemon* (= daemon/madmaskd)' and cron jobs (= daemon/madmask.cron).


### Structure
     HappyFaceMobile
     ├── daemon   --->  Ioinic web server launcher as daemon, configuration and some cron jobs
     ├── data     --->  A symbolic link to a data location
     ├── lib
     ├── madmask  --->  MadMask command executor as a web server and executable wrappers in HappyFace instance
     ├── node_modules  ---> Local npm libraries
     ├── resources     ---> Resources of native Android and iPhone applications
     └── sites    --->  Site configurations for HappyFace MadMask instances

     HappyFaceMobileDevelopment
     ├── node_modules  ---> Local npm libraries
     ├── resources     ---> Resources of native Android and iPhone applications
     ├── src      --->  TypeScript source
     ├── sites    --->  Site configurations for HappyFace MadMask instances
     └── www      --->  Main source codes of mobile application


--------------------------
## MadModules (Mobile/Meta-Monitoring Analytics Device for HappyFace)
* MadBrowser - This module consists of 2 sub components. One is Meta-Browser and the other is Meta-JSON/WSDL downloader. They are called MadBrowser and MadJsonin respectivelly.
* MadAnalyzer - This module allows the HappyFace core system to use extra analysis methods such as ANFIS, many machine learning libraries and Bayesian changepoint analyzer.
* lib - Analysis mediators of browser views, JSON structures and HappyFace data


--------------------------
## PackageBuilder
The RPM and Android/iOS application builders. The RPM package builder can generate some RPMs containing HappyFace core, HappyFace modules, Mobile components, services and some dependent libraries. The resulting packages, after executing PackageBuilder/build-rpms.sh, are HappyFaceCore, HappyFace-MadMask, MadMask-MadModules and MadFoxd RPM packages. 

### How to build RPMs
     $ ./build-rpms.sh -b hf
     $ ./build-rpms.sh -b madmask
     $ ./build-rpms.sh -b madmodules
     $ ./build.rpms.sh -b madfoxd

### Testing packages (removing and installing them indeed)
     $ ./build-rpms.sh -t


## More details about build-apk4ios.sh can be found in MacOSX.md


--------------------------
## MadFoxd (Mobile/Meta-Monitoring Analytics Device for Firefox daemon)
A Meta-Browser service capturing browser canvases via Firefox using the MadFox addon. This service is extendable to download JSON and WSDL web services as files.

### Components
* madfox-addon/ - MadFox Firefox Addon and its source
* firefox_profiles/ - Default firefox profile which was already configured with MadFox addon
* daemon/ - Script and configurations for daemon and CRON
* lib - Main program and library for madfox CLI


### Default Firefox configuration with Madfox Addon
 * An example is found in "firefox_profile/pre-configured_firefox_profile_with_MadFox.default"
#### Firefox configuration
     $ firefox --no-remote --profile pre-configured_firefox_profile_with_MadFox.default

 If you need to access some sites which require your own certificate
 Import your certificate, and check "do not ask (select one automatically)"

 * Preference --> Switch cache, history, search history off

 * Some configurations to recover browser after a crash
     about:telemetry --> enable
     about:config --> browser.sessionstore.restore_from_crash --> false
     about:config --> max_script_run_time --> Very long value (e.g. 10 mins = 3600)


### Addons
 * To install MadFox addon (because MadFox is an unsigned package so far)

 about:config --> xpinstall.signatures.required --> false

 * Not to ask "Pasword prompt", install AutoAuth addon
 * Not to show "Certificate error", install Skip Cert Error addon


### For MadFox Addon development (for Linux)
#### Install JPM
     $ npm install -g jpm

#### Capture browser views (to /tmp/madfox.${USER}__${FIREFOX_PROFILE})
     $ xdotool key Shift+Alt+s

#### Reload all tabs
     $ xdotool key Alt+Shift+u


------------------
### How to test MadFox addon
#### Install an Addon "Extension Auto-Installer" to Firefox

#### Run jpm remote loader
     $ jpm watchpost --post-url http://localhost:8888

#### Run in a browser with new profile
     $ jpm run -b $(which firefox)


## License
Developed under [Apache Licence Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
