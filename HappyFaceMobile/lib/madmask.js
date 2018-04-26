/**********************************************
  Module madmask
  ================================


**********************************************/
var fs = require('fs');
var request = require('sync-request');
var exec = require('child_process').exec;


/**********************************************

  Const variables

***********************************************/
var configJson = "config.json";
var monitoringUrlsJson = "monitoring-urls.json";
var systemsJson = "systems.json";
var logsJson = "logs.json";

var LIMIT_LOG_LINES = 1000;
var COMMAND_MAXBUFFER = 2000 * 1024;


/**********************************************

  Some useful functions (sehr bequem)

***********************************************/
function fileExists(filePath){
    try {
      return fs.existsSync(filePath);
    } catch (err) {
	return false;
    }
}


function my_exec(commandLine){
    a = exec(commandLine, {maxBuffer: COMMAND_MAXBUFFER});
    a.stdout.pipe(process.stdout);
    a.stderr.pipe(process.stderr);
}


function readJSON(jsonFile) {
  return JSON.parse(fs.readFileSync(jsonFile));
};


function makeDefaultSite(dir){
  // default site_dir dir does not exist, so make it
  if (!fileExists("sites/default")) my_exec("ln -vs " + dir.split('/').reverse()[0] + " sites/default");
};


function run_madfox(dir, config, action) {
  // Calling madfox Meta-Browser daemon
  var commandLine = "madfox"
                  + " -L " + config.log_level
	          + " -x :1000"
	          + " -c " + dir + "/" + configJson
	          + " -u " + dir + "/" + monitoringUrlsJson
	          + " -f " + config.firefox_profile
	          + " -o ."
                  + " -a " + action;
  return commandLine;
};


function run_madanalyzer(dir, config, action) {
  // Calling madanalyzer analytics mediator
  var commandLine = "madanalyzer"
                  + " -o ."
                  + " -s " + dir
                  + " -a " + action;
  return commandLine;
};


function run_build_command(platform, cordova_ver, sdk_bin, apks, apk_dir) {
  // Removing a symlink (data) in 'www' dir, and building debug apk and release apk. Creating the symlink again
  var commandLine =   "ls " +  apk_dir + "/*.apk &> /dev/null && rm -v " + apk_dir + "/*.apk;"
                  + "ls " +  apks + " &> /dev/null && rm -v " + apks + ";"
                  + "if ! which " + platform + "; then"
                  + " echo '[" + platform + "] command does not exist';"
                  + "else"
                  + " test -e " + apk_dir + " || mkdir -pv " + apk_dir + ";"
                  + " ionic cordova platform remove " + platform + ";"
                  + " ionic cordova platform add " + platform + "@" + cordova_ver + ";"
                  + " rm -v www/data;"
                  + " ionic cordova build " + platform + " && ionic cordova build " + platform + " --prod --release;"
                  + " ln -vs ../data www/data;"
                        + " cp -v " + apks + " " + apk_dir + ";"
                  + "fi";

  return commandLine;
};


/**********************************************

  Madmask functions exported from this library
   Note: generally speaking, the followings are only mediators and some useful wrapper commands.

***********************************************/
module.exports = {

    /*
     * An Ionic server starter. The given port in 'config.json' is used to start and control the Ionic server.
     *  Note: to stop the ionic server, run 'forever stopall'.
     */
    ionic: function (dir, config, logdir, piddir) {
      makeDefaultSite(dir);

      console.log("Starting madmask server: port = " + config.port);

      // Setting up LOG and PID files
      var pidfile = piddir + "/ionic-server." + config.port;
      if (fileExists(pidfile)){
	console.log("pidfile exists! [" + pidfile + "]");
	process.exit(-1);
      }
      var logfile = logdir + "/ionic-server." + config.port + ".log";

      // Starting an Ionic server by the "forever" library. The "forever" command is calling lib/ionic-server.js
      var commandLine = "forever start -a -l " + logfile + " --pidFile " + pidfile + " lib/ionic-server.js -p " + config.port;
      console.log("Executing ... [" + commandLine + "]");
      console.log(" * To list the running Ionic servers:  forever list");
      console.log(" * To stop the running Ionic servers:  forever stopall");
      my_exec(commandLine);
    },


    /*
     * The "systems.json" tempate generator
     *  The systems giving monitoring information are defined by an array "systems" in monitoring-urls.json
     */
    generate_systems_json: function (dir, config) {
      var newSystemsJson = dir + "/" + systemsJson;
      console.log("Generating [", newSystemsJson, "] ...");
      makeDefaultSite(dir);

      // Reading all system compnents from monitoring-urls.json
      var urls = readJSON(dir + "/" + monitoringUrlsJson);
      var overall_systems = [];

      for (var i = 0; i < urls.length; i++){
        for (var j = 0; j < urls[i].urls.length; j++){
          var systems = urls[i].urls[j].systems;
          if (systems.length != 0)
            overall_systems = overall_systems.concat(systems);
        }
      }

      // Take unique system components
      var unique_systems = overall_systems.filter(function (x, i, self) {
            return self.indexOf(x) === i; });

      // Generating a [system.json] template
      console.log("Number of the basic system components = " + unique_systems.length);
      var template = "[{\n";
      for (var k = 0; k < unique_systems.length; k++){
        // console.log(unique_systems[k]);
        // Output the following basic element
        template = template
                 + "\t\"name\": \"" + unique_systems[k] + "\",\n"
                 + "\t\"text\": \"System [" + unique_systems[k] + "]\",\n"
                 + "\t\"img\":  \"img/default_server.png\",\n"
                 + "\t\"dependent\":  [],\n"
                 + "\t\"services\": [{\n"
                 + "\t\t\"type\": \"ssh\",\n"
                 + "\t\t\"name\": \"Restart\",\n"
                 + "\t\t\"text\": \"Send restart command to [" + unique_systems[k] + "]\",\n"
                 + "\t\t\"command\": \"restart " + unique_systems[k].replace(/ /g, "_") + "\"\n"
                 + "\t\t}]\n";


        if (k < unique_systems.length - 1) template = template + "  },{\n";
      }
      template = template + "\n}]\n";

      // Output a [system.json] template
      console.log("Writing into new [" + newSystemsJson + "] template ...");
      fs.writeFile(newSystemsJson, template)
    },

    /*
     * MadBrowser mediator using the 'madfox' command
     */
    call_madbrowser: function (dir, config, action) {
      console.log("Calling MadBrowser ...");
      makeDefaultSite(dir);

      if (!action){
	console.error("Error: Action is not defined!");
        process.exit(-1);
      }

      if ((action!= 'status') && (action != 'reload') &&
          (action != 'capture') && (action != 'import')) {
	console.error("Error: Action [" + action + "] is not defined!");
        process.exit(-1);
      }

      var commandLine = run_madfox(dir, config, action);
      console.log("Executing ... [" + commandLine + "]");
      my_exec(commandLine);
    },


    /*
     * MadAnalyzer mediator using the 'madanalyzer' command
     */
    call_madanalyzer: function (dir, config, action) {
      console.log("Calling MadAnalyzer ...");
      makeDefaultSite(dir);

      if (!action){
	console.error("Error: Action is not defined!");
        process.exit(-1);
      }

      var commandLine = run_madanalyzer(dir, config, action);
      console.log("Executing ... [" + commandLine + "]");
      my_exec(commandLine);
    },

    /*
     * MadBrowser and MadAnalyzer mediators called by CRON jobs
     */
    call_cronRun(dir, config, wait) {
      console.log("Running a CRON job ...");
      makeDefaultSite(dir);

      var commandLine = 'time eval \"';

      // Reload & Capture & Import
      commandLine = commandLine + run_madfox(dir, config, 'reload') + '; sleep ' + wait + ';';
      commandLine = commandLine + run_madfox(dir, config, 'capture') + '; sleep ' + wait + ';';
      commandLine = commandLine + run_madfox(dir, config, 'import') + ';';

      // Analyze
      commandLine = commandLine + run_madanalyzer(dir, config, 'all');

      // end
      commandLine = commandLine + '\"';

      console.log("Executing ... [" + commandLine + "]");
      my_exec(commandLine);
    },

    /*
     * Log Collector. The original log files are defined by "logs.json".
     * The log files are coped into config.data_dir + "/logs" directory.
     */
    run_log_collector: function (dir, config) {
      console.log("Collecting Log files ... ");
      makeDefaultSite(dir);

      // Checking and making log_dir
      if (!fileExists(config.data_dir)) {
        console.log("["+ config.data_dir + "] directory does not exist!");
	process.exit(-1);
      }
      var log_dir = config.data_dir + "/log";
      if (!fileExists(log_dir)) my_exec("mkdir -v " + log_dir);

      // Collecting log files into log_dir
      var logs = readJSON(dir + "/" + logsJson);
      for (var i = 0; i < logs.length; i++){
        var src_logfile = logs[i].file;
        var dst_logfile = log_dir + "/" + src_logfile.split('/').reverse()[0];
        var commandLine = "tail -n " + LIMIT_LOG_LINES + " " + src_logfile + " > " + dst_logfile;
        if (! fileExists(src_logfile)) {
          console.log("LogCollector: [" + src_logfile + "] does not exist");
        } else {
          console.log("LogCollector: " + commandLine);
          my_exec(commandLine);
        }
      }
    },


    /*
     * Mobile Application builder.
     */
    build_mobile_application: function (dir, config, platform) {
      console.log("Building Mobile Application for [" + platform + "] ...");

      // Creating apk dir in data dir (typically data/site_name/application/*apk)
      var apk_dir = config.data_dir + "/application";

      if ((platform != 'android') && (platform != 'ios')) {
	console.error("Error: Platform [" + platform + "] is not defined!");
        process.exit(-1);
      }

      // Making Build command
      var commandLine = "";
      if (platform == 'android') {
        var apks = "platforms/android/build/outputs/apk/*.apk";
        commandLine = run_build_command(platform, "6.1.0", "android", apks, apk_dir);
      }

      if (platform == 'ios') {
        var apks = "platforms/ios/build/outputs/apk/*.apk";
        commandLine = run_build_command(platform, "4.5.4", "xcode", apks, apk_dir);
      }

      console.log("Mobile Application Builder: " + commandLine);
      my_exec(commandLine);
    },


    /*
     * Outdated data wiper using 'tmpwatch'. This command can periodically wipe out data which is older than 'config.keep_data_days' days
     */
    wipe_data: function(dir, config) {
      var count = 10; // Running tmpwatch 10 times
      var commandLine = "seq 1 " + count + " | xargs -I {} tmpwatch -v -a -m " + config.keep_data_days + "d " + config.data_dir;
      console.log("Wiping out old data in [" + config.data_dir + "]: " + commandLine);
      my_exec(commandLine);
    }
};
