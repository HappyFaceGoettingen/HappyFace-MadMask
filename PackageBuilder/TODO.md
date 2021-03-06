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

 
## For CentOS 7
 * Solve the D-Bus issue in mad-gantry CentOS 7 --> Done
 * Upgrading mad-gantry --> Done
 * Upgrade SPECs and daemon scripts accordingly --> Doing --> Needs a default PID file

    madmaskd --> Not start --> some libraries, especially 'commander', were removed. Upgrading HappyFace-MadMask.SPEC --> Done

    madmaskd --> Reboot --> PID file error --> Doing --> Done
    madfoxd  --> Reboot --> PID file error --> Doing --> Done

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


## iPhone build
 * TestFlight: https://developer.apple.com/testflight/
 * cordova-ios@4.5.4

   * --> xcode build error: HappyFace3/plugins/GCDWebserverDataRequest.m  --> -(Bool) writeData
     [_data appendData ...] ---> Must be commented out
     Instert
     NSMutableData *mdata
     
 
## Upgrade data analyzer (with systems.json)
 * Think of systems.json definition and remove errors (A simple template builder by using monitoring-urls.json?) --> Done

 * Forecast improvement
      * The example forecast routine should be paralleled --> Done
      * Run HF CRON --> Done

## Profile
 * New firefox_profile with gantry  --> Done
 * Put firefox_profile (in madfoxd) --> Done
 * Make a firefox_command routine  --> Done --> TESTING

## PCATLAS11
 * Open ports in PCATLAS11 --> Doing --> Done

## VM OSX config
 * Apple ID --> Done
 * Collect testers --> Done
 * ssh connection + ssh server in OSX --> Done
 * Automatic iOS builder in madmask --> DONE
 * Automatic build with Macbook Pro (implementing it in mad-gantry) --> Doing


## Change item names in JSON files
   * config.json:   "port" --> "ionic_port", added "version", "web_port", "mobile_port"
   *  ==> Implement config.json version, web_port, mobile_port in mad-gantry => Doing
   * top.json:   Added onto GitHub => Done
   * systems.json:   "services" --> "actions" => Done
   * monitoring-urls.json:   Remove 'capture' completely. When file.prefix is null, then not capture => Done
   * summary.json:   Added new attributes "systems" and "urls" ==> Done

## Implementaiton of Admin-server
   * RPM + Docker template --> Doing
   * Daemonized web2ssh-gateway.js

## HappyFace Instance
   * Allowing CORS:   DONE


## Mad-Gantry site builder second step
 * Cloud Host selector --> Done
 * Connecting to AGIS, more sites with configs (level0, level1, level2, Goettingen Internal)


## Kibana
   * Test deployments --> Reading

## Implement new data importer for HF database
   * HF DB connector (simple one)
   * Elasticsearch plugin (simple one)

   * In MadBrowser
   * In MadAnalyzer


## MadAnalyzer lib should be re-written in Python
   


## MadFoxd new functions: firefox command executor + X-win default displays


## MadJsonian and simple analyzer


## Improvements of problematic system component and criticality detection


## Summary of analyzer? --> 2-3 pages


## Man pages in MadFoxd and MadAnalyzer?



