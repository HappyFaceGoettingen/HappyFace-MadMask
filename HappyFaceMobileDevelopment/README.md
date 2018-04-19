# A Note About HappyFaceMobile development

## About TypeScript

## Development environments
* OS:
* TypeScript Version:
* Ionic Version:
* Test environments:
* IDE: ?

## Usage of TypeScript
### 

## Some exapmles


## Debug/Tips/Snippets etc..


# GWDG Cloud server
## Connecting to a VM via ssh
      ssh cloud@141.5.108.29
      
      # Go to 'mad-gantry' directory or open screen by 'screen -x'
      cd mad-gantry

      # Build a default template used to make HappyFace Docker VMs on the Cloud
      ./mad-gantry -a build
      
      # Before running a Docker VM, syncronise local copy with Git repository
      ./mad-gantry -d
      
      # Start the ADC Docker server (Change ADC to the VM name, e.g. DE, GoeGrid, accordingly)
      ./mad-gantry -s ADC -a up
      
      # Stop the ADC Docker server
      ./mad-gantry -s ADC -a down
      
      # See the status of the ADC Docker server
      ./mad-gantry -s ADC -a logs
      
      # Connect to the VM (on Docker)
      ./mad-gantry -s ADC -c
      
* See URL list (=ship/ship.html) 

For example, <a href="http://141.5.108.29:20100">HappyFace Mobile: ADC</a></br>


# Timon TODO (03.04.2018 - )
## Timon: Reload functions, SSL client, HF connectors and so on
 * Meta-Meta monitoring configurations (for many sites)  --> Done
 * Reloading tabs appropriately --> Done

 * Automatic reloading --> Done
 * Automatic fetching (Notification)? --> Done, notification not implemented (yet), needs WebSever/MobilePhone configuration

 * Does not work with browser in a mobile phone (location.host?) --> Done
 * Merging this TypeScript development environments with the original master branch --> Done

 * HappyFace Connector (can take it from HFMobileV1) --> Done

 * HappyFace Instance for data/sites configs (without using the Ionic server) --> Done
    --> A configuration switch (For example, a switch 'Use Only HappyFace Web') --> Done
    --> The port is "web_port", dir is under "static/sites" and "static/data"

  [Mobile Application] -----> [Ionic server or Ionic contents (e.g. port 20100, 'data/GoeGrid')]
                 +----[HF connector] ----> [HappyFace Web Instance (e.g. port 10100)]

  When 'Use Only HappyFace Web' is enabled
  [Mobile Application] -----> [HappyFace Web Instance (e.g. port 10100, and dir is 'static/data/GoeGrid')]
                 +----[HF connector] ----> [HappyFace Web Instance (e.g. port 10100)]


 * Openssl client? + Definition of systems.json (or template generator) --> Done


## RPM mobile apk builder (With Timon)
 * Check Android builder with Ionic 2.0 --> Done
 * Build Android Application in Ionic 2.0 by RPM

## The iOS Builder
 * Build iOS Application

## JSON viewer?? (with MadJsonian)
 * Graph visualization library: http://graphalchemist.github.io/Alchemy/#/


