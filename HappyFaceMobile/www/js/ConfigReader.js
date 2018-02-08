/*
  Const variables
*/
var LOAD_LOCAL_META_META_FILE = false; // load meta-meta.json from local
var FORCE_MOBILE = false; // Completely behaves like a mobile phone

var META_META_JSON_HOST = "goegrid-controller.ph2.physik.uni-goettingen.de";
var META_META_JSON_PORT = "8111";
var META_META_DIR = "sites";
var META_META_JSON = "meta-meta.json";

var configJson = "config.json";
var emailsJson = "emails.json";
var serversJson = "servers.json";
var monitoringUrlsJson = "monitoring-urls.json";

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
// Default mode is Meta-Monitoring server
var host = "localhost";
var port = null;
var dir = "sites/default";

// Defaut mode of mobile phone is Meta-Meta Monitoring client
var metaMetaSites = null;
if (LOAD_LOCAL_META_META_FILE){
    logger.setLevel(LoggerLevel.DEBUG);
    metaMetaSites = loadJson("localhost", META_META_JSON_PORT, META_META_DIR, META_META_JSON);
    host = metaMetaSites[0].host;
    port = metaMetaSites[0].port;
    dir = metaMetaSites[0].dir;

} else if (isMobilePlatform()){
    logger.setLevel(LoggerLevel.INFO);
    metaMetaSites = loadJson(META_META_JSON_HOST, META_META_JSON_PORT, META_META_DIR, META_META_JSON);
    host = metaMetaSites[0].host;
    port = metaMetaSites[0].port;
    dir = metaMetaSites[0].dir;

} else {
    logger.setLevel(LoggerLevel.INFO);
    metaMetaSites = loadJson("localhost", META_META_JSON_PORT, META_META_DIR, META_META_JSON);
    host = location.hostname;
    port = location.port;
    
    for (var i = 0; i < metaMetaSites.length; i++) {
	if ((metaMetaSites[i].host == host) && (metaMetaSites[i].port == port)) {
		dir = metaMetaSites[i].dir;
		break;
	}
    }
    console.log("Identifying the request [" + host + ":" + port + "/" + dir + "] ...");
}

var config = loadJson(host, port, dir, configJson);
config.dir = dir;
var monitoringUrls = loadJsonByConfig(config, monitoringUrlsJson);
var servers = loadJsonByConfig(config, serversJson);
var emails = loadJsonByConfig(config, emailsJson);

var summaryJson = config.summary_json;
var summary = loadJson(host, port, "", summaryJson);
