/**********************************************
  Module madface
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
var emailsJson = "emails.json";
var serversJson = "servers.json";
var monitoringUrlsJson = "monitoring-urls.json";

var summaryTemplate = "summary_template";


/*
  Some useful functions
*/

function fileExists(filePath){
    try {
	return fs.statSync(filePath).isFile();
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



/**********************************************

  Module madface

***********************************************/
module.exports = {
    ionic: function (dir, config, logdir, piddir) {
	// whatever
	console.log("Starting madface server: port = " + config.port);
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

    virtual_xwin: function(dir, config, mode){
	if (mode == "ON"){
	    console.log("Starting Virtual Xwin");
	    // Capturing URLs
	    var commandLine = "bin/virtual-xwin-invoker"
	    + " -j " + getJsonUrl("localhost", "", dir + "/" + configJson)
	    + " -m ON";
	} else {
	    console.log("Stopping Virtual Xwin");
	    var commandLine = "bin/virtual-xwin-invoker"
	    + " -j " + getJsonUrl("localhost", "", dir + "/" + configJson)
	    + " -m OFF"
	}

	console.log("Executing ... [" + commandLine + "]");
	my_exec(commandLine);
    },

    start_adminserver: function(dir, config, mode) {
	console.log("Starting admin server: port = " + config.admin_port);
    },

    capture_browser: function (dir, config) {
	console.log("Capturing browser");

	// Capturing URLs
	var commandLine = "bin/browser-capture-processor"
	+ " -j " + getJsonUrl("localhost", "", dir + "/" + configJson)
	+ " -u " + getJsonUrl("localhost", "", dir + "/" + monitoringUrlsJson)
	+ " -o " + config.capture + " -t " + config.thumbnail
	+ " -p " + config.firefox_profile
	+ " -x " + "-d " + config.debug_mode;
	console.log("Executing ... [" + commandLine + "]");
	my_exec(commandLine);
    },


    make_reference: function (dir, config) {
	console.log("making reference");

	// Outputting reference
	my_exec("bin/reference-invoker");
    },


    start_analysis: function (dir, config) {
	console.log("Starting analysis");

	summaryTemplateDir = dir + "/" + summaryTemplate;

	// Using Bayesian Change Point analyser
	// In the future, various methods should be included
	var commandLine = "bin/analysis-processor -m all"
	+ " -j " + getJsonUrl("localhost", "", dir + "/" + configJson)
	+ " -s " + getJsonUrl("localhost", "", dir + "/" + serversJson)
	+ " -u " + getJsonUrl("localhost", "", dir + "/" + monitoringUrlsJson) +  " -o " + getJsonUrl("localhost", "", config.summary_json)
	+ " -c " + config.capture + " -a " + config.analysis + " -t " + summaryTemplateDir
	+ " -r " + config.analysis_image_size + " -e " + config.thumbnail
	+ " -n " + config.parallel_analysis
	+ " -x ";

	console.log("Executing ... [" + commandLine + "]");
	my_exec(commandLine);
    },


    output_voice: function (dir, config) {
	console.log("Outputting voice");

	var summary = loadJson(config.host, config.port, config.summary_json);

	// Outputting voice
	if (summary.level) {
	    console.log(summary.text);
	    my_exec("bin/voice-speech-invoker -i "+"\"" + summary.text + "\"");
	}
    },


    send_email: function (dir, config) {
	console.log("Sending email");
	// Read summary file
	var voice = loadJson(config.host, config.port, config.voice_json);

	var level = voice.level; // Normal, Warning, Critical
	var email_subject = "[MadFace notification]: " + voice.level;
	var email_text = voice.text;

	// sending email
	if (voice.level) {
	    if (voice.level == "Normal") {
		console.log("Level is Normal");
	    } else {
		my_exec("bin/email-notification-invoker -i "+"");
	    }
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
