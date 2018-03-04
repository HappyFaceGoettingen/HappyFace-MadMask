/**********************************************
  Module madmask
  ================================


**********************************************/
var sys = require('sys');
var fs = require('fs');
var request = require('sync-request');
var exec = require('child_process').exec;


/*
  Const variables
*/
var configJson = "config.json";
var systemsJson = "systems.json";
var monitoringUrlsJson = "monitoring-urls.json";

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
  console.log("dir = " + dir.split('/').reverse()[0] + " " + fileExists("sites/default"));
  if (!fileExists("sites/default")) my_exec("ln -vs " + dir.split('/').reverse()[0] + " sites/default");
  if (!fileExists("sites/meta-meta.json")) my_exec("ln -vs default/meta-meta.json sites/meta-meta.json");
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

    capture_browser: function (dir, config) {
	console.log("Capturing browser");
        makeDefaultSite(dir);

	// Capturing URLs
	var commandLine = "madfox"
        + " -L " + config.log_level
	+ " -u " + dir + "/" + monitoringUrlsJson
	+ " -o " + config.data_dir
	+ " -p " + config.firefox_profile
	+ " -x :1000"
        + " -a import";

	console.log("Executing ... [" + commandLine + "]");
	my_exec(commandLine);
    },

    start_analysis: function (dir, config) {
	console.log("Starting analysis");

	summaryTemplateDir = dir + "/" + summaryTemplate;

	// Using Bayesian Change Point analyser
	// In the future, various methods should be included
	var commandLine = "madanalyzer -m all"
	+ " -j " + getJsonUrl("localhost", "", dir + "/" + configJson)
	+ " -s " + getJsonUrl("localhost", "", dir + "/" + systemsJson)
	+ " -u " + getJsonUrl("localhost", "", dir + "/" + monitoringUrlsJson) +  " -o " + getJsonUrl("localhost", "", config.summary_json)
	+ " -c " + config.capture + " -a " + config.analysis + " -t " + summaryTemplateDir
	+ " -r " + config.analysis_image_size + " -e " + config.thumbnail
	+ " -n " + config.parallel_analysis
	+ " -x ";

	console.log("Executing ... [" + commandLine + "]");
	my_exec(commandLine);
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
