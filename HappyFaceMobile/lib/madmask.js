/**********************************************
  Module madmask
  ================================


**********************************************/
//var sys = require('sys');
var fs = require('fs');
var request = require('sync-request');
var exec = require('child_process').exec;


/*
  Const variables
*/
var configJson = "config.json";
var systemsJson = "systems.json";
var monitoringUrlsJson = "monitoring-urls.json";
var logsJson = "logs.json";
var summaryTemplate = "summary_template";


/*
  Some useful functions
*/

function fileExists(filePath){
    try {
	//return fs.statSync(filePath).isFile();
      return fs.existsSync(filePath);
    } catch (err) {
	return false;
    }
}

function my_exec(commandLine){
    a = exec(commandLine, {maxBuffer: 2000 * 1024});
    a.stdout.pipe(process.stdout);
    a.stderr.pipe(process.stderr);
}



function getJsonUrl(host, port, json){
    var url = null;
    if ( host == "localhost" ) {
	url = json;
    } else {
	url = "http://" + host + ":" + port + "/" + json;
    }
    return url;
}


function loadJson(host, port, json){

    // Set Json
    var url = getJsonUrl(host, port, json);
    var content = null;
    if ( host == "localhost" ) {
	content = fs.readFileSync(url);
    } else {
	content = request('GET', url).body.toString('utf-8');
    }
    console.log("Reading [" + url + "] ...");
    return JSON.parse(content);
};


function makeDefaultSite(dir){
  // default site_dir dir or meta-meta.json does not, so make them
  if (!fileExists("sites/default")) my_exec("ln -vs " + dir.split('/').reverse()[0] + " sites/default");
};


/**********************************************

  Module madface

***********************************************/
module.exports = {
    ionic: function (dir, config, logdir, piddir) {
        // default site_dir dir or meta-meta.json does not, so make them
        makeDefaultSite(dir);

	// whatever
	console.log("Starting madmask server: port = " + config.port);
	var pidfile = piddir + "/ionic-server." + config.port;
	if (fileExists(pidfile)){
	    console.log("pidfile exists! [" + pidfile + "]");
	    process.exit(-1);
	}
	var logfile = logdir + "/ionic-server." + config.port + ".log";
	var commandLine = "forever start -a -l " + logfile + " --pidFile " + pidfile + " lib/ionic-server.js -p " + config.port;
	console.log("Executing ... [" + commandLine + "]");
	my_exec(commandLine);
    },

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

        // madfox -L $MADFOXD_LOGLEVEL -x $MADFOXD_X_DISPLAY -c $MADFOXD_CONFIG -u $MADFOXD_URLFILE -f $MADFOXD_FIREFOX_PROFILE -o $MADFOXD_DATA_HOME -l ${logfile_base} -p ${pidfile_base} -a $action
	// Calling madfox exec
	var commandLine = "madfox"
        + " -L " + config.log_level
	+ " -x :1000"
	+ " -c " + dir + "/" + configJson
	+ " -u " + dir + "/" + monitoringUrlsJson
	+ " -f " + config.firefox_profile
	+ " -o ."
        + " -a " + action;

	console.log("Executing ... [" + commandLine + "]");
	my_exec(commandLine);
    },

    call_madanalyzer: function (dir, config, action) {
	console.log("Calling MadAnalyzer ...");
        makeDefaultSite(dir);
        if (!action){
	  console.error("Error: Action is not defined!");
          process.exit(-1);
        }

	// Calling madanalyzer mediator
	var commandLine = "madanalyzer"
        + " -o ."
        + " -s " + dir
        + " -a " + action

	console.log("Executing ... [" + commandLine + "]");
	my_exec(commandLine);
    },

    run_log_collector: function (dir, config) {
      console.log("Collecting Log files ... ");
      var logs = JSON.parse(fs.readFileSync(dir + "/" + logsJson));
      for (var i = 0; i < logs.length; i++){
        var src_logfile = logs[i].file;
        var dst_logfile = config.data_dir + "/log/" + src_logfile.split('/').reverse()[0];
        var commandLine = "tail -n 10000 " + src_logfile + " > " + dst_logfile;
        console.log("LogCollector: " + commandLine);
        if (fileExists(src_logfile))
          my_exec("tail -n 10000 " + src_logfile + " > " + dst_logfile);
      }
    },

    build_android_apk: function (dir, config) {
      console.log("Building Android Application");
      my_exec("rm -v www/data; ionic build; ln -s ../data www/data");
    },

    wipe_data: function(dir, config) {
      console.log("Wiping old data in [" + config.capture + ", " + config.thumbnail + ", " + config.analysis + "] ...");
      my_exec("/usr/bin/tmpwatch -v -umc " + config.keep_data_days + "d " + config.capture);
      my_exec("/usr/bin/tmpwatch -v -umc " + config.keep_data_days + "d " + config.thumbnail);
      my_exec("/usr/bin/tmpwatch -v -umc " + config.keep_data_days + "d " + config.analysis);
    }
};
