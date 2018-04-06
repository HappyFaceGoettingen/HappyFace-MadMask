/*
  Const variables
*/
// Some debug switches
var FORCE_LOAD_LOCAL_META_META_FILE = false; // load meta-meta.json from local
var FORCE_MOBILE = false; // Completely behaves like a mobile phone (even in a web browser)

// Seed node (= for mobile app. This node must always run, otherwise the app does not start at all)
var SEED_META_META_HOST = "141.5.108.30";
var SEED_META_META_MOBILE_PORT = "20100";
var SEED_META_META_WEB_PORT = "10100";
var SEED_META_META_DIR = "sites/default";
var SEED_META_META_JSON = "meta-meta.json";


function loadJson(host, port, dir, json){

    // Set Json (But, not Json yet... Just js source files for now)
    var url = null;
    var jsonContent = null;

    // Making URL
    if ( host == "localhost" ) {
        url = dir + "/" + json;
    } else {
        url = "http://" + host + ":" + port + "/" + dir + "/" + json;
    }

    // Getting data
    console.log("Reading [" + url + "] ...");

    var jsonContent = readFileAsync(url);
    //console.log(jsonContent);
    return JSON.parse(jsonContent);
};


function loadJsonByConfig(config, json){
    var host = location.hostname;
    var port = location.port;
    if (!isMobilePlatform()) host = "localhost";
    return loadJson(host, port, config.dir, json);
};


// Implementing an asynchronous read method
function readFileAsync(url){
    var req = new XMLHttpRequest();
    req.open("GET", url, false); // 'false': synchronous.
    req.send(null);

    return req.responseText;
};


function isMobilePlatform(){

    // Experimenting mobile phone. (Note: please disable CORS in a browser)
    if (FORCE_MOBILE) {
	logger.setLevel(LoggerLevel.DEBUG);
	return true;
    }

    if (navigator.userAgent.match(/android/i)) return true;
    return false;
}


function getMobileUrl(){
    if (!isMobilePlatform()) return "";
    return "http://" + location.hostname + ":" + config.port + "/";
}


function isHttpUrl(str){
    // Checking protocol (true = {http|https}, false = dir)
    var pattern = new RegExp('^(http|https)(:\\/\\/)');
    return pattern.test(str);
}




/*
  Loading JSON variables
 */
// Default mode is connectiong to a local Meta-Monitoring system
var host = location.hostname;
var port = location.port;
var dir = "sites/default";
var meta_meta_json = "meta-meta.json"


// Defaut mode of mobile phone is Meta-Meta Monitoring client
var metaMetaSites = null;
if (FORCE_LOAD_LOCAL_META_META_FILE){
    logger.setLevel(LoggerLevel.DEBUG);

    // Normal meta-meta.json exists under "http://host:port/sites/default/meta-meta.json"
    metaMetaSites = loadJson("localhost", port, "sites/default", meta_meta_json);
    host = metaMetaSites[0].host;
    port = metaMetaSites[0].mobile_port;
    dir = metaMetaSites[0].dir;
    console.log("Identifying the request and set a site config from [" + host + ":" + port + "/" + dir + "] ...");

} else if (isMobilePlatform()){
    logger.setLevel(LoggerLevel.INFO);

    // Normal meta-meta.json exists under "http://SEED_HOST:SEED_PORT/SEED_DIR/meta-meta.json"
    metaMetaSites = loadJson(SEED_META_META_HOST, SEED_META_META_MOBILE_PORT, SEED_META_META_DIR, SEED_META_META_JSON);
  /*
    host = metaMetaSites[0].host;
    port = metaMetaSites[0].mobile_port;
    dir = metaMetaSites[0].dir;
   */
   host = SEED_META_META_HOST;
   port = SEED_META_META_MOBILE_PORT;
   dir  = SEED_META_META_DIR;

} else {
    logger.setLevel(LoggerLevel.INFO);
    metaMetaSites = loadJson(host, port, "sites/default", meta_meta_json);

    /*
     *  Note: If the host and port are found in the meta-meta.json file, put the 'dir' variable
     *  This routine is useful when 1 node is providing 2 Ionic servers (e.g. 8111 -> ADC, 8112 -> DE)
     *  When a client accesses 8111, then DE dir (=sites/DE) is loaded, then the UI can be used for DE.
     */
    for (var i = 0; i < metaMetaSites.length; i++) {
	if ((metaMetaSites[i].host == host) && (metaMetaSites[i].mobile_port == port)) {
		dir = metaMetaSites[i].dir;
		break;
	}
    }
    console.log("Identifying the request and set a site config from [" + host + ":" + port + "/" + dir + "] ...");
}


/*
 *
 * ==============================================================
 *   Configuring the site dependent JSON files with an Ionic server
 *    (= MadMask instance)
 * ==============================================================
 *
 * The locations of JSON files are:
 *    E.g. "site_dir = sites/GoeGrid"
 *   http://host:port/site_dir/config.json           --> Basic Configuration (FacJsonContents.js: Config)
 *   http://host:port/site_dir/monitoring-urls.json  --> tab-monitoring.html (FacJsonContents.js: MonitoringUrls)
 *   http://host:port/site_dir/systems.json          --> tab-controller.html (FacJsonContents.js: Systems)
 *   http://host:port/site_dir/visualizers.json      --> tab-visualizer.html (FacJsonContents.js: Visualizers)
 *   http://host:port/site_dir/logs.json             --> tab-logs.html       (FacJsonContents.js: Logs)
 *   http://host:port/site_dir/humans.json           --> tab-humans.html     (FacJsonContents.js: Humans)
 *
 *
 *  The human-readable analysis summary is taken from:
 *    E.g. "data_dir = data/GoeGrid"
 *   http://host:port/data_dir/index/latest/summary.json   ---> tab-monitoring.html, tab-analyzer.html  (FacJsonContents.js: Summary)
 *
 *  Analysis plots (in tab-analyzer.html) are taken from:
 *   http://host:port/data_dir/analysis/                   ---> tab-analyzer.html (See FacJsonContents.js - MonitoringURLs. The locations are still hard-coded)
 *   http://host:port/data_dir/index_latest/analysis.json  ---> tab-analyzer.html (Not yet implemented!)
 *
 *
 * ==========================================
 *   Note: About HappyFace Web Instance
 * ==========================================
 *
 *  Except the following rules, the locations are the same.
 *   Port: The access port uses "web_port" in meta-meta.json or config.json.
 *   Dir: The directories are under "static/{site_dir/data_dir} ...".
 *
 */

var configJson = "config.json";
var monitoringUrlsJson = "monitoring-urls.json";
var systemsJson = "systems.json";
var visualizersJson = "visualizers.json";
var logsJson = "logs.json";
var humansJson = "humans.json";


var config = loadJson(host, port, dir, configJson);
// Overwriting config.dir in case there are 2 different Ionic servers on this node
config.dir = dir;

var monitoringUrls = loadJsonByConfig(config, monitoringUrlsJson);
var summaryJson = config.data_dir + "/index/latest/summary.json";
var summary = loadJson(host, port, "", summaryJson);

var systems = loadJsonByConfig(config, systemsJson);
var visualizers = loadJsonByConfig(config, visualizersJson);
var logs = loadJsonByConfig(config, logsJson);
var humans = loadJsonByConfig(config, humansJson);
