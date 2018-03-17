/*
  Const variables
*/
var FORCE_LOAD_LOCAL_META_META_FILE = false; // load meta-meta.json from local
var FORCE_MOBILE = false; // Completely behaves like a mobile phone

// Seed node
var SEED_META_META_HOST = "goegrid-controller.ph2.physik.uni-goettingen.de";
var SEED_META_META_PORT = "8111";
var SEED_META_META_DIR = "sites/default";
var SEED_META_META_JSON = "meta-meta.json";

var configJson = "config.json";
var monitoringUrlsJson = "monitoring-urls.json";
var systemsJson = "systems.json";
var visualizersJson = "visualizers.json";
var logsJson = "logs.json";
var humansJson = "humans.json";

//var summaryJson = "data/json/summary.json";


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
    var host = config.host;
    if (!isMobilePlatform()) host = "localhost";
    return loadJson(host, config.port, config.dir, json);
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
    return "http://" + config.host + ":" + config.port + "/";
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

    // Normal meta-meta.json exists under "http://SEED_HOST:SEED_PORT/sites/default/meta-meta.json"
    metaMetaSites = loadJson(SEED_META_META_HOST, SEED_META_META_PORT, SEED_META_META_DIR, SEED_META_META_JSON);
    host = metaMetaSites[0].host;
    port = metaMetaSites[0].mobile_port;
    dir = metaMetaSites[0].dir;

} else {
    logger.setLevel(LoggerLevel.INFO);
    metaMetaSites = loadJson(host, port, "sites/default", meta_meta_json);

    // If the host and port are found in the meta-meta.json file, put the 'dir' variable
    for (var i = 0; i < metaMetaSites.length; i++) {
	if ((metaMetaSites[i].host == host) && (metaMetaSites[i].mobile_port == port)) {
		dir = metaMetaSites[i].dir;
		break;
	}
    }
    console.log("Identifying the request and set a site config from [" + host + ":" + port + "/" + dir + "] ...");
}

var config = loadJson(host, port, dir, configJson);
config.dir = dir;
var monitoringUrls = loadJsonByConfig(config, monitoringUrlsJson);
var summaryJson = config.data_dir + "/index/latest/summary.json";
var summary = loadJson(host, port, "", summaryJson);

var systems = loadJsonByConfig(config, systemsJson);
var visualizers = loadJsonByConfig(config, visualizersJson);
var logs = loadJsonByConfig(config, logsJson);
var humans = loadJsonByConfig(config, humansJson);
