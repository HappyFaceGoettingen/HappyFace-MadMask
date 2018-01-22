* Required packages
xorg-x11-server-Xvfb nodejs npm firefox ImageMagick festival festvox* xdotool jq fftw-devel fftw2-devel

* Remove already existing R
yum remove R R-core

* R packages
bcp
entropy
rimage


* Node.js and Ionic
npm install -g ionic@1.6.1
npm install -g cordova@6.0.0

WRONG_FILE=/usr/lib/node_modules/ionic/node_modules/ionic-app-lib/lib/config.js
cat $WRONG_FILE| perl -pe "s/CONFIG_FILE:.*/CONFIG_FILE: \'.\/ionic\/ionic.config\',/g" > /tmp/config.js
cp -v /tmp/config.js /usr/lib/node_modules/ionic/node_modules/ionic-app-lib/lib/config.js


* JPM (for MadFox development)
npm install -g jpm




* Firefox configuration
 --> An example is "pre-configured_firefox_profile_with_MadFox.default"

 $ firefox --no-remote --profile pre-configured_firefox_profile_with_MadFox.default
 Import your certificate, and check "do not ask (select one automatically)"
 Cache --> 500MB

 about:telemetry --> enable
 about:config --> browser.sessionstore.restore_from_crash --> false
 about:config --> max_script_run_time --> Very long value (e.g. 10 mins = 3600)


 ## Addons
 Install MadFox addon
 (because MadFox is an unsigned package for now)
 about:config --> xpinstall.signatures.required --> false

 Install AutoAuth addon
 Install Skip Cert Error addon

