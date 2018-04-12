# ToDo
## Implement Mad-Gantry site builder
 --> Done: first step
 --> Parallel site builder --> Doing --> Done

## MadFoxd data importer
 --> Doing --> Done


## GWDG Cloud and Ionic Framework updates
* GWDG
 --> Open GWDG ports --> OK

* Ionic 2.0 --> OK
 
  node-sass@4.2.0 --> Installing it in SPEC file again

  3.7.0 downgraded --> gulp-clean-css@3.0.0


## Implement data analyzer (+ indexer & new summary generator)
 * Upgrading analyzezr --> Done

 * CRON jobs (reload, capture, import, analysis) --> Doing --> Done

 * Remove X-window configs in config.json --> Done
 * Log collector --> Done
 * Wiper --> Done

 * Indexer (analysis) --> Doing --> Done


## Specifications of a standard container
   --> Done?

 
## Mad-Gantry site builder second step
 * Cloud Host selector
 * Connecting to AGIS, more sites with configs (level0, level1, level2, Goettingen Internal)


## For CentOS 7
 * Solve the D-Bus issue in mad-gantry CentOS 7 --> Done
 * Upgrading mad-gantry --> Done
 * Upgrade SPECs and daemon scripts accordingly --> Doing --> Needs a default PID file

    madfoxd --> Reboot --> PID file error

    madmaskd --> Not start --> some libraries, especially 'commander', were removed. Upgrading HappyFace-MadMask.SPEC --> Done
---------------------------------------------------------------------
[root@3fd5422be4f4 MadMask]# systemctl status madmaskd.service
● madmaskd.service - LSB: Start and stop the madmask server
   Loaded: loaded (/etc/rc.d/init.d/madmaskd; bad; vendor preset: disabled)
   Active: failed (Result: resources) since Thu 2018-04-12 19:09:02 UTC; 1min 47s ago
     Docs: man:systemd-sysv-generator(8)
  Process: 11640 ExecStart=/etc/rc.d/init.d/madmaskd start (code=exited, status=0/SUCCESS)

Apr 12 19:09:01 3fd5422be4f4 su[11644]: (to happyface3) root on none
Apr 12 19:09:02 3fd5422be4f4 madmaskd[11640]: info:    No forever processes running
Apr 12 19:09:02 3fd5422be4f4 su[11651]: (to happyface3) root on none
Apr 12 19:09:02 3fd5422be4f4 su[11662]: (to happyface3) root on none
Apr 12 19:09:02 3fd5422be4f4 su[11685]: (to happyface3) root on none
Apr 12 19:09:02 3fd5422be4f4 madmaskd[11640]: Starting madmaskd server:         [OK]
Apr 12 19:09:02 3fd5422be4f4 systemd[1]: PID file /var/run/madmask.pid not readable (yet?) after start.
Apr 12 19:09:02 3fd5422be4f4 systemd[1]: Failed to start LSB: Start and stop the madmask server.
Apr 12 19:09:02 3fd5422be4f4 systemd[1]: Unit madmaskd.service entered failed state.
Apr 12 19:09:02 3fd5422be4f4 systemd[1]: madmaskd.service failed.
----------------------------------------------------------------------



## Upgrade data analyzer (with systems.json)
 * Think of systems.json definition and remove errors (A simple template builder by using monitoring-urls.json?) --> Doing

 * Forecast improvement
      * Change ADC systems --> Doing --> Done
      * The example forecast routine should be paralleled
      * HF DB connector (simple one)


## Implement new data importer for HF database
   * In MadBrowser
   * In MadAnalyzer


## MadFoxd new functions: firefox command executor + X-win default displays


## MadJsonian and simple analyzer


## Improvements of problematic system component and criticality detection


## Summary of analyzer? --> 2-3 pages


## Man pages in MadFoxd and MadAnalyzer?



# Bug fixes
 * 04.04.2018: Cannot open XMLHttpRequest in a mobile application --> Used "adb logcat" --> A wrong URL at ConfigReader.js: 50

   Reason: loadJsonByConfig() in ConfigReader.js is obsolete. location.hostname is not available in mobile. A handler of the meta-meta information should be reconsidered.

--------------------------------------------------------------------------
I/chromium(26006): [INFO:CONSOLE(30)] "Reading [http://141.5.108.30:20100/sites/default/meta-meta.json] ...", source: file:///android_asset/www/js/ConfigReader.js (30)
I/chromium(26006): [INFO:CONSOLE(30)] "Reading [http://141.5.108.30:20100/sites/default/config.json] ...", source: file:///android_asset/www/js/ConfigReader.js (30)
E/WifiStateMachine( 2248): WifiStateMachine CMD_START_SCAN source -2 txSuccessRate=0,12 rxSuccessRate=0,15 targetRoamBSSID=08:96:d7:b2:d3:07 RSSI=-47
I/chromium(26006): [INFO:CONSOLE(30)] "Reading [http://:/sites/default/monitoring-urls.json] ...", source: file:///android_asset/www/js/ConfigReader.js (30)
I/chromium(26006): [INFO:CONSOLE(50)] "Uncaught NetworkError: Failed to execute 'send' on 'XMLHttpRequest': Failed to load 'http:///sites/default/monitoring-urls.json'.", source: file:///android_asset/www/js/ConfigReader.js (50)
W/InputMethodManagerService( 2248): Window already focused, ignoring focus gain of: com.android.internal.view.IInputMethodClient$Stub$Proxy@e1d4048 attribute=null, token = android.os.BinderProxy@1f6d6dd7
I/chromium(26006): [INFO:CONSOLE(20434)] "TypeError: Cannot read property 'length' of undefined
I/chromium(26006):     at setLinks (file:///android_asset/www/js/FacJsonContents.js:87:41)
I/chromium(26006):     at Object.<anonymous> (file:///android_asset/www/js/FacJsonContents.js:71:3)
I/chromium(26006):     at Object.invoke (file:///android_asset/www/lib/ionic/js/ionic.bundle.js:13012:17)
I/chromium(26006):     at Object.enforcedReturnValue [as $get] (file:///android_asset/www/lib/ionic/js/ionic.bundle.js:12865:37)
I/chromium(26006):     at Object.invoke (file:///android_asset/www/lib/ionic/js/ionic.bundle.js:13012:17)
I/chromium(26006):     at file:///android_asset/www/lib/ionic/js/ionic.bundle.js:12830:37
I/chromium(26006):     at getService (file:///android_asset/www/lib/ionic/js/ionic.bundle.js:12971:39)
I/chromium(26006):     at invoke (file:///android_asset/www/lib/ionic/js/ionic.bundle.js:13003:13)
I/chromium(26006):     at Object.instantiate (file:///android_asset/www/lib/ionic/js/ionic.bundle.js:13020:27)
I/chromium(26006):     at file:///android_asset/www/lib/ionic/js/ionic.bundle.js:17289:28", source: file:///android_asset/www/lib/ionic/js/ionic.bundle.js (20434)
--------------------------------------------------------------------------



