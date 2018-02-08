# HappyFace-MadMask
--------------------------
## HappyFace-MadMask (RPM builder)
A RPM builder for HappyFace-MadMask modules, Mobile compnents, services and some dependent libraries. The resulting packages, after executing HappyFace-MadMask/rebuild.sh, are HappyFace-MadMask, MadMask-R-libs and MadFoxd RPMs.

### How to build RPMs
     $ ./rebuild.sh build madmask
     $ ./rebuild.sh build libs
     $ ./rebuild.sh build madfoxd

### Test packages (removing and installing them indeed)
     $ ./rebuild.sh test

--------------------------
## MadModules
* MadBrowser - This module consists of 2 sub components. One is Meta-Browser and the other is Meta-JSON/WSDL downloader. They are called MadBrowser and MadJsonin respectivelly.
* MadAnalyzer - This module allows the HappyFace core system to use extra analysis methods such as ANFIS, many machine learning libraries and Bayesian changepoint analyzer.
* bin - Analysis mediator scripts of browser views, JSON structures and HappyFace data


--------------------------
## HappyFaceMobile
HappyFace mobile application and its Ionic web server. In HappyFace, a symbolic link is created. To avoid confusion, this Ionic web server by the mobile application component is called "MadMask" in HappyFace instance.


### Structure
     HappyFaceMobile
     ├── bin      --->  Mediators of browser analyzer
     ├── daemon   --->  Ioinic web server launcher and some cron jobs
     ├── data     --->  A symbolic link to data location
     ├── hooks
     ├── lib
     ├── madmask  --->  MadMask command executor as a web server and executable wrappers in a HappyFace node
     ├── node_modules  ---> Local npm libraries
     ├── resources     ---> Resources of native Android and iPhone applications
     ├── scss
     ├── sites    --->  Site information for this MadMask instance
     └── www      --->  Main source codes of the mobile application


--------------------------
## MadFoxd
A service capturing browser views (browser canvases) via Firefox using MadFox addon program. This service is extendable to download JSON and WSDL web services as files.

### Components
* madfoxd/madfox - Main program of madfox
* firefox_profiles/ - Default firefox profile which was already configured with MadFox addon
* madfox-addon/ - MadFox Firefox Addon and its source
* daemon/ - Script and configurations for daemon and CRON


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


