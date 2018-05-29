webpackJsonp([0],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export modelCounter */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_modals_error_connection_error__ = __webpack_require__(204);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var modelCounter = 0;
let DataModel = DataModel_1 = class DataModel {
    constructor(plt, storage, modalCtrl) {
        this.plt = plt;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        //host:string = "141.5.108.30"; // HOST and PORT have initial values due to the third option in constructor
        //port:string = "20200";        // NOTE: This might get fixed (=removed) in the future
        //dir :string = "sites/default";
        this.config = null;
        this.monitoringUrls = null;
        this.summary = null;
        this.systems = null;
        this.visualizers = null;
        this.logs = null;
        this.humans = null;
        this.analysis = null;
        // __backup        :InstanceObject = new InstanceObject(); (unused)
        this.currentlyActive = new InstanceObject();
        this.configuration = new ConfigurationObject();
        // Deprecated
        /*static loadJSON(host:string, port:string, dir:string, json:string, callback: (response:any) => void, errCallback: (response:any) => any)
        {
          let url:string = "";
          //let jsonContent:string = "";
    
          if(host === "localhost") url = dir + "/" + json;
          else url = "http://" + host + ":" + port + "/" + dir + "/" + json;
    
          console.log("READING: " + url);
    
          this.readFileAsync(url, callback, errCallback);
        } */
        // Deprecated
        /* static loadJsonByConfig(config:ConfigObject, json:string, callback: (response:any) => void, errCallback: (response:any) => any)
        {
          //ConfigReader.loadJSON(ConfigReader.current.host, (this.isMobilePlatform() ? ConfigReader.current.mobile_port : ConfigReader.current.web_port),
          //            config.data_dir, json, callback, errCallback);
          if(config.dir == null || config.dir == undefined) { config.dir = "sites/default"; console.log("USING REPLACEMENT FOR CONFIG.DIR"); }
          //this.loadJSON(DataModel.getInstance().currentlyActive.host, DataModel.getInstance().currentlyActive.mobile_port, config.dir, json, callback, errCallback);
    
        }*/
        /* (unused)
        static readFileAsync(url:string, callback: (response:any) => void, errCallback: (response:any) => void)
        {
            let req:XMLHttpRequest = new XMLHttpRequest();
            try {
                req.addEventListener("load", (event) => { callback(req.response); });
                req.addEventListener("error", (event) => { errCallback(req.response); });
                req.open("GET", url, false);
                req.send();
            } catch(error) {
                console.log("ERROR occurred: ", error);
                errCallback(error);
            }
        }*/
        // Asynchronous file loading
        this.loadingFinishedCallbacks = [];
        this.loadingStartedCallbacks = [];
        this.loading = false;
        this.loadingFailed = false;
        /* Deprecated
        reload2()
        {
            this.loading = true;
            for(let i:number = 0; i < this.loadingStartedCallbacks.length; i++)
            {
                console.log("Started start callback");
                this.loadingStartedCallbacks[i]();
            }
    
            this.config = this.syncLoadFile(this.getRemoteURL() + this.currentlyActive.dir + "/" + DataModel.configJson);
    
            let urls:string[] = [ DataModel.monitoringUrlsJson, DataModel.systemsJson, DataModel.visualizersJson,
                                  DataModel.logsJson, DataModel.humansJson, DataModel.meta_meta_json, DataModel.summaryJson ];
    
            // Find data_dir for summary JSON TODO Improve. This configuration is not secure
            let summary_data_dir:string = "data/" + this.currentlyActive.name; //this.currentlyActive.dir.replace("sites", "data");
    
            for(let i:number = 0; i < urls.length; i++) {
                if(this.currentlyActive.host === "localhost") urls[i] = this.currentlyActive.dir + "/" + urls[i];
                else urls[i] = "http://" + this.currentlyActive.host + ":" + this.currentlyActive.mobile_port + "/" +  //TODO Mobile Port is still the only used one.
                    (i == urls.length -1 ? summary_data_dir : this.currentlyActive.dir) + "/" + urls[i];
            }
    
            this.readFileListAsync(urls, this.finishingCallback.bind(this));
        }*/
        this.errors = [];
        this.plot_name = "analysis";
        // Loop
        this.loopHandler = null;
        this.loopCounter = 0;
        modelCounter++;
        console.log("DataModel creation counter: " + modelCounter);
        this.plt.ready().then(_ => {
            this.findInitialConfiguration();
            this.initLoop();
        });
    }
    addLoadingFinishedCallback(callback) { this.loadingFinishedCallbacks.push(callback); }
    removeLoadingFinishedCallback(callback) {
        this.loadingFinishedCallbacks = this.loadingFinishedCallbacks.filter(obj => obj !== callback);
    }
    addLoadingStartedCallback(callback) { this.loadingStartedCallbacks.push(callback); }
    removeLoadingStartedCallback(callback) {
        this.loadingStartedCallbacks = this.loadingStartedCallbacks.filter(obj => obj !== callback);
    }
    isLoading() { return this.loading; }
    isLoadingFailed() { return this.loadingFailed; }
    reload() {
        this.loading = true;
        this.loadingFailed = false;
        this.errors = [];
        for (let i = 0; i < this.loadingStartedCallbacks.length; i++) {
            console.log("Started start callback");
            this.loadingStartedCallbacks[i]();
        }
        this.asyncLoadFile(this.getRemoteURL() + this.currentlyActive.dir + "/" + DataModel_1.configJson, this.reload_next.bind(this));
    }
    reload_next(content, statusCode) {
        if (statusCode == 200)
            this.config = JSON.parse(content);
        else {
            this.errors.push({ "url": this.getRemoteURL() + this.currentlyActive.dir + "/" + DataModel_1.configJson, "code": statusCode });
            this.initError();
            this.loadingFailed = true;
            this.loading = false;
            for (let i = 0; i < this.loadingFinishedCallbacks.length; i++) {
                console.log("Started finished callback");
                this.loadingFinishedCallbacks[i]();
            }
            return;
        }
        let urls = [DataModel_1.monitoringUrlsJson, DataModel_1.systemsJson, DataModel_1.visualizersJson,
            DataModel_1.logsJson, DataModel_1.humansJson, DataModel_1.meta_meta_json, DataModel_1.summaryJson, DataModel_1.analysisJson];
        for (let i = 0; i < urls.length; i++) {
            if (this.currentlyActive.host == "localhost")
                urls[i] = this.currentlyActive.dir + "/" + urls[i];
            else
                urls[i] = this.getRemoteURL() + ((i == urls.length - 2) || (i == urls.length - 1)
                    ? this.config.data_dir : this.currentlyActive.dir) + "/" + urls[i];
        }
        this.readFileListAsync(urls, this.finishingCallback.bind(this));
    }
    readFileListAsync(urls, callback) {
        let results = new Array(urls.length);
        let statusCodes = new Array(urls.length);
        let remainingCounter = urls.length;
        for (let i = 0; i < urls.length; i++) {
            console.log("READING: " + urls[i]);
            let req = new XMLHttpRequest();
            req.onreadystatechange = (function (i, req) {
                return function () {
                    if (req.readyState == 4) {
                        results[i] = req.response;
                        statusCodes[i] = req.status;
                        remainingCounter--;
                        if (remainingCounter == 0)
                            callback(results, statusCodes);
                    }
                };
            }(i, req));
            req.open("GET", urls[i], true);
            req.send();
        }
    }
    finishingCallback(responses, statusCodes) {
        //console.log("THIS: " + JSON.stringify(this));
        //if(statusCodes[0] == 200) this.config = JSON.parse(responses[0]);
        //else this.config = null;
        // Prevent error through missing urls and systems
        if (statusCodes[6] == 200 && responses[6])
            responses[6] = responses[6].replace("__SYSTEMS_ARRAY__", "\"__SYSTEMS_ARRAY__\"").replace("__URLS_ARRAY__", "\"__URLS_ARRAY__\"");
        if (statusCodes[0] == 200)
            this.monitoringUrls = JSON.parse(responses[0]);
        else {
            this.monitoringUrls = null;
            this.pushError(DataModel_1.monitoringUrlsJson, statusCodes[0]);
        }
        if (statusCodes[1] == 200)
            this.systems = JSON.parse(responses[1]);
        else {
            this.systems = null;
            this.pushError(DataModel_1.systemsJson, statusCodes[1]);
        }
        if (statusCodes[2] == 200)
            this.visualizers = JSON.parse(responses[2]);
        else {
            this.visualizers = null;
            this.pushError(DataModel_1.visualizersJson, statusCodes[2]);
        }
        if (statusCodes[3] == 200)
            this.logs = JSON.parse(responses[3]);
        else {
            this.logs = null;
            this.pushError(DataModel_1.logsJson, statusCodes[3]);
        }
        if (statusCodes[4] == 200)
            this.humans = JSON.parse(responses[4]);
        else {
            this.humans = null;
            this.pushError(DataModel_1.humansJson, statusCodes[4]);
        }
        if (statusCodes[5] == 200)
            this.metaMetaSites = JSON.parse(responses[5]);
        else {
            this.metaMetaSites = null;
            this.pushError(DataModel_1.meta_meta_json, statusCodes[5]);
        }
        if (statusCodes[6] == 200)
            this.summary = JSON.parse(responses[6]);
        else {
            this.summary = null;
            this.pushError(DataModel_1.summaryJson, statusCodes[6]);
        }
        if (statusCodes[7] == 200)
            this.analysis = JSON.parse(responses[7]);
        else {
            this.analysis = null;
            this.pushError(DataModel_1.analysisJson, statusCodes[7]);
        }
        this.loading = false;
        this.loadingFailed = this.errors.length > 6;
        if (this.loadingFailed) {
            this.loading = false;
            this.initError();
        }
        for (let i = 0; i < this.loadingFinishedCallbacks.length; i++) {
            console.log("Started finished callback");
            this.loadingFinishedCallbacks[i]();
        }
    }
    // Asynchronous load file
    asyncLoadFile(url, callback) {
        console.log("READING: " + url);
        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                callback(req.response, req.status);
            }
        };
        req.open("GET", url, true);
        req.send();
    }
    // Synchronous load JSON file (for config)
    syncLoadFile(url) {
        console.log("Loading: " + url);
        let result = null;
        let req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                result = JSON.parse(req.response);
            }
        };
        req.onerror = () => { console.log("ERROR LOADING FILE SYNC."); result = null; };
        req.open("GET", url, false);
        req.send();
        return result;
    }
    initError() {
        let preset = this.configuration.get().automaticFetch;
        this.configuration.setAutomaticFetch(false);
        console.log("ERROR initialized");
        const modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_modals_error_connection_error__["a" /* ConnectionErrorPage */], { "host": this.currentlyActive.host, "mport": this.currentlyActive.mobile_port,
            "wport": this.currentlyActive.web_port, "errors": this.errors });
        modal.onDidDismiss(data => {
            if (!(data == null || data == undefined || data.retry == null || data.retry == undefined) && data.retry) {
                this.currentlyActive.host = data.host;
                this.currentlyActive.web_port = data.wport;
                this.currentlyActive.mobile_port = data.mport;
                this.reload();
                this.configuration.setAutomaticFetch(preset);
                if (data.save != null || data.save != undefined || data.save)
                    this.storage.set('instance', this.currentlyActive);
            }
            else {
                this.configuration.setAutomaticFetch(preset);
            }
        });
        modal.present();
    }
    // Helpers
    getRemoteURL() {
        if (this.configuration.get().happyFaceCompatible)
            return "http://" + this.currentlyActive.host + ":" + this.currentlyActive.web_port + "/" + "static/";
        else
            return "http://" + this.currentlyActive.host + ":" + this.currentlyActive.mobile_port + "/";
    }
    isHttpURL(url) {
        return new RegExp('^(http|https)(:\\/\\/)').test(url);
    }
    pushError(website, code) {
        this.errors.push({ "url": this.getRemoteURL() + this.currentlyActive.dir + "/" + website, "code": code });
    }
    setLinks(datetime_dir) {
        if (!this.config)
            return;
        //let model:DataModel = DataModel.getInstance();
        let remote_url = this.getRemoteURL();
        let config = this.config;
        let capture_dir = config.data_dir + "/capture";
        let thumbnail_dir = config.data_dir + "/thumbnail";
        let analysis_dir = config.data_dir + "/analysis";
        if (this.configuration.get().enableMadVision) {
            capture_dir = analysis_dir + "/madvision";
            thumbnail_dir = analysis_dir + "/madvision_thumbnail";
        }
        let plot_analysis_dir = analysis_dir + "/plot_analysis/latest";
        let plot_pathway_dir = analysis_dir + "/plot_pathway/latest";
        for (let i = 0; i < this.monitoringUrls.length; i++) {
            for (let j = 0; j < this.monitoringUrls[i].urls.length; j++) {
                if ((this.monitoringUrls[i].urls[j].file_prefix == null)) {
                    this.monitoringUrls[i].urls[j].thumbnail = remote_url + "assets/img/img-missing.svg";
                    this.monitoringUrls[i].urls[j].image = remote_url + "assets/img/img-missing.svg";
                    this.monitoringUrls[i].urls[j].analysis_plot = remote_url + "assets/img/img-missing.svg";
                    this.monitoringUrls[i].urls[j].plot_pathway = remote_url + "assets/img/img-missing.svg";
                    this.monitoringUrls[i].urls[j].plot_overall_pathway = remote_url + "assets/img/img-missing.svg";
                }
                else {
                    this.monitoringUrls[i].urls[j].thumbnail = remote_url + thumbnail_dir + "/" + datetime_dir + "/" + this.monitoringUrls[i].urls[j].file_prefix + ".jpg";
                    this.monitoringUrls[i].urls[j].image = remote_url + capture_dir + "/" + datetime_dir + "/" + this.monitoringUrls[i].urls[j].file_prefix + ".jpg";
                    this.monitoringUrls[i].urls[j].plot_analysis = remote_url + plot_analysis_dir + "/" + this.monitoringUrls[i].urls[j].file_prefix + ".png";
                    this.monitoringUrls[i].urls[j].plot_pathway = remote_url + plot_pathway_dir + "/" + this.monitoringUrls[i].urls[j].file_prefix + ".png";
                    this.monitoringUrls[i].urls[j].plot_overall_pathway = remote_url + plot_pathway_dir + "/overall_pathway.png";
                    this.setPlots(this.plot_name);
                }
            }
        }
    }
    setPlots(plot_name) {
        for (let i = 0; i < this.monitoringUrls.length; i++) {
            for (let j = 0; j < this.monitoringUrls[i].urls.length; j++) {
                if ((this.monitoringUrls[i].urls[j].file_prefix == null)) {
                    console.log("DEBUG: nop");
                }
                else {
                    if (plot_name == "analysis")
                        this.monitoringUrls[i].urls[j].analysis_plot = this.monitoringUrls[i].urls[j].plot_analysis;
                    if (plot_name == "pathway")
                        this.monitoringUrls[i].urls[j].analysis_plot = this.monitoringUrls[i].urls[j].plot_pathway;
                    if (plot_name == "overall_pathway")
                        this.monitoringUrls[i].urls[j].analysis_plot = this.monitoringUrls[i].urls[j].plot_overall_pathway;
                }
            }
        }
    }
    speakSummary() {
        if (this.configuration == null || this.summary == null || this.summary.text == null)
            return;
        if (this.configuration == undefined || this.summary == undefined || this.summary.text == undefined)
            return;
        if (this.configuration.get().enableTextSpeech) {
            if (this.isiOS() || this.isAndroid()) {
                if (window.tts != null || window.tts != undefined) {
                    console.log("USING window.tts");
                    window.tts.speak({
                        text: this.summary.text,
                        locale: "en-GB",
                        rate: 0.75
                    });
                }
                else
                    console.log("PLUGIN ERROR: TTS not found in window");
            }
            else {
                try {
                    new SpeechSynthesisUtterance();
                }
                catch (error) {
                    console.log("SpeechSynthesisUtterance not found. No voiceout possible. NOTE: SpeechSynthesis is not available in Firefox on Android");
                    return;
                }
                console.log("USING SpeechSynthesisUtterance");
                let u = new SpeechSynthesisUtterance();
                u.text = this.summary.text;
                u.lang = 'en-GB';
                speechSynthesis.speak(u);
            }
        }
    }
    initLoop() {
        if (this.configuration.get().automaticFetch && this.configuration.get().enableTextSpeech) {
            this.loopHandler = window.setInterval(() => {
                this.loopCounter++;
                // List all loop dependent configurations as if (like in automaticFetch below)
                if (this.configuration.get().automaticFetch && (this.loopCounter % this.configuration.get().reloadInterval == 0))
                    this.reload();
                if (this.configuration.get().enableAutoReadout && (this.loopCounter % this.configuration.get().speakInterval == 0))
                    this.speakSummary();
            }, 60000);
        }
    }
    updateLoop() {
        if (!this.loopHandler == null)
            clearInterval(this.loopHandler);
        this.initLoop();
        console.log("Updated Loop");
    }
    // Initial configuration
    findInitialConfiguration() {
        // App running on a webserver:
        /* Deprecated
        console.log("SELFHOST: " + this.isHost() );
        if(this.isHost())
        {
            this.currentlyActive.host = window.location.hostname;
            this.currentlyActive.mobile_port = window.location.port;
            this.currentlyActive.web_port = window.location.port;
            this.currentlyActive.dir = "sites/default";

            console.log("POSITION: " + window.location.hostname + ":" + window.location.port);
            /*this.loadConfig();
            this.currentlyActive.name = this.config.site_name;
            //this.reload();
        }
        // App running on a clients device
        else {
            // Initial configuration
            this.currentlyActive.name = "GoeGrid";
            this.currentlyActive.host = "141.5.108.30";
            this.currentlyActive.mobile_port = "20200";
            this.currentlyActive.web_port = "10200";
            this.currentlyActive.dir = "sites/default";

        }

        this.storage.get('instance').then((value) => {
            if(value !== null && value !== undefined)
                this.currentlyActive = value;
            console.log("Saved Instance is: " + JSON.stringify(value));
            console.log("Running instance: " + JSON.stringify(this.currentlyActive));
            this.reload();
        }); */
        if (!this.isCordova()) {
            this.currentlyActive.name = window.location.hostname;
            this.currentlyActive.host = window.location.hostname;
            this.currentlyActive.mobile_port = window.location.port;
            this.currentlyActive.web_port = window.location.port;
            this.currentlyActive.dir = "sites/default";
            console.log("Position: " + this.currentlyActive.host + ":" + this.currentlyActive.mobile_port);
            this.reload();
        }
        else {
            // Initial configuration
            this.currentlyActive.name = "GoeGrid";
            this.currentlyActive.host = "141.5.108.30";
            this.currentlyActive.mobile_port = "20200";
            this.currentlyActive.web_port = "10100";
            this.currentlyActive.dir = "sites/default";
            this.storage.get('instance').then((value) => {
                if (value !== null && value !== undefined)
                    this.currentlyActive = value;
                console.log("Using saved instance: " + JSON.stringify(this.currentlyActive));
                this.reload();
            });
        }
    }
    // Determinations.
    // isMobilePhone() is used to rearrange the UI based on the smaller screen size on mobile phones
    // isHost() is used to add/remove functions unnecessary on mobile phone / browser
    // NOTE: isHost() is based on whether or not the mobile phone application is used because browsers are most likely connected to a remote host.
    // Determine if screen size fits to a mobile device. NOTE: This doesn't say anything about device native functions
    isMobilePhone() {
        return DataModel_1.FORCE_MOBILE_VISION || !this.plt.is('core');
    }
    // Determine whether this instance should show content hosted by itself or should connect to a remote host
    // NOTE: connect to host is most likely true for mobile applications and self hosted content is most likely true for browser applications
    isHost() {
        return (!DataModel_1.FORCE_CLIENT_FUNCTION) &&
            (DataModel_1.FORCE_SELFHOST_DEBUG || this.plt.is('core') || this.plt.is('mobileweb'));
    }
    isAndroid() {
        return this.plt.is('android');
    }
    isiOS() {
        return this.plt.is('ios');
    }
    isCordova() {
        return this.plt.is('cordova');
    }
};
// Singletone Depreceated
// private static _instance:DataModel = null;
// public  static getInstance() { if(this._instance == null) return (this._instance = new DataModel()); else return this._instance;}
// { return this._instance || (this._instance = new DataModel()); };
// Debug switches
DataModel.FORCE_SELFHOST_DEBUG = false;
DataModel.FORCE_MOBILE_VISION = false;
DataModel.FORCE_CLIENT_FUNCTION = false;
//static FORCE_LOAD_LOCAL_META_META_FILE:boolean = false;
//static FORCE_MOBILE:boolean = false;
// Seed node (unused)
// SEED_META_META_HOST:string = "141.5.108.30";
// SEED_META_META_MOBILE_PORT:string = "20110";
// SEED_META_META_WEB_PORT:string = "10110";
// SEED_META_META_DIR:string = "sites/default";
// SEED_META_META_JSON:string = "meta-meta.json";
// Locations
DataModel.configJson = "config.json";
DataModel.monitoringUrlsJson = "monitoring-urls.json";
DataModel.systemsJson = "systems.json";
DataModel.visualizersJson = "visualizers.json";
DataModel.logsJson = "logs.json";
DataModel.humansJson = "humans.json";
DataModel.meta_meta_json = "meta-meta.json";
DataModel.summaryJson = "index/latest/summary.json";
DataModel.analysisJson = "index/latest/analysis.json";
DataModel = DataModel_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
], DataModel);

class ConfigObject {
    constructor() {
        this.myname = "";
        this.site = "";
        this.site_name = "";
        this.port = "";
        this.dir = "";
        this.data_dir = "";
        this.analysis_image_size = "";
        this.keep_data_days = "";
        this.log_level = "";
        this.firefox_profile = "";
        this.status = [];
    }
}
/* unused harmony export ConfigObject */

class StatusObject {
    constructor() {
        this.name = "";
        this.color = "";
        this.file = "";
    }
}
/* unused harmony export StatusObject */

class InstanceObject {
    constructor() {
        this.name = ""; //"GoeGrid";
        this.host = ""; //"141.5.108.30";
        this.web_port = ""; //"10200";
        this.mobile_port = ""; //"20200";
        this.dir = ""; //"sites/default"; // sites/GoeGrid
        /*changeActive(name:string, host:string, web_port:string, mobile_port:string, dir:string)
        {
            DataModel.getInstance().__backup = DataModel.getInstance().currentlyActive;
            this.name = name;
            this.host = host;
            this.web_port = web_port;
            this.mobile_port = mobile_port;
            this.dir = dir;
        }*/
    }
}
/* unused harmony export InstanceObject */

class ConfigurationObject {
    constructor() {
        this._automaticFetch = false;
        this._reloadInterval = 10;
        this._automaticRotation = false;
        this._detectOnlyChange = true;
        this._enableMadVision = true;
        this._enableTextSpeech = true;
        this._enableAutoReadout = false;
        this._speakInterval = 10;
        this._happyFaceCompatible = false;
    }
    get() {
        return {
            "automaticFetch": this._automaticFetch,
            "reloadInterval": this._reloadInterval,
            "automaticRotation": this._automaticRotation,
            "detectOnlyChange": this._detectOnlyChange,
            "enableMadVision": this._enableMadVision,
            "enableTextSpeech": this._enableTextSpeech,
            "enableAutoReadout": this._enableAutoReadout,
            "speakInterval": this._speakInterval,
            "happyFaceCompatible": this._happyFaceCompatible
        };
    }
    setAutomaticFetch(value) { this._automaticFetch = value; }
    setReloadInterval(value) { this._reloadInterval = value; }
    setAutomaticRotation(value) { this._automaticRotation = value; }
    setDetectOnlyChange(value) { this._detectOnlyChange = value; }
    setEnableMadVision(value) { this._enableMadVision = value; }
    setEnableTextSpeech(value) { this._enableTextSpeech = value; }
    setEnableAutoReadout(value) { this._enableAutoReadout = value; }
    setSpeakInterval(value) { this._speakInterval = value; }
    setHappyFaceCompatible(value) { this._happyFaceCompatible = value; }
}
/* unused harmony export ConfigurationObject */

var DataModel_1;
//# sourceMappingURL=DataModel.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PassModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_chooser__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_DataModel__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let PassModal = class PassModal {
    constructor(viewCtrl, storage, model, file, chooser) {
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.model = model;
        this.file = file;
        this.chooser = chooser;
        this.isiOS = false;
        this.isAndroid = false;
        this.isHost = false;
        this.host = "";
        this.port = 22;
        this.user = "";
        this.pass = "";
        this.gateway = false;
        this.gatewayHost = "134.76.86.224";
        this.gatewayPort = "10101";
        this.saveConfig = false;
    }
    ngOnInit() {
        this.isiOS = this.model.isiOS();
        this.isAndroid = this.model.isAndroid();
        this.isHost = this.model.isHost();
        this.storage.get("SSH-Storage").then(value => {
            if (value) {
                this.storage.get("SSH-Storage-host").then(value => { this.host = value; });
                this.storage.get("SSH-Storage-port").then(value => { this.port = value; });
                this.storage.get("SSH-Storage-user").then(value => { this.user = value; });
                this.storage.get("SSH-Storage-gateway-host").then(value => { this.gatewayHost = value; });
                this.storage.get("SSH-Storage-gateway-port").then(value => { this.gatewayPort = value; });
                this.saveConfig = true;
            }
            else
                this.saveConfig = false;
        });
    }
    closeModal() {
        this.viewCtrl.dismiss({ enter: false, host: "", port: 0, user: "", pass: "",
            ghost: this.gatewayHost, gport: this.gatewayPort });
    }
    enter() {
        if (this.saveConfig) {
            this.storage.set("SSH-Storage", true);
            this.storage.set("SSH-Storage-host", this.host);
            this.storage.set("SSH-Storage-port", this.port);
            this.storage.set("SSH-Storage-user", this.user);
            this.storage.set("SSH-Storage-gateway-host", this.gatewayHost);
            this.storage.set("SSH-Storage-gateway-port", this.gatewayPort);
        }
        else
            this.storage.set("SSH-Storage", false);
        this.viewCtrl.dismiss({ enter: true, host: this.host, port: this.port, user: this.user, pass: this.pass,
            ghost: this.gatewayHost, gport: this.gatewayPort });
    }
    toogleGateway() {
        this.gateway = !this.gateway;
    }
};
PassModal = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\ssh\pass-modal.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Login</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()"><ion-icon name="close"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <span>Please provide login information:</span>\n\n    <br><br>\n\n    <ion-list-header (click)="toogleGateway()" padding>\n        <button (click)="toogleGateway()" item-left class="button-icon" style="background-color: transparent">\n            <ion-icon name="ios-arrow-dropright" *ngIf="!gateway"></ion-icon>\n            <ion-icon name="ios-arrow-dropdown" *ngIf="gateway"></ion-icon>\n        </button>\n        Gateway\n    </ion-list-header>\n    <ion-list *ngIf="gateway" padding>\n        <ion-item>\n            <ion-label fixed>Gateway Host: </ion-label>\n            <ion-input [(ngModel)]="gatewayHost"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label fixed>Gateway Port:</ion-label>\n            <ion-input type="number" [(ngModel)]="gatewayPort"></ion-input>\n        </ion-item>\n    </ion-list>\n    <p></p>\n    <ion-item>\n        <ion-label fixed>Host: </ion-label>\n        <ion-input [(ngModel)]="host"></ion-input>\n    </ion-item>\n    <ion-item>\n        <ion-label fixed>Port: </ion-label>\n        <ion-input type="number" [(ngModel)]="port"></ion-input>\n    </ion-item>\n    <p></p>\n    <ion-item>\n        <ion-label fixed>Username: </ion-label>\n        <ion-input [(ngModel)]="user"></ion-input>\n    </ion-item>\n    <br>\n\n    <!--<p *ngIf="isAndroid">You can either login via password or key file:</p>-\n    <p *ngIf="isHost">You can login via password (for security reasons, key files are not supported):</p>\n    <p *ngIf="isiOS">You can login via password (key files are not supported on iOS):</p>\n    <ion-item>\n        <ion-label fixed>Password: </ion-label>\n        <ion-input type="password" [(ngModel)]="pass"></ion-input>\n    </ion-item>\n    <br>\n    <ion-item *ngIf="isAndroid">\n        <ion-label fixed>Key file: </ion-label>\n        <button ion-button (click)="selectFile()">Choose</button>\n    </ion-item>-->\n    <!-- Key files not supported -->\n    <p>You can login via password (key files are not yet supported):</p>\n    <ion-item>\n        <ion-label fixed>Password: </ion-label>\n        <ion-input type="password" [(ngModel)]="pass"></ion-input>\n    </ion-item>\n    <p></p>\n    <ion-item>\n        <ion-label>Save configuration: </ion-label>\n        <ion-toggle [(ngModel)]="saveConfig"></ion-toggle>\n    </ion-item>\n</ion-content>\n\n<ion-footer>\n    <ion-toolbar>\n        <ion-buttons end>\n            <button ion-button (click)="enter()">Enter</button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\ssh\pass-modal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__data_DataModel__["a" /* DataModel */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_chooser__["a" /* FileChooser */]])
], PassModal);

//# sourceMappingURL=pass-modal.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClassicalDataModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let ClassicalDataModel = class ClassicalDataModel {
    constructor(model) {
        this.model = model;
        this.categories = [];
        this.lastRefreshed = new Date();
        this.loading = false;
        this.loadingFinishedCallbacks = [];
        this.reload();
    }
    reload() {
        this.loading = true;
        let url = "http://" + this.model.currentlyActive.host + ":" + this.model.currentlyActive.web_port + "/category?action=getxml";
        this.asyncReadFile(url, this.parseXMLResult.bind(this));
    }
    asyncReadFile(url, callback) {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState == 4) {
                callback(req.responseText, req.status);
            }
        };
        req.open("GET", url, true);
        req.send();
    }
    parseXMLResult(response, statusCode) {
        let HFTree = [];
        if (statusCode == 200) {
            response = response.replace("\\n", "");
            let cat = XML2JSON.xmlStringToJSON(response);
            HFTree = cat.happyface;
        }
        else {
            this.categories = null;
            this.loading = false;
            for (let i = 0; i < this.loadingFinishedCallbacks.length; i++) {
                this.loadingFinishedCallbacks[i]();
            }
            return;
        }
        // Parsing
        for (let i = 0; i < HFTree.category.length; i++)
            HFTree.category[i].status = parseFloat(HFTree.category[i].status);
        this.categories = HFTree.category;
        this.lastRefreshed = new Date();
        this.loading = false;
        for (let i = 0; i < this.loadingFinishedCallbacks.length; i++) {
            this.loadingFinishedCallbacks[i]();
        }
    }
    addLoadingFinishedCallback(callback) { this.loadingFinishedCallbacks.push(callback); }
    ;
    isLoading() { return this.loading; }
    loadModuleContent(module, callback) {
    }
};
ClassicalDataModel = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */]])
], ClassicalDataModel);

class XML2JSON {
    // Credits to http://davidwalsh.name/convert-xml-json and https://gist.github.com/chinchang/8106a82c56ad007e27b1
    static xmlToJSON(xml) {
        let obj = {};
        if (xml.nodeType == 1) {
            if (xml.attributes.length > 0) {
                obj['@attributes'] = {};
                for (let j = 0; j < xml.attributes.length; j++) {
                    const attribute = xml.attributes.item(j);
                    obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
                }
            }
        }
        else if (xml.nodeType == 3) {
            obj = xml.nodeValue;
        }
        if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
            obj = xml.childNodes[0].nodeValue;
        }
        else if (xml.hasChildNodes()) {
            for (let i = 0; i < xml.childNodes.length; i++) {
                const item = xml.childNodes.item(i);
                const nodeName = item.nodeName;
                if (nodeName === "#text")
                    continue;
                if (typeof (obj[nodeName]) == 'undefined') {
                    obj[nodeName] = this.xmlToJSON(item);
                }
                else {
                    if (typeof (obj[nodeName].push) == 'undefined') {
                        const old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJSON(item));
                }
            }
        }
        return obj;
    }
    static xmlStringToJSON(str) {
        let xmlDOM = new DOMParser().parseFromString(str, 'text/xml');
        return this.xmlToJSON(xmlDOM);
    }
}
/* unused harmony export XML2JSON */

//# sourceMappingURL=ClassicalDataModel.js.map

/***/ }),

/***/ 117:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 117;

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 159;

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__monitoring_monitoring__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controller_controller__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logs_logs__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__visualizers_visualizers__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__humans_humans__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__working_working__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modals_config_config__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__analyzer_analyzer__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__home_home__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__tour_tour__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//@IonicPage()
let TabsPage = class TabsPage {
    constructor(navCtrl, navParams, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.tabHome = __WEBPACK_IMPORTED_MODULE_11__home_home__["a" /* HomePage */];
        this.tabMonitoring = __WEBPACK_IMPORTED_MODULE_3__monitoring_monitoring__["a" /* MonitoringPage */];
        this.tabAnalyzer = __WEBPACK_IMPORTED_MODULE_10__analyzer_analyzer__["a" /* AnalyzerPage */];
        this.tabSystems = __WEBPACK_IMPORTED_MODULE_4__controller_controller__["a" /* ControllerPage */];
        this.tabVisualizer = __WEBPACK_IMPORTED_MODULE_6__visualizers_visualizers__["a" /* VisualizersPage */];
        this.tabLogs = __WEBPACK_IMPORTED_MODULE_5__logs_logs__["a" /* LogsPage */];
        this.tabHumans = __WEBPACK_IMPORTED_MODULE_7__humans_humans__["a" /* HumansPage */];
        this.tabConfig = __WEBPACK_IMPORTED_MODULE_9__modals_config_config__["a" /* ConfigPage */];
        this.tabWorking = __WEBPACK_IMPORTED_MODULE_8__working_working__["a" /* WorkingPage */];
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad TabsPage');
        setTimeout(() => {
            this.storage.get("startup").then((value) => {
                if (value == null || value == undefined || !value) {
                    this.storage.set("startup", true);
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__tour_tour__["a" /* TourPage */], {});
                    console.log("Starting tour");
                }
            });
        }, 500);
    }
};
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-tabs',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\tabs\tabs.html"*/'<ion-content padding>\n  <ion-tabs [selectedIndex]="5">\n    <ion-tab [root]="tabMonitoring" tabTitle="Monitoring" tabIcon="ios-speedometer"></ion-tab>\n    <ion-tab [root]="tabAnalyzer" tabTitle="Analyzer" tabIcon="ios-analytics"></ion-tab>\n    <ion-tab [root]="tabSystems" tabTitle="Controller" tabIcon="ios-game-controller-b"></ion-tab>\n    <ion-tab [root]="tabVisualizer" tabTitle="Visualizer" tabIcon="ios-desktop"></ion-tab>\n    <ion-tab [root]="tabLogs" tabTitle="Logs" tabIcon="ios-recording"></ion-tab>\n    <ion-tab [root]="tabHome" tabTitle="Home" tabIcon="ios-home" *ngIf="true"></ion-tab>\n    <ion-tab [root]="tabHumans" tabTitle="Humans" tabIcon="ios-people" *ngIf="false"></ion-tab>\n    <ion-tab [root]="tabConfig" tabTitle="Config" tabIcon="ios-settings" *ngIf="false"></ion-tab>\n    <ion-tab [root]="tabWorking" tabTitle="Working" tabIcon="ios-nuclear" *ngIf="false"></ion-tab>\n  </ion-tabs>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\tabs\tabs.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonitoringPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__monitoring_webview__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_config_modal__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tour_tour__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let MonitoringPage = class MonitoringPage {
    constructor(model, navControl, modalCtrl, alertCtrl) {
        this.model = model;
        this.navControl = navControl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.isLoading = true;
        this.loadingFailed = false;
        this.statusLevel = "Warning";
        this.statusImg = "https://i.ytimg.com/vi/RqRNd4UyA4c/maxresdefault.jpg";
        this.statusColor = "item-calm";
        this.statusText = "World wide Atlas Distributed Computing System";
        // Helper
        this.plot_name = "analysis";
    }
    ngOnInit() {
        //DataModel.getInstance().addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        //DataModel.getInstance().addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        //if(!DataModel.getInstance().isLoading()) this.onReloadFinishedListener();
        this.model.addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        this.model.addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        if (!this.model.isLoading())
            this.onReloadFinishedListener();
    }
    onReloadFinishedListener() {
        this.isLoading = false;
        if (this.dataExists()) {
            this.loadingFailed = false;
            this.setHistory();
            this.setStatusCard();
            this.model.setLinks("latest");
            this.monitoringURLs = this.model.monitoringUrls;
        }
        else
            this.loadingFailed = true;
    }
    onLoadingStartedListener() {
        this.isLoading = true;
    }
    dataExists() {
        if (!(this.model.summary == null || this.model.summary == undefined)) {
            if (!(this.model.config == null || this.model.config == undefined)) {
                if (!(this.model.config.status == null || this.model.config.status == undefined)) {
                    return true;
                }
            }
        }
        return false;
    }
    openModalConfig() {
        const modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_config_modal__["a" /* ModalPage */]);
        modal.present();
    }
    reload() {
        console.log("ISLOADING: " + this.isLoading);
        if (this.isLoading)
            return;
        this.isLoading = true;
        // DataModel.getInstance().reload();
        this.model.reload();
    }
    historyChanged(event) {
        this.model.setLinks(event);
        this.monitoringURLs = this.model.monitoringUrls;
    }
    setStatusCard() {
        //this.statusText  = DataModel.getInstance().summary.text;
        //this.statusLevel = DataModel.getInstance().summary.level;
        this.statusText = this.model.summary.text;
        this.statusLevel = this.model.summary.level;
        //let model:DataModel = DataModel.getInstance();
        for (let i = 0; i < this.model.config.status.length; i++) {
            if (this.model.config.status[i].name === this.statusLevel) {
                this.statusImg = this.model.config.status[i].file;
            }
        }
        for (let i = 0; i < this.model.config.status.length; i++) {
            if (this.model.config.status[i].name === this.statusLevel) {
                this.statusColor = this.model.config.status[i].color;
            }
        }
    }
    openHappyFaceCore() {
        window.open("http://" + this.model.currentlyActive.host + ":" + this.model.currentlyActive.web_port, "_blank");
    }
    setHistory() {
        //let str:string     = DataModel.getInstance().summary.history;
        let str = this.model.summary.history;
        let array = str.split(" ");
        this.history = [];
        for (let i = 0; i < array.length; i++)
            this.history.push({ "name": array[i], "datetime": array[i] });
        if (this.history.length != 0)
            this.latest = this.history[0].datetime;
        else
            this.latest = "";
    }
    openPage(url) {
        this.navControl.push(__WEBPACK_IMPORTED_MODULE_3__monitoring_webview__["a" /* MonitoringWebviewPage */], { 'url': url });
    }
    speakSummary() {
        this.setStatusCard();
        //DataModel.getInstance().speakSummary();
        this.model.speakSummary();
    }
    openGuide() {
        this.navControl.push(__WEBPACK_IMPORTED_MODULE_5__tour_tour__["a" /* TourPage */], {});
    }
};
MonitoringPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-monitoring',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\monitoring\monitoring.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-buttons left>\n            <button ion-button icon-only (click)="openModalConfig()"><ion-icon name="md-cog"></ion-icon></button>\n        </ion-buttons>\n        <ion-title>Happy Meta-Monitoring</ion-title>\n        <ion-buttons end>\n            <!--<button ion-button icon-only (click)="openGuide()"><ion-icon name="md-happy"></ion-icon></button>-->\n            <button ion-button icon-only (click)="reload()" *ngIf="!isLoading"><ion-icon name="refresh"></ion-icon></button>\n        </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n    <div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <div text-center padding [hidden]="!loadingFailed || isLoading">\n        <span style="font-weight: bold; font-size: 22pt">Loading failed <br> No Data</span>\n    </div>\n\n    <ion-list [hidden]="isLoading || loadingFailed" no-padding>\n        <!-- Status card -->\n        <ion-card no-padding no-margin style="width: 100%" (click)="speakSummary()">\n            <ion-card color="{{statusColor}}">\n                <ion-card-header>\n                    Status: {{statusLevel}}\n                </ion-card-header>\n            </ion-card>\n            <ion-card-content no-padding>\n                <ion-item text-wrap>\n                    <ion-thumbnail item-start>\n                        <img src="{{statusImg}}">\n                    </ion-thumbnail>\n                    <h2>{{statusText}}</h2>\n                </ion-item>\n            </ion-card-content>\n        </ion-card>\n        <br>\n\n        <!-- History chooser -->\n        <ion-item no-padding>\n            <ion-label>History:</ion-label>\n            <ion-select (ionChange)="historyChanged($event)" interface="action-sheet" style="max-width: 75% !important;">\n              <ion-option *ngFor="let ts of history" [selected]="ts.datetime == latest">{{ts.datetime}}</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <!-- Content list -->\n        <ion-item *ngFor="let monitoringURL of monitoringURLs" no-padding no-margin text-wrap>\n            <ion-card no-padding no-margin>\n                <ion-card-header class="group-title">{{monitoringURL.name}}</ion-card-header>\n                <ion-card-content no-padding>\n                    <ion-grid no-padding>\n                        <ion-row class="group" no-padding no-margin>\n                            <ion-col col-6 col-sm no-padding *ngFor="let url of monitoringURL.urls">\n                                <div class="launchpad">\n                                    <div class="logo"><img src="{{url.thumbnail}}" alt="Not Captured" (click)="openPage(url)"/></div>\n                                    <a href="{{url.link}}" target="_blank"><div class="caption">{{url.name}}</div></a>\n                                </div>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid>\n                </ion-card-content>\n            </ion-card>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\monitoring\monitoring.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
], MonitoringPage);

//# sourceMappingURL=monitoring.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionErrorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let ConnectionErrorPage = class ConnectionErrorPage {
    constructor(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.host = "";
        this.m_port = "";
        this.w_port = "";
        this.save = false;
        this.statusCode = "404";
        this.onlyOneCode = true;
        this.missingFiles = [];
        this.host = this.navParams.get("host");
        this.m_port = this.navParams.get("mport");
        this.w_port = this.navParams.get("wport");
        console.log("WEB: " + this.w_port + "  MOBILE: " + this.m_port);
        this.missingFiles = this.navParams.get("errors");
        if (!(this.missingFiles == null || this.missingFiles == undefined) || this.missingFiles.length > 0) {
            let s = this.missingFiles[0].code;
            for (let i = 0; i < this.missingFiles.length; i++)
                this.onlyOneCode = (s == this.missingFiles[i].code);
            this.statusCode = s.toString(10);
        }
    }
    retry() {
        this.viewCtrl.dismiss({ "retry": true, "host": this.host, "mport": this.m_port, "wport": this.w_port, "save": this.save });
    }
    closeModal() {
        this.viewCtrl.dismiss({ "retry": false, "host": this.host, "mport": this.m_port, "wport": this.w_port, "save": this.save });
    }
};
ConnectionErrorPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: "page-connection-error",template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\error\connection-error.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Connection Error</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (click)="closeModal()"><ion-icon name="close"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <div text-center><h1>Connection Error</h1></div>\n\n    <p>Unable to connect to given instance.</p>\n\n    <p *ngIf="onlyOneCode">Errorcode: {{statusCode}}</p>\n\n    <p *ngIf="!onlyOneCode">Recieved various Errorcodes (shown below)</p>\n\n\n\n    <ion-item>\n\n        <ion-label color="primary" fixed>Host: </ion-label>\n\n        <ion-input placeholder="{{host}}" [(ngModel)]="host"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n        <ion-label color="primary" fixed>Mobile Port: </ion-label>\n\n        <ion-input placeholder="{{m_port}}" [(ngModel)]="m_port"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n        <ion-label color="primary" fixed>Web Port: </ion-label>\n\n        <ion-input placeholder="{{w_port}}" [(ngModel)]="w_port"></ion-input>\n\n    </ion-item>\n\n    <br/>\n\n    <!--Data: {{host}} + {{port}} <br/>-->\n\n\n\n    Files with errors: <br/>\n\n    <code>\n\n        <span *ngFor="let m of missingFiles">{{m.url}} --> code: {{m.code}}<br/></span>\n\n    </code>\n\n    <br>\n\n    <ion-item>\n\n        <ion-label>Save configuration ?</ion-label>\n\n        <ion-checkbox [(ngModel)]="save"></ion-checkbox>\n\n    </ion-item>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n    <ion-toolbar>\n\n        <ion-buttons end>\n\n            <button ion-button type="submit" (click)="retry()" item-end>Retry</button>\n\n        </ion-buttons>\n\n    </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\error\connection-error.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], ConnectionErrorPage);

//# sourceMappingURL=connection-error.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonitoringWebviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let MonitoringWebviewPage = class MonitoringWebviewPage {
    constructor(navParams) {
        this.navParams = navParams;
        this.url = this.navParams.get('url');
        if (this.url == null || this.url == undefined) {
            this.url = { "name": "", "image": "http://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg" };
        }
    }
    changeToMadVision() {
    }
};
MonitoringWebviewPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\monitoring\monitoring-webview.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{url.name}}</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only item-end (click)="changeToMadVision()">\n\n                <ion-icon name="ion-eye"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <img style="margin-left: auto; margin-right:auto; max-width: 100%" src="{{url.image}}"/>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\monitoring\monitoring-webview.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* NavParams */]])
], MonitoringWebviewPage);

//# sourceMappingURL=monitoring-webview.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__instances_browser_component__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_DataModel__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let ModalPage = class ModalPage {
    constructor(model, navParams, viewCtrl) {
        this.rootPage = null; // ConfigPage;
        this.rootParams = null;
        this.rootPage = model.isHost() ? __WEBPACK_IMPORTED_MODULE_2__instances_browser_component__["a" /* InstancesBrowserComponent */] : __WEBPACK_IMPORTED_MODULE_4__config__["a" /* ConfigPage */];
        this.rootParams = Object.assign({}, navParams.data, { viewCtrl: viewCtrl });
    }
};
ModalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\config\modal.html"*/'<ion-nav [root]="rootPage" [rootParams]="rootParams"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\config\modal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */]])
], ModalPage);

//# sourceMappingURL=modal.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstancesBrowserComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let InstancesBrowserComponent = class InstancesBrowserComponent {
    constructor(model, navParams, navCtrl, alertCtrl) {
        this.model = model;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.instances = [];
        this.isLoading = true;
    }
    ngOnInit() {
        this.model.addLoadingStartedCallback(this.loadingFinished.bind(this));
        if (!this.model.isLoading())
            this.loadingFinished();
    }
    loadingFinished() {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState == 4 && req.status == 200) {
                this.updateList(req.response);
                this.isLoading = false;
            }
        };
        req.open("GET", this.model.getRemoteURL() + "sites/default/meta-meta.json");
        req.send();
    }
    updateList(str) {
        let json = JSON.parse(str);
        for (let i = 0; i < json.length; i++) {
            let obj = json[i];
            this.instances.push(obj);
        }
        if (this.instances.length == 1 && this.instances[0].constructor === Object)
            this.instances = [];
    }
    choose(inst) {
        if (inst.mobile_port == null || inst.web_port == null || inst.host == null) {
            this.alertCtrl.create({
                title: "Not supported",
                message: "This instance is currently not supported in this application",
                cssClass: "alertText",
                buttons: ["OK"]
            }).present();
        }
        else {
            console.log("OPEN: " + inst.name);
            window.open("http://" + inst.host + ":" + inst.mobile_port + "/", "_blank");
            window.focus();
        }
    }
    extSettings() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* ConfigPage */], { "viewCtrl": this.navParams.get('viewCtrl') });
    }
    webBackend() {
        if (!this.model.config || !this.model.config.web_port)
            return;
        window.open("http://" + this.model.currentlyActive.host + ":" + this.model.config.web_port + "/", "_blank");
    }
    close() {
        let viewCtrl = this.navParams.get('viewCtrl');
        viewCtrl.dismiss();
    }
};
InstancesBrowserComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\config\instances.browser.component.html"*/'<ion-header>\n    <ion-navbar *ngIf="isIOS" style="height:calc(44px + 20px); min-height:calc(44px + 20px); padding-top:20px;">\n        <ion-title style="padding-top: 15px">Settings</ion-title>\n    </ion-navbar>\n    <ion-navbar *ngIf="!isIOS">\n        <ion-title>Settings</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="close()"><ion-icon name="close"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list-header>\n        Choose Instance\n    </ion-list-header>\n\n    <div text-center *ngIf="isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n    <ion-list *ngIf="!isLoading">\n        <ng-container *ngFor="let inst of instances">\n            <button ion-item detail-none (click)="choose(inst)">\n                {{inst.name}}\n                <div item-end text-center>\n                    <ion-icon name="ios-arrow-forward"></ion-icon>\n                </div>\n            </button>\n        </ng-container>\n        <ion-item *ngIf="instances.length == 0">\n            There are no subinstances here.\n        </ion-item>\n    </ion-list>\n    <ion-item>\n        <button ion-item detail-none no-lines (click)="extSettings()">\n            Advanced Settings\n            <div item-end text-center>\n                <ion-icon name="ios-arrow-forward"></ion-icon>\n            </div>\n        </button>\n    </ion-item>\n    <ion-item>\n        <button ion-item detail-none no-lines (click)="webBackend()">\n            HappyFace backend web\n            <div item-end text-center>\n                <ion-icon name="ios-arrow-forward"></ion-icon>\n            </div>\n        </button>\n    </ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\config\instances.browser.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
], InstancesBrowserComponent);

//# sourceMappingURL=instances.browser.component.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstancesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_DataModel__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let InstancesComponent = class InstancesComponent {
    constructor(model, navCtrl, plt, storage, navParams, alertCtrl) {
        this.model = model;
        this.navCtrl = navCtrl;
        this.plt = plt;
        this.storage = storage;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.headURL = ""; //http://141.5.108.30:20100/sites/default/meta-meta.json";
        this.label = "";
        this.isLoading = false;
        this.locations = [];
        this.favorites = [];
        this.backstack = [];
        this.current = null;
        this.level = 0;
        this.final_level = 2;
        this.levels = ["Cloud", "Region", "Cluster"];
        this.isIOS = false;
        this.isIOS = this.plt.is('ios');
    }
    ngOnInit() {
        this.storage.get('favorites').then((value) => {
            if (!(value == null || value == undefined))
                this.favorites = value;
            else
                this.favorites = [];
            console.log("FAVORITES: " + JSON.stringify(value));
        });
        /*if(this.model.configuration.get().happyFaceCompatible)
            this.headURL = "http://141.5.108.29:10100/static/sites/default/meta-meta.json";
        else
            this.headURL = "http://141.5.108.29:20100/sites/default/meta-meta.json";
        */
        this.headURL = "https://raw.githubusercontent.com/HappyFaceGoettingen/HappyFace-MadMask/master/HappyFaceMobile/sites/top.json";
        this.isLoading = true;
        let req = new XMLHttpRequest();
        req.addEventListener("load", () => {
            this.updateList(req.responseText);
            this.isLoading = false;
        });
        req.open("GET", this.headURL);
        req.send();
        this.label = this.levels[this.level];
    }
    backClicked() {
        this.level--;
        this.move(null);
    }
    itemClicked(loc) {
        if (loc.host == null || loc.mobile_port == null || loc.web_port == null) {
            this.alertCtrl.create({
                title: "Not supported",
                message: "This instance is currently not supported in this application",
                cssClass: "alertText",
                buttons: ["OK"]
            }).present();
        }
        else {
            this.level++;
            this.move(loc);
        }
    }
    move(loc) {
        this.locations = [];
        if (loc != null)
            this.backstack.push(this.current);
        else
            loc = this.backstack.pop();
        this.current = loc;
        let url = "";
        /*if(this.model.configuration.get().happyFaceCompatible)
        {
            if(this.level <= 0) { this.level = 0; url = this.headURL; }
            else if(this.level == 1) url = "http://" + loc.host + ":" + loc.web_port + "/static/sites/default/meta-meta.json";
            else if(this.level >= 2) url = "http://" + loc.host + ":" + loc.web_port + "/static/sites/default/meta-meta.json";
        }
        else {
            if(this.level <= 0) { this.level = 0; url = this.headURL; }
            else if(this.level == 1) url = "http://" + loc.host + ":" + loc.mobile_port + "/sites/default/meta-meta.json";
            else if(this.level >= 2) url = "http://" + loc.host + ":" + loc.mobile_port + "/sites/default/meta-meta.json";
        }*/
        if (this.level <= 0) {
            this.level = 0;
            url = this.headURL;
        }
        else {
            if (this.level > this.final_level)
                this.level = this.final_level;
            if (this.model.configuration.get().happyFaceCompatible)
                url = "http://" + loc.host + ":" + loc.web_port + "/static/sites/default/meta-meta.json";
            else
                url = "http://" + loc.host + ":" + loc.mobile_port + "/sites/default/meta-meta.json";
        }
        this.isLoading = true;
        let req = new XMLHttpRequest();
        req.addEventListener("load", () => { this.updateList(req.responseText); this.isLoading = false; });
        req.open("GET", url);
        req.send();
        this.label = this.levels[this.level];
    }
    updateList(str) {
        let json = JSON.parse(str);
        for (let i = 0; i < json.length; i++) {
            let obj = json[i];
            this.locations.push(obj);
        }
    }
    choose(loc) {
        if (loc.mobile_port == null || loc.web_port == null || loc.host == null) {
            this.alertCtrl.create({
                title: "Not supported",
                message: "This instance is currently not supported in this application",
                cssClass: "alertText",
                buttons: ["OK"]
            }).present();
        }
        else {
            this.model.currentlyActive = loc;
            this.storage.set('instance', this.model.currentlyActive);
            this.model.reload();
            let viewCtrl = this.navParams.get("viewCtrl");
            if (viewCtrl != null || viewCtrl != undefined)
                viewCtrl.dismiss();
            else
                this.navCtrl.pop();
        }
    }
    favorite(loc) {
        if (!(this.favorites.indexOf(loc) > -1)) {
            this.favorites.push(loc);
            this.storage.set('favorites', this.favorites);
        }
    }
    unfavorite(loc) {
        if (this.favorites.indexOf(loc) > -1) {
            this.favorites = this.favorites.filter(obj => obj != loc);
            this.storage.set('favorites', this.favorites);
        }
    }
};
InstancesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\config\instances.component.html"*/'<ion-header>\n\n    <ion-navbar *ngIf="isIOS" style="height:calc(44px + 20px); min-height:calc(44px + 20px); padding-top:20px;">\n\n        <ion-title style="padding-top: 15px">Choose Instance</ion-title>\n\n    </ion-navbar>\n\n    <ion-navbar *ngIf="!isIOS">\n\n        <ion-title>Choose Instance</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="outer-content">\n\n  <ion-list-header>\n\n    Favorites\n\n  </ion-list-header>\n\n  <ion-list>\n\n    <ion-item-sliding *ngFor="let fav of favorites">\n\n      <button ion-item detail-none (click)="choose(fav)">\n\n        {{fav.name}}\n\n      </button>\n\n      <ion-item-options side="left">\n\n        <button ion-button color="danger" (click)="unfavorite(fav)"><ion-icon name="trash"></ion-icon></button>\n\n      </ion-item-options>\n\n    </ion-item-sliding>\n\n  </ion-list>\n\n\n\n    <br/>\n\n  <ion-list-header>\n\n      <button (click)="backClicked()" item-left class="button-icon" style="background-color: transparent" [hidden]="level == 0">\n\n          <ion-icon name="ios-arrow-back"></ion-icon>\n\n      </button>\n\n      {{label}}\n\n  </ion-list-header>\n\n  <div text-center padding [hidden]="!isLoading">\n\n      <ion-spinner></ion-spinner>\n\n  </div>\n\n  <ion-list [hidden]="isLoading">\n\n      <ion-item-sliding *ngFor="let loc of locations">\n\n          <button ion-item detail-none (click)="choose(loc);">\n\n              {{loc.name}}\n\n              <div item-end text-center *ngIf="level < final_level">\n\n                  <button class="button-icon" style="background-color: transparent" (click)="itemClicked(loc); $event.stopPropagation()">\n\n                      <ion-icon name="arrow-forward"></ion-icon>\n\n                  </button>\n\n              </div>\n\n          </button>\n\n          <ion-item-options side="left">\n\n               <button ion-button (click)="favorite(loc)"><ion-icon name="star"></ion-icon></button>\n\n          </ion-item-options>\n\n      </ion-item-sliding>\n\n  </ion-list>\n\n  <!--<span [innerHtml]="label"></span>-->\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\config\instances.component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], InstancesComponent);

//# sourceMappingURL=instances.component.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_DataModel__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let AboutPage = class AboutPage {
    constructor(navParams, model) {
        this.navParams = navParams;
        this.model = model;
        this.versionCode = "fetching version number ...";
        this.model.addLoadingFinishedCallback(this.loadingFinished.bind(this));
        if (!this.model.isLoading())
            this.loadingFinished();
    }
    loadingFinished() {
        this.versionCode = this.model.config.version;
    }
    close() {
        let viewCtrl = this.navParams.get('viewCtrl');
        viewCtrl.dismiss();
    }
};
AboutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: "about-page",template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\about\about.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>About</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="close()"><ion-icon name="close"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="ios7-grey-bg" padding="10px">\n    <div class="logos">\n        <span class="app-logo" >                      <img height="60px" src="assets/img/iTunesArtwork@2x.png"/> </span>\n        <span class="uni-logo" ng-click="openSite()"> <img height="60px" src="assets/img/logoGoe.png"/> </span>\n    </div>\n\n    <br>\n    <div class="settings-explanation credits">\n        <div>\n            <b>HappyFace Meta-Monitoring-Tool</b><br>\n            <b>Mobile Application</b>, version {{versionCode}}\n        </div>\n\n        <br>\n        <div class="row" style="text-align: left;">\n            <div class="col col-top">Developed by</div>\n            <div class="col col-67">\n                Timon Vogt<br>\n                Dr. Gen Kawamura<br>\n                Prof. Dr. Arnulf Quadt<br>\n            </div>\n        </div>\n        <div class="row" style="text-align: left;">\n            <div class="col col-top">Coded by</div>\n            <div class="col col-67">\n                Timon Vogt<br>\n            </div>\n        </div>\n    </div>\n\n    <br>\n    <div class="settings-explanation">\n        <b>Georg-August-Universität Göttingen</b><br>\n        Wilhelmsplatz 1<br>\n        37073 Göttingen<br>\n        Germany<br>\n        Tel. +49 551 39-0<br>\n        Fax +49 551 39-9612<br>\n        pressestelle@uni-goettingen.de\n        <a href="http://www.uni-goettingen.de/de/439379.html">Datenschutzerklärung (Deutsch)</a>\n        <a href="http://www.uni-goettingen.de/en/439379.html">Privacy statement (english)</a>\n    </div>\n    <br>\n    <div class="settings-explanation padding-top">\n        <b>Responsible for content:</b><br>\n        Prof. Dr. Arnulf Quadt<br>\n        II. Physikalisches Institut<br>\n        Friedrich-Hund-Platz 1<br>\n        37077 Göttingen<br>\n        Germany<br>\n        aquadt@uni-goettingen.de\n    </div>\n    <br>\n    <div class="padding-top padding-bottom settings-explanation">\n        Portions of the app are Apache 2.0 licensed.\n        <br>\n        Portions of the app are MIT licensed.\n\n    </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\about\about.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControllerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controller_detail__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_ssh_ssh_terminal__ = __webpack_require__(216);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let ControllerPage = class ControllerPage {
    constructor(model, navCtrl, modalCtrl) {
        this.model = model;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.isLoading = true;
        this.loadingFailed = false;
        this.systems = [];
    }
    ngOnInit() {
        // DataModel.getInstance().addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        // DataModel.getInstance().addLoadingFinishedCallback(this.reloadingFinishedCallback.bind(this));
        // if(!DataModel.getInstance().isLoading()) this.reloadingFinishedCallback();
        this.model.addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        this.model.addLoadingFinishedCallback(this.reloadingFinishedCallback.bind(this));
        if (!this.model.isLoading())
            this.reloadingFinishedCallback();
    }
    onLoadingStartedListener() {
        this.isLoading = true;
    }
    reloadingFinishedCallback() {
        this.systems = [];
        this.isLoading = false;
        if (!(this.model.systems == null || this.model.systems == undefined)) {
            this.systems = this.model.systems;
            this.loadingFailed = false;
        }
        else
            this.loadingFailed = true;
    }
    reload() {
        if (this.isLoading)
            return;
        this.isLoading = true;
        this.model.reload();
    }
    openPage(system) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__controller_detail__["a" /* ControllerDetailPage */], { "system": system });
    }
    openSSH() {
        console.log("SSH");
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_ssh_ssh_terminal__["a" /* SSHTerminalPage */]).present();
    }
};
ControllerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-controller',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\controller\controller.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Controller</ion-title>\n        <ion-buttons end>\n            <button ion-button (click)="openSSH()" class="ssh-button">SSH</button>\n            <button ion-button icon-only (click)="reload()" *ngIf="!isLoading"><ion-icon name="refresh"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <div text-center padding [hidden]="!loadingFailed || isLoading">\n        <span style="font-weight: bold; font-size: 22pt">Loading failed <br> No Data</span>\n    </div>\n\n    <ion-list no-padding [hidden]="isLoading || loadingFailed">\n        <ion-item *ngFor="let system of systems" text-wrap no-padding (click)="openPage(system)">\n            <ion-avatar item-left>\n                <img src="assets/{{system.img}}"/>\n            </ion-avatar>\n            <h2>{{system.name}}</h2>\n            <p>{{system.text}}</p>\n            <ion-icon name="ios-arrow-forward-outline" item-end></ion-icon>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\controller\controller.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* ModalController */]])
], ControllerPage);

//# sourceMappingURL=controller.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControllerDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_ssh_pass_modal__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_DataModel__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_ssh_SSH3_Wrapper__ = __webpack_require__(214);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let ControllerDetailPage = class ControllerDetailPage {
    constructor(navParams, alertCtrl, modalCtrl, model) {
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.model = model;
        this.system = null;
        this.sshWrapper = null;
        this.ssh = null;
        this.serviceTMP = null;
        this.activeService = null;
        this.system = navParams.get('system');
        if (this.system == null || this.system == undefined) {
            this.system = {
                'name': "Galaxy Controller", "text": "Restart Galaxy: Milky Way?",
                "img": "http://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg",
                "services": [{ "name": "Restart Mass Portals" }, { "name": "Stop Reapers" }]
            };
        }
        else if (!this.system.services && this.system.actions)
            this.system.services = this.system.actions;
        else if (!this.system.services)
            this.system.services = [];
    }
    serviceStart(service) {
        if (service.type != null && service.type != undefined) {
            switch (service.type) {
                case "email":
                    window.location.href = service.command.replace("mail:", "mailto:");
                    break;
                case "ticket":
                    window.open(service.command.replace("url:", ""), "_blank");
                    break;
                case "ssh":
                    this.openSSH(service);
                    break;
            }
        }
    }
    openSSH(service) {
        this.activeService = service;
        this.askForCredentials();
    }
    askForCredentials() {
        let modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__modals_ssh_pass_modal__["a" /* PassModal */]);
        modal.onDidDismiss(this.gotCredentials.bind(this));
        modal.present();
    }
    gotCredentials(data) {
        if (data == null || data.enter == undefined || !data.enter) {
            return;
        }
        this.ssh = new __WEBPACK_IMPORTED_MODULE_4__modals_ssh_SSH3_Wrapper__["a" /* SSH3Wrapper */](this, null, this.connReady.bind(this), {
            host: data.host,
            port: data.port,
            username: data.user,
            password: data.pass,
            gatewayHost: data.ghost,
            gatewayPort: data.gport
        });
    }
    connReady() {
        if (this.activeService)
            this.ssh.sendRaw(this.activeService.command + "\n").then(() => { this.ssh.close(); });
        else
            this.ssh.close();
        this.activeService = null;
    }
    write(data) {
        console.log(data);
        if (data.startsWith("Connection failed:"))
            this.alertCtrl.create({
                title: "SSH connection failed",
                message: "Failed to connect to the ssh admin server. The command was not executed",
                buttons: ["OK"]
            }).present();
    }
    writeln(data) {
        this.write(data + "\n");
    }
};
ControllerDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-controller-detail',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\controller\controller-detail.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{system.name}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <img src="assets/{{system.img}}" style="width: 64px; height: 64px">\n\n    <h2>{{system.text}}</h2>\n\n\n\n    <!--<ion-card>\n\n        <ion-item-divider>Power</ion-item-divider>\n\n        <ion-item text-wrap>\n\n            <button ion-button class="button-outline">Cold reboot</button>\n\n            <button ion-button class="button-outline">Warm reboot</button>\n\n        </ion-item>\n\n    </ion-card>-->\n\n    <ion-card>\n\n        <ion-card-header style="background: #e2e4e2">Services</ion-card-header>\n\n        <ion-card-content>\n\n            <br>\n\n            <span *ngFor="let service of system.services" padding-left="15px" text-wrap>\n\n                <button ion-button class="button-outline" (click)="serviceStart(service)">{{service.name}}</button>\n\n            </span>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\controller\controller-detail.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__data_DataModel__["a" /* DataModel */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__data_DataModel__["a" /* DataModel */]) === "function" && _d || Object])
], ControllerDetailPage);

var _a, _b, _c, _d;
//# sourceMappingURL=controller-detail.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Crypt__ = __webpack_require__(215);

class SSH3Wrapper {
    constructor(term, onConnectionEnd, onConnectionReady, cred) {
        /* GATEWAY */
        this.gatewayHost = "134.76.86.224";
        this.gatewayPort = "10101";
        /* SSH CONNECTION */
        this.host = null;
        this.port = null;
        this.username = null;
        this.password = null;
        this.ws = null;
        this.connectionOpen = false;
        this.onConnectionEnd = null;
        this.onConnectionReady = null;
        this.lastCMD = "";
        this.crypt = null;
        this.ecdh = false;
        this.auth = false;
        this.mode = 'AUTH';
        this.term = null; // Terminal
        if (cred) {
            this.host = cred.host;
            this.port = cred.port;
            this.username = cred.username;
            this.password = cred.password;
            this.gatewayHost = cred.gatewayHost;
            this.gatewayPort = cred.gatewayPort;
        }
        this.crypt = new __WEBPACK_IMPORTED_MODULE_0__Crypt__["a" /* Crypt */]();
        this.crypt.send = this.sendClear.bind(this);
        this.term = term;
        this.onConnectionEnd = onConnectionEnd;
        this.onConnectionReady = onConnectionReady;
        this.ws = new WebSocket(this.getURL());
        this.ws.onopen = () => {
            console.log("Connection established: " + this.getURL());
            this.connectionOpen = true;
        };
        this.ws.onerror = (error) => {
            console.error("Connection failed: " + this.getURL());
            this.term.writeln("Connection failed: " + this.getURL());
            this.connectionOpen = false;
        };
        this.ws.onmessage = (message) => {
            switch (this.mode) {
                case 'AUTH':
                    // The server initiates the encryption
                    this.crypt.initECDH(message.data);
                    this.mode = "CRED";
                    break;
                case 'CRED':
                    this.authenticate();
                    this.mode = "COMM";
                    if (this.onConnectionReady)
                        setTimeout(() => { this.onConnectionReady(); }, 1000);
                    break;
                case 'COMM':
                    // Decryption
                    let iv = message.data.substring(0, 32);
                    let msg = message.data.substring(32);
                    this.crypt.decrypt(msg, this.crypt.ecdh, iv).then(decrypted => {
                        const clearMessage = __WEBPACK_IMPORTED_MODULE_0__Crypt__["a" /* Crypt */].ab82str(decrypted);
                        const type = clearMessage.substring(0, 3);
                        msg = clearMessage.substring(4, message.data.indexOf("\n", 4)).replace(/[^\x20-\x7F]/g, "");
                        if (this.lastCMD === msg) {
                            msg = clearMessage.substring(message.data.indexOf("\n", 4) + 2); // we dont want to display it.
                        }
                        else {
                            msg = clearMessage.substring(4);
                        }
                        if (type === "ERR:")
                            this.term.write("STDERR: " + msg);
                        else
                            this.term.write(msg);
                    });
                    break;
                default:
            }
            /*
            // The server initiates the encryption
            if(!this.ecdh) {
                this.crypt.initECDH(message.data);
                this.ecdh = true;
            }
            else {
                // Decryption
                let iv  = message.data.substring(0, 32);
                let msg = message.data.substring(32);
                this.crypt.decrypt(msg, this.crypt.ecdh, iv).then(decrypted => {
                    const clearMessage = Crypt.ab82str(decrypted);
                    console.log("CLEAR MSG: " + clearMessage);
                    const type = clearMessage.substring(0, 3);
                    msg = clearMessage.substring(4, message.data.indexOf("\n", 4)).replace(/[^\x20-\x7F]/g, "");

                    if (this.lastCMD === msg) {                                              // SSH sends the last entered command again.
                        msg = clearMessage.substring(message.data.indexOf("\n", 4) + 2);    // we dont want to display it.
                    }
                    else {
                        msg = clearMessage.substring(4);
                    }

                    if (type === "ERR:")
                        this.term.write("STDERR: " + msg);
                    else
                        this.term.write(msg);
                });
            }
            */
        };
        this.ws.onclose = (close) => {
            console.error("Connection closed: " + this.getURL());
            if (close.code != 1000) {
                this.term.writeln("Connection closed abnormally. Code: " + close.code);
            }
            this.connectionOpen = false;
            if (this.onConnectionEnd)
                this.onConnectionEnd();
        };
        this.connectionOpen = true;
    }
    send(data) {
        if (!this.connectionOpen)
            return;
        this.lastCMD = data.replace(/[^\x20-\x7F]/g, "");
        //this.ws.send(data);
        return this._send(data);
    }
    sendRaw(data) {
        //this.ws.send(data);
        return this._send(data);
    }
    authenticate() {
        if (this.host && this.port && this.username && this.password) {
            this.sendRaw(this.host + "|" + this.port + "|" + this.username + "|" + this.password);
            this.auth = true;
        }
        else
            this.auth = false;
    }
    /**
     * Send data UNENCRYPTED over the stream. Necessary for ecdh key exchange
     * WARNING: Do never send data unencrypted if its not absolutely necessary.
     *
     * @param {string} data The string to be send
     */
    sendClear(data) {
        this.ws.send(data);
    }
    //Encryption
    _send(data) {
        return Promise.resolve(this.crypt.encrypt(data, this.crypt.ecdh).then(encrypted => {
            this.ws.send(__WEBPACK_IMPORTED_MODULE_0__Crypt__["a" /* Crypt */].buf2Hex(encrypted.iv) + __WEBPACK_IMPORTED_MODULE_0__Crypt__["a" /* Crypt */].buf2Hex(encrypted.enc));
        }));
    }
    close() {
        if (!this.connectionOpen)
            return;
        this.connectionOpen = false;
        this.ws.close(4004, "Process killed");
        if (this.onConnectionEnd)
            this.onConnectionEnd();
    }
    getURL() {
        return "ws://" + this.gatewayHost + ":" + this.gatewayPort;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SSH3Wrapper;

//# sourceMappingURL=SSH3-Wrapper.js.map

/***/ }),

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Crypt {
    constructor() {
        this.arr = null;
        this.ecdh = null;
        this.send = null;
    }
    initECDH(remoteKey) {
        let localKey = null;
        let secret = null;
        window.crypto.subtle.generateKey({
            name: "ECDH",
            namedCurve: "P-521"
        }, false, ['deriveKey', 'deriveBits'])
            .then((key) => {
            localKey = key;
            return window.crypto.subtle.exportKey('raw', key.publicKey);
        })
            .then(pubKeyExported => {
            const pubKeyHex = Crypt.buf2Hex(pubKeyExported);
            if (this.send == null)
                return;
            this.send(pubKeyHex);
            return window.crypto.subtle.importKey('raw', Crypt.hex2Arr(remoteKey), {
                name: "ECDH",
                namedCurve: "P-521"
            }, true, []);
        })
            .then(importedRemoteKey => {
            return window.crypto.subtle.deriveBits({
                name: "ECDH",
                namedCurve: "P-521",
                public: importedRemoteKey
            }, localKey.privateKey, 528);
        })
            .then(sharedSecret => {
            // console.log(Crypt.buf2Hex(sharedSecret));  // Display Shared secret
            secret = Crypt.buf2Hex(sharedSecret);
            this.ecdh = secret;
        });
    }
    // Cryptography
    encrypt(data, key) {
        const iv = window.crypto.getRandomValues(new Uint8Array(16));
        const buffer = Crypt.str2ab8(data);
        const keybuffer = Crypt.hex2Arr(key);
        // SHA 256
        return window.crypto.subtle.digest('SHA-256', keybuffer).then((keyHashSHA) => {
            return window.crypto.subtle.importKey('raw', keyHashSHA, { name: 'AES-CBC', length: 256 }, false, ['encrypt']).then(cryptoKey => {
                return window.crypto.subtle.encrypt({
                    name: "AES-CBC",
                    length: 256,
                    iv: iv
                }, cryptoKey, buffer).then((encrypted) => {
                    return { enc: encrypted, iv: iv };
                });
            });
        });
    }
    decrypt(data, key, ivstring) {
        const iv = Crypt.hex2Arr(ivstring);
        const buffer = Crypt.hex2Arr(data);
        const keybuffer = Crypt.hex2Arr(key);
        return window.crypto.subtle.digest('SHA-256', keybuffer).then(keyHashSHA => {
            return window.crypto.subtle.importKey('raw', keyHashSHA, { name: 'AES-CBC', length: 256 }, false, ['decrypt']).then(cryptoKey => {
                return window.crypto.subtle.decrypt({
                    name: "AES-CBC",
                    length: 256,
                    iv: iv
                }, cryptoKey, buffer).then(decrypted => {
                    return decrypted;
                });
            });
        });
    }
    // Helpers
    static hex2Arr(str) {
        if (!str)
            return new Uint8Array(0);
        const tmp = [];
        for (let i = 0, len = str.length; i < len; i += 2)
            tmp.push(parseInt(str.substr(i, 2), 16));
        return new Uint8Array(tmp);
    }
    static buf2Hex(buf) {
        return Array.from(new Uint8Array(buf)).map(x => ('00' + x.toString(16)).slice(-2)).join('');
    }
    static str2ab(str) {
        const buf = new ArrayBuffer(str.length * 2);
        const bufView = new Uint16Array(buf);
        for (let i = 0, strlen = str.length; i < strlen; i++)
            bufView[i] = str.charCodeAt(i);
        return buf;
    }
    static ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }
    static str2ab8(str) {
        const buf = new ArrayBuffer(str.length);
        const bufView = new Uint8Array(buf);
        for (let i = 0; i < str.length; i++)
            bufView[i] = str.charCodeAt(i);
        return buf;
    }
    static ab82str(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Crypt;

//# sourceMappingURL=Crypt.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SSHTerminalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_DataModel__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Terminal3__ = __webpack_require__(303);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import {Terminal2} from "./Terminal2";


//import {SSH2Wrapper} from "./SSH2-Wrapper";
let SSHTerminalPage = class SSHTerminalPage {
    constructor(viewCtrl, alertCtrl, model, modalCtrl) {
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.model = model;
        this.modalCtrl = modalCtrl;
        //term:Terminal2 = null;
        this.term = null;
        this.promt = "[usr@happy] #";
    }
    ngOnInit() {
        // #input-line cmdline
        //console.log("cmdLine: " + JSON.stringify(document.querySelector(".cmdline")));
        //this.term = new Terminal2('.cmdline', '#container output',
        //    this.alertCtrl, this.model, this.modalCtrl, this.viewCtrl);
        //this.term.setPromtChange(this.promtChange.bind(this));
        this.term = new __WEBPACK_IMPORTED_MODULE_3__Terminal3__["a" /* Terminal3 */]('terminal-container', this.modalCtrl);
    }
    ;
    promtChange(p) {
        this.promt = p;
    }
    closeModal() {
        this.viewCtrl.dismiss();
    }
};
SSHTerminalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: "page-ssh",template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\ssh\ssh-terminal.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>SSH-Terminal</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()"><ion-icon name="close"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<!--<ion-content id="terminal-container">\n    <div id="container">\n        <output></output>\n        <div id="input-line" class="input-line">\n            <div class="prompt" [innerHtml]="promt"></div>\n            <div><input id="cmdline" class="cmdline" autofocus/></div>\n        </div>\n    </div>\n</ion-content>-->\n\n<ion-content>\n    <div id="terminal-container"></div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\ssh\ssh-terminal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
], SSHTerminalPage);

//# sourceMappingURL=ssh-terminal.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let LogsPage = class LogsPage {
    constructor(model) {
        this.model = model;
        this.logs = [];
        this.selectedLog = null;
        this.logText = "";
        this.isLoading = false;
        this.loadingFailed = false;
    }
    ngOnInit() {
        //DataModel.getInstance().addLoadingFinishedCallback(this.reloadingFinishedListener.bind(this));
        //if(!DataModel.getInstance().isLoading()) this.reloadingFinishedListener();
        this.model.addLoadingFinishedCallback(this.reloadingFinishedListener.bind(this));
        if (!this.model.isLoading())
            this.reloadingFinishedListener();
    }
    reloadingFinishedListener() {
        //let model:DataModel = DataModel.getInstance();
        this.logs = [];
        if (!(this.model.logs == null || this.model.logs == undefined || this.model.config == null || this.model.config == undefined)) {
            this.modifyURLs();
            this.logs = this.model.logs;
            this.selectedLog = this.logs[0];
            this.loadSelectedLog();
        }
    }
    reload() {
        if (this.isLoading)
            return;
        this.loadSelectedLog();
    }
    logSelected($event) {
        this.selectedLog = $event;
        this.loadSelectedLog();
    }
    loadSelectedLog() {
        this.isLoading = true;
        this.loadingFailed = this.model.isLoadingFailed();
        //DataModel.getInstance().asyncLoadFile(this.selectedLog.file, this.logLoaded.bind(this))
        this.model.asyncLoadFile(this.selectedLog.file, this.logLoaded.bind(this));
    }
    modifyURLs() {
        let log_dir = this.model.config.data_dir + "/log";
        let remote_url = this.model.getRemoteURL();
        for (let i = 0; i < this.model.logs.length; i++) {
            // If it does not begin with 'http', then basename of log name is set
            // For example, /tmp/cron.log --> cron.log --> remote_url + data_dir + '/log/' + cron.log
            if (!this.model.isHttpURL(this.model.logs[i].file)) {
                let logname = this.model.logs[i].file;
                let base_logfile = logname.split('/').reverse()[0];
                this.model.logs[i].file = remote_url + "/" + log_dir + "/" + base_logfile;
            }
        }
    }
    logLoaded(log, statusCode) {
        if (statusCode == 200)
            this.logText = log.replace(/\n/gm, "<br>");
        else
            this.logText = "ERROR: Log could not be loaded";
        this.isLoading = false;
    }
};
LogsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-logs',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\logs\logs.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Logs Viewer</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (click)="reload()" *ngIf="!isLoading"><ion-icon name="refresh"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-item no-padding>\n\n        <ion-label>Log:</ion-label>\n\n        <ion-select (ionChange)="logSelected($event)" interface="action-sheet" style="max-width: 85% !important;">\n\n            <ion-option *ngFor="let l of logs" [selected]="l == selectedLog" [value]="l">{{l.name}}</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n\n\n    <div text-center padding [hidden]="!isLoading">\n\n        <ion-spinner></ion-spinner>\n\n    </div>\n\n\n\n    <div no-padding text-wrap [hidden]="isLoading">\n\n        <br/>\n\n        <div [innerHTML]="logText"></div>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\logs\logs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */]])
], LogsPage);

//# sourceMappingURL=logs.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisualizersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let VisualizersPage = class VisualizersPage {
    constructor(model) {
        this.model = model;
        this.visualizers = [];
        this.selectedVisualizer = null;
        this.isLoading = true;
        this.loadingFailed = false;
    }
    ngOnInit() {
        this.model.addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        this.model.addLoadingFinishedCallback(this.reloadingFinishedListener.bind(this));
        if (!this.model.isLoading())
            this.reloadingFinishedListener();
    }
    reloadingFinishedListener() {
        this.visualizers = [];
        this.isLoading = false;
        if (!(this.model.visualizers == null || this.model.visualizers == undefined)) {
            this.loadingFailed = false;
            this.visualizers = this.model.visualizers;
            this.modifyLinks();
            this.selectedVisualizer = this.visualizers[0];
        }
        else
            this.loadingFailed = true;
    }
    onLoadingStartedListener() {
        this.isLoading = true;
    }
    /* Deprecated
    createErrorLoadingPopup()
    {
        //let model:DataModel = DataModel.getInstance();
        const alert = this.alertCtrl.create({
            title: '<b>Connection error</b>',
            subTitle: 'Unable to  connect to given instance<br\>Host: ' + this.model.currentlyActive.host + '<br\>Port: ' + this.model.currentlyActive.mobile_port,
            buttons: ['OK']
        });
        alert.present();
    }*/
    reload() {
        if (this.isLoading)
            return;
        this.isLoading = true;
        //DataModel.getInstance().reload();
        this.model.reload();
    }
    modifyLinks() {
        //let model:DataModel = DataModel.getInstance();
        for (let i = 0; i < this.model.visualizers.length; i++) {
            let remote_url = this.model.getRemoteURL();
            if (this.model.isHttpURL(this.model.visualizers[i].file))
                remote_url = "";
            this.model.visualizers[i].file = remote_url + this.model.visualizers[i].file;
        }
    }
    visualizerSelected($event) {
        this.selectedVisualizer = $event;
    }
};
VisualizersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-visualizers',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\visualizers\visualizers.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Visualizers</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="reload()" *ngIf="!isLoading"><ion-icon name="refresh"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <div text-center padding [hidden]="!loadingFailed || isLoading">\n        <span style="font-weight: bold; font-size: 22pt">Loading failed <br> No Data</span>\n    </div>\n\n    <ion-item no-padding [hidden]="isLoading || loadingFailed">\n        <ion-label>Diagram:</ion-label>\n        <ion-select (ionChange)="visualizerSelected($event)" interface="action-sheet" style="max-width: 75% !important;">\n            <ion-option *ngFor="let v of visualizers" [value]="v">{{v.name}}</ion-option>\n        </ion-select>\n    </ion-item>\n\n    <ion-item no-padding style="margin-left: auto; margin-right: auto; max-width: 100%;" *ngIf="!isLoading && !loadingFailed">\n        <img src="{{selectedVisualizer.file}}"/>\n    </ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\visualizers\visualizers.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */]])
], VisualizersPage);

//# sourceMappingURL=visualizers.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HumansPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let HumansPage = class HumansPage {
    constructor(model) {
        this.model = model;
        this.humans = [];
    }
    ngOnInit() {
        //DataModel.getInstance().addLoadingFinishedCallback(this.reloadingFinishedCallback.bind(this));
        //if(!DataModel.getInstance().isLoading()) this.reloadingFinishedCallback();
        this.model.addLoadingFinishedCallback(this.reloadingFinishedCallback.bind(this));
        if (!this.model.isLoading())
            this.reloadingFinishedCallback();
    }
    reloadingFinishedCallback() {
        //this.humans = DataModel.getInstance().humans;
        this.humans = this.model.humans;
        if (this.humans == null || this.humans == undefined) {
            this.humans = [{ "name": "Commander John Shepard", "img": "https://yt3.ggpht.com/a-/AJLlDp22ITbg7LJa22ARdZVTVnouLreNJE6M60QYjA=s900-mo-c-c0xffffffff-rj-k-no",
                    "email": "john.shepard@navy.alliace", "tel": "01713387554", "text": "The chances of surviving are... slim.", "url": "" }];
        }
    }
    openHuman(human) {
        console.log("HUMAN: " + JSON.stringify(human));
        window.open(human.url, "_system");
    }
};
HumansPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-humans',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\humans\humans.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Ticket, E-mail & Contact</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-list no-padding>\n\n        <ion-item *ngFor="let human of humans" text-wrap (click)="openHuman(human)">\n\n            <ion-avatar item-left>\n\n                <img src="{{human.img}}"/>\n\n            </ion-avatar>\n\n            E-mail: <a href="mailto:{{human.email}}" target="_blank">{{human.email}}</a> <br/>\n\n            Tel: {{human.tel}}\n\n            <p>{{human.text}}</p>\n\n        </ion-item>\n\n    </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\humans\humans.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */]])
], HumansPage);

//# sourceMappingURL=humans.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import {DataSearch} from "../../data/DataSearch";
let WorkingPage = class WorkingPage {
    constructor(model) {
        this.model = model;
        //search:DataSearch = null;
        //data:any[] = [];
        //searchContent:string = "";
        //isLoading:boolean = true;
        this.isLoading = true;
        this.listIMG = [];
    }
    ngOnInit() {
        //this.model.addLoadingFinishedCallback(this.loadingFinished.bind(this));
        //if(!this.model.isLoading()) this.loadingFinished();
    }
    loadingFinished() {
        //this.isLoading = false;
        //this.search = new DataSearch(this.model);
        //console.log("PROD: " + JSON.stringify(this.search.searchData));
        //this.data = this.search.searchData;
        //if(this.searchContent !== "") this.data = this.search.search(this.searchContent);
        if (this.model.monitoringUrls == undefined)
            return;
        this.isLoading = false;
        this.setLinks("latest");
        this.listIMG = [];
        this.listIMG.push({ src: this.model.monitoringUrls[0].urls[0].thumbnail, title: this.model.monitoringUrls[0].urls[0].name });
        this.listIMG.push({ src: this.model.monitoringUrls[0].urls[1].thumbnail, title: this.model.monitoringUrls[0].urls[1].name });
        this.listIMG.push({ src: this.model.monitoringUrls[0].urls[2].thumbnail, title: this.model.monitoringUrls[0].urls[2].name });
        this.listIMG.push({ src: this.model.monitoringUrls[0].urls[3].thumbnail, title: this.model.monitoringUrls[0].urls[3].name });
        this.listIMG.push({ src: this.model.monitoringUrls[0].urls[4].thumbnail, title: this.model.monitoringUrls[0].urls[4].name });
        this.listIMG.push({ src: this.model.monitoringUrls[0].urls[4].thumbnail, title: this.model.monitoringUrls[0].urls[4].name });
        this.listIMG.push({ src: this.model.monitoringUrls[0].urls[4].thumbnail, title: this.model.monitoringUrls[0].urls[4].name });
        this.listIMG.push({ src: this.model.monitoringUrls[0].urls[4].thumbnail, title: this.model.monitoringUrls[0].urls[4].name });
        this.listIMG.push({ src: this.model.monitoringUrls[0].urls[4].thumbnail, title: this.model.monitoringUrls[0].urls[4].name });
        console.log("LIST: " + JSON.stringify(this.listIMG));
    }
    setLinks(datetime_dir) {
        //let model:DataModel = DataModel.getInstance();
        let remote_url = this.model.getRemoteURL();
        let config = this.model.config;
        let capture_dir = config.data_dir + "/capture";
        let thumbnail_dir = config.data_dir + "/thumbnail";
        let analysis_dir = config.data_dir + "/analysis";
        if (this.model.configuration.get().enableMadVision) {
            capture_dir = analysis_dir + "/madvision";
            thumbnail_dir = analysis_dir + "/madvision_thumbnail";
        }
        let plot_analysis_dir = analysis_dir + "/plot_analysis/latest";
        let plot_pathway_dir = analysis_dir + "/plot_pathway/latest";
        for (let i = 0; i < this.model.monitoringUrls.length; i++) {
            for (let j = 0; j < this.model.monitoringUrls[i].urls.length; j++) {
                if ((this.model.monitoringUrls[i].urls[j].file_prefix == null) || (!this.model.monitoringUrls[i].urls[j].capture)) {
                    this.model.monitoringUrls[i].urls[j].thumbnail = remote_url + "img/not_captured.png";
                    this.model.monitoringUrls[i].urls[j].image = remote_url + "img/not_captured.png";
                    this.model.monitoringUrls[i].urls[j].analysis_plot = remote_url + "img/not_captured.png";
                    this.model.monitoringUrls[i].urls[j].plot_pathway = remote_url + "img/not_captured.png";
                    this.model.monitoringUrls[i].urls[j].plot_overall_pathway = remote_url + "img/not_captured.png";
                }
                else {
                    this.model.monitoringUrls[i].urls[j].thumbnail = remote_url + thumbnail_dir + "/" + datetime_dir + "/" + this.model.monitoringUrls[i].urls[j].file_prefix + ".jpg";
                    this.model.monitoringUrls[i].urls[j].image = remote_url + capture_dir + "/" + datetime_dir + "/" + this.model.monitoringUrls[i].urls[j].file_prefix + ".jpg";
                    this.model.monitoringUrls[i].urls[j].plot_analysis = remote_url + plot_analysis_dir + "/" + this.model.monitoringUrls[i].urls[j].file_prefix + ".png";
                    this.model.monitoringUrls[i].urls[j].plot_pathway = remote_url + plot_pathway_dir + "/" + this.model.monitoringUrls[i].urls[j].file_prefix + ".png";
                    this.model.monitoringUrls[i].urls[j].plot_overall_pathway = remote_url + plot_pathway_dir + "/overall_pathway.png";
                    //this.setPlots(this.plot_name);
                }
            }
        }
        //console.log(JSON.stringify(this.model.monitoringUrls));
        //this.monitoringURLs = this.model.monitoringUrls;
    }
    imgClicked(img) {
        //this.data = this.search.searchData;
        //let val:string = event.target.value;
        //if(val && val.trim() !== '')
        //{
        //    this.data = this.search.search(val);
        //}
        //this.searchContent = val;
    }
};
WorkingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-working',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\working\working.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Working</ion-title>\n    </ion-navbar>\n    <!--<ion-toolbar>\n        <ion-searchbar placeholder="Search" (ionInput)="searchData($event)"></ion-searchbar>\n    </ion-toolbar>-->\n</ion-header>\n\n<ion-content>\n    <!--<div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <!--<ion-list [hidden]="isLoading">\n        <ion-item *ngFor="let item of data">\n            {{ item.name }}\n        </ion-item>\n    </ion-list>-->\n\n    <!-- Widgets -->\n    <!--<ion-card no-padding>\n        <ion-card-header>{{data[0].name}}</ion-card-header>\n        <ion-card-content>\n            <div style="border-style: none; text-align:center"><img src="{{data[0].thumbnail}}"/></div>\n        </ion-card-content>\n    </ion-card>-->\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\working\working.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */]])
], WorkingPage);

//# sourceMappingURL=working.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyzerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hf_classical_hf_categories__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__analyzer_detail__ = __webpack_require__(225);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let AnalyzerPage = class AnalyzerPage {
    constructor(model, navControl, componentFactoryResolver) {
        this.model = model;
        this.navControl = navControl;
        this.componentFactoryResolver = componentFactoryResolver;
        // Default values
        this.statusLevel = "Normal";
        this.statusImg = "https://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg";
        this.statusColor = "item-calm";
        this.statusText = "World wide Atlas Distributed Computing System";
        this.isLoading = true;
        this.loadingFailed = false;
        this.pageHolder = null;
        this.viewers = [
            { "id": "analysis", "name": "Status Analysis", "type": "plots", "src": null },
            { "id": "pathway", "name": "Info Pathway", "type": "plots", "src": null },
            { "id": "overall_pathway", "name": "Overall Info Pathway", "type": "img", "src": "https://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg" },
            { "id": "happyface", "name": "HappyFace Classical Rating", "type": "page", "src": __WEBPACK_IMPORTED_MODULE_2__hf_classical_hf_categories__["a" /* HFCategoriesPage */] },
            { "id": "forecast", "name": "Happy Forecast", "type": "imgs", "src": Array(0) }
        ];
        this.selectedViewer = this.viewers.find(v => v.id === "overall_pathway");
    }
    ngOnInit() {
        this.model.addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        this.model.addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        if (!this.model.isLoading())
            this.onReloadFinishedListener();
    }
    onReloadFinishedListener() {
        this.isLoading = false;
        if (this.dataExists()) {
            this.loadingFailed = false;
            this.setStatusCard();
            this.setPlots2();
            this.viewers.find(v => v.id === "overall_pathway").src = this.model.monitoringUrls[0].urls[0].plot_overall_pathway;
            this.setForecast();
        }
        else
            this.loadingFailed = true;
    }
    onLoadingStartedListener() {
        this.isLoading = true;
    }
    dataExists() {
        if (!(this.model.summary == null || this.model.summary == undefined)) {
            if (!(this.model.config == null || this.model.config == undefined)) {
                if (!(this.model.config.status == null || this.model.config.status == undefined)) {
                    if (!(this.model.monitoringUrls == null || this.model.monitoringUrls == undefined)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    setStatusCard() {
        this.statusText = this.model.summary.text;
        this.statusLevel = this.model.summary.level;
        for (let i = 0; i < this.model.config.status.length; i++) {
            if (this.model.config.status[i].name === this.statusLevel) {
                this.statusImg = this.model.config.status[i].file;
            }
        }
        for (let i = 0; i < this.model.config.status.length; i++) {
            if (this.model.config.status[i].name === this.statusLevel) {
                this.statusColor = this.model.config.status[i].color;
            }
        }
    }
    reload() {
        if (this.isLoading)
            return;
        this.isLoading = true;
        this.model.reload();
    }
    viewerChanged(event) {
        if (this.selectedViewer.type === 'page' && !this.pageHolder == undefined) {
            this.pageHolder.destroy();
        }
        console.log("VIEWER CHANGED TO: " + JSON.stringify(event));
        this.selectedViewer = event;
        if (this.selectedViewer.type === 'page') {
            if (this.parent == undefined)
                console.error("PARENT UNDEFINED");
            else
                this.pageHolder = this.parent.createComponent(this.componentFactoryResolver.resolveComponentFactory(this.selectedViewer.src));
        }
    }
    speakSummary() {
        this.setStatusCard();
        this.model.speakSummary();
    }
    openPage(url) {
        this.navControl.push(__WEBPACK_IMPORTED_MODULE_4__analyzer_detail__["a" /* AnalyzerDetailPage */], { 'url': url });
    }
    setPlots2() {
        // Generate array
        this.viewers[0].src = { "monitoringURLs": [] };
        this.viewers[1].src = { "monitoringURLs": [] };
        this.viewers[0].src.monitoringURLs = [];
        this.viewers[1].src.monitoringURLs = [];
        for (let i = 0; i < this.model.monitoringUrls.length; i++) {
            this.viewers[0].src.monitoringURLs.push({ "urls": [], "name": "" });
            this.viewers[1].src.monitoringURLs.push({ "urls": [], "name": "" });
            for (let j = 0; j < this.model.monitoringUrls[i].urls.length; j++) {
                this.viewers[0].src.monitoringURLs[i].urls.push({ "plot": "", "name": "", "link": "" });
                this.viewers[1].src.monitoringURLs[i].urls.push({ "plot": "", "name": "", "link": "" });
            }
        }
        for (let i = 0; i < this.model.monitoringUrls.length; i++) {
            this.viewers[0].src.monitoringURLs[i].name = this.model.monitoringUrls[i].name;
            this.viewers[1].src.monitoringURLs[i].name = this.model.monitoringUrls[i].name;
            for (let j = 0; j < this.model.monitoringUrls[i].urls.length; j++) {
                if ((this.model.monitoringUrls[i].urls[j].file_prefix == null))
                    console.log("DEBUG: 1nop");
                else {
                    this.viewers[0].src.monitoringURLs[i].urls[j].plot = this.model.monitoringUrls[i].urls[j].plot_analysis;
                    this.viewers[0].src.monitoringURLs[i].urls[j].name = this.model.monitoringUrls[i].urls[j].name;
                    this.viewers[0].src.monitoringURLs[i].urls[j].link = this.model.monitoringUrls[i].urls[j].link;
                    this.viewers[1].src.monitoringURLs[i].urls[j].plot = this.model.monitoringUrls[i].urls[j].plot_pathway;
                    this.viewers[1].src.monitoringURLs[i].urls[j].name = this.model.monitoringUrls[i].urls[j].name;
                    this.viewers[1].src.monitoringURLs[i].urls[j].link = this.model.monitoringUrls[i].urls[j].link;
                }
            }
        }
    }
    setForecast() {
        let tmp = this.model.analysis[0].forecast;
        for (let i = 0; i < tmp.length; i++)
            tmp[i] = this.model.getRemoteURL() + this.model.analysis[0].forecast[i].substring(1);
        this.viewers.find(v => v.id === "forecast").src = this.model.analysis[0].forecast;
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_8" /* ViewChild */])('parent', { read: __WEBPACK_IMPORTED_MODULE_3__angular_core__["_10" /* ViewContainerRef */] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__angular_core__["_10" /* ViewContainerRef */])
], AnalyzerPage.prototype, "parent", void 0);
AnalyzerPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
        selector: 'page-analyzer',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\analyzer.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Happy Monitoring Analyzer</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="reload()" *ngIf="!isLoading"><ion-icon name="refresh"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n    <div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <div text-center padding [hidden]="!loadingFailed || isLoading">\n        <span style="font-weight: bold; font-size: 22pt">Loading failed <br> No Data</span>\n    </div>\n\n    <ion-list [hidden]="isLoading || loadingFailed" no-padding>\n        <!-- Status card -->\n        <ion-card no-padding no-margin style="width: 100%" (click)="speakSummary()">\n            <ion-card color="{{statusColor}}">\n                <ion-card-header>\n                    Status: {{statusLevel}}\n                </ion-card-header>\n            </ion-card>\n            <ion-card-content no-padding>\n                <ion-item text-wrap>\n                    <ion-thumbnail item-start>\n                        <img src="{{statusImg}}">\n                    </ion-thumbnail>\n                    <h2>{{statusText}}</h2>\n                </ion-item>\n            </ion-card-content>\n        </ion-card>\n        <br>\n\n        <!-- Viewer chooser -->\n        <ion-item no-padding>\n            <ion-label>Viewer:</ion-label>\n            <ion-select (ionChange)="viewerChanged($event)" interface="action-sheet" style="max-width: 81% !important;">\n                <ion-option *ngFor="let v of viewers" [selected]="v.id === \'overall_pathway\'" [value]="v">{{v.name}}</ion-option>\n            </ion-select>\n        </ion-item>\n\n\n        <!-- TYPE == plots -->\n        <ng-container *ngIf="(selectedViewer.type === \'plots\')">\n            <ion-item *ngFor="let monitoringURL of selectedViewer.src.monitoringURLs" no-padding no-margin text-wrap>\n                <ion-card no-padding no-margin>\n                    <ion-card-header class="group-title">{{monitoringURL.name}}</ion-card-header>\n                    <ion-card-content no-padding>\n                        <ion-grid no-padding>\n                            <ion-row class="group" no-padding no-margin>\n                                <ion-col col-6 col-sm no-padding *ngFor="let url of monitoringURL.urls">\n                                    <div class="launchpad">\n                                        <div class="logo"><img src="{{url.plot}}" alt="Not Analyzed" (click)="openPage(url)"/></div>\n                                        <a href="{{url.link}}" target="_blank"><div class="caption">{{url.name}}</div></a>\n                                    </div>\n                                </ion-col>\n                            </ion-row>\n                        </ion-grid>\n                    </ion-card-content>\n                </ion-card>\n            </ion-item>\n        </ng-container>\n\n\n        <!-- TYPE == img -->\n        <ion-item *ngIf="(selectedViewer.type === \'img\')">\n            <img src="{{selectedViewer.src}}"/>\n        </ion-item>\n\n        <!-- TYPE == imgs -->\n        <ion-item *ngIf="(selectedViewer.type === \'imgs\')">\n            <ion-row>\n                <ion-col col-sm-4 *ngFor="let src of selectedViewer.src">\n                    <img src="{{src}}">\n                </ion-col>\n            </ion-row>\n        </ion-item>\n\n    </ion-list>\n\n    <!-- TYPE == page -->\n    <span [hidden]="!(selectedViewer.type === \'page\')">\n        <ng-container #parent></ng-container>\n    </span>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\analyzer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__angular_core__["o" /* ComponentFactoryResolver */]])
], AnalyzerPage);

//# sourceMappingURL=analyzer.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HFCategoriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ClassicalDataModel__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hf_modules__ = __webpack_require__(223);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let HFCategoriesPage = class HFCategoriesPage {
    constructor(classicModel, navCtrl) {
        this.classicModel = classicModel;
        this.navCtrl = navCtrl;
        this.IMG_HAPPY = "assets/arrows/arrow-up.svg";
        this.IMG_WARNING = "assets/arrows/arrow-right.svg";
        this.IMG_CRITICAL = "assets/arrows/arrow-down.svg";
        this.IMG_ERROR = "assets/arrows/cross.svg";
        this.isLoading = true;
        this.outdated = false;
        this.outdateHandler = 0;
        this.data_time = "sometime";
        this.categories = null;
    }
    ngOnInit() {
        this.classicModel.addLoadingFinishedCallback(this.loadingFinishedListener.bind(this));
        if (!this.classicModel.isLoading())
            this.loadingFinishedListener();
        this.outdateHandler = window.setInterval(() => { this.outdated = true; }, 1200000);
    }
    loadingFinishedListener() {
        this.isLoading = false;
        this.categories = this.classicModel.categories;
        this.data_time = this.classicModel.lastRefreshed.toLocaleString();
    }
    reload() {
        clearInterval(this.outdateHandler);
        this.outdateHandler = window.setInterval(() => { this.outdated = true; }, 1200000);
        this.classicModel.addLoadingFinishedCallback(this.loadingFinishedListener.bind(this));
        if (!this.classicModel.isLoading())
            this.loadingFinishedListener();
        this.classicModel.reload();
    }
    imgForCategory(cat) {
        return cat.status == 1.0 ? this.IMG_HAPPY : (cat.status == 0.5 ? this.IMG_WARNING : (cat.status == 0.0 ? this.IMG_CRITICAL : this.IMG_ERROR));
    }
    categorySelected(cat) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__hf_modules__["a" /* HFModulesPage */], { 'category': cat });
    }
};
HFCategoriesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: "page-hf-categories",template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\hf-classical\hf-categories.html"*/'<!--<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Categories</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (click)="reload()"><ion-icon name="refresh"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>-->\n\n\n\n<style>.scroll-content {\n\n    padding: 0 !important;\n\n}</style>\n\n\n\n<ion-content>\n\n    <div text-center padding *ngIf="isLoading">\n\n        <ion-spinner></ion-spinner>\n\n    </div>\n\n\n\n    <div class="complete-overlay" padding *ngIf="outdated && !isLoading">\n\n        <h1 class="outdated">Outdated</h1>\n\n    </div>\n\n    <div class="complete-overlay" padding *ngIf="false && !isLoading">\n\n        <h1 class="no-active-instance">No Active Instance</h1>\n\n    </div>\n\n\n\n    <div text-center *ngIf="!isLoading" no-padding><h5>data from {{data_time}}</h5></div>\n\n\n\n    <ion-grid *ngIf="!isLoading">\n\n        <ion-row>\n\n            <ion-col col-6 col-sm *ngFor="let category of categories">\n\n                <ion-card (click)="categorySelected(category)">\n\n                    <ion-card-content>\n\n                        <img src="{{imgForCategory(category)}}" height="50px" width="50px"/><br/>\n\n                        <div class="cat-title"><h2>{{category.title}}</h2></div>\n\n                    </ion-card-content>\n\n                </ion-card>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-grid>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\hf-classical\hf-categories.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ClassicalDataModel__["a" /* ClassicalDataModel */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */]])
], HFCategoriesPage);

//# sourceMappingURL=hf-categories.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HFModulesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ClassicalDataModel__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(224);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let HFModulesPage = class HFModulesPage {
    constructor(classicModel, navParams, iab, plt) {
        this.classicModel = classicModel;
        this.navParams = navParams;
        this.iab = iab;
        this.plt = plt;
        this.IMG_HAPPY = "assets/arrows/arrow-up.svg";
        this.IMG_WARNING = "assets/arrows/arrow-right.svg";
        this.IMG_CRITICAL = "assets/arrows/arrow-down.svg";
        this.IMG_ERROR = "assets/arrows/cross.svg";
        this.category = null;
        this.isLoading = false;
        this.modulesExisting = true;
        this.outdated = false;
        this.outdateHandler = 0;
        this.category = this.navParams.get('category');
        if (this.category == null || this.category == undefined) {
            this.modulesExisting = false;
        }
        if (!Array.isArray(this.category.module))
            this.category.module = [this.category.module];
    }
    ngOnInit() {
        this.classicModel.addLoadingFinishedCallback(this.loadingFinishedListener.bind(this));
        if (!this.classicModel.isLoading())
            this.loadingFinishedListener();
        this.outdateHandler = window.setInterval(() => { this.outdated = true; }, 1200000);
    }
    loadingFinishedListener() {
        this.isLoading = false;
    }
    reload() {
        clearInterval(this.outdateHandler);
        this.outdateHandler = window.setInterval(() => { this.outdated = true; }, 1200000);
        this.classicModel.addLoadingFinishedCallback(this.loadingFinishedListener.bind(this));
        if (!this.classicModel.isLoading())
            this.loadingFinishedListener();
        this.classicModel.reload();
    }
    imgForModule(mod) {
        return mod.status == 1.0 ? this.IMG_HAPPY : (mod.status == 0.5 ? this.IMG_WARNING : (mod.status == 0.0 ? this.IMG_CRITICAL : this.IMG_ERROR));
    }
    moduleSelected(mod) {
        //window.open(mod.link, "_blank");
        if (!this.iab || !this.plt)
            window.open(mod.link, "_blank");
        else {
            this.plt.ready().then(() => {
                let options = {
                    location: 'yes',
                    hidden: 'no',
                    clearcache: 'yes',
                    clearsessioncache: 'yes',
                    zoom: 'yes',
                    hardwareback: 'yes',
                    mediaPlaybackRequiresUserAction: 'no',
                    shouldPauseOnSuspend: 'no',
                    closebuttoncaption: 'Close',
                    disallowoverscroll: 'no',
                    toolbar: 'yes',
                    enableViewportScale: 'no',
                    allowInlineMediaPlayback: 'no',
                    presentationstyle: 'pagesheet',
                    fullscreen: 'yes',
                };
                const browser = this.iab.create(mod.link, "_blank", options);
                //browser.on("loadstop").subscribe(()=> console.log("loadstop"));
            });
        }
    }
};
HFModulesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: "page-hf-modules",template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\hf-classical\hf-modules.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>\n\n            {{category.title}}\n\n        </ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (click)="reload()" *ngIf="false"><ion-icon name="refresh"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div text-center padding *ngIf="isLoading">\n\n        <ion-spinner></ion-spinner>\n\n    </div>\n\n\n\n    <div class="complete-overlay" padding *ngIf="outdated && !isLoading">\n\n        <h1 class="outdated">Outdated</h1>\n\n    </div>\n\n\n\n    <div class="no-modules" *ngIf="!modulesExisting"> No modules contained</div>\n\n\n\n    <ion-list *ngIf="modulesExisting">\n\n        <ng-container *ngFor="let module of category.module">\n\n            <ion-item *ngIf="module.title" (click)="moduleSelected(module)" style="padding: 0 !important">\n\n                <ion-thumbnail item-start style="min-width: 30px; min-height: 30px; width: 30px; height: 30px;">\n\n                    <img src="{{imgForModule(module)}}" style="width: 30px; height: 30px"/>\n\n                </ion-thumbnail>\n\n                <span padding-left text-wrap style="font-size: 20px" item-end>{{module.title}}</span>\n\n                <ion-icon name="ios-arrow-forward-outline" item-end></ion-icon>\n\n            </ion-item>\n\n        </ng-container>\n\n    </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\hf-classical\hf-modules.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ClassicalDataModel__["a" /* ClassicalDataModel */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Platform */]])
], HFModulesPage);

//# sourceMappingURL=hf-modules.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyzerDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let AnalyzerDetailPage = class AnalyzerDetailPage {
    constructor(navParams) {
        this.navParams = navParams;
        this.url = this.navParams.get('url');
        if (this.url == null || this.url == undefined) {
            this.url = { "name": "", "analysis_plot": "http://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg" };
        }
    }
};
AnalyzerDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-analyzer-detail',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\analyzer-detail.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{url.name}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <img style="margin-left: auto; margin-right: auto; max-width: 100%;" src="{{url.plot}}"/>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\analyzer-detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], AnalyzerDetailPage);

//# sourceMappingURL=analyzer-detail.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return WidgetCard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_DataModel__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_detail_image__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Positions__ = __webpack_require__(305);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let HomePage = class HomePage {
    constructor(_compiler, _injector, _m, componentFactoryResolver, alertCtrl, model, navCtrl, loadingCtrl) {
        this._compiler = _compiler;
        this._injector = _injector;
        this._m = _m;
        this.componentFactoryResolver = componentFactoryResolver;
        this.alertCtrl = alertCtrl;
        this.model = model;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.widgets = [];
        this.widgetsSave = ["/assets/widgets/critical-urls-widget/CriticalUrlsWidget.js"];
        this.components = [];
        this.adding = false;
        this.positions = new __WEBPACK_IMPORTED_MODULE_4__Positions__["a" /* Positions */]();
        this.viewIndex = 0;
        this.counter = 0;
        this.editMode = false;
        this.widgetListUrl = "assets/widgets/list.json";
    }
    ngOnInit() {
        this.widgetListUrl = this.model.getRemoteURL() + this.widgetListUrl;
        this.model.addLoadingFinishedCallback(this.reloaded.bind(this));
        this.initWidgets();
    }
    initWidgets() {
        this.clearWidgets();
        this.loadWidgets();
        //this.findWidgets().then(() => { console.log(this.widgetsSave); });
    }
    reloaded() {
        this.model.setLinks("latest");
        for (let i = 0; i < this.widgets.length; i++) {
            this.widgets[i].baseWidget.summary = this.model.summary;
            this.widgets[i].baseWidget.monitoringUrls = this.model.monitoringUrls;
            this.widgets[i].baseWidget.config = this.model.config;
            this.widgets[i].baseWidget.onReload();
        }
    }
    async loadWidgets() {
        for (let i = 0; i < this.widgetsSave.length; i++) {
            let a = this.widgetsSave[i];
            console.log("MODULE: " + a);
            await this.loadAndBuildWidget(a).then((data) => { if (data != null)
                this.widgets.push(data); });
        }
    }
    async loadAndBuildWidget(name) {
        try {
            this._compiler.clearCache();
            try {
                eval("import('/assets/widgets/BaseWidget.js')");
            }
            catch (e) {
                console.log("dynamic import not supported");
                if (this.adding)
                    this.alertCtrl.create({
                        title: "Widget build error",
                        message: "Your browser version does not support dynamic importing of widgets. Because of that the widget system cannot be used. Consider updating to a newer browser or using the Smartphone application.",
                        cssClass: "alertText",
                        buttons: ["OK"]
                    }).present();
                return null;
            }
            const func = new Function("x", "return import(x)");
            const loader = await func(name);
            const widget = loader.cls();
            const widgetModule = new Function("", "class DynamicModule" + this.counter +
                " { } \n return DynamicModule" + this.counter++ + ";")();
            let templUrl = widget.templateUrl;
            let templ = widget.template;
            if (templ == null && templUrl == null) {
                console.error("No template specified");
                throw new Error("Build error: Neither property template nor property templateUrl is specified");
            }
            else if (templ != null && templUrl != null)
                templ = null;
            console.log("TEMPLATE: " + templ + " TEMPLATE URL: " + templUrl);
            //const widgetStyle       = ":host { display: block; left: 0; }\n" + style;
            const cmpObj = { selector: "dynamic-component", templateUrl: templUrl, template: templ, styles: ['.scroll-content { margin: 0; }'] };
            const component = Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])(cmpObj)(widget);
            const module = Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
                declarations: [component],
                imports: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(component)]
            })(widgetModule);
            const factories = await this._compiler.compileModuleAndAllComponentsAsync(module);
            const cardFactory = this.componentFactoryResolver.resolveComponentFactory(WidgetCard);
            const cardRef = cardFactory.create(this._injector);
            const cardView = cardRef.hostView;
            const factory = factories.componentFactories.find(v => v.selector === "dynamic-component");
            const cmpRef = factory.create(this._injector, [], null, this._m);
            this.vc.insert(cardView, this.viewIndex++);
            let dim = this.positions.newPosition(cmpRef.instance.width, cmpRef.instance.height);
            cardRef.instance.showHeaderOverlay = false;
            cardRef.instance.x = dim.x;
            cardRef.instance.y = dim.y;
            cardRef.instance.width = dim.width;
            cardRef.instance.height = dim.height;
            cardRef.instance.name = cmpRef.instance.name == null ? cmpRef.instance.constructor.name : cmpRef.instance.name;
            cardRef.instance.viewIndex = this.viewIndex;
            cardRef.instance.closeFunc = (index) => {
                this.closeWidget(index);
            };
            cardRef.instance.card.insert(cmpRef.hostView, 0);
            /* Add BaseWidget data */
            let baseWidget = cmpRef.instance;
            baseWidget.monitoringUrls = this.model.monitoringUrls;
            baseWidget.summary = this.model.summary;
            baseWidget.config = this.model.config;
            baseWidget.openImageView = this.openImageView.bind(this);
            /* Init widget */
            console.log(baseWidget.summary);
            baseWidget.onInit();
            console.log("Index: " + this.viewIndex + " X: " + cardRef.instance.x + " Y: " + cardRef.instance.y);
            return {
                cardRef: cardRef,
                viewIndex: this.viewIndex,
                baseWidget: baseWidget,
                path: name,
                x: cardRef.instance.x,
                y: cardRef.instance.y,
                width: cardRef.instance.width,
                height: cardRef.instance.height
            };
        }
        catch (e) {
            this.showBuildErrorDialog(e.toString());
            //throw e;
            return null;
        }
    }
    clearWidgets() {
        this.counter = 0;
        this.viewIndex = 0;
        for (let i = 0; i < this.widgets.length; i++) {
            this.closeWidget(this.widgets[i].viewIndex);
        }
        this._compiler.clearCache();
    }
    closeWidget(index) {
        let ind = -1;
        for (let i = 0; i < this.widgets.length; i++)
            if (this.widgets[i].viewIndex === index) {
                this.widgets[i].cardRef.destroy();
                ind = i;
            }
        if (ind > -1) {
            this.widgets.splice(ind, 1);
            this.viewIndex--;
            this.counter--;
        }
        for (let i = 0; i < this.widgets.length; i++) {
            this.widgets[i].cardRef.instance.viewIndex = i;
            this.widgets[i].viewIndex = i;
        }
        this.reloadPositions();
    }
    reloadPositions() {
        this.positions.reset();
        for (let wid of this.widgets) {
            const dim = this.positions.newPosition(wid.cardRef.instance.width, wid.cardRef.instance.height);
            wid.cardRef.instance.x = dim.x;
            wid.cardRef.instance.y = dim.y;
            wid.cardRef.instance.updatePosition();
        }
    }
    edit() {
        this.editMode = !this.editMode;
        for (let wid of this.widgets)
            wid.cardRef.instance.showHeaderOverlay = !wid.cardRef.instance.showHeaderOverlay;
    }
    showBuildErrorDialog(message) {
        let alert = this.alertCtrl.create({
            title: "Widget build error",
            subTitle: message + "\nAborting build.",
            cssClass: "alertText",
            buttons: ['OK']
        });
        alert.present();
    }
    openImageView(data) {
        if (!data || !data.name || !data.image)
            return;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_detail_image__["a" /* HomeDetailImagePage */], { "data": data });
    }
    addWidgetAlert() {
        let widgetList = [];
        let loading = this.loadingCtrl.create({
            spinner: "dots",
            content: "Searching for widgets"
        });
        loading.present();
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    JSON.parse(req.response).widgets.filter((element) => {
                        widgetList.push("/assets/widgets/" + element.src);
                    });
                    loading.dismiss();
                    console.log("Add widget");
                    let alert = this.alertCtrl.create();
                    alert.setTitle("Add Widget");
                    alert.setSubTitle("Choose the widget you want to add:");
                    alert.setCssClass('alertText');
                    for (let s of widgetList) {
                        /* Widgets already displaying cannot be choosen */
                        let used = false;
                        if (this.widgets.find((element) => element.path === s))
                            used = true;
                        alert.addInput({
                            type: 'checkbox',
                            label: s.substring(s.lastIndexOf("/") + 1, s.length),
                            value: s,
                            checked: used,
                            disabled: used
                        });
                    }
                    alert.addButton('Cancel');
                    alert.addButton({
                        text: 'Ok',
                        handler: (data) => {
                            this.adding = true;
                            /* Dont add widgets already displayed */
                            data = data.filter((element) => this.widgets.find((e) => e.path === element) === undefined);
                            for (let a of data)
                                this.loadAndBuildWidget(a).then((widgetData) => {
                                    if (widgetData != null) {
                                        this.widgets.push(widgetData);
                                        widgetData.cardRef.instance.showHeaderOverlay = this.editMode;
                                    }
                                });
                            this.adding = false;
                        }
                    });
                    alert.present();
                }
            }
        };
        req.open("GET", this.widgetListUrl, true);
        req.send();
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('vc', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */])
], HomePage.prototype, "vc", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: "page-home",template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\home\home.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Widgets</ion-title>\n\n        <ion-buttons end>\n            <button ion-button icon-only (click)="edit()"><ion-icon name="construct"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n    <!--<ion-card *ngFor="let i of widgets">\n\n        <!-- Headers --\n        <ion-card-header *ngIf="i.widget.title">\n            <div [innerHTML]="i.widget.title"></div>\n        </ion-card-header>\n\n        <!-- Content --\n        <ion-card-content *ngIf="i.widget.content">\n            <div [innerHTML]="i.widget.content"></div>\n        </ion-card-content>\n\n    </ion-card>-->\n\n    <ng-container #vc></ng-container>\n\n    <ion-fab bottom right *ngIf="editMode">\n        <button ion-fab (click)="addWidgetAlert()"><ion-icon name="add"></ion-icon></button>\n    </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* Compiler */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injector */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* NgModuleRef */],
        __WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* ComponentFactoryResolver */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
], HomePage);

class TmpModule {
}
/* unused harmony export TmpModule */

let WidgetCard = class WidgetCard {
    constructor() {
        this.showHeaderOverlay = false;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.name = "TITLE";
        this.viewIndex = 0;
        this.closeFunc = null;
    }
    close() {
        console.log("CLOSE NUMBER " + this.viewIndex + ".");
        this.closeFunc(this.viewIndex);
    }
    updatePosition() {
        this.positionDirective.update(this.x, this.y, this.width, this.height);
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('card', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */])
], WidgetCard.prototype, "card", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('cdire'),
    __metadata("design:type", Object)
], WidgetCard.prototype, "positionDirective", void 0);
WidgetCard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        template: "<ion-card position startX='{{x}}' startY='{{y}}' width='{{width}}' height='{{height}}' #cdire='position-directive'>" +
            "    <div no-padding class='header-overlay' *ngIf='showHeaderOverlay'>" +
            "       <ion-label no-padding>{{name}} </ion-label>" +
            "       <button class='closebutton' (click)='close()'><ion-icon name='close'></ion-icon></button>" +
            "    </div>" +
            "    <ion-card-content no-padding no-margin>\n" +
            "        <ng-container #card></ng-container>\n" +
            "    </ion-card-content>\n" +
            "</ion-card>\n",
        styles: ['.card { display: block; position: absolute; width: 200px; height: 170px }\n', '.card-content { height: 100%; width: 100% }',
            '.header-overlay { z-index: 20; font-weight: bold; top: 0; left: 0; position: inherit; width: 100%; height: 50px; background-color: #0a9dc7}',
            '.label { padding-top: 5px; padding-left: 10px; display: inline-flex }', '.closebutton { position: absolute; right: 12px; top: 17px; background: transparent}',
            'ion-content .scroll-content, .fixed-content { padding-left: 0; margin-bottom: 0px !important;}'],
    })
], WidgetCard);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeDetailImagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let HomeDetailImagePage = class HomeDetailImagePage {
    constructor(navParams) {
        this.navParams = navParams;
        this.data = this.navParams.get("data");
        if (this.data == null || this.data == undefined)
            this.data = null;
    }
};
HomeDetailImagePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: "home-detail-image",template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\home\home-detail-image.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title *ngIf="data != null">{{data.name}}</ion-title>\n\n        <ion-title *ngIf="data == null">Image</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <img *ngIf="data != null" style="margin-left: auto; margin-right:auto; max-width: 100%" src="{{data.image}}"/>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\home\home-detail-image.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], HomeDetailImagePage);

//# sourceMappingURL=home-detail-image.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(249);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_monitoring_monitoring__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_monitoring_monitoring_webview__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_analyzer_analyzer_detail__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_controller_controller__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_controller_controller_detail__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_visualizers_visualizers__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_logs_logs__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_humans_humans__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_working_working__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_modals_config_config__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_modals_config_instances_component__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_modals_config_modal__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__data_DataModel__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_storage__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_analyzer_hf_classical_ClassicalDataModel__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_analyzer_hf_classical_hf_categories__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_analyzer_hf_classical_hf_modules__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_analyzer_analyzer__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_modals_error_connection_error__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_modals_ssh_ssh_terminal__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_modals_ssh_pass_modal__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_modals_config_instances_browser_component__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_modals_about_about__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_home_home__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_home_home_detail_image__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__angular_common_http__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_in_app_browser__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__directives_position_Position__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_tour_tour__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_file__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_file_chooser__ = __webpack_require__(213);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






































let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* HappyFaceApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_monitoring_monitoring__["a" /* MonitoringPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_monitoring_monitoring_webview__["a" /* MonitoringWebviewPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_analyzer_analyzer__["a" /* AnalyzerPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_analyzer_analyzer_detail__["a" /* AnalyzerDetailPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_controller_controller__["a" /* ControllerPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_controller_controller_detail__["a" /* ControllerDetailPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_visualizers_visualizers__["a" /* VisualizersPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_logs_logs__["a" /* LogsPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_humans_humans__["a" /* HumansPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_modals_config_config__["a" /* ConfigPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_modals_config_modal__["a" /* ModalPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_modals_config_instances_component__["a" /* InstancesComponent */],
            __WEBPACK_IMPORTED_MODULE_28__pages_modals_config_instances_browser_component__["a" /* InstancesBrowserComponent */],
            __WEBPACK_IMPORTED_MODULE_29__pages_modals_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_working_working__["a" /* WorkingPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_modals_error_connection_error__["a" /* ConnectionErrorPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_modals_ssh_ssh_terminal__["a" /* SSHTerminalPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_modals_ssh_pass_modal__["a" /* PassModal */],
            __WEBPACK_IMPORTED_MODULE_22__pages_analyzer_hf_classical_hf_categories__["a" /* HFCategoriesPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_analyzer_hf_classical_hf_modules__["a" /* HFModulesPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_tour_tour__["a" /* TourPage */],
            __WEBPACK_IMPORTED_MODULE_34__directives_position_Position__["a" /* Position */],
            __WEBPACK_IMPORTED_MODULE_30__pages_home_home__["b" /* WidgetCard */],
            __WEBPACK_IMPORTED_MODULE_31__pages_home_home_detail_image__["a" /* HomeDetailImagePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_32__angular_common_http__["a" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* HappyFaceApp */], {}, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_20__ionic_storage__["a" /* IonicStorageModule */].forRoot()
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* HappyFaceApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_monitoring_monitoring__["a" /* MonitoringPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_monitoring_monitoring_webview__["a" /* MonitoringWebviewPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_analyzer_analyzer__["a" /* AnalyzerPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_analyzer_analyzer_detail__["a" /* AnalyzerDetailPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_controller_controller__["a" /* ControllerPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_controller_controller_detail__["a" /* ControllerDetailPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_visualizers_visualizers__["a" /* VisualizersPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_logs_logs__["a" /* LogsPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_humans_humans__["a" /* HumansPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_modals_config_config__["a" /* ConfigPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_modals_config_modal__["a" /* ModalPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_modals_config_instances_component__["a" /* InstancesComponent */],
            __WEBPACK_IMPORTED_MODULE_28__pages_modals_config_instances_browser_component__["a" /* InstancesBrowserComponent */],
            __WEBPACK_IMPORTED_MODULE_29__pages_modals_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_working_working__["a" /* WorkingPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_modals_error_connection_error__["a" /* ConnectionErrorPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_modals_ssh_ssh_terminal__["a" /* SSHTerminalPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_modals_ssh_pass_modal__["a" /* PassModal */],
            __WEBPACK_IMPORTED_MODULE_22__pages_analyzer_hf_classical_hf_categories__["a" /* HFCategoriesPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_analyzer_hf_classical_hf_modules__["a" /* HFModulesPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_tour_tour__["a" /* TourPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_home_home__["b" /* WidgetCard */],
            __WEBPACK_IMPORTED_MODULE_31__pages_home_home_detail_image__["a" /* HomeDetailImagePage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_19__data_DataModel__["a" /* DataModel */],
            __WEBPACK_IMPORTED_MODULE_33__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_36__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_37__ionic_native_file_chooser__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_21__pages_analyzer_hf_classical_ClassicalDataModel__["a" /* ClassicalDataModel */],
            __WEBPACK_IMPORTED_MODULE_32__angular_common_http__["a" /* HttpClientModule */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HappyFaceApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let HappyFaceApp = class HappyFaceApp {
    constructor(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
};
HappyFaceApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], HappyFaceApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__exterm_js__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__exterm_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__exterm_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SSH3_Wrapper__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Crypt__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pass_modal__ = __webpack_require__(105);




class Terminal3 {
    constructor(container, modalCtrl) {
        this.modalCtrl = modalCtrl;
        this.term = null;
        this.sshInteractive = false;
        this.activeProg = null;
        this.closeProg = null;
        this.shellprompt = '$ ';
        this.ssh = null;
        new __WEBPACK_IMPORTED_MODULE_2__Crypt__["a" /* Crypt */]();
        const _self = this;
        let value = "";
        const terminalContainer = document.getElementById(container);
        const term = __WEBPACK_IMPORTED_MODULE_0__exterm_js__({
            cursorBlink: true,
            rows: 120
        });
        term.open(terminalContainer);
        //console.log(term.cols);
        /* Compute size */
        const h = (window.getComputedStyle(document.getElementsByClassName('xterm-rows')[0].firstElementChild).lineHeight).substring(0, 2);
        const w = 75;
        const rows = Math.floor(+window.getComputedStyle(terminalContainer).height.replace(/\D+/g, "") / +h) - 4;
        //console.log(rows);
        term.resize(w, rows);
        //console.log(term);
        term.prompt = function () {
            term.write('\r\n' + _self.shellprompt);
        };
        term.writeln('Welcome to the ssh terminal');
        term.writeln('It uses xterm.js as a local terminal emulation.');
        term.writeln('Type "ssh" to start a ssh connection,.');
        term.writeln('');
        term.prompt();
        term.on('key', (key, ev) => {
            const printable = (!ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey);
            if (ev.ctrlKey && ev.key === "c") {
                this.controlC();
                return;
            }
            if (ev.keyCode == 13) {
                this.handleCommand(value);
                value = "";
                term.prompt();
            }
            else if (ev.keyCode == 8) {
                // Do not delete the prompt
                if (term.x > 2) {
                    term.write('\b \b');
                    value = value.substring(0, value.length - 1);
                }
            }
            else if (printable) {
                term.write(key);
                value += key;
            }
        });
        term.on('paste', function (data, ev) {
            term.write(data);
            value += data;
        });
        this.term = term;
    }
    handleCommand(command) {
        if (this.sshInteractive) {
            if (this.activeProg == null)
                return;
            this.ssh.send(command + "\n");
        }
        else {
            this.term.write("\n\r");
            let cmd = "";
            let args = [];
            if (command && command.trim()) {
                args = command.split(' ').filter(function (val, i) {
                    return val;
                });
                cmd = args[0].toLowerCase();
                args = args.splice(1); // Remove cmd from arg list.
            }
            switch (cmd) {
                case 'echo':
                    this.term.write(args.join(" "));
                    break;
                case 'date':
                    this.term.write("  " + new Date());
                    break;
                case 'ssh':
                    this.sshInteractive = true;
                    this.askForCredentials();
                    /*this.term.write("Start ssh connection");
                    this.ssh = new SSH3Wrapper(this.term, this.interactiveEnd.bind(this));
                    this.shellprompt = "";
                    this.activeProg = this.ssh.send;
                    this.closeProg = this.ssh.close;*/
                    break;
                case 'clear':
                    this.term.clear();
                    break;
                default:
                    this.term.write("   unknown commmand: " + cmd);
            }
        }
    }
    interactiveEnd() {
        console.log(this.ssh);
        this.sshInteractive = false;
        this.shellprompt = "$ ";
        this.term.prompt();
    }
    controlC() {
        if (this.ssh && this.sshInteractive)
            this.ssh.close();
        else
            this.term.promt();
    }
    askForCredentials() {
        this.term.write("Start ssh connection");
        let modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pass_modal__["a" /* PassModal */]);
        modal.onDidDismiss(this.gotCredentials.bind(this));
        modal.present();
    }
    gotCredentials(data) {
        if (data == null || data.enter == undefined || !data.enter) {
            this.term.write("SSH connection aborted");
            return;
        }
        this.ssh = new __WEBPACK_IMPORTED_MODULE_1__SSH3_Wrapper__["a" /* SSH3Wrapper */](this.term, this.interactiveEnd.bind(this), null, {
            host: data.host,
            port: data.port,
            username: data.user,
            password: data.pass,
            gatewayHost: data.ghost,
            gatewayPort: data.gport
        });
        this.shellprompt = "";
        this.activeProg = this.ssh.send;
        this.closeProg = this.ssh.close;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Terminal3;

//# sourceMappingURL=Terminal3.js.map

/***/ }),

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

var require;var require;(function(f) {
    if (true) {
        module.exports = f()
    } else if (typeof define === "function" && define.amd) {
        define([], f)
    } else {
        var g;
        if (typeof window !== "undefined") {
            g = window
        } else if (typeof global !== "undefined") {
            g = global
        } else if (typeof self !== "undefined") {
            g = self
        } else {
            g = this
        }
        g.Terminal = f()
    }
})(function() {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return require(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    })({
        1: [function(require, module, exports) {
            /**
             * @license MIT
             */
            "use strict";
            /**
             * Encapsulates the logic for handling compositionstart, compositionupdate and compositionend
             * events, displaying the in-progress composition to the UI and forwarding the final composition
             * to the handler.
             */
            var CompositionHelper = (function() {
                /**
                 * Creates a new CompositionHelper.
                 * @param textarea The textarea that xterm uses for input.
                 * @param compositionView The element to display the in-progress composition in.
                 * @param terminal The Terminal to forward the finished composition to.
                 */
                function CompositionHelper(textarea, compositionView, terminal) {
                    this.textarea = textarea;
                    this.compositionView = compositionView;
                    this.terminal = terminal;
                    this.isComposing = false;
                    this.isSendingComposition = false;
                    this.compositionPosition = {
                        start: null,
                        end: null
                    };
                };
                /**
                 * Handles the compositionstart event, activating the composition view.
                 */
                CompositionHelper.prototype.compositionstart = function() {
                    this.isComposing = true;
                    this.compositionPosition.start = this.textarea.value.length;
                    this.compositionView.textContent = '';
                    this.compositionView.classList.add('active');
                };
                /**
                 * Handles the compositionupdate event, updating the composition view.
                 * @param {CompositionEvent} ev The event.
                 */
                CompositionHelper.prototype.compositionupdate = function(ev) {
                    this.compositionView.textContent = ev.data;
                    this.updateCompositionElements();
                    var self = this;
                    setTimeout(function() {
                        self.compositionPosition.end = self.textarea.value.length;
                    }, 0);
                };
                /**
                 * Handles the compositionend event, hiding the composition view and sending the composition to
                 * the handler.
                 */
                CompositionHelper.prototype.compositionend = function() {
                    this.finalizeComposition(true);
                };
                /**
                 * Handles the keydown event, routing any necessary events to the CompositionHelper functions.
                 * @param ev The keydown event.
                 * @return Whether the Terminal should continue processing the keydown event.
                 */
                CompositionHelper.prototype.keydown = function(ev) {
                    if (this.isComposing || this.isSendingComposition) {
                        if (ev.keyCode === 229) {
                            // Continue composing if the keyCode is the "composition character"
                            return false;
                        } else if (ev.keyCode === 16 || ev.keyCode === 17 || ev.keyCode === 18) {
                            // Continue composing if the keyCode is a modifier key
                            return false;
                        } else {
                            // Finish composition immediately. This is mainly here for the case where enter is
                            // pressed and the handler needs to be triggered before the command is executed.
                            this.finalizeComposition(false);
                        }
                    }
                    if (ev.keyCode === 229) {
                        // If the "composition character" is used but gets to this point it means a non-composition
                        // character (eg. numbers and punctuation) was pressed when the IME was active.
                        this.handleAnyTextareaChanges();
                        return false;
                    }
                    return true;
                };
                /**
                 * Finalizes the composition, resuming regular input actions. This is called when a composition
                 * is ending.
                 * @param waitForPropogation Whether to wait for events to propogate before sending
                 *   the input. This should be false if a non-composition keystroke is entered before the
                 *   compositionend event is triggered, such as enter, so that the composition is send before
                 *   the command is executed.
                 */
                CompositionHelper.prototype.finalizeComposition = function(waitForPropogation) {
                    this.compositionView.classList.remove('active');
                    this.isComposing = false;
                    this.clearTextareaPosition();
                    if (!waitForPropogation) {
                        // Cancel any delayed composition send requests and send the input immediately.
                        this.isSendingComposition = false;
                        var input = this.textarea.value.substring(this.compositionPosition.start, this.compositionPosition.end);
                        this.terminal.handler(input);
                    } else {
                        // Make a deep copy of the composition position here as a new compositionstart event may
                        // fire before the setTimeout executes.
                        var currentCompositionPosition = {
                            start: this.compositionPosition.start,
                            end: this.compositionPosition.end,
                        };
                        // Since composition* events happen before the changes take place in the textarea on most
                        // browsers, use a setTimeout with 0ms time to allow the native compositionend event to
                        // complete. This ensures the correct character is retrieved, this solution was used
                        // because:
                        // - The compositionend event's data property is unreliable, at least on Chromium
                        // - The last compositionupdate event's data property does not always accurately describe
                        //   the character, a counter example being Korean where an ending consonsant can move to
                        //   the following character if the following input is a vowel.
                        var self = this;
                        this.isSendingComposition = true;
                        setTimeout(function() {
                            // Ensure that the input has not already been sent
                            if (self.isSendingComposition) {
                                self.isSendingComposition = false;
                                var input;
                                if (self.isComposing) {
                                    // Use the end position to get the string if a new composition has started.
                                    input = self.textarea.value.substring(currentCompositionPosition.start, currentCompositionPosition.end);
                                } else {
                                    // Don't use the end position here in order to pick up any characters after the
                                    // composition has finished, for example when typing a non-composition character
                                    // (eg. 2) after a composition character.
                                    input = self.textarea.value.substring(currentCompositionPosition.start);
                                }
                                self.terminal.handler(input);
                            }
                        }, 0);
                    }
                };
                /**
                 * Apply any changes made to the textarea after the current event chain is allowed to complete.
                 * This should be called when not currently composing but a keydown event with the "composition
                 * character" (229) is triggered, in order to allow non-composition text to be entered when an
                 * IME is active.
                 */
                CompositionHelper.prototype.handleAnyTextareaChanges = function() {
                    var oldValue = this.textarea.value;
                    var self = this;
                    setTimeout(function() {
                        // Ignore if a composition has started since the timeout
                        if (!self.isComposing) {
                            var newValue = self.textarea.value;
                            var diff = newValue.replace(oldValue, '');
                            if (diff.length > 0) {
                                self.terminal.handler(diff);
                            }
                        }
                    }, 0);
                };
                /**
                 * Positions the composition view on top of the cursor and the textarea just below it (so the
                 * IME helper dialog is positioned correctly).
                 * @param dontRecurse Whether to use setTimeout to recursively trigger another update, this is
                 *   necessary as the IME events across browsers are not consistently triggered.
                 */
                CompositionHelper.prototype.updateCompositionElements = function(dontRecurse) {
                    if (!this.isComposing) {
                        return;
                    }
                    var cursor = this.terminal.element.querySelector('.terminal-cursor');
                    if (cursor) {
                        // Take .xterm-rows offsetTop into account as well in case it's positioned absolutely within
                        // the .xterm element.
                        var xtermRows = this.terminal.element.querySelector('.xterm-rows');
                        var cursorTop = xtermRows.offsetTop + cursor.offsetTop;
                        this.compositionView.style.left = cursor.offsetLeft + 'px';
                        this.compositionView.style.top = cursorTop + 'px';
                        this.compositionView.style.height = cursor.offsetHeight + 'px';
                        this.compositionView.style.lineHeight = cursor.offsetHeight + 'px';
                        // Sync the textarea to the exact position of the composition view so the IME knows where the
                        // text is.
                        var compositionViewBounds = this.compositionView.getBoundingClientRect();
                        this.textarea.style.left = cursor.offsetLeft + 'px';
                        this.textarea.style.top = cursorTop + 'px';
                        this.textarea.style.width = compositionViewBounds.width + 'px';
                        this.textarea.style.height = compositionViewBounds.height + 'px';
                        this.textarea.style.lineHeight = compositionViewBounds.height + 'px';
                    }
                    if (!dontRecurse) {
                        setTimeout(this.updateCompositionElements.bind(this, true), 0);
                    }
                };;
                /**
                 * Clears the textarea's position so that the cursor does not blink on IE.
                 * @private
                 */
                CompositionHelper.prototype.clearTextareaPosition = function() {
                    this.textarea.style.left = '';
                    this.textarea.style.top = '';
                };;
                return CompositionHelper;
            }());
            exports.CompositionHelper = CompositionHelper;

        }, {}],
        2: [function(require, module, exports) {
            /**
             * @license MIT
             */
            "use strict";

            function EventEmitter() {
                this._events = this._events || {};
            }
            exports.EventEmitter = EventEmitter;
            EventEmitter.prototype.addListener = function(type, listener) {
                this._events[type] = this._events[type] || [];
                this._events[type].push(listener);
            };
            EventEmitter.prototype.on = EventEmitter.prototype.addListener;
            EventEmitter.prototype.removeListener = function(type, listener) {
                if (!this._events[type])
                    return;
                var obj = this._events[type],
                    i = obj.length;
                while (i--) {
                    if (obj[i] === listener || obj[i].listener === listener) {
                        obj.splice(i, 1);
                        return;
                    }
                }
            };
            EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
            EventEmitter.prototype.removeAllListeners = function(type) {
                if (this._events[type])
                    delete this._events[type];
            };
            EventEmitter.prototype.once = function(type, listener) {
                var self = this;

                function on() {
                    var args = Array.prototype.slice.call(arguments);
                    this.removeListener(type, on);
                    return listener.apply(this, args);
                }
                on.listener = listener;
                return this.on(type, on);
            };
            EventEmitter.prototype.emit = function(type) {
                if (!this._events[type])
                    return;
                var args = Array.prototype.slice.call(arguments, 1),
                    obj = this._events[type],
                    l = obj.length,
                    i = 0;
                for (; i < l; i++) {
                    obj[i].apply(this, args);
                }
            };
            EventEmitter.prototype.listeners = function(type) {
                return this._events[type] = this._events[type] || [];
            };

        }, {}],
        3: [function(require, module, exports) {
            /**
             * @license MIT
             */
            "use strict";
            /**
             * Represents the viewport of a terminal, the visible area within the larger buffer of output.
             * Logic for the virtual scroll bar is included in this object.
             */
            var Viewport = (function() {
                /**
                 * Creates a new Viewport.
                 * @param terminal The terminal this viewport belongs to.
                 * @param viewportElement The DOM element acting as the viewport.
                 * @param scrollArea The DOM element acting as the scroll area.
                 * @param charMeasureElement A DOM element used to measure the character size of. the terminal.
                 */
                function Viewport(terminal, viewportElement, scrollArea, charMeasureElement) {
                    this.terminal = terminal;
                    this.viewportElement = viewportElement;
                    this.scrollArea = scrollArea;
                    this.charMeasureElement = charMeasureElement;
                    this.currentRowHeight = 0;
                    this.lastRecordedBufferLength = 0;
                    this.lastRecordedViewportHeight = 0;
                    this.terminal.on('scroll', this.syncScrollArea.bind(this));
                    this.terminal.on('resize', this.syncScrollArea.bind(this));
                    this.viewportElement.addEventListener('scroll', this.onScroll.bind(this));
                    this.syncScrollArea();
                }
                /**
                 * Refreshes row height, setting line-height, viewport height and scroll area height if
                 * necessary.
                 * @param charSize A character size measurement bounding rect object, if it doesn't exist it will
                 *   be created.
                 */
                Viewport.prototype.refresh = function(charSize) {
                    var size = charSize || this.charMeasureElement.getBoundingClientRect();
                    if (size.height > 0) {
                        var rowHeightChanged = size.height !== this.currentRowHeight;
                        if (rowHeightChanged) {
                            this.currentRowHeight = size.height;
                            this.viewportElement.style.lineHeight = size.height + 'px';
                            this.terminal.rowContainer.style.lineHeight = size.height + 'px';
                        }
                        var viewportHeightChanged = this.lastRecordedViewportHeight !== this.terminal.rows;
                        if (rowHeightChanged || viewportHeightChanged) {
                            this.lastRecordedViewportHeight = this.terminal.rows;
                            this.viewportElement.style.height = size.height * this.terminal.rows + 'px';
                        }
                        this.scrollArea.style.height = (size.height * this.lastRecordedBufferLength) + 'px';
                    }
                };
                /**
                 * Updates dimensions and synchronizes the scroll area if necessary.
                 */
                Viewport.prototype.syncScrollArea = function() {
                    if (this.lastRecordedBufferLength !== this.terminal.lines.length) {
                        // If buffer height changed
                        this.lastRecordedBufferLength = this.terminal.lines.length;
                        this.refresh();
                    } else if (this.lastRecordedViewportHeight !== this.terminal.rows) {
                        // If viewport height changed
                        this.refresh();
                    } else {
                        // If size has changed, refresh viewport
                        var size = this.charMeasureElement.getBoundingClientRect();
                        if (size.height !== this.currentRowHeight) {
                            this.refresh(size);
                        }
                    }
                    // Sync scrollTop
                    var scrollTop = this.terminal.ydisp * this.currentRowHeight;
                    if (this.viewportElement.scrollTop !== scrollTop) {
                        this.viewportElement.scrollTop = scrollTop;
                    }
                };
                /**
                 * Handles scroll events on the viewport, calculating the new viewport and requesting the
                 * terminal to scroll to it.
                 * @param ev The scroll event.
                 */
                Viewport.prototype.onScroll = function(ev) {
                    var newRow = Math.round(this.viewportElement.scrollTop / this.currentRowHeight);
                    var diff = newRow - this.terminal.ydisp;
                    this.terminal.scrollDisp(diff, true);
                };
                /**
                 * Handles mouse wheel events by adjusting the viewport's scrollTop and delegating the actual
                 * scrolling to `onScroll`, this event needs to be attached manually by the consumer of
                 * `Viewport`.
                 * @param ev The mouse wheel event.
                 */
                Viewport.prototype.onWheel = function(ev) {
                    if (ev.deltaY === 0) {
                        // Do nothing if it's not a vertical scroll event
                        return;
                    }
                    // Fallback to WheelEvent.DOM_DELTA_PIXEL
                    var multiplier = 1;
                    if (ev.deltaMode === WheelEvent.DOM_DELTA_LINE) {
                        multiplier = this.currentRowHeight;
                    } else if (ev.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
                        multiplier = this.currentRowHeight * this.terminal.rows;
                    }
                    this.viewportElement.scrollTop += ev.deltaY * multiplier;
                    // Prevent the page from scrolling when the terminal scrolls
                    ev.preventDefault();
                };;
                return Viewport;
            }());
            exports.Viewport = Viewport;

        }, {}],
        4: [function(require, module, exports) {
            /**
             * Clipboard handler module: exports methods for handling all clipboard-related events in the
             * terminal.
             * @module xterm/handlers/Clipboard
             * @license MIT
             */
            "use strict";
            /**
             * Prepares text copied from terminal selection, to be saved in the clipboard by:
             *   1. stripping all trailing white spaces
             *   2. converting all non-breaking spaces to regular spaces
             * @param {string} text The copied text that needs processing for storing in clipboard
             * @returns {string}
             */
            function prepareTextForClipboard(text) {
                var space = String.fromCharCode(32),
                    nonBreakingSpace = String.fromCharCode(160),
                    allNonBreakingSpaces = new RegExp(nonBreakingSpace, 'g'),
                    processedText = text.split('\n').map(function(line) {
                        // Strip all trailing white spaces and convert all non-breaking spaces
                        // to regular spaces.
                        var processedLine = line.replace(/\s+$/g, '').replace(allNonBreakingSpaces, space);
                        return processedLine;
                    }).join('\n');
                return processedText;
            }
            exports.prepareTextForClipboard = prepareTextForClipboard;
            /**
             * Binds copy functionality to the given terminal.
             * @param {ClipboardEvent} ev The original copy event to be handled
             */
            function copyHandler(ev, term) {
                // We cast `window` to `any` type, because TypeScript has not declared the `clipboardData`
                // property that we use below for Internet Explorer.
                var copiedText = window.getSelection().toString(),
                    text = prepareTextForClipboard(copiedText);
                if (term.browser.isMSIE) {
                    window.clipboardData.setData('Text', text);
                } else {
                    ev.clipboardData.setData('text/plain', text);
                }
                ev.preventDefault(); // Prevent or the original text will be copied.
            }
            exports.copyHandler = copyHandler;
            /**
             * Redirect the clipboard's data to the terminal's input handler.
             * @param {ClipboardEvent} ev The original paste event to be handled
             * @param {Terminal} term The terminal on which to apply the handled paste event
             */
            function pasteHandler(ev, term) {
                ev.stopPropagation();
                var text;
                var dispatchPaste = function(text) {
                    term.handler(text);
                    term.textarea.value = '';
                    return term.cancel(ev);
                };
                if (term.browser.isMSIE) {
                    if (window.clipboardData) {
                        text = window.clipboardData.getData('Text');
                        dispatchPaste(text);
                    }
                } else {
                    if (ev.clipboardData) {
                        text = ev.clipboardData.getData('text/plain');
                        dispatchPaste(text);
                    }
                }
            }
            exports.pasteHandler = pasteHandler;
            /**
             * Bind to right-click event and allow right-click copy and paste.
             *
             * **Logic**
             * If text is selected and right-click happens on selected text, then
             * do nothing to allow seamless copying.
             * If no text is selected or right-click is outside of the selection
             * area, then bring the terminal's input below the cursor, in order to
             * trigger the event on the textarea and allow-right click paste, without
             * caring about disappearing selection.
             * @param {ClipboardEvent} ev The original paste event to be handled
             * @param {Terminal} term The terminal on which to apply the handled paste event
             */
            function rightClickHandler(ev, term) {
                var s = document.getSelection(),
                    selectedText = prepareTextForClipboard(s.toString()),
                    clickIsOnSelection = false,
                    x = ev.clientX,
                    y = ev.clientY;
                if (s.rangeCount) {
                    var r = s.getRangeAt(0),
                        cr = r.getClientRects(),
                        i = void 0,
                        rect = void 0;
                    for (i = 0; i < cr.length; i++) {
                        rect = cr[i];
                        clickIsOnSelection = ((x > rect.left) && (x < rect.right) &&
                            (y > rect.top) && (y < rect.bottom));
                        if (clickIsOnSelection) {
                            break;
                        }
                    }
                    // If we clicked on selection and selection is not a single space,
                    // then mark the right click as copy-only. We check for the single
                    // space selection, as this can happen when clicking on an &nbsp;
                    // and there is not much pointing in copying a single space.
                    if (selectedText.match(/^\s$/) || !selectedText.length) {
                        clickIsOnSelection = false;
                    }
                }
                // Bring textarea at the cursor position
                if (!clickIsOnSelection) {
                    term.textarea.style.position = 'fixed';
                    term.textarea.style.width = '20px';
                    term.textarea.style.height = '20px';
                    term.textarea.style.left = (x - 10) + 'px';
                    term.textarea.style.top = (y - 10) + 'px';
                    term.textarea.style.zIndex = '1000';
                    term.textarea.focus();
                    // Reset the terminal textarea's styling
                    setTimeout(function() {
                        term.textarea.style.position = null;
                        term.textarea.style.width = null;
                        term.textarea.style.height = null;
                        term.textarea.style.left = null;
                        term.textarea.style.top = null;
                        term.textarea.style.zIndex = null;
                    }, 4);
                }
            }
            exports.rightClickHandler = rightClickHandler;

        }, {}],
        5: [function(require, module, exports) {
            /**
             * Attributes and methods to help with identifying the current browser and platform.
             * @module xterm/utils/Browser
             * @license MIT
             */
            "use strict";
            var Generic_js_1 = require('./Generic.js');
            var isNode = (typeof navigator == 'undefined') ? true : false;
            var userAgent = (isNode) ? 'node' : navigator.userAgent;
            var platform = (isNode) ? 'node' : navigator.platform;
            exports.isFirefox = !!~userAgent.indexOf('Firefox');
            exports.isMSIE = !!~userAgent.indexOf('MSIE') || !!~userAgent.indexOf('Trident');
            // Find the users platform. We use this to interpret the meta key
            // and ISO third level shifts.
            // http://stackoverflow.com/q/19877924/577598
            exports.isMac = Generic_js_1.contains(['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'], platform);
            exports.isIpad = platform === 'iPad';
            exports.isIphone = platform === 'iPhone';
            exports.isMSWindows = Generic_js_1.contains(['Windows', 'Win16', 'Win32', 'WinCE'], platform);

        }, {
            "./Generic.js": 6
        }],
        6: [function(require, module, exports) {
            /**
             * Generic utilities module with methods that can be helpful at different parts of the code base.
             * @module xterm/utils/Generic
             * @license MIT
             */
            "use strict";
            /**
             * Return if the given array contains the given element
             * @param {Array} array The array to search for the given element.
             * @param {Object} el The element to look for into the array
             */
            exports.contains = function(arr, el) {
                return arr.indexOf(el) >= 0;
            };

        }, {}],
        7: [function(require, module, exports) {
            /**
             * xterm.js: xterm, in the browser
             * Originally forked from (with the author's permission):
             *   Fabrice Bellard's javascript vt100 for jslinux:
             *   http://bellard.org/jslinux/
             *   Copyright (c) 2011 Fabrice Bellard
             *   The original design remains. The terminal itself
             *   has been extended to include xterm CSI codes, among
             *   other features.
             * @license MIT
             */
            "use strict";
            var CompositionHelper_js_1 = require('./CompositionHelper.js');
            var EventEmitter_js_1 = require('./EventEmitter.js');
            var Viewport_js_1 = require('./Viewport.js');
            var Clipboard_js_1 = require('./handlers/Clipboard.js');
            var Browser = require('./utils/Browser');
            /**
             * Terminal Emulation References:
             *   http://vt100.net/
             *   http://invisible-island.net/xterm/ctlseqs/ctlseqs.txt
             *   http://invisible-island.net/xterm/ctlseqs/ctlseqs.html
             *   http://invisible-island.net/vttest/
             *   http://www.inwap.com/pdp10/ansicode.txt
             *   http://linux.die.net/man/4/console_codes
             *   http://linux.die.net/man/7/urxvt
             */
                // Let it work inside Node.js for automated testing purposes.
            var document = (typeof window != 'undefined') ? window.document : null;
            /**
             * States
             */
            var normal = 0,
                escaped = 1,
                csi = 2,
                osc = 3,
                charset = 4,
                dcs = 5,
                ignore = 6;
            /**
             * Terminal
             */
            /**
             * Creates a new `Terminal` object.
             *
             * @param {object} options An object containing a set of options, the available options are:
             *   - `cursorBlink` (boolean): Whether the terminal cursor blinks
             *   - `cols` (number): The number of columns of the terminal (horizontal size)
             *   - `rows` (number): The number of rows of the terminal (vertical size)
             *
             * @public
             * @class Xterm Xterm
             * @alias module:xterm/src/xterm
             */
            function Terminal(options) {
                var self = this;
                if (!(this instanceof Terminal)) {
                    return new Terminal(arguments[0], arguments[1], arguments[2]);
                }
                self.browser = Browser;
                self.cancel = Terminal.cancel;
                EventEmitter_js_1.EventEmitter.call(this);
                if (typeof options === 'number') {
                    options = {
                        cols: arguments[0],
                        rows: arguments[1],
                        handler: arguments[2]
                    };
                }
                options = options || {};
                Object.keys(Terminal.defaults).forEach(function(key) {
                    if (options[key] == null) {
                        options[key] = Terminal.options[key];
                        if (Terminal[key] !== Terminal.defaults[key]) {
                            options[key] = Terminal[key];
                        }
                    }
                    self[key] = options[key];
                });
                if (options.colors.length === 8) {
                    options.colors = options.colors.concat(Terminal._colors.slice(8));
                } else if (options.colors.length === 16) {
                    options.colors = options.colors.concat(Terminal._colors.slice(16));
                } else if (options.colors.length === 10) {
                    options.colors = options.colors.slice(0, -2).concat(Terminal._colors.slice(8, -2), options.colors.slice(-2));
                } else if (options.colors.length === 18) {
                    options.colors = options.colors.concat(Terminal._colors.slice(16, -2), options.colors.slice(-2));
                }
                this.colors = options.colors;
                this.options = options;
                // this.context = options.context || window;
                // this.document = options.document || document;
                this.parent = options.body || options.parent || (document ? document.getElementsByTagName('body')[0] : null);
                this.cols = options.cols || options.geometry[0];
                this.rows = options.rows || options.geometry[1];
                this.geometry = [this.cols, this.rows];
                if (options.handler) {
                    this.on('data', options.handler);
                }
                /**
                 * The scroll position of the y cursor, ie. ybase + y = the y position within the entire
                 * buffer
                 */
                this.ybase = 0;
                /**
                 * The scroll position of the viewport
                 */
                this.ydisp = 0;
                /**
                 * The cursor's x position after ybase
                 */
                this.x = 0;
                /**
                 * The cursor's y position after ybase
                 */
                this.y = 0;
                /**
                 * Used to debounce the refresh function
                 */
                this.isRefreshing = false;
                /**
                 * Whether there is a full terminal refresh queued
                 */
                this.cursorState = 0;
                this.cursorHidden = false;
                this.convertEol;
                this.state = 0;
                this.queue = '';
                this.scrollTop = 0;
                this.scrollBottom = this.rows - 1;
                this.customKeydownHandler = null;
                // modes
                this.applicationKeypad = false;
                this.applicationCursor = false;
                this.originMode = false;
                this.insertMode = false;
                this.wraparoundMode = true; // defaults: xterm - true, vt100 - false
                this.normal = null;
                // charset
                this.charset = null;
                this.gcharset = null;
                this.glevel = 0;
                this.charsets = [null];
                // mouse properties
                this.decLocator;
                this.x10Mouse;
                this.vt200Mouse;
                this.vt300Mouse;
                this.normalMouse;
                this.mouseEvents;
                this.sendFocus;
                this.utfMouse;
                this.sgrMouse;
                this.urxvtMouse;
                // misc
                this.element;
                this.children;
                this.refreshStart;
                this.refreshEnd;
                this.savedX;
                this.savedY;
                this.savedCols;
                // stream
                this.readable = true;
                this.writable = true;
                this.defAttr = (0 << 18) | (257 << 9) | (256 << 0);
                this.curAttr = this.defAttr;
                this.params = [];
                this.currentParam = 0;
                this.prefix = '';
                this.postfix = '';
                // leftover surrogate high from previous write invocation
                this.surrogate_high = '';
                /**
                 * An array of all lines in the entire buffer, including the prompt. The lines are array of
                 * characters which are 2-length arrays where [0] is an attribute and [1] is the character.
                 */
                this.lines = [];
                var i = this.rows;
                while (i--) {
                    this.lines.push(this.blankLine());
                }
                this.tabs;
                this.setupStops();
                // Store if user went browsing history in scrollback
                this.userScrolling = false;
            }
            inherits(Terminal, EventEmitter_js_1.EventEmitter);
            /**
             * back_color_erase feature for xterm.
             */
            Terminal.prototype.eraseAttr = function() {
                // if (this.is('screen')) return this.defAttr;
                return (this.defAttr & ~0x1ff) | (this.curAttr & 0x1ff);
            };
            /**
             * Colors
             */
            // Colors 0-15
            Terminal.tangoColors = [
                // dark:
                '#2e3436',
                '#cc0000',
                '#4e9a06',
                '#c4a000',
                '#3465a4',
                '#75507b',
                '#06989a',
                '#d3d7cf',
                // bright:
                '#555753',
                '#ef2929',
                '#8ae234',
                '#fce94f',
                '#729fcf',
                '#ad7fa8',
                '#34e2e2',
                '#eeeeec'
            ];
            // Colors 0-15 + 16-255
            // Much thanks to TooTallNate for writing this.
            Terminal.colors = (function() {
                var colors = Terminal.tangoColors.slice(),
                    r = [0x00, 0x5f, 0x87, 0xaf, 0xd7, 0xff],
                    i;
                // 16-231
                i = 0;
                for (; i < 216; i++) {
                    out(r[(i / 36) % 6 | 0], r[(i / 6) % 6 | 0], r[i % 6]);
                }
                // 232-255 (grey)
                i = 0;
                for (; i < 24; i++) {
                    r = 8 + i * 10;
                    out(r, r, r);
                }

                function out(r, g, b) {
                    colors.push('#' + hex(r) + hex(g) + hex(b));
                }

                function hex(c) {
                    c = c.toString(16);
                    return c.length < 2 ? '0' + c : c;
                }
                return colors;
            })();
            Terminal._colors = Terminal.colors.slice();
            Terminal.vcolors = (function() {
                var out = [],
                    colors = Terminal.colors,
                    i = 0,
                    color;
                for (; i < 256; i++) {
                    color = parseInt(colors[i].substring(1), 16);
                    out.push([
                        (color >> 16) & 0xff,
                        (color >> 8) & 0xff,
                        color & 0xff
                    ]);
                }
                return out;
            })();
            /**
             * Options
             */
            Terminal.defaults = {
                colors: Terminal.colors,
                theme: 'default',
                convertEol: false,
                termName: 'xterm',
                geometry: [80, 24],
                cursorBlink: false,
                visualBell: false,
                popOnBell: false,
                scrollback: 1000,
                screenKeys: false,
                debug: false,
                cancelEvents: false
            };
            Terminal.options = {};
            Terminal.focus = null;
            each(keys(Terminal.defaults), function(key) {
                Terminal[key] = Terminal.defaults[key];
                Terminal.options[key] = Terminal.defaults[key];
            });
            /**
             * Focus the terminal. Delegates focus handling to the terminal's DOM element.
             */
            Terminal.prototype.focus = function() {
                return this.textarea.focus();
            };
            /**
             * Retrieves an option's value from the terminal.
             * @param {string} key The option key.
             */
            Terminal.prototype.getOption = function(key, value) {
                if (!(key in Terminal.defaults)) {
                    throw new Error('No option with key "' + key + '"');
                }
                if (typeof this.options[key] !== 'undefined') {
                    return this.options[key];
                }
                return this[key];
            };
            /**
             * Sets an option on the terminal.
             * @param {string} key The option key.
             * @param {string} value The option value.
             */
            Terminal.prototype.setOption = function(key, value) {
                if (!(key in Terminal.defaults)) {
                    throw new Error('No option with key "' + key + '"');
                }
                this[key] = value;
                this.options[key] = value;
            };
            /**
             * Binds the desired focus behavior on a given terminal object.
             *
             * @static
             */
            Terminal.bindFocus = function(term) {
                on(term.textarea, 'focus', function(ev) {
                    if (term.sendFocus) {
                        term.send('\x1b[I');
                    }
                    term.element.classList.add('focus');
                    term.showCursor();
                    Terminal.focus = term;
                    term.emit('focus', {
                        terminal: term
                    });
                });
            };
            /**
             * Blur the terminal. Delegates blur handling to the terminal's DOM element.
             */
            Terminal.prototype.blur = function() {
                return this.textarea.blur();
            };
            /**
             * Binds the desired blur behavior on a given terminal object.
             *
             * @static
             */
            Terminal.bindBlur = function(term) {
                on(term.textarea, 'blur', function(ev) {
                    term.refresh(term.y, term.y);
                    if (term.sendFocus) {
                        term.send('\x1b[O');
                    }
                    term.element.classList.remove('focus');
                    Terminal.focus = null;
                    term.emit('blur', {
                        terminal: term
                    });
                });
            };
            /**
             * Initialize default behavior
             */
            Terminal.prototype.initGlobal = function() {
                var term = this;
                Terminal.bindKeys(this);
                Terminal.bindFocus(this);
                Terminal.bindBlur(this);
                // Bind clipboard functionality
                on(this.element, 'copy', function(ev) {
                    Clipboard_js_1.copyHandler.call(this, ev, term);
                });
                on(this.textarea, 'paste', function(ev) {
                    Clipboard_js_1.pasteHandler.call(this, ev, term);
                });

                function rightClickHandlerWrapper(ev) {
                    Clipboard_js_1.rightClickHandler.call(this, ev, term);
                }
                if (term.browser.isFirefox) {
                    on(this.element, 'mousedown', function(ev) {
                        if (ev.button == 2) {
                            rightClickHandlerWrapper(ev);
                        }
                    });
                } else {
                    on(this.element, 'contextmenu', rightClickHandlerWrapper);
                }
            };
            /**
             * Apply key handling to the terminal
             */
            Terminal.bindKeys = function(term) {
                on(term.element, 'keydown', function(ev) {
                    if (document.activeElement != this) {
                        return;
                    }
                    term.keyDown(ev);
                }, true);
                on(term.element, 'keypress', function(ev) {
                    if (document.activeElement != this) {
                        return;
                    }
                    term.keyPress(ev);
                }, true);
                on(term.element, 'keyup', term.focus.bind(term));
                on(term.textarea, 'keydown', function(ev) {
                    term.keyDown(ev);
                }, true);
                on(term.textarea, 'keypress', function(ev) {
                    term.keyPress(ev);
                    // Truncate the textarea's value, since it is not needed
                    this.value = '';
                }, true);
                on(term.textarea, 'compositionstart', term.compositionHelper.compositionstart.bind(term.compositionHelper));
                on(term.textarea, 'compositionupdate', term.compositionHelper.compositionupdate.bind(term.compositionHelper));
                on(term.textarea, 'compositionend', term.compositionHelper.compositionend.bind(term.compositionHelper));
                term.on('refresh', term.compositionHelper.updateCompositionElements.bind(term.compositionHelper));
            };
            /**
             * Insert the given row to the terminal or produce a new one
             * if no row argument is passed. Return the inserted row.
             * @param {HTMLElement} row (optional) The row to append to the terminal.
             */
            Terminal.prototype.insertRow = function(row) {
                if (typeof row != 'object') {
                    row = document.createElement('div');
                }
                this.rowContainer.appendChild(row);
                this.children.push(row);
                return row;
            };
            /**
             * Opens the terminal within an element.
             *
             * @param {HTMLElement} parent The element to create the terminal within.
             */
            Terminal.prototype.open = function(parent) {
                var self = this,
                    i = 0,
                    div;
                this.parent = parent || this.parent;
                if (!this.parent) {
                    throw new Error('Terminal requires a parent element.');
                }
                // Grab global elements
                this.context = this.parent.ownerDocument.defaultView;
                this.document = this.parent.ownerDocument;
                this.body = this.document.getElementsByTagName('body')[0];
                //Create main element container
                this.element = this.document.createElement('div');
                this.element.classList.add('terminal');
                this.element.classList.add('xterm');
                this.element.classList.add('xterm-theme-' + this.theme);
                this.element.style.height;
                this.element.setAttribute('tabindex', 0);
                this.viewportElement = document.createElement('div');
                this.viewportElement.classList.add('xterm-viewport');
                this.element.appendChild(this.viewportElement);
                this.viewportScrollArea = document.createElement('div');
                this.viewportScrollArea.classList.add('xterm-scroll-area');
                this.viewportElement.appendChild(this.viewportScrollArea);
                // Create the container that will hold the lines of the terminal and then
                // produce the lines the lines.
                this.rowContainer = document.createElement('div');
                this.rowContainer.classList.add('xterm-rows');
                this.element.appendChild(this.rowContainer);
                this.children = [];
                // Create the container that will hold helpers like the textarea for
                // capturing DOM Events. Then produce the helpers.
                this.helperContainer = document.createElement('div');
                this.helperContainer.classList.add('xterm-helpers');
                // TODO: This should probably be inserted once it's filled to prevent an additional layout
                this.element.appendChild(this.helperContainer);
                this.textarea = document.createElement('textarea');
                this.textarea.classList.add('xterm-helper-textarea');
                this.textarea.setAttribute('autocorrect', 'off');
                this.textarea.setAttribute('autocapitalize', 'off');
                this.textarea.setAttribute('spellcheck', 'false');
                this.textarea.tabIndex = 0;
                this.textarea.addEventListener('focus', function() {
                    self.emit('focus', {
                        terminal: self
                    });
                });
                this.textarea.addEventListener('blur', function() {
                    self.emit('blur', {
                        terminal: self
                    });
                });
                this.helperContainer.appendChild(this.textarea);
                this.compositionView = document.createElement('div');
                this.compositionView.classList.add('composition-view');
                this.compositionHelper = new CompositionHelper_js_1.CompositionHelper(this.textarea, this.compositionView, this);
                this.helperContainer.appendChild(this.compositionView);
                this.charMeasureElement = document.createElement('div');
                this.charMeasureElement.classList.add('xterm-char-measure-element');
                this.charMeasureElement.innerHTML = 'W';
                this.helperContainer.appendChild(this.charMeasureElement);
                for (; i < this.rows; i++) {
                    this.insertRow();
                }
                this.parent.appendChild(this.element);
                this.viewport = new Viewport_js_1.Viewport(this, this.viewportElement, this.viewportScrollArea, this.charMeasureElement);
                // Draw the screen.
                this.refresh(0, this.rows - 1);
                // Initialize global actions that
                // need to be taken on the document.
                this.initGlobal();
                // Ensure there is a Terminal.focus.
                this.focus();
                on(this.element, 'click', function() {
                    var selection = document.getSelection(),
                        collapsed = selection.isCollapsed,
                        isRange = typeof collapsed == 'boolean' ? !collapsed : selection.type == 'Range';
                    if (!isRange) {
                        self.focus();
                    }
                });
                // Listen for mouse events and translate
                // them into terminal mouse protocols.
                this.bindMouse();
                // Figure out whether boldness affects
                // the character width of monospace fonts.
                if (Terminal.brokenBold == null) {
                    Terminal.brokenBold = isBoldBroken(this.document);
                }
                /**
                 * This event is emitted when terminal has completed opening.
                 *
                 * @event open
                 */
                this.emit('open');
            };
            /**
             * Attempts to load an add-on using CommonJS or RequireJS (whichever is available).
             * @param {string} addon The name of the addon to load
             * @static
             */
            Terminal.loadAddon = function(addon, callback) {
                if (typeof exports === 'object' && typeof module === 'object') {
                    // CommonJS
                    return require('./addons/' + addon + '/' + addon);
                } else if (typeof define == 'function') {
                    // RequireJS
                    return require(['./addons/' + addon + '/' + addon], callback);
                } else {
                    console.error('Cannot load a module without a CommonJS or RequireJS environment.');
                    return false;
                }
            };
            /**
             * XTerm mouse events
             * http://invisible-island.net/xterm/ctlseqs/ctlseqs.html#Mouse%20Tracking
             * To better understand these
             * the xterm code is very helpful:
             * Relevant files:
             *   button.c, charproc.c, misc.c
             * Relevant functions in xterm/button.c:
             *   BtnCode, EmitButtonCode, EditorButton, SendMousePosition
             */
            Terminal.prototype.bindMouse = function() {
                var el = this.element,
                    self = this,
                    pressed = 32;
                // mouseup, mousedown, wheel
                // left click: ^[[M 3<^[[M#3<
                // wheel up: ^[[M`3>
                function sendButton(ev) {
                    var button, pos;
                    // get the xterm-style button
                    button = getButton(ev);
                    // get mouse coordinates
                    pos = getCoords(ev);
                    if (!pos)
                        return;
                    sendEvent(button, pos);
                    switch (ev.overrideType || ev.type) {
                        case 'mousedown':
                            pressed = button;
                            break;
                        case 'mouseup':
                            // keep it at the left
                            // button, just in case.
                            pressed = 32;
                            break;
                        case 'wheel':
                            // nothing. don't
                            // interfere with
                            // `pressed`.
                            break;
                    }
                }
                // motion example of a left click:
                // ^[[M 3<^[[M@4<^[[M@5<^[[M@6<^[[M@7<^[[M#7<
                function sendMove(ev) {
                    var button = pressed,
                        pos;
                    pos = getCoords(ev);
                    if (!pos)
                        return;
                    // buttons marked as motions
                    // are incremented by 32
                    button += 32;
                    sendEvent(button, pos);
                }
                // encode button and
                // position to characters
                function encode(data, ch) {
                    if (!self.utfMouse) {
                        if (ch === 255)
                            return data.push(0);
                        if (ch > 127)
                            ch = 127;
                        data.push(ch);
                    } else {
                        if (ch === 2047)
                            return data.push(0);
                        if (ch < 127) {
                            data.push(ch);
                        } else {
                            if (ch > 2047)
                                ch = 2047;
                            data.push(0xC0 | (ch >> 6));
                            data.push(0x80 | (ch & 0x3F));
                        }
                    }
                }
                // send a mouse event:
                // regular/utf8: ^[[M Cb Cx Cy
                // urxvt: ^[[ Cb ; Cx ; Cy M
                // sgr: ^[[ Cb ; Cx ; Cy M/m
                // vt300: ^[[ 24(1/3/5)~ [ Cx , Cy ] \r
                // locator: CSI P e ; P b ; P r ; P c ; P p & w
                function sendEvent(button, pos) {
                    // self.emit('mouse', {
                    //   x: pos.x - 32,
                    //   y: pos.x - 32,
                    //   button: button
                    // });
                    if (self.vt300Mouse) {
                        // NOTE: Unstable.
                        // http://www.vt100.net/docs/vt3xx-gp/chapter15.html
                        button &= 3;
                        pos.x -= 32;
                        pos.y -= 32;
                        var data = '\x1b[24';
                        if (button === 0)
                            data += '1';
                        else if (button === 1)
                            data += '3';
                        else if (button === 2)
                            data += '5';
                        else if (button === 3)
                            return;
                        else
                            data += '0';
                        data += '~[' + pos.x + ',' + pos.y + ']\r';
                        self.send(data);
                        return;
                    }
                    if (self.decLocator) {
                        // NOTE: Unstable.
                        button &= 3;
                        pos.x -= 32;
                        pos.y -= 32;
                        if (button === 0)
                            button = 2;
                        else if (button === 1)
                            button = 4;
                        else if (button === 2)
                            button = 6;
                        else if (button === 3)
                            button = 3;
                        self.send('\x1b[' +
                            button +
                            ';' +
                            (button === 3 ? 4 : 0) +
                            ';' +
                            pos.y +
                            ';' +
                            pos.x +
                            ';' +
                            (pos.page || 0) +
                            '&w');
                        return;
                    }
                    if (self.urxvtMouse) {
                        pos.x -= 32;
                        pos.y -= 32;
                        pos.x++;
                        pos.y++;
                        self.send('\x1b[' + button + ';' + pos.x + ';' + pos.y + 'M');
                        return;
                    }
                    if (self.sgrMouse) {
                        pos.x -= 32;
                        pos.y -= 32;
                        self.send('\x1b[<' +
                            ((button & 3) === 3 ? button & ~3 : button) +
                            ';' +
                            pos.x +
                            ';' +
                            pos.y +
                            ((button & 3) === 3 ? 'm' : 'M'));
                        return;
                    }
                    var data = [];
                    encode(data, button);
                    encode(data, pos.x);
                    encode(data, pos.y);
                    self.send('\x1b[M' + String.fromCharCode.apply(String, data));
                }

                function getButton(ev) {
                    var button, shift, meta, ctrl, mod;
                    // two low bits:
                    // 0 = left
                    // 1 = middle
                    // 2 = right
                    // 3 = release
                    // wheel up/down:
                    // 1, and 2 - with 64 added
                    switch (ev.overrideType || ev.type) {
                        case 'mousedown':
                            button = ev.button != null ?
                                +ev.button :
                                ev.which != null ?
                                    ev.which - 1 :
                                    null;
                            if (self.browser.isMSIE) {
                                button = button === 1 ? 0 : button === 4 ? 1 : button;
                            }
                            break;
                        case 'mouseup':
                            button = 3;
                            break;
                        case 'DOMMouseScroll':
                            button = ev.detail < 0 ?
                                64 :
                                65;
                            break;
                        case 'wheel':
                            button = ev.wheelDeltaY > 0 ?
                                64 :
                                65;
                            break;
                    }
                    // next three bits are the modifiers:
                    // 4 = shift, 8 = meta, 16 = control
                    shift = ev.shiftKey ? 4 : 0;
                    meta = ev.metaKey ? 8 : 0;
                    ctrl = ev.ctrlKey ? 16 : 0;
                    mod = shift | meta | ctrl;
                    // no mods
                    if (self.vt200Mouse) {
                        // ctrl only
                        mod &= ctrl;
                    } else if (!self.normalMouse) {
                        mod = 0;
                    }
                    // increment to SP
                    button = (32 + (mod << 2)) + button;
                    return button;
                }
                // mouse coordinates measured in cols/rows
                function getCoords(ev) {
                    var x, y, w, h, el;
                    // ignore browsers without pageX for now
                    if (ev.pageX == null)
                        return;
                    x = ev.pageX;
                    y = ev.pageY;
                    el = self.element;
                    // should probably check offsetParent
                    // but this is more portable
                    while (el && el !== self.document.documentElement) {
                        x -= el.offsetLeft;
                        y -= el.offsetTop;
                        el = 'offsetParent' in el ?
                            el.offsetParent :
                            el.parentNode;
                    }
                    // convert to cols/rows
                    w = self.element.clientWidth;
                    h = self.element.clientHeight;
                    x = Math.ceil((x / w) * self.cols);
                    y = Math.ceil((y / h) * self.rows);
                    // be sure to avoid sending
                    // bad positions to the program
                    if (x < 0)
                        x = 0;
                    if (x > self.cols)
                        x = self.cols;
                    if (y < 0)
                        y = 0;
                    if (y > self.rows)
                        y = self.rows;
                    // xterm sends raw bytes and
                    // starts at 32 (SP) for each.
                    x += 32;
                    y += 32;
                    return {
                        x: x,
                        y: y,
                        type: 'wheel'
                    };
                }
                on(el, 'mousedown', function(ev) {
                    if (!self.mouseEvents)
                        return;
                    // send the button
                    sendButton(ev);
                    // ensure focus
                    self.focus();
                    // fix for odd bug
                    //if (self.vt200Mouse && !self.normalMouse) {
                    if (self.vt200Mouse) {
                        ev.overrideType = 'mouseup';
                        sendButton(ev);
                        return self.cancel(ev);
                    }
                    // bind events
                    if (self.normalMouse)
                        on(self.document, 'mousemove', sendMove);
                    // x10 compatibility mode can't send button releases
                    if (!self.x10Mouse) {
                        on(self.document, 'mouseup', function up(ev) {
                            sendButton(ev);
                            if (self.normalMouse)
                                off(self.document, 'mousemove', sendMove);
                            off(self.document, 'mouseup', up);
                            return self.cancel(ev);
                        });
                    }
                    return self.cancel(ev);
                });
                //if (self.normalMouse) {
                //  on(self.document, 'mousemove', sendMove);
                //}
                on(el, 'wheel', function(ev) {
                    if (!self.mouseEvents)
                        return;
                    if (self.x10Mouse ||
                        self.vt300Mouse ||
                        self.decLocator)
                        return;
                    sendButton(ev);
                    return self.cancel(ev);
                });
                // allow wheel scrolling in
                // the shell for example
                on(el, 'wheel', function(ev) {
                    if (self.mouseEvents)
                        return;
                    self.viewport.onWheel(ev);
                    return self.cancel(ev);
                });
            };
            /**
             * Destroys the terminal.
             */
            Terminal.prototype.destroy = function() {
                this.readable = false;
                this.writable = false;
                this._events = {};
                this.handler = function() {};
                this.write = function() {};
                if (this.element.parentNode) {
                    this.element.parentNode.removeChild(this.element);
                }
                //this.emit('close');
            };
            /**
             * Flags used to render terminal text properly
             */
            Terminal.flags = {
                BOLD: 1,
                UNDERLINE: 2,
                BLINK: 4,
                INVERSE: 8,
                INVISIBLE: 16
            };
            /**
             * Refreshes (re-renders) terminal content within two rows (inclusive)
             *
             * Rendering Engine:
             *
             * In the screen buffer, each character is stored as a an array with a character
             * and a 32-bit integer:
             *   - First value: a utf-16 character.
             *   - Second value:
             *   - Next 9 bits: background color (0-511).
             *   - Next 9 bits: foreground color (0-511).
             *   - Next 14 bits: a mask for misc. flags:
             *     - 1=bold
             *     - 2=underline
             *     - 4=blink
             *     - 8=inverse
             *     - 16=invisible
             *
             * @param {number} start The row to start from (between 0 and terminal's height terminal - 1)
             * @param {number} end The row to end at (between fromRow and terminal's height terminal - 1)
             * @param {boolean} queue Whether the refresh should ran right now or be queued
             */
            Terminal.prototype.refresh = function(start, end, queue) {
                var self = this;
                // queue defaults to true
                queue = (typeof queue == 'undefined') ? true : queue;
                /**
                 * The refresh queue allows refresh to execute only approximately 30 times a second. For
                 * commands that pass a significant amount of output to the write function, this prevents the
                 * terminal from maxing out the CPU and making the UI unresponsive. While commands can still
                 * run beyond what they do on the terminal, it is far better with a debounce in place as
                 * every single terminal manipulation does not need to be constructed in the DOM.
                 *
                 * A side-effect of this is that it makes ^C to interrupt a process seem more responsive.
                 */
                if (queue) {
                    // If refresh should be queued, order the refresh and return.
                    if (this._refreshIsQueued) {
                        // If a refresh has already been queued, just order a full refresh next
                        this._fullRefreshNext = true;
                    } else {
                        setTimeout(function() {
                            self.refresh(start, end, false);
                        }, 34);
                        this._refreshIsQueued = true;
                    }
                    return;
                }
                // If refresh should be run right now (not be queued), release the lock
                this._refreshIsQueued = false;
                // If multiple refreshes were requested, make a full refresh.
                if (this._fullRefreshNext) {
                    start = 0;
                    end = this.rows - 1;
                    this._fullRefreshNext = false; // reset lock
                }
                var x, y, i, line, out, ch, ch_width, width, data, attr, bg, fg, flags, row, parent, focused = document.activeElement;
                // If this is a big refresh, remove the terminal rows from the DOM for faster calculations
                if (end - start >= this.rows / 2) {
                    parent = this.element.parentNode;
                    if (parent) {
                        this.element.removeChild(this.rowContainer);
                    }
                }
                width = this.cols;
                y = start;
                if (end >= this.rows.length) {
                    this.log('`end` is too large. Most likely a bad CSR.');
                    end = this.rows.length - 1;
                }
                for (; y <= end; y++) {
                    row = y + this.ydisp;
                    line = this.lines[row];
                    out = '';
                    if (this.y === y - (this.ybase - this.ydisp) &&
                        this.cursorState &&
                        !this.cursorHidden) {
                        x = this.x;
                    } else {
                        x = -1;
                    }
                    attr = this.defAttr;
                    i = 0;
                    for (; i < width; i++) {
                        data = line[i][0];
                        ch = line[i][1];
                        ch_width = line[i][2];
                        if (!ch_width)
                            continue;
                        if (i === x)
                            data = -1;
                        if (data !== attr) {
                            if (attr !== this.defAttr) {
                                out += '</span>';
                            }
                            if (data !== this.defAttr) {
                                if (data === -1) {
                                    out += '<span class="reverse-video terminal-cursor';
                                    if (this.cursorBlink) {
                                        out += ' blinking';
                                    }
                                    out += '">';
                                } else {
                                    var classNames = [];
                                    bg = data & 0x1ff;
                                    fg = (data >> 9) & 0x1ff;
                                    flags = data >> 18;
                                    if (flags & Terminal.flags.BOLD) {
                                        if (!Terminal.brokenBold) {
                                            classNames.push('xterm-bold');
                                        }
                                        // See: XTerm*boldColors
                                        if (fg < 8)
                                            fg += 8;
                                    }
                                    if (flags & Terminal.flags.UNDERLINE) {
                                        classNames.push('xterm-underline');
                                    }
                                    if (flags & Terminal.flags.BLINK) {
                                        classNames.push('xterm-blink');
                                    }
                                    // If inverse flag is on, then swap the foreground and background variables.
                                    if (flags & Terminal.flags.INVERSE) {
                                        /* One-line variable swap in JavaScript: http://stackoverflow.com/a/16201730 */
                                        bg = [fg, fg = bg][0];
                                        // Should inverse just be before the
                                        // above boldColors effect instead?
                                        if ((flags & 1) && fg < 8)
                                            fg += 8;
                                    }
                                    if (flags & Terminal.flags.INVISIBLE) {
                                        classNames.push('xterm-hidden');
                                    }
                                    /**
                                     * Weird situation: Invert flag used black foreground and white background results
                                     * in invalid background color, positioned at the 256 index of the 256 terminal
                                     * color map. Pin the colors manually in such a case.
                                     *
                                     * Source: https://github.com/sourcelair/xterm.js/issues/57
                                     */
                                    if (flags & Terminal.flags.INVERSE) {
                                        if (bg == 257) {
                                            bg = 15;
                                        }
                                        if (fg == 256) {
                                            fg = 0;
                                        }
                                    }
                                    if (bg < 256) {
                                        classNames.push('xterm-bg-color-' + bg);
                                    }
                                    if (fg < 256) {
                                        classNames.push('xterm-color-' + fg);
                                    }
                                    out += '<span';
                                    if (classNames.length) {
                                        out += ' class="' + classNames.join(' ') + '"';
                                    }
                                    out += '>';
                                }
                            }
                        }
                        switch (ch) {
                            case '&':
                                out += '&amp;';
                                break;
                            case '<':
                                out += '&lt;';
                                break;
                            case '>':
                                out += '&gt;';
                                break;
                            default:
                                if (ch <= ' ') {
                                    out += '&nbsp;';
                                } else {
                                    out += ch;
                                }
                                break;
                        }
                        attr = data;
                    }
                    if (attr !== this.defAttr) {
                        out += '</span>';
                    }
                    this.children[y].innerHTML = out;
                }
                if (parent) {
                    this.element.appendChild(this.rowContainer);
                }
                this.emit('refresh', {
                    element: this.element,
                    start: start,
                    end: end
                });
            };
            /**
             * Display the cursor element
             */
            Terminal.prototype.showCursor = function() {
                if (!this.cursorState) {
                    this.cursorState = 1;
                    this.refresh(this.y, this.y);
                }
            };
            /**
             * Scroll the terminal
             */
            Terminal.prototype.scroll = function() {
                var row;
                if (++this.ybase === this.scrollback) {
                    this.ybase = this.ybase / 2 | 0;
                    this.lines = this.lines.slice(-(this.ybase + this.rows) + 1);
                }
                if (!this.userScrolling) {
                    this.ydisp = this.ybase;
                }
                // last line
                row = this.ybase + this.rows - 1;
                // subtract the bottom scroll region
                row -= this.rows - 1 - this.scrollBottom;
                if (row === this.lines.length) {
                    // potential optimization:
                    // pushing is faster than splicing
                    // when they amount to the same
                    // behavior.
                    this.lines.push(this.blankLine());
                } else {
                    // add our new line
                    this.lines.splice(row, 0, this.blankLine());
                }
                if (this.scrollTop !== 0) {
                    if (this.ybase !== 0) {
                        this.ybase--;
                        if (!this.userScrolling) {
                            this.ydisp = this.ybase;
                        }
                    }
                    this.lines.splice(this.ybase + this.scrollTop, 1);
                }
                // this.maxRange();
                this.updateRange(this.scrollTop);
                this.updateRange(this.scrollBottom);
                /**
                 * This event is emitted whenever the terminal is scrolled.
                 * The one parameter passed is the new y display position.
                 *
                 * @event scroll
                 */
                this.emit('scroll', this.ydisp);
            };
            /**
             * Scroll the display of the terminal
             * @param {number} disp The number of lines to scroll down (negatives scroll up).
             * @param {boolean} suppressScrollEvent Don't emit the scroll event as scrollDisp. This is used
             * to avoid unwanted events being handled by the veiwport when the event was triggered from the
             * viewport originally.
             */
            Terminal.prototype.scrollDisp = function(disp, suppressScrollEvent) {
                if (disp < 0) {
                    this.userScrolling = true;
                } else if (disp + this.ydisp >= this.ybase) {
                    this.userScrolling = false;
                }
                this.ydisp += disp;
                if (this.ydisp > this.ybase) {
                    this.ydisp = this.ybase;
                } else if (this.ydisp < 0) {
                    this.ydisp = 0;
                }
                if (!suppressScrollEvent) {
                    this.emit('scroll', this.ydisp);
                }
                this.refresh(0, this.rows - 1);
            };
            /**
             * Scroll the display of the terminal by a number of pages.
             * @param {number} pageCount The number of pages to scroll (negative scrolls up).
             */
            Terminal.prototype.scrollPages = function(pageCount) {
                this.scrollDisp(pageCount * (this.rows - 1));
            };
            /**
             * Scrolls the display of the terminal to the top.
             */
            Terminal.prototype.scrollToTop = function() {
                this.scrollDisp(-this.ydisp);
            };
            /**
             * Scrolls the display of the terminal to the bottom.
             */
            Terminal.prototype.scrollToBottom = function() {
                this.scrollDisp(this.ybase - this.ydisp);
            };
            /**
             * Writes text to the terminal.
             * @param {string} text The text to write to the terminal.
             */
            Terminal.prototype.write = function(data) {
                var l = data.length,
                    i = 0,
                    j, cs, ch, code, low, ch_width, row;
                this.refreshStart = this.y;
                this.refreshEnd = this.y;
                // apply leftover surrogate high from last write
                if (this.surrogate_high) {
                    data = this.surrogate_high + data;
                    this.surrogate_high = '';
                }
                for (; i < l; i++) {
                    ch = data[i];
                    // FIXME: higher chars than 0xa0 are not allowed in escape sequences
                    //        --> maybe move to default
                    code = data.charCodeAt(i);
                    if (0xD800 <= code && code <= 0xDBFF) {
                        // we got a surrogate high
                        // get surrogate low (next 2 bytes)
                        low = data.charCodeAt(i + 1);
                        if (isNaN(low)) {
                            // end of data stream, save surrogate high
                            this.surrogate_high = ch;
                            continue;
                        }
                        code = ((code - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
                        ch += data.charAt(i + 1);
                    }
                    // surrogate low - already handled above
                    if (0xDC00 <= code && code <= 0xDFFF)
                        continue;
                    switch (this.state) {
                        case normal:
                            switch (ch) {
                                case '\x07':
                                    this.bell();
                                    break;
                                // '\n', '\v', '\f'
                                case '\n':
                                case '\x0b':
                                case '\x0c':
                                    if (this.convertEol) {
                                        this.x = 0;
                                    }
                                    this.y++;
                                    if (this.y > this.scrollBottom) {
                                        this.y--;
                                        this.scroll();
                                    }
                                    break;
                                // '\r'
                                case '\r':
                                    this.x = 0;
                                    break;
                                // '\b'
                                case '\x08':
                                    if (this.x > 0) {
                                        this.x--;
                                    }
                                    break;
                                // '\t'
                                case '\t':
                                    this.x = this.nextStop();
                                    break;
                                // shift out
                                case '\x0e':
                                    this.setgLevel(1);
                                    break;
                                // shift in
                                case '\x0f':
                                    this.setgLevel(0);
                                    break;
                                // '\e'
                                case '\x1b':
                                    this.state = escaped;
                                    break;
                                default:
                                    // ' '
                                    // calculate print space
                                    // expensive call, therefore we save width in line buffer
                                    ch_width = wcwidth(code);
                                    if (ch >= ' ') {
                                        if (this.charset && this.charset[ch]) {
                                            ch = this.charset[ch];
                                        }
                                        row = this.y + this.ybase;
                                        // insert combining char in last cell
                                        // FIXME: needs handling after cursor jumps
                                        if (!ch_width && this.x) {
                                            // dont overflow left
                                            if (this.lines[row][this.x - 1]) {
                                                if (!this.lines[row][this.x - 1][2]) {
                                                    // found empty cell after fullwidth, need to go 2 cells back
                                                    if (this.lines[row][this.x - 2])
                                                        this.lines[row][this.x - 2][1] += ch;
                                                } else {
                                                    this.lines[row][this.x - 1][1] += ch;
                                                }
                                                this.updateRange(this.y);
                                            }
                                            break;
                                        }
                                        // goto next line if ch would overflow
                                        // TODO: needs a global min terminal width of 2
                                        if (this.x + ch_width - 1 >= this.cols) {
                                            // autowrap - DECAWM
                                            if (this.wraparoundMode) {
                                                this.x = 0;
                                                this.y++;
                                                if (this.y > this.scrollBottom) {
                                                    this.y--;
                                                    this.scroll();
                                                }
                                            } else {
                                                this.x = this.cols - 1;
                                                if (ch_width === 2)
                                                    continue;
                                            }
                                        }
                                        row = this.y + this.ybase;
                                        // insert mode: move characters to right
                                        if (this.insertMode) {
                                            // do this twice for a fullwidth char
                                            for (var moves = 0; moves < ch_width; ++moves) {
                                                // remove last cell, if it's width is 0
                                                // we have to adjust the second last cell as well
                                                var removed = this.lines[this.y + this.ybase].pop();
                                                if (removed[2] === 0 &&
                                                    this.lines[row][this.cols - 2] &&
                                                    this.lines[row][this.cols - 2][2] === 2)
                                                    this.lines[row][this.cols - 2] = [this.curAttr, ' ', 1];
                                                // insert empty cell at cursor
                                                this.lines[row].splice(this.x, 0, [this.curAttr, ' ', 1]);
                                            }
                                        }
                                        this.lines[row][this.x] = [this.curAttr, ch, ch_width];
                                        this.x++;
                                        this.updateRange(this.y);
                                        // fullwidth char - set next cell width to zero and advance cursor
                                        if (ch_width === 2) {
                                            this.lines[row][this.x] = [this.curAttr, '', 0];
                                            this.x++;
                                        }
                                    }
                                    break;
                            }
                            break;
                        case escaped:
                            switch (ch) {
                                // ESC [ Control Sequence Introducer ( CSI is 0x9b).
                                case '[':
                                    this.params = [];
                                    this.currentParam = 0;
                                    this.state = csi;
                                    break;
                                // ESC ] Operating System Command ( OSC is 0x9d).
                                case ']':
                                    this.params = [];
                                    this.currentParam = 0;
                                    this.state = osc;
                                    break;
                                // ESC P Device Control String ( DCS is 0x90).
                                case 'P':
                                    this.params = [];
                                    this.currentParam = 0;
                                    this.state = dcs;
                                    break;
                                // ESC _ Application Program Command ( APC is 0x9f).
                                case '_':
                                    this.state = ignore;
                                    break;
                                // ESC ^ Privacy Message ( PM is 0x9e).
                                case '^':
                                    this.state = ignore;
                                    break;
                                // ESC c Full Reset (RIS).
                                case 'c':
                                    this.reset();
                                    break;
                                // ESC E Next Line ( NEL is 0x85).
                                // ESC D Index ( IND is 0x84).
                                case 'E':
                                    this.x = 0;;
                                case 'D':
                                    this.index();
                                    break;
                                // ESC M Reverse Index ( RI is 0x8d).
                                case 'M':
                                    this.reverseIndex();
                                    break;
                                // ESC % Select default/utf-8 character set.
                                // @ = default, G = utf-8
                                case '%':
                                    //this.charset = null;
                                    this.setgLevel(0);
                                    this.setgCharset(0, Terminal.charsets.US);
                                    this.state = normal;
                                    i++;
                                    break;
                                // ESC (,),*,+,-,. Designate G0-G2 Character Set.
                                case '(': // <-- this seems to get all the attention
                                case ')':
                                case '*':
                                case '+':
                                case '-':
                                case '.':
                                    switch (ch) {
                                        case '(':
                                            this.gcharset = 0;
                                            break;
                                        case ')':
                                            this.gcharset = 1;
                                            break;
                                        case '*':
                                            this.gcharset = 2;
                                            break;
                                        case '+':
                                            this.gcharset = 3;
                                            break;
                                        case '-':
                                            this.gcharset = 1;
                                            break;
                                        case '.':
                                            this.gcharset = 2;
                                            break;
                                    }
                                    this.state = charset;
                                    break;
                                // Designate G3 Character Set (VT300).
                                // A = ISO Latin-1 Supplemental.
                                // Not implemented.
                                case '/':
                                    this.gcharset = 3;
                                    this.state = charset;
                                    i--;
                                    break;
                                // ESC N
                                // Single Shift Select of G2 Character Set
                                // ( SS2 is 0x8e). This affects next character only.
                                case 'N':
                                    break;
                                // ESC O
                                // Single Shift Select of G3 Character Set
                                // ( SS3 is 0x8f). This affects next character only.
                                case 'O':
                                    break;
                                // ESC n
                                // Invoke the G2 Character Set as GL (LS2).
                                case 'n':
                                    this.setgLevel(2);
                                    break;
                                // ESC o
                                // Invoke the G3 Character Set as GL (LS3).
                                case 'o':
                                    this.setgLevel(3);
                                    break;
                                // ESC |
                                // Invoke the G3 Character Set as GR (LS3R).
                                case '|':
                                    this.setgLevel(3);
                                    break;
                                // ESC }
                                // Invoke the G2 Character Set as GR (LS2R).
                                case '}':
                                    this.setgLevel(2);
                                    break;
                                // ESC ~
                                // Invoke the G1 Character Set as GR (LS1R).
                                case '~':
                                    this.setgLevel(1);
                                    break;
                                // ESC 7 Save Cursor (DECSC).
                                case '7':
                                    this.saveCursor();
                                    this.state = normal;
                                    break;
                                // ESC 8 Restore Cursor (DECRC).
                                case '8':
                                    this.restoreCursor();
                                    this.state = normal;
                                    break;
                                // ESC # 3 DEC line height/width
                                case '#':
                                    this.state = normal;
                                    i++;
                                    break;
                                // ESC H Tab Set (HTS is 0x88).
                                case 'H':
                                    this.tabSet();
                                    break;
                                // ESC = Application Keypad (DECKPAM).
                                case '=':
                                    this.log('Serial port requested application keypad.');
                                    this.applicationKeypad = true;
                                    this.viewport.syncScrollArea();
                                    this.state = normal;
                                    break;
                                // ESC > Normal Keypad (DECKPNM).
                                case '>':
                                    this.log('Switching back to normal keypad.');
                                    this.applicationKeypad = false;
                                    this.viewport.syncScrollArea();
                                    this.state = normal;
                                    break;
                                default:
                                    this.state = normal;
                                    this.error('Unknown ESC control: %s.', ch);
                                    break;
                            }
                            break;
                        case charset:
                            switch (ch) {
                                case '0':
                                    cs = Terminal.charsets.SCLD;
                                    break;
                                case 'A':
                                    cs = Terminal.charsets.UK;
                                    break;
                                case 'B':
                                    cs = Terminal.charsets.US;
                                    break;
                                case '4':
                                    cs = Terminal.charsets.Dutch;
                                    break;
                                case 'C': // Finnish
                                case '5':
                                    cs = Terminal.charsets.Finnish;
                                    break;
                                case 'R':
                                    cs = Terminal.charsets.French;
                                    break;
                                case 'Q':
                                    cs = Terminal.charsets.FrenchCanadian;
                                    break;
                                case 'K':
                                    cs = Terminal.charsets.German;
                                    break;
                                case 'Y':
                                    cs = Terminal.charsets.Italian;
                                    break;
                                case 'E': // NorwegianDanish
                                case '6':
                                    cs = Terminal.charsets.NorwegianDanish;
                                    break;
                                case 'Z':
                                    cs = Terminal.charsets.Spanish;
                                    break;
                                case 'H': // Swedish
                                case '7':
                                    cs = Terminal.charsets.Swedish;
                                    break;
                                case '=':
                                    cs = Terminal.charsets.Swiss;
                                    break;
                                case '/':
                                    cs = Terminal.charsets.ISOLatin;
                                    i++;
                                    break;
                                default:
                                    cs = Terminal.charsets.US;
                                    break;
                            }
                            this.setgCharset(this.gcharset, cs);
                            this.gcharset = null;
                            this.state = normal;
                            break;
                        case osc:
                            // OSC Ps ; Pt ST
                            // OSC Ps ; Pt BEL
                            //   Set Text Parameters.
                            if (ch === '\x1b' || ch === '\x07') {
                                if (ch === '\x1b')
                                    i++;
                                this.params.push(this.currentParam);
                                switch (this.params[0]) {
                                    case 0:
                                    case 1:
                                    case 2:
                                        if (this.params[1]) {
                                            this.title = this.params[1];
                                            this.handleTitle(this.title);
                                        }
                                        break;
                                    case 3:
                                        // set X property
                                        break;
                                    case 4:
                                    case 5:
                                        // change dynamic colors
                                        break;
                                    case 10:
                                    case 11:
                                    case 12:
                                    case 13:
                                    case 14:
                                    case 15:
                                    case 16:
                                    case 17:
                                    case 18:
                                    case 19:
                                        // change dynamic ui colors
                                        break;
                                    case 46:
                                        // change log file
                                        break;
                                    case 50:
                                        // dynamic font
                                        break;
                                    case 51:
                                        // emacs shell
                                        break;
                                    case 52:
                                        // manipulate selection data
                                        break;
                                    case 104:
                                    case 105:
                                    case 110:
                                    case 111:
                                    case 112:
                                    case 113:
                                    case 114:
                                    case 115:
                                    case 116:
                                    case 117:
                                    case 118:
                                        // reset colors
                                        break;
                                }
                                this.params = [];
                                this.currentParam = 0;
                                this.state = normal;
                            } else {
                                if (!this.params.length) {
                                    if (ch >= '0' && ch <= '9') {
                                        this.currentParam =
                                            this.currentParam * 10 + ch.charCodeAt(0) - 48;
                                    } else if (ch === ';') {
                                        this.params.push(this.currentParam);
                                        this.currentParam = '';
                                    }
                                } else {
                                    this.currentParam += ch;
                                }
                            }
                            break;
                        case csi:
                            // '?', '>', '!'
                            if (ch === '?' || ch === '>' || ch === '!') {
                                this.prefix = ch;
                                break;
                            }
                            // 0 - 9
                            if (ch >= '0' && ch <= '9') {
                                this.currentParam = this.currentParam * 10 + ch.charCodeAt(0) - 48;
                                break;
                            }
                            // '$', '"', ' ', '\''
                            if (ch === '$' || ch === '"' || ch === ' ' || ch === '\'') {
                                this.postfix = ch;
                                break;
                            }
                            this.params.push(this.currentParam);
                            this.currentParam = 0;
                            // ';'
                            if (ch === ';')
                                break;
                            this.state = normal;
                            switch (ch) {
                                // CSI Ps A
                                // Cursor Up Ps Times (default = 1) (CUU).
                                case 'A':
                                    this.cursorUp(this.params);
                                    break;
                                // CSI Ps B
                                // Cursor Down Ps Times (default = 1) (CUD).
                                case 'B':
                                    this.cursorDown(this.params);
                                    break;
                                // CSI Ps C
                                // Cursor Forward Ps Times (default = 1) (CUF).
                                case 'C':
                                    this.cursorForward(this.params);
                                    break;
                                // CSI Ps D
                                // Cursor Backward Ps Times (default = 1) (CUB).
                                case 'D':
                                    this.cursorBackward(this.params);
                                    break;
                                // CSI Ps ; Ps H
                                // Cursor Position [row;column] (default = [1,1]) (CUP).
                                case 'H':
                                    this.cursorPos(this.params);
                                    break;
                                // CSI Ps J  Erase in Display (ED).
                                case 'J':
                                    this.eraseInDisplay(this.params);
                                    break;
                                // CSI Ps K  Erase in Line (EL).
                                case 'K':
                                    this.eraseInLine(this.params);
                                    break;
                                // CSI Pm m  Character Attributes (SGR).
                                case 'm':
                                    if (!this.prefix) {
                                        this.charAttributes(this.params);
                                    }
                                    break;
                                // CSI Ps n  Device Status Report (DSR).
                                case 'n':
                                    if (!this.prefix) {
                                        this.deviceStatus(this.params);
                                    }
                                    break;
                                /**
                                 * Additions
                                 */
                                // CSI Ps @
                                // Insert Ps (Blank) Character(s) (default = 1) (ICH).
                                case '@':
                                    this.insertChars(this.params);
                                    break;
                                // CSI Ps E
                                // Cursor Next Line Ps Times (default = 1) (CNL).
                                case 'E':
                                    this.cursorNextLine(this.params);
                                    break;
                                // CSI Ps F
                                // Cursor Preceding Line Ps Times (default = 1) (CNL).
                                case 'F':
                                    this.cursorPrecedingLine(this.params);
                                    break;
                                // CSI Ps G
                                // Cursor Character Absolute  [column] (default = [row,1]) (CHA).
                                case 'G':
                                    this.cursorCharAbsolute(this.params);
                                    break;
                                // CSI Ps L
                                // Insert Ps Line(s) (default = 1) (IL).
                                case 'L':
                                    this.insertLines(this.params);
                                    break;
                                // CSI Ps M
                                // Delete Ps Line(s) (default = 1) (DL).
                                case 'M':
                                    this.deleteLines(this.params);
                                    break;
                                // CSI Ps P
                                // Delete Ps Character(s) (default = 1) (DCH).
                                case 'P':
                                    this.deleteChars(this.params);
                                    break;
                                // CSI Ps X
                                // Erase Ps Character(s) (default = 1) (ECH).
                                case 'X':
                                    this.eraseChars(this.params);
                                    break;
                                // CSI Pm `  Character Position Absolute
                                //   [column] (default = [row,1]) (HPA).
                                case '`':
                                    this.charPosAbsolute(this.params);
                                    break;
                                // 141 61 a * HPR -
                                // Horizontal Position Relative
                                case 'a':
                                    this.HPositionRelative(this.params);
                                    break;
                                // CSI P s c
                                // Send Device Attributes (Primary DA).
                                // CSI > P s c
                                // Send Device Attributes (Secondary DA)
                                case 'c':
                                    this.sendDeviceAttributes(this.params);
                                    break;
                                // CSI Pm d
                                // Line Position Absolute  [row] (default = [1,column]) (VPA).
                                case 'd':
                                    this.linePosAbsolute(this.params);
                                    break;
                                // 145 65 e * VPR - Vertical Position Relative
                                case 'e':
                                    this.VPositionRelative(this.params);
                                    break;
                                // CSI Ps ; Ps f
                                //   Horizontal and Vertical Position [row;column] (default =
                                //   [1,1]) (HVP).
                                case 'f':
                                    this.HVPosition(this.params);
                                    break;
                                // CSI Pm h  Set Mode (SM).
                                // CSI ? Pm h - mouse escape codes, cursor escape codes
                                case 'h':
                                    this.setMode(this.params);
                                    break;
                                // CSI Pm l  Reset Mode (RM).
                                // CSI ? Pm l
                                case 'l':
                                    this.resetMode(this.params);
                                    break;
                                // CSI Ps ; Ps r
                                //   Set Scrolling Region [top;bottom] (default = full size of win-
                                //   dow) (DECSTBM).
                                // CSI ? Pm r
                                case 'r':
                                    this.setScrollRegion(this.params);
                                    break;
                                // CSI s
                                //   Save cursor (ANSI.SYS).
                                case 's':
                                    this.saveCursor(this.params);
                                    break;
                                // CSI u
                                //   Restore cursor (ANSI.SYS).
                                case 'u':
                                    this.restoreCursor(this.params);
                                    break;
                                /**
                                 * Lesser Used
                                 */
                                // CSI Ps I
                                // Cursor Forward Tabulation Ps tab stops (default = 1) (CHT).
                                case 'I':
                                    this.cursorForwardTab(this.params);
                                    break;
                                // CSI Ps S  Scroll up Ps lines (default = 1) (SU).
                                case 'S':
                                    this.scrollUp(this.params);
                                    break;
                                // CSI Ps T  Scroll down Ps lines (default = 1) (SD).
                                // CSI Ps ; Ps ; Ps ; Ps ; Ps T
                                // CSI > Ps; Ps T
                                case 'T':
                                    // if (this.prefix === '>') {
                                    //   this.resetTitleModes(this.params);
                                    //   break;
                                    // }
                                    // if (this.params.length > 2) {
                                    //   this.initMouseTracking(this.params);
                                    //   break;
                                    // }
                                    if (this.params.length < 2 && !this.prefix) {
                                        this.scrollDown(this.params);
                                    }
                                    break;
                                // CSI Ps Z
                                // Cursor Backward Tabulation Ps tab stops (default = 1) (CBT).
                                case 'Z':
                                    this.cursorBackwardTab(this.params);
                                    break;
                                // CSI Ps b  Repeat the preceding graphic character Ps times (REP).
                                case 'b':
                                    this.repeatPrecedingCharacter(this.params);
                                    break;
                                // CSI Ps g  Tab Clear (TBC).
                                case 'g':
                                    this.tabClear(this.params);
                                    break;
                                // CSI Pm i  Media Copy (MC).
                                // CSI ? Pm i
                                // case 'i':
                                //   this.mediaCopy(this.params);
                                //   break;
                                // CSI Pm m  Character Attributes (SGR).
                                // CSI > Ps; Ps m
                                // case 'm': // duplicate
                                //   if (this.prefix === '>') {
                                //     this.setResources(this.params);
                                //   } else {
                                //     this.charAttributes(this.params);
                                //   }
                                //   break;
                                // CSI Ps n  Device Status Report (DSR).
                                // CSI > Ps n
                                // case 'n': // duplicate
                                //   if (this.prefix === '>') {
                                //     this.disableModifiers(this.params);
                                //   } else {
                                //     this.deviceStatus(this.params);
                                //   }
                                //   break;
                                // CSI > Ps p  Set pointer mode.
                                // CSI ! p   Soft terminal reset (DECSTR).
                                // CSI Ps$ p
                                //   Request ANSI mode (DECRQM).
                                // CSI ? Ps$ p
                                //   Request DEC private mode (DECRQM).
                                // CSI Ps ; Ps " p
                                case 'p':
                                    switch (this.prefix) {
                                        // case '>':
                                        //   this.setPointerMode(this.params);
                                        //   break;
                                        case '!':
                                            this.softReset(this.params);
                                            break;
                                    }
                                    break;
                                // CSI Ps q  Load LEDs (DECLL).
                                // CSI Ps SP q
                                // CSI Ps " q
                                // case 'q':
                                //   if (this.postfix === ' ') {
                                //     this.setCursorStyle(this.params);
                                //     break;
                                //   }
                                //   if (this.postfix === '"') {
                                //     this.setCharProtectionAttr(this.params);
                                //     break;
                                //   }
                                //   this.loadLEDs(this.params);
                                //   break;
                                // CSI Ps ; Ps r
                                //   Set Scrolling Region [top;bottom] (default = full size of win-
                                //   dow) (DECSTBM).
                                // CSI ? Pm r
                                // CSI Pt; Pl; Pb; Pr; Ps$ r
                                // case 'r': // duplicate
                                //   if (this.prefix === '?') {
                                //     this.restorePrivateValues(this.params);
                                //   } else if (this.postfix === '$') {
                                //     this.setAttrInRectangle(this.params);
                                //   } else {
                                //     this.setScrollRegion(this.params);
                                //   }
                                //   break;
                                // CSI s     Save cursor (ANSI.SYS).
                                // CSI ? Pm s
                                // case 's': // duplicate
                                //   if (this.prefix === '?') {
                                //     this.savePrivateValues(this.params);
                                //   } else {
                                //     this.saveCursor(this.params);
                                //   }
                                //   break;
                                // CSI Ps ; Ps ; Ps t
                                // CSI Pt; Pl; Pb; Pr; Ps$ t
                                // CSI > Ps; Ps t
                                // CSI Ps SP t
                                // case 't':
                                //   if (this.postfix === '$') {
                                //     this.reverseAttrInRectangle(this.params);
                                //   } else if (this.postfix === ' ') {
                                //     this.setWarningBellVolume(this.params);
                                //   } else {
                                //     if (this.prefix === '>') {
                                //       this.setTitleModeFeature(this.params);
                                //     } else {
                                //       this.manipulateWindow(this.params);
                                //     }
                                //   }
                                //   break;
                                // CSI u     Restore cursor (ANSI.SYS).
                                // CSI Ps SP u
                                // case 'u': // duplicate
                                //   if (this.postfix === ' ') {
                                //     this.setMarginBellVolume(this.params);
                                //   } else {
                                //     this.restoreCursor(this.params);
                                //   }
                                //   break;
                                // CSI Pt; Pl; Pb; Pr; Pp; Pt; Pl; Pp$ v
                                // case 'v':
                                //   if (this.postfix === '$') {
                                //     this.copyRectagle(this.params);
                                //   }
                                //   break;
                                // CSI Pt ; Pl ; Pb ; Pr ' w
                                // case 'w':
                                //   if (this.postfix === '\'') {
                                //     this.enableFilterRectangle(this.params);
                                //   }
                                //   break;
                                // CSI Ps x  Request Terminal Parameters (DECREQTPARM).
                                // CSI Ps x  Select Attribute Change Extent (DECSACE).
                                // CSI Pc; Pt; Pl; Pb; Pr$ x
                                // case 'x':
                                //   if (this.postfix === '$') {
                                //     this.fillRectangle(this.params);
                                //   } else {
                                //     this.requestParameters(this.params);
                                //     //this.__(this.params);
                                //   }
                                //   break;
                                // CSI Ps ; Pu ' z
                                // CSI Pt; Pl; Pb; Pr$ z
                                // case 'z':
                                //   if (this.postfix === '\'') {
                                //     this.enableLocatorReporting(this.params);
                                //   } else if (this.postfix === '$') {
                                //     this.eraseRectangle(this.params);
                                //   }
                                //   break;
                                // CSI Pm ' {
                                // CSI Pt; Pl; Pb; Pr$ {
                                // case '{':
                                //   if (this.postfix === '\'') {
                                //     this.setLocatorEvents(this.params);
                                //   } else if (this.postfix === '$') {
                                //     this.selectiveEraseRectangle(this.params);
                                //   }
                                //   break;
                                // CSI Ps ' |
                                // case '|':
                                //   if (this.postfix === '\'') {
                                //     this.requestLocatorPosition(this.params);
                                //   }
                                //   break;
                                // CSI P m SP }
                                // Insert P s Column(s) (default = 1) (DECIC), VT420 and up.
                                // case '}':
                                //   if (this.postfix === ' ') {
                                //     this.insertColumns(this.params);
                                //   }
                                //   break;
                                // CSI P m SP ~
                                // Delete P s Column(s) (default = 1) (DECDC), VT420 and up
                                // case '~':
                                //   if (this.postfix === ' ') {
                                //     this.deleteColumns(this.params);
                                //   }
                                //   break;
                                default:
                                    this.error('Unknown CSI code: %s.', ch);
                                    break;
                            }
                            this.prefix = '';
                            this.postfix = '';
                            break;
                        case dcs:
                            if (ch === '\x1b' || ch === '\x07') {
                                if (ch === '\x1b')
                                    i++;
                                switch (this.prefix) {
                                    // User-Defined Keys (DECUDK).
                                    case '':
                                        break;
                                    // Request Status String (DECRQSS).
                                    // test: echo -e '\eP$q"p\e\\'
                                    case '$q':
                                        var pt = this.currentParam,
                                            valid = false;
                                        switch (pt) {
                                            // DECSCA
                                            case '"q':
                                                pt = '0"q';
                                                break;
                                            // DECSCL
                                            case '"p':
                                                pt = '61"p';
                                                break;
                                            // DECSTBM
                                            case 'r':
                                                pt = '' +
                                                    (this.scrollTop + 1) +
                                                    ';' +
                                                    (this.scrollBottom + 1) +
                                                    'r';
                                                break;
                                            // SGR
                                            case 'm':
                                                pt = '0m';
                                                break;
                                            default:
                                                this.error('Unknown DCS Pt: %s.', pt);
                                                pt = '';
                                                break;
                                        }
                                        this.send('\x1bP' + +valid + '$r' + pt + '\x1b\\');
                                        break;
                                    // Set Termcap/Terminfo Data (xterm, experimental).
                                    case '+p':
                                        break;
                                    // Request Termcap/Terminfo String (xterm, experimental)
                                    // Regular xterm does not even respond to this sequence.
                                    // This can cause a small glitch in vim.
                                    // test: echo -ne '\eP+q6b64\e\\'
                                    case '+q':
                                        var pt = this.currentParam,
                                            valid = false;
                                        this.send('\x1bP' + +valid + '+r' + pt + '\x1b\\');
                                        break;
                                    default:
                                        this.error('Unknown DCS prefix: %s.', this.prefix);
                                        break;
                                }
                                this.currentParam = 0;
                                this.prefix = '';
                                this.state = normal;
                            } else if (!this.currentParam) {
                                if (!this.prefix && ch !== '$' && ch !== '+') {
                                    this.currentParam = ch;
                                } else if (this.prefix.length === 2) {
                                    this.currentParam = ch;
                                } else {
                                    this.prefix += ch;
                                }
                            } else {
                                this.currentParam += ch;
                            }
                            break;
                        case ignore:
                            // For PM and APC.
                            if (ch === '\x1b' || ch === '\x07') {
                                if (ch === '\x1b')
                                    i++;
                                this.state = normal;
                            }
                            break;
                    }
                }
                this.updateRange(this.y);
                this.refresh(this.refreshStart, this.refreshEnd);
            };
            /**
             * Writes text to the terminal, followed by a break line character (\n).
             * @param {string} text The text to write to the terminal.
             */
            Terminal.prototype.writeln = function(data) {
                this.write(data + '\r\n');
            };
            /**
             * Attaches a custom keydown handler which is run before keys are processed, giving consumers of
             * xterm.js ultimate control as to what keys should be processed by the terminal and what keys
             * should not.
             * @param {function} customKeydownHandler The custom KeyboardEvent handler to attach. This is a
             *   function that takes a KeyboardEvent, allowing consumers to stop propogation and/or prevent
             *   the default action. The function returns whether the event should be processed by xterm.js.
             */
            Terminal.prototype.attachCustomKeydownHandler = function(customKeydownHandler) {
                this.customKeydownHandler = customKeydownHandler;
            };
            /**
             * Handle a keydown event
             * Key Resources:
             *   - https://developer.mozilla.org/en-US/docs/DOM/KeyboardEvent
             * @param {KeyboardEvent} ev The keydown event to be handled.
             */
            Terminal.prototype.keyDown = function(ev) {
                if (this.customKeydownHandler && this.customKeydownHandler(ev) === false) {
                    return false;
                }
                if (!this.compositionHelper.keydown.bind(this.compositionHelper)(ev)) {
                    if (this.ybase !== this.ydisp) {
                        this.scrollToBottom();
                    }
                    return false;
                }
                var self = this;
                var result = this.evaluateKeyEscapeSequence(ev);
                if (result.scrollDisp) {
                    this.scrollDisp(result.scrollDisp);
                    return this.cancel(ev, true);
                }
                if (isThirdLevelShift(this, ev)) {
                    return true;
                }
                if (result.cancel) {
                    // The event is canceled at the end already, is this necessary?
                    this.cancel(ev, true);
                }
                if (!result.key) {
                    return true;
                }
                this.emit('keydown', ev);
                this.emit('key', result.key, ev);
                this.showCursor();
                this.handler(result.key);
                return this.cancel(ev, true);
            };
            /**
             * Returns an object that determines how a KeyboardEvent should be handled. The key of the
             * returned value is the new key code to pass to the PTY.
             *
             * Reference: http://invisible-island.net/xterm/ctlseqs/ctlseqs.html
             * @param {KeyboardEvent} ev The keyboard event to be translated to key escape sequence.
             */
            Terminal.prototype.evaluateKeyEscapeSequence = function(ev) {
                var result = {
                    // Whether to cancel event propogation (NOTE: this may not be needed since the event is
                    // canceled at the end of keyDown
                    cancel: false,
                    // The new key even to emit
                    key: undefined,
                    // The number of characters to scroll, if this is defined it will cancel the event
                    scrollDisp: undefined
                };
                var modifiers = ev.shiftKey << 0 | ev.altKey << 1 | ev.ctrlKey << 2 | ev.metaKey << 3;
                switch (ev.keyCode) {
                    case 8:
                        // backspace
                        if (ev.shiftKey) {
                            result.key = '\x08'; // ^H
                            break;
                        }
                        result.key = '\x7f'; // ^?
                        break;
                    case 9:
                        // tab
                        if (ev.shiftKey) {
                            result.key = '\x1b[Z';
                            break;
                        }
                        result.key = '\t';
                        result.cancel = true;
                        break;
                    case 13:
                        // return/enter
                        result.key = '\r';
                        result.cancel = true;
                        break;
                    case 27:
                        // escape
                        result.key = '\x1b';
                        result.cancel = true;
                        break;
                    case 37:
                        // left-arrow
                        if (modifiers) {
                            result.key = '\x1b[1;' + (modifiers + 1) + 'D';
                            // HACK: Make Alt + left-arrow behave like Ctrl + left-arrow: move one word backwards
                            // http://unix.stackexchange.com/a/108106
                            if (result.key == '\x1b[1;3D') {
                                result.key = '\x1b[1;5D';
                            }
                        } else if (this.applicationCursor) {
                            result.key = '\x1bOD';
                        } else {
                            result.key = '\x1b[D';
                        }
                        break;
                    case 39:
                        // right-arrow
                        if (modifiers) {
                            result.key = '\x1b[1;' + (modifiers + 1) + 'C';
                            // HACK: Make Alt + right-arrow behave like Ctrl + right-arrow: move one word forward
                            // http://unix.stackexchange.com/a/108106
                            if (result.key == '\x1b[1;3C') {
                                result.key = '\x1b[1;5C';
                            }
                        } else if (this.applicationCursor) {
                            result.key = '\x1bOC';
                        } else {
                            result.key = '\x1b[C';
                        }
                        break;
                    case 38:
                        // up-arrow
                        if (modifiers) {
                            result.key = '\x1b[1;' + (modifiers + 1) + 'A';
                            // HACK: Make Alt + up-arrow behave like Ctrl + up-arrow
                            // http://unix.stackexchange.com/a/108106
                            if (result.key == '\x1b[1;3A') {
                                result.key = '\x1b[1;5A';
                            }
                        } else if (this.applicationCursor) {
                            result.key = '\x1bOA';
                        } else {
                            result.key = '\x1b[A';
                        }
                        break;
                    case 40:
                        // down-arrow
                        if (modifiers) {
                            result.key = '\x1b[1;' + (modifiers + 1) + 'B';
                            // HACK: Make Alt + down-arrow behave like Ctrl + down-arrow
                            // http://unix.stackexchange.com/a/108106
                            if (result.key == '\x1b[1;3B') {
                                result.key = '\x1b[1;5B';
                            }
                        } else if (this.applicationCursor) {
                            result.key = '\x1bOB';
                        } else {
                            result.key = '\x1b[B';
                        }
                        break;
                    case 45:
                        // insert
                        if (!ev.shiftKey && !ev.ctrlKey) {
                            // <Ctrl> or <Shift> + <Insert> are used to
                            // copy-paste on some systems.
                            result.key = '\x1b[2~';
                        }
                        break;
                    case 46:
                        // delete
                        if (modifiers) {
                            result.key = '\x1b[3;' + (modifiers + 1) + '~';
                        } else {
                            result.key = '\x1b[3~';
                        }
                        break;
                    case 36:
                        // home
                        if (modifiers)
                            result.key = '\x1b[1;' + (modifiers + 1) + 'H';
                        else if (this.applicationCursor)
                            result.key = '\x1bOH';
                        else
                            result.key = '\x1b[H';
                        break;
                    case 35:
                        // end
                        if (modifiers)
                            result.key = '\x1b[1;' + (modifiers + 1) + 'F';
                        else if (this.applicationCursor)
                            result.key = '\x1bOF';
                        else
                            result.key = '\x1b[F';
                        break;
                    case 33:
                        // page up
                        if (ev.shiftKey) {
                            result.scrollDisp = -(this.rows - 1);
                        } else {
                            result.key = '\x1b[5~';
                        }
                        break;
                    case 34:
                        // page down
                        if (ev.shiftKey) {
                            result.scrollDisp = this.rows - 1;
                        } else {
                            result.key = '\x1b[6~';
                        }
                        break;
                    case 112:
                        // F1-F12
                        if (modifiers) {
                            result.key = '\x1b[1;' + (modifiers + 1) + 'P';
                        } else {
                            result.key = '\x1bOP';
                        }
                        break;
                    case 113:
                        if (modifiers) {
                            result.key = '\x1b[1;' + (modifiers + 1) + 'Q';
                        } else {
                            result.key = '\x1bOQ';
                        }
                        break;
                    case 114:
                        if (modifiers) {
                            result.key = '\x1b[1;' + (modifiers + 1) + 'R';
                        } else {
                            result.key = '\x1bOR';
                        }
                        break;
                    case 115:
                        if (modifiers) {
                            result.key = '\x1b[1;' + (modifiers + 1) + 'S';
                        } else {
                            result.key = '\x1bOS';
                        }
                        break;
                    case 116:
                        if (modifiers) {
                            result.key = '\x1b[15;' + (modifiers + 1) + '~';
                        } else {
                            result.key = '\x1b[15~';
                        }
                        break;
                    case 117:
                        if (modifiers) {
                            result.key = '\x1b[17;' + (modifiers + 1) + '~';
                        } else {
                            result.key = '\x1b[17~';
                        }
                        break;
                    case 118:
                        if (modifiers) {
                            result.key = '\x1b[18;' + (modifiers + 1) + '~';
                        } else {
                            result.key = '\x1b[18~';
                        }
                        break;
                    case 119:
                        if (modifiers) {
                            result.key = '\x1b[19;' + (modifiers + 1) + '~';
                        } else {
                            result.key = '\x1b[19~';
                        }
                        break;
                    case 120:
                        if (modifiers) {
                            result.key = '\x1b[20;' + (modifiers + 1) + '~';
                        } else {
                            result.key = '\x1b[20~';
                        }
                        break;
                    case 121:
                        if (modifiers) {
                            result.key = '\x1b[21;' + (modifiers + 1) + '~';
                        } else {
                            result.key = '\x1b[21~';
                        }
                        break;
                    case 122:
                        if (modifiers) {
                            result.key = '\x1b[23;' + (modifiers + 1) + '~';
                        } else {
                            result.key = '\x1b[23~';
                        }
                        break;
                    case 123:
                        if (modifiers) {
                            result.key = '\x1b[24;' + (modifiers + 1) + '~';
                        } else {
                            result.key = '\x1b[24~';
                        }
                        break;
                    default:
                        // a-z and space
                        if (ev.ctrlKey && !ev.shiftKey && !ev.altKey && !ev.metaKey) {
                            if (ev.keyCode >= 65 && ev.keyCode <= 90) {
                                result.key = String.fromCharCode(ev.keyCode - 64);
                            } else if (ev.keyCode === 32) {
                                // NUL
                                result.key = String.fromCharCode(0);
                            } else if (ev.keyCode >= 51 && ev.keyCode <= 55) {
                                // escape, file sep, group sep, record sep, unit sep
                                result.key = String.fromCharCode(ev.keyCode - 51 + 27);
                            } else if (ev.keyCode === 56) {
                                // delete
                                result.key = String.fromCharCode(127);
                            } else if (ev.keyCode === 219) {
                                // ^[ - Control Sequence Introducer (CSI)
                                result.key = String.fromCharCode(27);
                            } else if (ev.keyCode === 220) {
                                // ^\ - String Terminator (ST)
                                result.key = String.fromCharCode(28);
                            } else if (ev.keyCode === 221) {
                                // ^] - Operating System Command (OSC)
                                result.key = String.fromCharCode(29);
                            }
                        } else if (!this.browser.isMac && ev.altKey && !ev.ctrlKey && !ev.metaKey) {
                            // On Mac this is a third level shift. Use <Esc> instead.
                            if (ev.keyCode >= 65 && ev.keyCode <= 90) {
                                result.key = '\x1b' + String.fromCharCode(ev.keyCode + 32);
                            } else if (ev.keyCode === 192) {
                                result.key = '\x1b`';
                            } else if (ev.keyCode >= 48 && ev.keyCode <= 57) {
                                result.key = '\x1b' + (ev.keyCode - 48);
                            }
                        }
                        break;
                }
                return result;
            };
            /**
             * Set the G level of the terminal
             * @param g
             */
            Terminal.prototype.setgLevel = function(g) {
                this.glevel = g;
                this.charset = this.charsets[g];
            };
            /**
             * Set the charset for the given G level of the terminal
             * @param g
             * @param charset
             */
            Terminal.prototype.setgCharset = function(g, charset) {
                this.charsets[g] = charset;
                if (this.glevel === g) {
                    this.charset = charset;
                }
            };
            /**
             * Handle a keypress event.
             * Key Resources:
             *   - https://developer.mozilla.org/en-US/docs/DOM/KeyboardEvent
             * @param {KeyboardEvent} ev The keypress event to be handled.
             */
            Terminal.prototype.keyPress = function(ev) {
                var key;
                this.cancel(ev);
                if (ev.charCode) {
                    key = ev.charCode;
                } else if (ev.which == null) {
                    key = ev.keyCode;
                } else if (ev.which !== 0 && ev.charCode !== 0) {
                    key = ev.which;
                } else {
                    return false;
                }
                if (!key || ((ev.altKey || ev.ctrlKey || ev.metaKey) && !isThirdLevelShift(this, ev))) {
                    return false;
                }
                key = String.fromCharCode(key);
                this.emit('keypress', key, ev);
                this.emit('key', key, ev);
                this.showCursor();
                this.handler(key);
                return false;
            };
            /**
             * Send data for handling to the terminal
             * @param {string} data
             */
            Terminal.prototype.send = function(data) {
                var self = this;
                if (!this.queue) {
                    setTimeout(function() {
                        self.handler(self.queue);
                        self.queue = '';
                    }, 1);
                }
                this.queue += data;
            };
            /**
             * Ring the bell.
             * Note: We could do sweet things with webaudio here
             */
            Terminal.prototype.bell = function() {
                if (!this.visualBell)
                    return;
                var self = this;
                this.element.style.borderColor = 'white';
                setTimeout(function() {
                    self.element.style.borderColor = '';
                }, 10);
                if (this.popOnBell)
                    this.focus();
            };
            /**
             * Log the current state to the console.
             */
            Terminal.prototype.log = function() {
                if (!this.debug)
                    return;
                if (!this.context.console || !this.context.console.log)
                    return;
                var args = Array.prototype.slice.call(arguments);
                this.context.console.log.apply(this.context.console, args);
            };
            /**
             * Log the current state as error to the console.
             */
            Terminal.prototype.error = function() {
                if (!this.debug)
                    return;
                if (!this.context.console || !this.context.console.error)
                    return;
                var args = Array.prototype.slice.call(arguments);
                this.context.console.error.apply(this.context.console, args);
            };
            /**
             * Resizes the terminal.
             *
             * @param {number} x The number of columns to resize to.
             * @param {number} y The number of rows to resize to.
             */
            Terminal.prototype.resize = function(x, y) {
                var line, el, i, j, ch, addToY;
                if (x === this.cols && y === this.rows) {
                    return;
                }
                if (x < 1)
                    x = 1;
                if (y < 1)
                    y = 1;
                // resize cols
                j = this.cols;
                if (j < x) {
                    ch = [this.defAttr, ' ', 1]; // does xterm use the default attr?
                    i = this.lines.length;
                    while (i--) {
                        while (this.lines[i].length < x) {
                            this.lines[i].push(ch);
                        }
                    }
                } else {
                    i = this.lines.length;
                    while (i--) {
                        while (this.lines[i].length > x) {
                            this.lines[i].pop();
                        }
                    }
                }
                this.setupStops(j);
                this.cols = x;
                // resize rows
                j = this.rows;
                addToY = 0;
                if (j < y) {
                    el = this.element;
                    while (j++ < y) {
                        // y is rows, not this.y
                        if (this.lines.length < y + this.ybase) {
                            if (this.ybase > 0 && this.lines.length <= this.ybase + this.y + addToY + 1) {
                                // There is room above the buffer and there are no empty elements below the line,
                                // scroll up
                                this.ybase--;
                                addToY++;
                                if (this.ydisp > 0) {
                                    // Viewport is at the top of the buffer, must increase downwards
                                    this.ydisp--;
                                }
                            } else {
                                // Add a blank line if there is no buffer left at the top to scroll to, or if there
                                // are blank lines after the cursor
                                this.lines.push(this.blankLine());
                            }
                        }
                        if (this.children.length < y) {
                            this.insertRow();
                        }
                    }
                } else {
                    while (j-- > y) {
                        if (this.lines.length > y + this.ybase) {
                            if (this.lines.length > this.ybase + this.y + 1) {
                                // The line is a blank line below the cursor, remove it
                                this.lines.pop();
                            } else {
                                // The line is the cursor, scroll down
                                this.ybase++;
                                this.ydisp++;
                            }
                        }
                        if (this.children.length > y) {
                            el = this.children.shift();
                            if (!el)
                                continue;
                            el.parentNode.removeChild(el);
                        }
                    }
                }
                this.rows = y;
                // Make sure that the cursor stays on screen
                if (this.y >= y) {
                    this.y = y - 1;
                }
                if (addToY) {
                    this.y += addToY;
                }
                if (this.x >= x) {
                    this.x = x - 1;
                }
                this.scrollTop = 0;
                this.scrollBottom = y - 1;
                this.refresh(0, this.rows - 1);
                this.normal = null;
                this.geometry = [this.cols, this.rows];
                this.emit('resize', {
                    terminal: this,
                    cols: x,
                    rows: y
                });
            };
            /**
             * Updates the range of rows to refresh
             * @param {number} y The number of rows to refresh next.
             */
            Terminal.prototype.updateRange = function(y) {
                if (y < this.refreshStart)
                    this.refreshStart = y;
                if (y > this.refreshEnd)
                    this.refreshEnd = y;
                // if (y > this.refreshEnd) {
                //   this.refreshEnd = y;
                //   if (y > this.rows - 1) {
                //     this.refreshEnd = this.rows - 1;
                //   }
                // }
            };
            /**
             * Set the range of refreshing to the maximum value
             */
            Terminal.prototype.maxRange = function() {
                this.refreshStart = 0;
                this.refreshEnd = this.rows - 1;
            };
            /**
             * Setup the tab stops.
             * @param {number} i
             */
            Terminal.prototype.setupStops = function(i) {
                if (i != null) {
                    if (!this.tabs[i]) {
                        i = this.prevStop(i);
                    }
                } else {
                    this.tabs = {};
                    i = 0;
                }
                for (; i < this.cols; i += 8) {
                    this.tabs[i] = true;
                }
            };
            /**
             * Move the cursor to the previous tab stop from the given position (default is current).
             * @param {number} x The position to move the cursor to the previous tab stop.
             */
            Terminal.prototype.prevStop = function(x) {
                if (x == null)
                    x = this.x;
                while (!this.tabs[--x] && x > 0)
                    ;
                return x >= this.cols ?
                    this.cols - 1 :
                    x < 0 ? 0 : x;
            };
            /**
             * Move the cursor one tab stop forward from the given position (default is current).
             * @param {number} x The position to move the cursor one tab stop forward.
             */
            Terminal.prototype.nextStop = function(x) {
                if (x == null)
                    x = this.x;
                while (!this.tabs[++x] && x < this.cols)
                    ;
                return x >= this.cols ?
                    this.cols - 1 :
                    x < 0 ? 0 : x;
            };
            /**
             * Erase in the identified line everything from "x" to the end of the line (right).
             * @param {number} x The column from which to start erasing to the end of the line.
             * @param {number} y The line in which to operate.
             */
            Terminal.prototype.eraseRight = function(x, y) {
                var line = this.lines[this.ybase + y],
                    ch = [this.eraseAttr(), ' ', 1]; // xterm
                for (; x < this.cols; x++) {
                    line[x] = ch;
                }
                this.updateRange(y);
            };
            /**
             * Erase in the identified line everything from "x" to the start of the line (left).
             * @param {number} x The column from which to start erasing to the start of the line.
             * @param {number} y The line in which to operate.
             */
            Terminal.prototype.eraseLeft = function(x, y) {
                var line = this.lines[this.ybase + y],
                    ch = [this.eraseAttr(), ' ', 1]; // xterm
                x++;
                while (x--)
                    line[x] = ch;
                this.updateRange(y);
            };
            /**
             * Clears the entire buffer, making the prompt line the new first line.
             */
            Terminal.prototype.clear = function() {
                if (this.ybase === 0 && this.y === 0) {
                    // Don't clear if it's already clear
                    return;
                }
                this.lines = [this.lines[this.ybase + this.y]];
                this.ydisp = 0;
                this.ybase = 0;
                this.y = 0;
                for (var i = 1; i < this.rows; i++) {
                    this.lines.push(this.blankLine());
                }
                this.refresh(0, this.rows - 1);
                this.emit('scroll', this.ydisp);
            };
            /**
             * Erase all content in the given line
             * @param {number} y The line to erase all of its contents.
             */
            Terminal.prototype.eraseLine = function(y) {
                this.eraseRight(0, y);
            };
            /**
             * Return the data array of a blank line/
             * @param {number} cur First bunch of data for each "blank" character.
             */
            Terminal.prototype.blankLine = function(cur) {
                var attr = cur ?
                    this.eraseAttr() :
                    this.defAttr;
                var ch = [attr, ' ', 1] // width defaults to 1 halfwidth character
                    ,
                    line = [],
                    i = 0;
                for (; i < this.cols; i++) {
                    line[i] = ch;
                }
                return line;
            };
            /**
             * If cur return the back color xterm feature attribute. Else return defAttr.
             * @param {object} cur
             */
            Terminal.prototype.ch = function(cur) {
                return cur ?
                    [this.eraseAttr(), ' ', 1] :
                    [this.defAttr, ' ', 1];
            };
            /**
             * Evaluate if the current erminal is the given argument.
             * @param {object} term The terminal to evaluate
             */
            Terminal.prototype.is = function(term) {
                var name = this.termName;
                return (name + '').indexOf(term) === 0;
            };
            /**
             * Emit the 'data' event and populate the given data.
             * @param {string} data The data to populate in the event.
             */
            Terminal.prototype.handler = function(data) {
                // Input is being sent to the terminal, the terminal should focus the prompt.
                if (this.ybase !== this.ydisp) {
                    this.scrollToBottom();
                }
                this.emit('data', data);
            };
            /**
             * Emit the 'title' event and populate the given title.
             * @param {string} title The title to populate in the event.
             */
            Terminal.prototype.handleTitle = function(title) {
                /**
                 * This event is emitted when the title of the terminal is changed
                 * from inside the terminal. The parameter is the new title.
                 *
                 * @event title
                 */
                this.emit('title', title);
            };
            /**
             * ESC
             */
            /**
             * ESC D Index (IND is 0x84).
             */
            Terminal.prototype.index = function() {
                this.y++;
                if (this.y > this.scrollBottom) {
                    this.y--;
                    this.scroll();
                }
                this.state = normal;
            };
            /**
             * ESC M Reverse Index (RI is 0x8d).
             */
            Terminal.prototype.reverseIndex = function() {
                var j;
                this.y--;
                if (this.y < this.scrollTop) {
                    this.y++;
                    // possibly move the code below to term.reverseScroll();
                    // test: echo -ne '\e[1;1H\e[44m\eM\e[0m'
                    // blankLine(true) is xterm/linux behavior
                    this.lines.splice(this.y + this.ybase, 0, this.blankLine(true));
                    j = this.rows - 1 - this.scrollBottom;
                    this.lines.splice(this.rows - 1 + this.ybase - j + 1, 1);
                    // this.maxRange();
                    this.updateRange(this.scrollTop);
                    this.updateRange(this.scrollBottom);
                }
                this.state = normal;
            };
            /**
             * ESC c Full Reset (RIS).
             */
            Terminal.prototype.reset = function() {
                this.options.rows = this.rows;
                this.options.cols = this.cols;
                var customKeydownHandler = this.customKeydownHandler;
                Terminal.call(this, this.options);
                this.customKeydownHandler = customKeydownHandler;
                this.refresh(0, this.rows - 1);
                this.viewport.syncScrollArea();
            };
            /**
             * ESC H Tab Set (HTS is 0x88).
             */
            Terminal.prototype.tabSet = function() {
                this.tabs[this.x] = true;
                this.state = normal;
            };
            /**
             * CSI
             */
            /**
             * CSI Ps A
             * Cursor Up Ps Times (default = 1) (CUU).
             */
            Terminal.prototype.cursorUp = function(params) {
                var param = params[0];
                if (param < 1)
                    param = 1;
                this.y -= param;
                if (this.y < 0)
                    this.y = 0;
            };
            /**
             * CSI Ps B
             * Cursor Down Ps Times (default = 1) (CUD).
             */
            Terminal.prototype.cursorDown = function(params) {
                var param = params[0];
                if (param < 1)
                    param = 1;
                this.y += param;
                if (this.y >= this.rows) {
                    this.y = this.rows - 1;
                }
            };
            /**
             * CSI Ps C
             * Cursor Forward Ps Times (default = 1) (CUF).
             */
            Terminal.prototype.cursorForward = function(params) {
                var param = params[0];
                if (param < 1)
                    param = 1;
                this.x += param;
                if (this.x >= this.cols) {
                    this.x = this.cols - 1;
                }
            };
            /**
             * CSI Ps D
             * Cursor Backward Ps Times (default = 1) (CUB).
             */
            Terminal.prototype.cursorBackward = function(params) {
                var param = params[0];
                if (param < 1)
                    param = 1;
                this.x -= param;
                if (this.x < 0)
                    this.x = 0;
            };
            /**
             * CSI Ps ; Ps H
             * Cursor Position [row;column] (default = [1,1]) (CUP).
             */
            Terminal.prototype.cursorPos = function(params) {
                var row, col;
                row = params[0] - 1;
                if (params.length >= 2) {
                    col = params[1] - 1;
                } else {
                    col = 0;
                }
                if (row < 0) {
                    row = 0;
                } else if (row >= this.rows) {
                    row = this.rows - 1;
                }
                if (col < 0) {
                    col = 0;
                } else if (col >= this.cols) {
                    col = this.cols - 1;
                }
                this.x = col;
                this.y = row;
            };
            /**
             * CSI Ps J  Erase in Display (ED).
             *     Ps = 0  -> Erase Below (default).
             *     Ps = 1  -> Erase Above.
             *     Ps = 2  -> Erase All.
             *     Ps = 3  -> Erase Saved Lines (xterm).
             * CSI ? Ps J
             *   Erase in Display (DECSED).
             *     Ps = 0  -> Selective Erase Below (default).
             *     Ps = 1  -> Selective Erase Above.
             *     Ps = 2  -> Selective Erase All.
             */
            Terminal.prototype.eraseInDisplay = function(params) {
                var j;
                switch (params[0]) {
                    case 0:
                        this.eraseRight(this.x, this.y);
                        j = this.y + 1;
                        for (; j < this.rows; j++) {
                            this.eraseLine(j);
                        }
                        break;
                    case 1:
                        this.eraseLeft(this.x, this.y);
                        j = this.y;
                        while (j--) {
                            this.eraseLine(j);
                        }
                        break;
                    case 2:
                        j = this.rows;
                        while (j--)
                            this.eraseLine(j);
                        break;
                    case 3:
                        ; // no saved lines
                        break;
                }
            };
            /**
             * CSI Ps K  Erase in Line (EL).
             *     Ps = 0  -> Erase to Right (default).
             *     Ps = 1  -> Erase to Left.
             *     Ps = 2  -> Erase All.
             * CSI ? Ps K
             *   Erase in Line (DECSEL).
             *     Ps = 0  -> Selective Erase to Right (default).
             *     Ps = 1  -> Selective Erase to Left.
             *     Ps = 2  -> Selective Erase All.
             */
            Terminal.prototype.eraseInLine = function(params) {
                switch (params[0]) {
                    case 0:
                        this.eraseRight(this.x, this.y);
                        break;
                    case 1:
                        this.eraseLeft(this.x, this.y);
                        break;
                    case 2:
                        this.eraseLine(this.y);
                        break;
                }
            };
            /**
             * CSI Pm m  Character Attributes (SGR).
             *     Ps = 0  -> Normal (default).
             *     Ps = 1  -> Bold.
             *     Ps = 4  -> Underlined.
             *     Ps = 5  -> Blink (appears as Bold).
             *     Ps = 7  -> Inverse.
             *     Ps = 8  -> Invisible, i.e., hidden (VT300).
             *     Ps = 2 2  -> Normal (neither bold nor faint).
             *     Ps = 2 4  -> Not underlined.
             *     Ps = 2 5  -> Steady (not blinking).
             *     Ps = 2 7  -> Positive (not inverse).
             *     Ps = 2 8  -> Visible, i.e., not hidden (VT300).
             *     Ps = 3 0  -> Set foreground color to Black.
             *     Ps = 3 1  -> Set foreground color to Red.
             *     Ps = 3 2  -> Set foreground color to Green.
             *     Ps = 3 3  -> Set foreground color to Yellow.
             *     Ps = 3 4  -> Set foreground color to Blue.
             *     Ps = 3 5  -> Set foreground color to Magenta.
             *     Ps = 3 6  -> Set foreground color to Cyan.
             *     Ps = 3 7  -> Set foreground color to White.
             *     Ps = 3 9  -> Set foreground color to default (original).
             *     Ps = 4 0  -> Set background color to Black.
             *     Ps = 4 1  -> Set background color to Red.
             *     Ps = 4 2  -> Set background color to Green.
             *     Ps = 4 3  -> Set background color to Yellow.
             *     Ps = 4 4  -> Set background color to Blue.
             *     Ps = 4 5  -> Set background color to Magenta.
             *     Ps = 4 6  -> Set background color to Cyan.
             *     Ps = 4 7  -> Set background color to White.
             *     Ps = 4 9  -> Set background color to default (original).
             *
             *   If 16-color support is compiled, the following apply.  Assume
             *   that xterm's resources are set so that the ISO color codes are
             *   the first 8 of a set of 16.  Then the aixterm colors are the
             *   bright versions of the ISO colors:
             *     Ps = 9 0  -> Set foreground color to Black.
             *     Ps = 9 1  -> Set foreground color to Red.
             *     Ps = 9 2  -> Set foreground color to Green.
             *     Ps = 9 3  -> Set foreground color to Yellow.
             *     Ps = 9 4  -> Set foreground color to Blue.
             *     Ps = 9 5  -> Set foreground color to Magenta.
             *     Ps = 9 6  -> Set foreground color to Cyan.
             *     Ps = 9 7  -> Set foreground color to White.
             *     Ps = 1 0 0  -> Set background color to Black.
             *     Ps = 1 0 1  -> Set background color to Red.
             *     Ps = 1 0 2  -> Set background color to Green.
             *     Ps = 1 0 3  -> Set background color to Yellow.
             *     Ps = 1 0 4  -> Set background color to Blue.
             *     Ps = 1 0 5  -> Set background color to Magenta.
             *     Ps = 1 0 6  -> Set background color to Cyan.
             *     Ps = 1 0 7  -> Set background color to White.
             *
             *   If xterm is compiled with the 16-color support disabled, it
             *   supports the following, from rxvt:
             *     Ps = 1 0 0  -> Set foreground and background color to
             *     default.
             *
             *   If 88- or 256-color support is compiled, the following apply.
             *     Ps = 3 8  ; 5  ; Ps -> Set foreground color to the second
             *     Ps.
             *     Ps = 4 8  ; 5  ; Ps -> Set background color to the second
             *     Ps.
             */
            Terminal.prototype.charAttributes = function(params) {
                // Optimize a single SGR0.
                if (params.length === 1 && params[0] === 0) {
                    this.curAttr = this.defAttr;
                    return;
                }
                var l = params.length,
                    i = 0,
                    flags = this.curAttr >> 18,
                    fg = (this.curAttr >> 9) & 0x1ff,
                    bg = this.curAttr & 0x1ff,
                    p;
                for (; i < l; i++) {
                    p = params[i];
                    if (p >= 30 && p <= 37) {
                        // fg color 8
                        fg = p - 30;
                    } else if (p >= 40 && p <= 47) {
                        // bg color 8
                        bg = p - 40;
                    } else if (p >= 90 && p <= 97) {
                        // fg color 16
                        p += 8;
                        fg = p - 90;
                    } else if (p >= 100 && p <= 107) {
                        // bg color 16
                        p += 8;
                        bg = p - 100;
                    } else if (p === 0) {
                        // default
                        flags = this.defAttr >> 18;
                        fg = (this.defAttr >> 9) & 0x1ff;
                        bg = this.defAttr & 0x1ff;
                    } else if (p === 1) {
                        // bold text
                        flags |= 1;
                    } else if (p === 4) {
                        // underlined text
                        flags |= 2;
                    } else if (p === 5) {
                        // blink
                        flags |= 4;
                    } else if (p === 7) {
                        // inverse and positive
                        // test with: echo -e '\e[31m\e[42mhello\e[7mworld\e[27mhi\e[m'
                        flags |= 8;
                    } else if (p === 8) {
                        // invisible
                        flags |= 16;
                    } else if (p === 22) {
                        // not bold
                        flags &= ~1;
                    } else if (p === 24) {
                        // not underlined
                        flags &= ~2;
                    } else if (p === 25) {
                        // not blink
                        flags &= ~4;
                    } else if (p === 27) {
                        // not inverse
                        flags &= ~8;
                    } else if (p === 28) {
                        // not invisible
                        flags &= ~16;
                    } else if (p === 39) {
                        // reset fg
                        fg = (this.defAttr >> 9) & 0x1ff;
                    } else if (p === 49) {
                        // reset bg
                        bg = this.defAttr & 0x1ff;
                    } else if (p === 38) {
                        // fg color 256
                        if (params[i + 1] === 2) {
                            i += 2;
                            fg = matchColor(params[i] & 0xff, params[i + 1] & 0xff, params[i + 2] & 0xff);
                            if (fg === -1)
                                fg = 0x1ff;
                            i += 2;
                        } else if (params[i + 1] === 5) {
                            i += 2;
                            p = params[i] & 0xff;
                            fg = p;
                        }
                    } else if (p === 48) {
                        // bg color 256
                        if (params[i + 1] === 2) {
                            i += 2;
                            bg = matchColor(params[i] & 0xff, params[i + 1] & 0xff, params[i + 2] & 0xff);
                            if (bg === -1)
                                bg = 0x1ff;
                            i += 2;
                        } else if (params[i + 1] === 5) {
                            i += 2;
                            p = params[i] & 0xff;
                            bg = p;
                        }
                    } else if (p === 100) {
                        // reset fg/bg
                        fg = (this.defAttr >> 9) & 0x1ff;
                        bg = this.defAttr & 0x1ff;
                    } else {
                        this.error('Unknown SGR attribute: %d.', p);
                    }
                }
                this.curAttr = (flags << 18) | (fg << 9) | bg;
            };
            /**
             * CSI Ps n  Device Status Report (DSR).
             *     Ps = 5  -> Status Report.  Result (``OK'') is
             *   CSI 0 n
             *     Ps = 6  -> Report Cursor Position (CPR) [row;column].
             *   Result is
             *   CSI r ; c R
             * CSI ? Ps n
             *   Device Status Report (DSR, DEC-specific).
             *     Ps = 6  -> Report Cursor Position (CPR) [row;column] as CSI
             *     ? r ; c R (assumes page is zero).
             *     Ps = 1 5  -> Report Printer status as CSI ? 1 0  n  (ready).
             *     or CSI ? 1 1  n  (not ready).
             *     Ps = 2 5  -> Report UDK status as CSI ? 2 0  n  (unlocked)
             *     or CSI ? 2 1  n  (locked).
             *     Ps = 2 6  -> Report Keyboard status as
             *   CSI ? 2 7  ;  1  ;  0  ;  0  n  (North American).
             *   The last two parameters apply to VT400 & up, and denote key-
             *   board ready and LK01 respectively.
             *     Ps = 5 3  -> Report Locator status as
             *   CSI ? 5 3  n  Locator available, if compiled-in, or
             *   CSI ? 5 0  n  No Locator, if not.
             */
            Terminal.prototype.deviceStatus = function(params) {
                if (!this.prefix) {
                    switch (params[0]) {
                        case 5:
                            // status report
                            this.send('\x1b[0n');
                            break;
                        case 6:
                            // cursor position
                            this.send('\x1b[' +
                                (this.y + 1) +
                                ';' +
                                (this.x + 1) +
                                'R');
                            break;
                    }
                } else if (this.prefix === '?') {
                    // modern xterm doesnt seem to
                    // respond to any of these except ?6, 6, and 5
                    switch (params[0]) {
                        case 6:
                            // cursor position
                            this.send('\x1b[?' +
                                (this.y + 1) +
                                ';' +
                                (this.x + 1) +
                                'R');
                            break;
                        case 15:
                            // no printer
                            // this.send('\x1b[?11n');
                            break;
                        case 25:
                            // dont support user defined keys
                            // this.send('\x1b[?21n');
                            break;
                        case 26:
                            // north american keyboard
                            // this.send('\x1b[?27;1;0;0n');
                            break;
                        case 53:
                            // no dec locator/mouse
                            // this.send('\x1b[?50n');
                            break;
                    }
                }
            };
            /**
             * Additions
             */
            /**
             * CSI Ps @
             * Insert Ps (Blank) Character(s) (default = 1) (ICH).
             */
            Terminal.prototype.insertChars = function(params) {
                var param, row, j, ch;
                param = params[0];
                if (param < 1)
                    param = 1;
                row = this.y + this.ybase;
                j = this.x;
                ch = [this.eraseAttr(), ' ', 1]; // xterm
                while (param-- && j < this.cols) {
                    this.lines[row].splice(j++, 0, ch);
                    this.lines[row].pop();
                }
            };
            /**
             * CSI Ps E
             * Cursor Next Line Ps Times (default = 1) (CNL).
             * same as CSI Ps B ?
             */
            Terminal.prototype.cursorNextLine = function(params) {
                var param = params[0];
                if (param < 1)
                    param = 1;
                this.y += param;
                if (this.y >= this.rows) {
                    this.y = this.rows - 1;
                }
                this.x = 0;
            };
            /**
             * CSI Ps F
             * Cursor Preceding Line Ps Times (default = 1) (CNL).
             * reuse CSI Ps A ?
             */
            Terminal.prototype.cursorPrecedingLine = function(params) {
                var param = params[0];
                if (param < 1)
                    param = 1;
                this.y -= param;
                if (this.y < 0)
                    this.y = 0;
                this.x = 0;
            };
            /**
             * CSI Ps G
             * Cursor Character Absolute  [column] (default = [row,1]) (CHA).
             */
            Terminal.prototype.cursorCharAbsolute = function(params) {
                var param = params[0];
                if (param < 1)
                    param = 1;
                this.x = param - 1;
            };
            /**
             * CSI Ps L
             * Insert Ps Line(s) (default = 1) (IL).
             */
            Terminal.prototype.insertLines = function(params) {
                var param, row, j;
                param = params[0];
                if (param < 1)
                    param = 1;
                row = this.y + this.ybase;
                j = this.rows - 1 - this.scrollBottom;
                j = this.rows - 1 + this.ybase - j + 1;
                while (param--) {
                    // test: echo -e '\e[44m\e[1L\e[0m'
                    // blankLine(true) - xterm/linux behavior
                    this.lines.splice(row, 0, this.blankLine(true));
                    this.lines.splice(j, 1);
                }
                // this.maxRange();
                this.updateRange(this.y);
                this.updateRange(this.scrollBottom);
            };
            /**
             * CSI Ps M
             * Delete Ps Line(s) (default = 1) (DL).
             */
            Terminal.prototype.deleteLines = function(params) {
                var param, row, j;
                param = params[0];
                if (param < 1)
                    param = 1;
                row = this.y + this.ybase;
                j = this.rows - 1 - this.scrollBottom;
                j = this.rows - 1 + this.ybase - j;
                while (param--) {
                    // test: echo -e '\e[44m\e[1M\e[0m'
                    // blankLine(true) - xterm/linux behavior
                    this.lines.splice(j + 1, 0, this.blankLine(true));
                    this.lines.splice(row, 1);
                }
                // this.maxRange();
                this.updateRange(this.y);
                this.updateRange(this.scrollBottom);
            };
            /**
             * CSI Ps P
             * Delete Ps Character(s) (default = 1) (DCH).
             */
            Terminal.prototype.deleteChars = function(params) {
                var param, row, ch;
                param = params[0];
                if (param < 1)
                    param = 1;
                row = this.y + this.ybase;
                ch = [this.eraseAttr(), ' ', 1]; // xterm
                while (param--) {
                    this.lines[row].splice(this.x, 1);
                    this.lines[row].push(ch);
                }
            };
            /**
             * CSI Ps X
             * Erase Ps Character(s) (default = 1) (ECH).
             */
            Terminal.prototype.eraseChars = function(params) {
                var param, row, j, ch;
                param = params[0];
                if (param < 1)
                    param = 1;
                row = this.y + this.ybase;
                j = this.x;
                ch = [this.eraseAttr(), ' ', 1]; // xterm
                while (param-- && j < this.cols) {
                    this.lines[row][j++] = ch;
                }
            };
            /**
             * CSI Pm `  Character Position Absolute
             *   [column] (default = [row,1]) (HPA).
             */
            Terminal.prototype.charPosAbsolute = function(params) {
                var param = params[0];
                if (param < 1)
                    param = 1;
                this.x = param - 1;
                if (this.x >= this.cols) {
                    this.x = this.cols - 1;
                }
            };
            /**
             * 141 61 a * HPR -
             * Horizontal Position Relative
             * reuse CSI Ps C ?
             */
            Terminal.prototype.HPositionRelative = function(params) {
                var param = params[0];
                if (param < 1)
                    param = 1;
                this.x += param;
                if (this.x >= this.cols) {
                    this.x = this.cols - 1;
                }
            };
            /**
             * CSI Ps c  Send Device Attributes (Primary DA).
             *     Ps = 0  or omitted -> request attributes from terminal.  The
             *     response depends on the decTerminalID resource setting.
             *     -> CSI ? 1 ; 2 c  (``VT100 with Advanced Video Option'')
             *     -> CSI ? 1 ; 0 c  (``VT101 with No Options'')
             *     -> CSI ? 6 c  (``VT102'')
             *     -> CSI ? 6 0 ; 1 ; 2 ; 6 ; 8 ; 9 ; 1 5 ; c  (``VT220'')
             *   The VT100-style response parameters do not mean anything by
             *   themselves.  VT220 parameters do, telling the host what fea-
             *   tures the terminal supports:
             *     Ps = 1  -> 132-columns.
             *     Ps = 2  -> Printer.
             *     Ps = 6  -> Selective erase.
             *     Ps = 8  -> User-defined keys.
             *     Ps = 9  -> National replacement character sets.
             *     Ps = 1 5  -> Technical characters.
             *     Ps = 2 2  -> ANSI color, e.g., VT525.
             *     Ps = 2 9  -> ANSI text locator (i.e., DEC Locator mode).
             * CSI > Ps c
             *   Send Device Attributes (Secondary DA).
             *     Ps = 0  or omitted -> request the terminal's identification
             *     code.  The response depends on the decTerminalID resource set-
             *     ting.  It should apply only to VT220 and up, but xterm extends
             *     this to VT100.
             *     -> CSI  > Pp ; Pv ; Pc c
             *   where Pp denotes the terminal type
             *     Pp = 0  -> ``VT100''.
             *     Pp = 1  -> ``VT220''.
             *   and Pv is the firmware version (for xterm, this was originally
             *   the XFree86 patch number, starting with 95).  In a DEC termi-
             *   nal, Pc indicates the ROM cartridge registration number and is
             *   always zero.
             * More information:
             *   xterm/charproc.c - line 2012, for more information.
             *   vim responds with ^[[?0c or ^[[?1c after the terminal's response (?)
             */
            Terminal.prototype.sendDeviceAttributes = function(params) {
                if (params[0] > 0)
                    return;
                if (!this.prefix) {
                    if (this.is('xterm') ||
                        this.is('rxvt-unicode') ||
                        this.is('screen')) {
                        this.send('\x1b[?1;2c');
                    } else if (this.is('linux')) {
                        this.send('\x1b[?6c');
                    }
                } else if (this.prefix === '>') {
                    // xterm and urxvt
                    // seem to spit this
                    // out around ~370 times (?).
                    if (this.is('xterm')) {
                        this.send('\x1b[>0;276;0c');
                    } else if (this.is('rxvt-unicode')) {
                        this.send('\x1b[>85;95;0c');
                    } else if (this.is('linux')) {
                        // not supported by linux console.
                        // linux console echoes parameters.
                        this.send(params[0] + 'c');
                    } else if (this.is('screen')) {
                        this.send('\x1b[>83;40003;0c');
                    }
                }
            };
            /**
             * CSI Pm d
             * Line Position Absolute  [row] (default = [1,column]) (VPA).
             */
            Terminal.prototype.linePosAbsolute = function(params) {
                var param = params[0];
                if (param < 1)
                    param = 1;
                this.y = param - 1;
                if (this.y >= this.rows) {
                    this.y = this.rows - 1;
                }
            };
            /**
             * 145 65 e * VPR - Vertical Position Relative
             * reuse CSI Ps B ?
             */
            Terminal.prototype.VPositionRelative = function(params) {
                var param = params[0];
                if (param < 1)
                    param = 1;
                this.y += param;
                if (this.y >= this.rows) {
                    this.y = this.rows - 1;
                }
            };
            /**
             * CSI Ps ; Ps f
             *   Horizontal and Vertical Position [row;column] (default =
             *   [1,1]) (HVP).
             */
            Terminal.prototype.HVPosition = function(params) {
                if (params[0] < 1)
                    params[0] = 1;
                if (params[1] < 1)
                    params[1] = 1;
                this.y = params[0] - 1;
                if (this.y >= this.rows) {
                    this.y = this.rows - 1;
                }
                this.x = params[1] - 1;
                if (this.x >= this.cols) {
                    this.x = this.cols - 1;
                }
            };
            /**
             * CSI Pm h  Set Mode (SM).
             *     Ps = 2  -> Keyboard Action Mode (AM).
             *     Ps = 4  -> Insert Mode (IRM).
             *     Ps = 1 2  -> Send/receive (SRM).
             *     Ps = 2 0  -> Automatic Newline (LNM).
             * CSI ? Pm h
             *   DEC Private Mode Set (DECSET).
             *     Ps = 1  -> Application Cursor Keys (DECCKM).
             *     Ps = 2  -> Designate USASCII for character sets G0-G3
             *     (DECANM), and set VT100 mode.
             *     Ps = 3  -> 132 Column Mode (DECCOLM).
             *     Ps = 4  -> Smooth (Slow) Scroll (DECSCLM).
             *     Ps = 5  -> Reverse Video (DECSCNM).
             *     Ps = 6  -> Origin Mode (DECOM).
             *     Ps = 7  -> Wraparound Mode (DECAWM).
             *     Ps = 8  -> Auto-repeat Keys (DECARM).
             *     Ps = 9  -> Send Mouse X & Y on button press.  See the sec-
             *     tion Mouse Tracking.
             *     Ps = 1 0  -> Show toolbar (rxvt).
             *     Ps = 1 2  -> Start Blinking Cursor (att610).
             *     Ps = 1 8  -> Print form feed (DECPFF).
             *     Ps = 1 9  -> Set print extent to full screen (DECPEX).
             *     Ps = 2 5  -> Show Cursor (DECTCEM).
             *     Ps = 3 0  -> Show scrollbar (rxvt).
             *     Ps = 3 5  -> Enable font-shifting functions (rxvt).
             *     Ps = 3 8  -> Enter Tektronix Mode (DECTEK).
             *     Ps = 4 0  -> Allow 80 -> 132 Mode.
             *     Ps = 4 1  -> more(1) fix (see curses resource).
             *     Ps = 4 2  -> Enable Nation Replacement Character sets (DECN-
             *     RCM).
             *     Ps = 4 4  -> Turn On Margin Bell.
             *     Ps = 4 5  -> Reverse-wraparound Mode.
             *     Ps = 4 6  -> Start Logging.  This is normally disabled by a
             *     compile-time option.
             *     Ps = 4 7  -> Use Alternate Screen Buffer.  (This may be dis-
             *     abled by the titeInhibit resource).
             *     Ps = 6 6  -> Application keypad (DECNKM).
             *     Ps = 6 7  -> Backarrow key sends backspace (DECBKM).
             *     Ps = 1 0 0 0  -> Send Mouse X & Y on button press and
             *     release.  See the section Mouse Tracking.
             *     Ps = 1 0 0 1  -> Use Hilite Mouse Tracking.
             *     Ps = 1 0 0 2  -> Use Cell Motion Mouse Tracking.
             *     Ps = 1 0 0 3  -> Use All Motion Mouse Tracking.
             *     Ps = 1 0 0 4  -> Send FocusIn/FocusOut events.
             *     Ps = 1 0 0 5  -> Enable Extended Mouse Mode.
             *     Ps = 1 0 1 0  -> Scroll to bottom on tty output (rxvt).
             *     Ps = 1 0 1 1  -> Scroll to bottom on key press (rxvt).
             *     Ps = 1 0 3 4  -> Interpret "meta" key, sets eighth bit.
             *     (enables the eightBitInput resource).
             *     Ps = 1 0 3 5  -> Enable special modifiers for Alt and Num-
             *     Lock keys.  (This enables the numLock resource).
             *     Ps = 1 0 3 6  -> Send ESC   when Meta modifies a key.  (This
             *     enables the metaSendsEscape resource).
             *     Ps = 1 0 3 7  -> Send DEL from the editing-keypad Delete
             *     key.
             *     Ps = 1 0 3 9  -> Send ESC  when Alt modifies a key.  (This
             *     enables the altSendsEscape resource).
             *     Ps = 1 0 4 0  -> Keep selection even if not highlighted.
             *     (This enables the keepSelection resource).
             *     Ps = 1 0 4 1  -> Use the CLIPBOARD selection.  (This enables
             *     the selectToClipboard resource).
             *     Ps = 1 0 4 2  -> Enable Urgency window manager hint when
             *     Control-G is received.  (This enables the bellIsUrgent
             *     resource).
             *     Ps = 1 0 4 3  -> Enable raising of the window when Control-G
             *     is received.  (enables the popOnBell resource).
             *     Ps = 1 0 4 7  -> Use Alternate Screen Buffer.  (This may be
             *     disabled by the titeInhibit resource).
             *     Ps = 1 0 4 8  -> Save cursor as in DECSC.  (This may be dis-
             *     abled by the titeInhibit resource).
             *     Ps = 1 0 4 9  -> Save cursor as in DECSC and use Alternate
             *     Screen Buffer, clearing it first.  (This may be disabled by
             *     the titeInhibit resource).  This combines the effects of the 1
             *     0 4 7  and 1 0 4 8  modes.  Use this with terminfo-based
             *     applications rather than the 4 7  mode.
             *     Ps = 1 0 5 0  -> Set terminfo/termcap function-key mode.
             *     Ps = 1 0 5 1  -> Set Sun function-key mode.
             *     Ps = 1 0 5 2  -> Set HP function-key mode.
             *     Ps = 1 0 5 3  -> Set SCO function-key mode.
             *     Ps = 1 0 6 0  -> Set legacy keyboard emulation (X11R6).
             *     Ps = 1 0 6 1  -> Set VT220 keyboard emulation.
             *     Ps = 2 0 0 4  -> Set bracketed paste mode.
             * Modes:
             *   http: *vt100.net/docs/vt220-rm/chapter4.html
             */
            Terminal.prototype.setMode = function(params) {
                if (typeof params === 'object') {
                    var l = params.length,
                        i = 0;
                    for (; i < l; i++) {
                        this.setMode(params[i]);
                    }
                    return;
                }
                if (!this.prefix) {
                    switch (params) {
                        case 4:
                            this.insertMode = true;
                            break;
                        case 20:
                            //this.convertEol = true;
                            break;
                    }
                } else if (this.prefix === '?') {
                    switch (params) {
                        case 1:
                            this.applicationCursor = true;
                            break;
                        case 2:
                            this.setgCharset(0, Terminal.charsets.US);
                            this.setgCharset(1, Terminal.charsets.US);
                            this.setgCharset(2, Terminal.charsets.US);
                            this.setgCharset(3, Terminal.charsets.US);
                            // set VT100 mode here
                            break;
                        case 3:
                            this.savedCols = this.cols;
                            this.resize(132, this.rows);
                            break;
                        case 6:
                            this.originMode = true;
                            break;
                        case 7:
                            this.wraparoundMode = true;
                            break;
                        case 12:
                            // this.cursorBlink = true;
                            break;
                        case 66:
                            this.log('Serial port requested application keypad.');
                            this.applicationKeypad = true;
                            this.viewport.syncScrollArea();
                            break;
                        case 9: // X10 Mouse
                        // no release, no motion, no wheel, no modifiers.
                        case 1000: // vt200 mouse
                        // no motion.
                        // no modifiers, except control on the wheel.
                        case 1002: // button event mouse
                        case 1003:
                            // any event - sends motion events,
                            // even if there is no button held down.
                            this.x10Mouse = params === 9;
                            this.vt200Mouse = params === 1000;
                            this.normalMouse = params > 1000;
                            this.mouseEvents = true;
                            this.element.style.cursor = 'default';
                            this.log('Binding to mouse events.');
                            break;
                        case 1004:
                            // focusin: ^[[I
                            // focusout: ^[[O
                            this.sendFocus = true;
                            break;
                        case 1005:
                            this.utfMouse = true;
                            // for wide terminals
                            // simply encodes large values as utf8 characters
                            break;
                        case 1006:
                            this.sgrMouse = true;
                            // for wide terminals
                            // does not add 32 to fields
                            // press: ^[[<b;x;yM
                            // release: ^[[<b;x;ym
                            break;
                        case 1015:
                            this.urxvtMouse = true;
                            // for wide terminals
                            // numbers for fields
                            // press: ^[[b;x;yM
                            // motion: ^[[b;x;yT
                            break;
                        case 25:
                            this.cursorHidden = false;
                            break;
                        case 1049:
                            //this.saveCursor();
                            ; // FALL-THROUGH
                        case 47: // alt screen buffer
                        case 1047:
                            if (!this.normal) {
                                var normal = {
                                    lines: this.lines,
                                    ybase: this.ybase,
                                    ydisp: this.ydisp,
                                    x: this.x,
                                    y: this.y,
                                    scrollTop: this.scrollTop,
                                    scrollBottom: this.scrollBottom,
                                    tabs: this.tabs
                                };
                                this.reset();
                                this.normal = normal;
                                this.showCursor();
                            }
                            break;
                    }
                }
            };
            /**
             * CSI Pm l  Reset Mode (RM).
             *     Ps = 2  -> Keyboard Action Mode (AM).
             *     Ps = 4  -> Replace Mode (IRM).
             *     Ps = 1 2  -> Send/receive (SRM).
             *     Ps = 2 0  -> Normal Linefeed (LNM).
             * CSI ? Pm l
             *   DEC Private Mode Reset (DECRST).
             *     Ps = 1  -> Normal Cursor Keys (DECCKM).
             *     Ps = 2  -> Designate VT52 mode (DECANM).
             *     Ps = 3  -> 80 Column Mode (DECCOLM).
             *     Ps = 4  -> Jump (Fast) Scroll (DECSCLM).
             *     Ps = 5  -> Normal Video (DECSCNM).
             *     Ps = 6  -> Normal Cursor Mode (DECOM).
             *     Ps = 7  -> No Wraparound Mode (DECAWM).
             *     Ps = 8  -> No Auto-repeat Keys (DECARM).
             *     Ps = 9  -> Don't send Mouse X & Y on button press.
             *     Ps = 1 0  -> Hide toolbar (rxvt).
             *     Ps = 1 2  -> Stop Blinking Cursor (att610).
             *     Ps = 1 8  -> Don't print form feed (DECPFF).
             *     Ps = 1 9  -> Limit print to scrolling region (DECPEX).
             *     Ps = 2 5  -> Hide Cursor (DECTCEM).
             *     Ps = 3 0  -> Don't show scrollbar (rxvt).
             *     Ps = 3 5  -> Disable font-shifting functions (rxvt).
             *     Ps = 4 0  -> Disallow 80 -> 132 Mode.
             *     Ps = 4 1  -> No more(1) fix (see curses resource).
             *     Ps = 4 2  -> Disable Nation Replacement Character sets (DEC-
             *     NRCM).
             *     Ps = 4 4  -> Turn Off Margin Bell.
             *     Ps = 4 5  -> No Reverse-wraparound Mode.
             *     Ps = 4 6  -> Stop Logging.  (This is normally disabled by a
             *     compile-time option).
             *     Ps = 4 7  -> Use Normal Screen Buffer.
             *     Ps = 6 6  -> Numeric keypad (DECNKM).
             *     Ps = 6 7  -> Backarrow key sends delete (DECBKM).
             *     Ps = 1 0 0 0  -> Don't send Mouse X & Y on button press and
             *     release.  See the section Mouse Tracking.
             *     Ps = 1 0 0 1  -> Don't use Hilite Mouse Tracking.
             *     Ps = 1 0 0 2  -> Don't use Cell Motion Mouse Tracking.
             *     Ps = 1 0 0 3  -> Don't use All Motion Mouse Tracking.
             *     Ps = 1 0 0 4  -> Don't send FocusIn/FocusOut events.
             *     Ps = 1 0 0 5  -> Disable Extended Mouse Mode.
             *     Ps = 1 0 1 0  -> Don't scroll to bottom on tty output
             *     (rxvt).
             *     Ps = 1 0 1 1  -> Don't scroll to bottom on key press (rxvt).
             *     Ps = 1 0 3 4  -> Don't interpret "meta" key.  (This disables
             *     the eightBitInput resource).
             *     Ps = 1 0 3 5  -> Disable special modifiers for Alt and Num-
             *     Lock keys.  (This disables the numLock resource).
             *     Ps = 1 0 3 6  -> Don't send ESC  when Meta modifies a key.
             *     (This disables the metaSendsEscape resource).
             *     Ps = 1 0 3 7  -> Send VT220 Remove from the editing-keypad
             *     Delete key.
             *     Ps = 1 0 3 9  -> Don't send ESC  when Alt modifies a key.
             *     (This disables the altSendsEscape resource).
             *     Ps = 1 0 4 0  -> Do not keep selection when not highlighted.
             *     (This disables the keepSelection resource).
             *     Ps = 1 0 4 1  -> Use the PRIMARY selection.  (This disables
             *     the selectToClipboard resource).
             *     Ps = 1 0 4 2  -> Disable Urgency window manager hint when
             *     Control-G is received.  (This disables the bellIsUrgent
             *     resource).
             *     Ps = 1 0 4 3  -> Disable raising of the window when Control-
             *     G is received.  (This disables the popOnBell resource).
             *     Ps = 1 0 4 7  -> Use Normal Screen Buffer, clearing screen
             *     first if in the Alternate Screen.  (This may be disabled by
             *     the titeInhibit resource).
             *     Ps = 1 0 4 8  -> Restore cursor as in DECRC.  (This may be
             *     disabled by the titeInhibit resource).
             *     Ps = 1 0 4 9  -> Use Normal Screen Buffer and restore cursor
             *     as in DECRC.  (This may be disabled by the titeInhibit
             *     resource).  This combines the effects of the 1 0 4 7  and 1 0
             *     4 8  modes.  Use this with terminfo-based applications rather
             *     than the 4 7  mode.
             *     Ps = 1 0 5 0  -> Reset terminfo/termcap function-key mode.
             *     Ps = 1 0 5 1  -> Reset Sun function-key mode.
             *     Ps = 1 0 5 2  -> Reset HP function-key mode.
             *     Ps = 1 0 5 3  -> Reset SCO function-key mode.
             *     Ps = 1 0 6 0  -> Reset legacy keyboard emulation (X11R6).
             *     Ps = 1 0 6 1  -> Reset keyboard emulation to Sun/PC style.
             *     Ps = 2 0 0 4  -> Reset bracketed paste mode.
             */
            Terminal.prototype.resetMode = function(params) {
                if (typeof params === 'object') {
                    var l = params.length,
                        i = 0;
                    for (; i < l; i++) {
                        this.resetMode(params[i]);
                    }
                    return;
                }
                if (!this.prefix) {
                    switch (params) {
                        case 4:
                            this.insertMode = false;
                            break;
                        case 20:
                            //this.convertEol = false;
                            break;
                    }
                } else if (this.prefix === '?') {
                    switch (params) {
                        case 1:
                            this.applicationCursor = false;
                            break;
                        case 3:
                            if (this.cols === 132 && this.savedCols) {
                                this.resize(this.savedCols, this.rows);
                            }
                            delete this.savedCols;
                            break;
                        case 6:
                            this.originMode = false;
                            break;
                        case 7:
                            this.wraparoundMode = false;
                            break;
                        case 12:
                            // this.cursorBlink = false;
                            break;
                        case 66:
                            this.log('Switching back to normal keypad.');
                            this.applicationKeypad = false;
                            this.viewport.syncScrollArea();
                            break;
                        case 9: // X10 Mouse
                        case 1000: // vt200 mouse
                        case 1002: // button event mouse
                        case 1003:
                            this.x10Mouse = false;
                            this.vt200Mouse = false;
                            this.normalMouse = false;
                            this.mouseEvents = false;
                            this.element.style.cursor = '';
                            break;
                        case 1004:
                            this.sendFocus = false;
                            break;
                        case 1005:
                            this.utfMouse = false;
                            break;
                        case 1006:
                            this.sgrMouse = false;
                            break;
                        case 1015:
                            this.urxvtMouse = false;
                            break;
                        case 25:
                            this.cursorHidden = true;
                            break;
                        case 1049:
                            ; // FALL-THROUGH
                        case 47: // normal screen buffer
                        case 1047:
                            if (this.normal) {
                                this.lines = this.normal.lines;
                                this.ybase = this.normal.ybase;
                                this.ydisp = this.normal.ydisp;
                                this.x = this.normal.x;
                                this.y = this.normal.y;
                                this.scrollTop = this.normal.scrollTop;
                                this.scrollBottom = this.normal.scrollBottom;
                                this.tabs = this.normal.tabs;
                                this.normal = null;
                                // if (params === 1049) {
                                //   this.x = this.savedX;
                                //   this.y = this.savedY;
                                // }
                                this.refresh(0, this.rows - 1);
                                this.showCursor();
                            }
                            break;
                    }
                }
            };
            /**
             * CSI Ps ; Ps r
             *   Set Scrolling Region [top;bottom] (default = full size of win-
             *   dow) (DECSTBM).
             * CSI ? Pm r
             */
            Terminal.prototype.setScrollRegion = function(params) {
                if (this.prefix)
                    return;
                this.scrollTop = (params[0] || 1) - 1;
                this.scrollBottom = (params[1] || this.rows) - 1;
                this.x = 0;
                this.y = 0;
            };
            /**
             * CSI s
             *   Save cursor (ANSI.SYS).
             */
            Terminal.prototype.saveCursor = function(params) {
                this.savedX = this.x;
                this.savedY = this.y;
            };
            /**
             * CSI u
             *   Restore cursor (ANSI.SYS).
             */
            Terminal.prototype.restoreCursor = function(params) {
                this.x = this.savedX || 0;
                this.y = this.savedY || 0;
            };
            /**
             * Lesser Used
             */
            /**
             * CSI Ps I
             *   Cursor Forward Tabulation Ps tab stops (default = 1) (CHT).
             */
            Terminal.prototype.cursorForwardTab = function(params) {
                var param = params[0] || 1;
                while (param--) {
                    this.x = this.nextStop();
                }
            };
            /**
             * CSI Ps S  Scroll up Ps lines (default = 1) (SU).
             */
            Terminal.prototype.scrollUp = function(params) {
                var param = params[0] || 1;
                while (param--) {
                    this.lines.splice(this.ybase + this.scrollTop, 1);
                    this.lines.splice(this.ybase + this.scrollBottom, 0, this.blankLine());
                }
                // this.maxRange();
                this.updateRange(this.scrollTop);
                this.updateRange(this.scrollBottom);
            };
            /**
             * CSI Ps T  Scroll down Ps lines (default = 1) (SD).
             */
            Terminal.prototype.scrollDown = function(params) {
                var param = params[0] || 1;
                while (param--) {
                    this.lines.splice(this.ybase + this.scrollBottom, 1);
                    this.lines.splice(this.ybase + this.scrollTop, 0, this.blankLine());
                }
                // this.maxRange();
                this.updateRange(this.scrollTop);
                this.updateRange(this.scrollBottom);
            };
            /**
             * CSI Ps ; Ps ; Ps ; Ps ; Ps T
             *   Initiate highlight mouse tracking.  Parameters are
             *   [func;startx;starty;firstrow;lastrow].  See the section Mouse
             *   Tracking.
             */
            Terminal.prototype.initMouseTracking = function(params) {
                // Relevant: DECSET 1001
            };
            /**
             * CSI > Ps; Ps T
             *   Reset one or more features of the title modes to the default
             *   value.  Normally, "reset" disables the feature.  It is possi-
             *   ble to disable the ability to reset features by compiling a
             *   different default for the title modes into xterm.
             *     Ps = 0  -> Do not set window/icon labels using hexadecimal.
             *     Ps = 1  -> Do not query window/icon labels using hexadeci-
             *     mal.
             *     Ps = 2  -> Do not set window/icon labels using UTF-8.
             *     Ps = 3  -> Do not query window/icon labels using UTF-8.
             *   (See discussion of "Title Modes").
             */
            Terminal.prototype.resetTitleModes = function(params) {;
            };
            /**
             * CSI Ps Z  Cursor Backward Tabulation Ps tab stops (default = 1) (CBT).
             */
            Terminal.prototype.cursorBackwardTab = function(params) {
                var param = params[0] || 1;
                while (param--) {
                    this.x = this.prevStop();
                }
            };
            /**
             * CSI Ps b  Repeat the preceding graphic character Ps times (REP).
             */
            Terminal.prototype.repeatPrecedingCharacter = function(params) {
                var param = params[0] || 1,
                    line = this.lines[this.ybase + this.y],
                    ch = line[this.x - 1] || [this.defAttr, ' ', 1];
                while (param--)
                    line[this.x++] = ch;
            };
            /**
             * CSI Ps g  Tab Clear (TBC).
             *     Ps = 0  -> Clear Current Column (default).
             *     Ps = 3  -> Clear All.
             * Potentially:
             *   Ps = 2  -> Clear Stops on Line.
             *   http://vt100.net/annarbor/aaa-ug/section6.html
             */
            Terminal.prototype.tabClear = function(params) {
                var param = params[0];
                if (param <= 0) {
                    delete this.tabs[this.x];
                } else if (param === 3) {
                    this.tabs = {};
                }
            };
            /**
             * CSI Pm i  Media Copy (MC).
             *     Ps = 0  -> Print screen (default).
             *     Ps = 4  -> Turn off printer controller mode.
             *     Ps = 5  -> Turn on printer controller mode.
             * CSI ? Pm i
             *   Media Copy (MC, DEC-specific).
             *     Ps = 1  -> Print line containing cursor.
             *     Ps = 4  -> Turn off autoprint mode.
             *     Ps = 5  -> Turn on autoprint mode.
             *     Ps = 1  0  -> Print composed display, ignores DECPEX.
             *     Ps = 1  1  -> Print all pages.
             */
            Terminal.prototype.mediaCopy = function(params) {;
            };
            /**
             * CSI > Ps; Ps m
             *   Set or reset resource-values used by xterm to decide whether
             *   to construct escape sequences holding information about the
             *   modifiers pressed with a given key.  The first parameter iden-
             *   tifies the resource to set/reset.  The second parameter is the
             *   value to assign to the resource.  If the second parameter is
             *   omitted, the resource is reset to its initial value.
             *     Ps = 1  -> modifyCursorKeys.
             *     Ps = 2  -> modifyFunctionKeys.
             *     Ps = 4  -> modifyOtherKeys.
             *   If no parameters are given, all resources are reset to their
             *   initial values.
             */
            Terminal.prototype.setResources = function(params) {;
            };
            /**
             * CSI > Ps n
             *   Disable modifiers which may be enabled via the CSI > Ps; Ps m
             *   sequence.  This corresponds to a resource value of "-1", which
             *   cannot be set with the other sequence.  The parameter identi-
             *   fies the resource to be disabled:
             *     Ps = 1  -> modifyCursorKeys.
             *     Ps = 2  -> modifyFunctionKeys.
             *     Ps = 4  -> modifyOtherKeys.
             *   If the parameter is omitted, modifyFunctionKeys is disabled.
             *   When modifyFunctionKeys is disabled, xterm uses the modifier
             *   keys to make an extended sequence of functions rather than
             *   adding a parameter to each function key to denote the modi-
             *   fiers.
             */
            Terminal.prototype.disableModifiers = function(params) {;
            };
            /**
             * CSI > Ps p
             *   Set resource value pointerMode.  This is used by xterm to
             *   decide whether to hide the pointer cursor as the user types.
             *   Valid values for the parameter:
             *     Ps = 0  -> never hide the pointer.
             *     Ps = 1  -> hide if the mouse tracking mode is not enabled.
             *     Ps = 2  -> always hide the pointer.  If no parameter is
             *     given, xterm uses the default, which is 1 .
             */
            Terminal.prototype.setPointerMode = function(params) {;
            };
            /**
             * CSI ! p   Soft terminal reset (DECSTR).
             * http://vt100.net/docs/vt220-rm/table4-10.html
             */
            Terminal.prototype.softReset = function(params) {
                this.cursorHidden = false;
                this.insertMode = false;
                this.originMode = false;
                this.wraparoundMode = false; // autowrap
                this.applicationKeypad = false; // ?
                this.viewport.syncScrollArea();
                this.applicationCursor = false;
                this.scrollTop = 0;
                this.scrollBottom = this.rows - 1;
                this.curAttr = this.defAttr;
                this.x = this.y = 0; // ?
                this.charset = null;
                this.glevel = 0; // ??
                this.charsets = [null]; // ??
            };
            /**
             * CSI Ps$ p
             *   Request ANSI mode (DECRQM).  For VT300 and up, reply is
             *     CSI Ps; Pm$ y
             *   where Ps is the mode number as in RM, and Pm is the mode
             *   value:
             *     0 - not recognized
             *     1 - set
             *     2 - reset
             *     3 - permanently set
             *     4 - permanently reset
             */
            Terminal.prototype.requestAnsiMode = function(params) {;
            };
            /**
             * CSI ? Ps$ p
             *   Request DEC private mode (DECRQM).  For VT300 and up, reply is
             *     CSI ? Ps; Pm$ p
             *   where Ps is the mode number as in DECSET, Pm is the mode value
             *   as in the ANSI DECRQM.
             */
            Terminal.prototype.requestPrivateMode = function(params) {;
            };
            /**
             * CSI Ps ; Ps " p
             *   Set conformance level (DECSCL).  Valid values for the first
             *   parameter:
             *     Ps = 6 1  -> VT100.
             *     Ps = 6 2  -> VT200.
             *     Ps = 6 3  -> VT300.
             *   Valid values for the second parameter:
             *     Ps = 0  -> 8-bit controls.
             *     Ps = 1  -> 7-bit controls (always set for VT100).
             *     Ps = 2  -> 8-bit controls.
             */
            Terminal.prototype.setConformanceLevel = function(params) {;
            };
            /**
             * CSI Ps q  Load LEDs (DECLL).
             *     Ps = 0  -> Clear all LEDS (default).
             *     Ps = 1  -> Light Num Lock.
             *     Ps = 2  -> Light Caps Lock.
             *     Ps = 3  -> Light Scroll Lock.
             *     Ps = 2  1  -> Extinguish Num Lock.
             *     Ps = 2  2  -> Extinguish Caps Lock.
             *     Ps = 2  3  -> Extinguish Scroll Lock.
             */
            Terminal.prototype.loadLEDs = function(params) {;
            };
            /**
             * CSI Ps SP q
             *   Set cursor style (DECSCUSR, VT520).
             *     Ps = 0  -> blinking block.
             *     Ps = 1  -> blinking block (default).
             *     Ps = 2  -> steady block.
             *     Ps = 3  -> blinking underline.
             *     Ps = 4  -> steady underline.
             */
            Terminal.prototype.setCursorStyle = function(params) {;
            };
            /**
             * CSI Ps " q
             *   Select character protection attribute (DECSCA).  Valid values
             *   for the parameter:
             *     Ps = 0  -> DECSED and DECSEL can erase (default).
             *     Ps = 1  -> DECSED and DECSEL cannot erase.
             *     Ps = 2  -> DECSED and DECSEL can erase.
             */
            Terminal.prototype.setCharProtectionAttr = function(params) {;
            };
            /**
             * CSI ? Pm r
             *   Restore DEC Private Mode Values.  The value of Ps previously
             *   saved is restored.  Ps values are the same as for DECSET.
             */
            Terminal.prototype.restorePrivateValues = function(params) {;
            };
            /**
             * CSI Pt; Pl; Pb; Pr; Ps$ r
             *   Change Attributes in Rectangular Area (DECCARA), VT400 and up.
             *     Pt; Pl; Pb; Pr denotes the rectangle.
             *     Ps denotes the SGR attributes to change: 0, 1, 4, 5, 7.
             * NOTE: xterm doesn't enable this code by default.
             */
            Terminal.prototype.setAttrInRectangle = function(params) {
                var t = params[0],
                    l = params[1],
                    b = params[2],
                    r = params[3],
                    attr = params[4];
                var line, i;
                for (; t < b + 1; t++) {
                    line = this.lines[this.ybase + t];
                    for (i = l; i < r; i++) {
                        line[i] = [attr, line[i][1]];
                    }
                }
                // this.maxRange();
                this.updateRange(params[0]);
                this.updateRange(params[2]);
            };
            /**
             * CSI Pc; Pt; Pl; Pb; Pr$ x
             *   Fill Rectangular Area (DECFRA), VT420 and up.
             *     Pc is the character to use.
             *     Pt; Pl; Pb; Pr denotes the rectangle.
             * NOTE: xterm doesn't enable this code by default.
             */
            Terminal.prototype.fillRectangle = function(params) {
                var ch = params[0],
                    t = params[1],
                    l = params[2],
                    b = params[3],
                    r = params[4];
                var line, i;
                for (; t < b + 1; t++) {
                    line = this.lines[this.ybase + t];
                    for (i = l; i < r; i++) {
                        line[i] = [line[i][0], String.fromCharCode(ch)];
                    }
                }
                // this.maxRange();
                this.updateRange(params[1]);
                this.updateRange(params[3]);
            };
            /**
             * CSI Ps ; Pu ' z
             *   Enable Locator Reporting (DECELR).
             *   Valid values for the first parameter:
             *     Ps = 0  -> Locator disabled (default).
             *     Ps = 1  -> Locator enabled.
             *     Ps = 2  -> Locator enabled for one report, then disabled.
             *   The second parameter specifies the coordinate unit for locator
             *   reports.
             *   Valid values for the second parameter:
             *     Pu = 0  <- or omitted -> default to character cells.
             *     Pu = 1  <- device physical pixels.
             *     Pu = 2  <- character cells.
             */
            Terminal.prototype.enableLocatorReporting = function(params) {
                var val = params[0] > 0;
                //this.mouseEvents = val;
                //this.decLocator = val;
            };
            /**
             * CSI Pt; Pl; Pb; Pr$ z
             *   Erase Rectangular Area (DECERA), VT400 and up.
             *     Pt; Pl; Pb; Pr denotes the rectangle.
             * NOTE: xterm doesn't enable this code by default.
             */
            Terminal.prototype.eraseRectangle = function(params) {
                var t = params[0],
                    l = params[1],
                    b = params[2],
                    r = params[3];
                var line, i, ch;
                ch = [this.eraseAttr(), ' ', 1]; // xterm?
                for (; t < b + 1; t++) {
                    line = this.lines[this.ybase + t];
                    for (i = l; i < r; i++) {
                        line[i] = ch;
                    }
                }
                // this.maxRange();
                this.updateRange(params[0]);
                this.updateRange(params[2]);
            };
            /**
             * CSI P m SP }
             * Insert P s Column(s) (default = 1) (DECIC), VT420 and up.
             * NOTE: xterm doesn't enable this code by default.
             */
            Terminal.prototype.insertColumns = function() {
                var param = params[0],
                    l = this.ybase + this.rows,
                    ch = [this.eraseAttr(), ' ', 1] // xterm?
                    ,
                    i;
                while (param--) {
                    for (i = this.ybase; i < l; i++) {
                        this.lines[i].splice(this.x + 1, 0, ch);
                        this.lines[i].pop();
                    }
                }
                this.maxRange();
            };
            /**
             * CSI P m SP ~
             * Delete P s Column(s) (default = 1) (DECDC), VT420 and up
             * NOTE: xterm doesn't enable this code by default.
             */
            Terminal.prototype.deleteColumns = function() {
                var param = params[0],
                    l = this.ybase + this.rows,
                    ch = [this.eraseAttr(), ' ', 1] // xterm?
                    ,
                    i;
                while (param--) {
                    for (i = this.ybase; i < l; i++) {
                        this.lines[i].splice(this.x, 1);
                        this.lines[i].push(ch);
                    }
                }
                this.maxRange();
            };
            /**
             * Character Sets
             */
            Terminal.charsets = {};
            // DEC Special Character and Line Drawing Set.
            // http://vt100.net/docs/vt102-ug/table5-13.html
            // A lot of curses apps use this if they see TERM=xterm.
            // testing: echo -e '\e(0a\e(B'
            // The xterm output sometimes seems to conflict with the
            // reference above. xterm seems in line with the reference
            // when running vttest however.
            // The table below now uses xterm's output from vttest.
            Terminal.charsets.SCLD = {
                '`': '\u25c6',
                'a': '\u2592',
                'b': '\u0009',
                'c': '\u000c',
                'd': '\u000d',
                'e': '\u000a',
                'f': '\u00b0',
                'g': '\u00b1',
                'h': '\u2424',
                'i': '\u000b',
                'j': '\u2518',
                'k': '\u2510',
                'l': '\u250c',
                'm': '\u2514',
                'n': '\u253c',
                'o': '\u23ba',
                'p': '\u23bb',
                'q': '\u2500',
                'r': '\u23bc',
                's': '\u23bd',
                't': '\u251c',
                'u': '\u2524',
                'v': '\u2534',
                'w': '\u252c',
                'x': '\u2502',
                'y': '\u2264',
                'z': '\u2265',
                '{': '\u03c0',
                '|': '\u2260',
                '}': '\u00a3',
                '~': '\u00b7' // '·'
            };
            Terminal.charsets.UK = null; // (A
            Terminal.charsets.US = null; // (B (USASCII)
            Terminal.charsets.Dutch = null; // (4
            Terminal.charsets.Finnish = null; // (C or (5
            Terminal.charsets.French = null; // (R
            Terminal.charsets.FrenchCanadian = null; // (Q
            Terminal.charsets.German = null; // (K
            Terminal.charsets.Italian = null; // (Y
            Terminal.charsets.NorwegianDanish = null; // (E or (6
            Terminal.charsets.Spanish = null; // (Z
            Terminal.charsets.Swedish = null; // (H or (7
            Terminal.charsets.Swiss = null; // (=
            Terminal.charsets.ISOLatin = null; // /A
            /**
             * Helpers
             */
            function on(el, type, handler, capture) {
                if (!Array.isArray(el)) {
                    el = [el];
                }
                el.forEach(function(element) {
                    element.addEventListener(type, handler, capture || false);
                });
            }

            function off(el, type, handler, capture) {
                el.removeEventListener(type, handler, capture || false);
            }

            function cancel(ev, force) {
                if (!this.cancelEvents && !force) {
                    return;
                }
                ev.preventDefault();
                ev.stopPropagation();
                return false;
            }

            function inherits(child, parent) {
                function f() {
                    this.constructor = child;
                }
                f.prototype = parent.prototype;
                child.prototype = new f;
            }
            // if bold is broken, we can't
            // use it in the terminal.
            function isBoldBroken(document) {
                var body = document.getElementsByTagName('body')[0];
                var el = document.createElement('span');
                el.innerHTML = 'hello world';
                body.appendChild(el);
                var w1 = el.scrollWidth;
                el.style.fontWeight = 'bold';
                var w2 = el.scrollWidth;
                body.removeChild(el);
                return w1 !== w2;
            }

            function indexOf(obj, el) {
                var i = obj.length;
                while (i--) {
                    if (obj[i] === el)
                        return i;
                }
                return -1;
            }

            function isThirdLevelShift(term, ev) {
                var thirdLevelKey = (term.browser.isMac && ev.altKey && !ev.ctrlKey && !ev.metaKey) ||
                    (term.browser.isMSWindows && ev.altKey && ev.ctrlKey && !ev.metaKey);
                if (ev.type == 'keypress') {
                    return thirdLevelKey;
                }
                // Don't invoke for arrows, pageDown, home, backspace, etc. (on non-keypress events)
                return thirdLevelKey && (!ev.keyCode || ev.keyCode > 47);
            }

            function matchColor(r1, g1, b1) {
                var hash = (r1 << 16) | (g1 << 8) | b1;
                if (matchColor._cache[hash] != null) {
                    return matchColor._cache[hash];
                }
                var ldiff = Infinity,
                    li = -1,
                    i = 0,
                    c, r2, g2, b2, diff;
                for (; i < Terminal.vcolors.length; i++) {
                    c = Terminal.vcolors[i];
                    r2 = c[0];
                    g2 = c[1];
                    b2 = c[2];
                    diff = matchColor.distance(r1, g1, b1, r2, g2, b2);
                    if (diff === 0) {
                        li = i;
                        break;
                    }
                    if (diff < ldiff) {
                        ldiff = diff;
                        li = i;
                    }
                }
                return matchColor._cache[hash] = li;
            }
            matchColor._cache = {};
            // http://stackoverflow.com/questions/1633828
            matchColor.distance = function(r1, g1, b1, r2, g2, b2) {
                return Math.pow(30 * (r1 - r2), 2) +
                    Math.pow(59 * (g1 - g2), 2) +
                    Math.pow(11 * (b1 - b2), 2);
            };

            function each(obj, iter, con) {
                if (obj.forEach)
                    return obj.forEach(iter, con);
                for (var i = 0; i < obj.length; i++) {
                    iter.call(con, obj[i], i, obj);
                }
            }

            function keys(obj) {
                if (Object.keys)
                    return Object.keys(obj);
                var key, keys = [];
                for (key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        keys.push(key);
                    }
                }
                return keys;
            }
            var wcwidth = (function(opts) {
                // extracted from https://www.cl.cam.ac.uk/%7Emgk25/ucs/wcwidth.c
                // combining characters
                var COMBINING = [
                    [0x0300, 0x036F],
                    [0x0483, 0x0486],
                    [0x0488, 0x0489],
                    [0x0591, 0x05BD],
                    [0x05BF, 0x05BF],
                    [0x05C1, 0x05C2],
                    [0x05C4, 0x05C5],
                    [0x05C7, 0x05C7],
                    [0x0600, 0x0603],
                    [0x0610, 0x0615],
                    [0x064B, 0x065E],
                    [0x0670, 0x0670],
                    [0x06D6, 0x06E4],
                    [0x06E7, 0x06E8],
                    [0x06EA, 0x06ED],
                    [0x070F, 0x070F],
                    [0x0711, 0x0711],
                    [0x0730, 0x074A],
                    [0x07A6, 0x07B0],
                    [0x07EB, 0x07F3],
                    [0x0901, 0x0902],
                    [0x093C, 0x093C],
                    [0x0941, 0x0948],
                    [0x094D, 0x094D],
                    [0x0951, 0x0954],
                    [0x0962, 0x0963],
                    [0x0981, 0x0981],
                    [0x09BC, 0x09BC],
                    [0x09C1, 0x09C4],
                    [0x09CD, 0x09CD],
                    [0x09E2, 0x09E3],
                    [0x0A01, 0x0A02],
                    [0x0A3C, 0x0A3C],
                    [0x0A41, 0x0A42],
                    [0x0A47, 0x0A48],
                    [0x0A4B, 0x0A4D],
                    [0x0A70, 0x0A71],
                    [0x0A81, 0x0A82],
                    [0x0ABC, 0x0ABC],
                    [0x0AC1, 0x0AC5],
                    [0x0AC7, 0x0AC8],
                    [0x0ACD, 0x0ACD],
                    [0x0AE2, 0x0AE3],
                    [0x0B01, 0x0B01],
                    [0x0B3C, 0x0B3C],
                    [0x0B3F, 0x0B3F],
                    [0x0B41, 0x0B43],
                    [0x0B4D, 0x0B4D],
                    [0x0B56, 0x0B56],
                    [0x0B82, 0x0B82],
                    [0x0BC0, 0x0BC0],
                    [0x0BCD, 0x0BCD],
                    [0x0C3E, 0x0C40],
                    [0x0C46, 0x0C48],
                    [0x0C4A, 0x0C4D],
                    [0x0C55, 0x0C56],
                    [0x0CBC, 0x0CBC],
                    [0x0CBF, 0x0CBF],
                    [0x0CC6, 0x0CC6],
                    [0x0CCC, 0x0CCD],
                    [0x0CE2, 0x0CE3],
                    [0x0D41, 0x0D43],
                    [0x0D4D, 0x0D4D],
                    [0x0DCA, 0x0DCA],
                    [0x0DD2, 0x0DD4],
                    [0x0DD6, 0x0DD6],
                    [0x0E31, 0x0E31],
                    [0x0E34, 0x0E3A],
                    [0x0E47, 0x0E4E],
                    [0x0EB1, 0x0EB1],
                    [0x0EB4, 0x0EB9],
                    [0x0EBB, 0x0EBC],
                    [0x0EC8, 0x0ECD],
                    [0x0F18, 0x0F19],
                    [0x0F35, 0x0F35],
                    [0x0F37, 0x0F37],
                    [0x0F39, 0x0F39],
                    [0x0F71, 0x0F7E],
                    [0x0F80, 0x0F84],
                    [0x0F86, 0x0F87],
                    [0x0F90, 0x0F97],
                    [0x0F99, 0x0FBC],
                    [0x0FC6, 0x0FC6],
                    [0x102D, 0x1030],
                    [0x1032, 0x1032],
                    [0x1036, 0x1037],
                    [0x1039, 0x1039],
                    [0x1058, 0x1059],
                    [0x1160, 0x11FF],
                    [0x135F, 0x135F],
                    [0x1712, 0x1714],
                    [0x1732, 0x1734],
                    [0x1752, 0x1753],
                    [0x1772, 0x1773],
                    [0x17B4, 0x17B5],
                    [0x17B7, 0x17BD],
                    [0x17C6, 0x17C6],
                    [0x17C9, 0x17D3],
                    [0x17DD, 0x17DD],
                    [0x180B, 0x180D],
                    [0x18A9, 0x18A9],
                    [0x1920, 0x1922],
                    [0x1927, 0x1928],
                    [0x1932, 0x1932],
                    [0x1939, 0x193B],
                    [0x1A17, 0x1A18],
                    [0x1B00, 0x1B03],
                    [0x1B34, 0x1B34],
                    [0x1B36, 0x1B3A],
                    [0x1B3C, 0x1B3C],
                    [0x1B42, 0x1B42],
                    [0x1B6B, 0x1B73],
                    [0x1DC0, 0x1DCA],
                    [0x1DFE, 0x1DFF],
                    [0x200B, 0x200F],
                    [0x202A, 0x202E],
                    [0x2060, 0x2063],
                    [0x206A, 0x206F],
                    [0x20D0, 0x20EF],
                    [0x302A, 0x302F],
                    [0x3099, 0x309A],
                    [0xA806, 0xA806],
                    [0xA80B, 0xA80B],
                    [0xA825, 0xA826],
                    [0xFB1E, 0xFB1E],
                    [0xFE00, 0xFE0F],
                    [0xFE20, 0xFE23],
                    [0xFEFF, 0xFEFF],
                    [0xFFF9, 0xFFFB],
                    [0x10A01, 0x10A03],
                    [0x10A05, 0x10A06],
                    [0x10A0C, 0x10A0F],
                    [0x10A38, 0x10A3A],
                    [0x10A3F, 0x10A3F],
                    [0x1D167, 0x1D169],
                    [0x1D173, 0x1D182],
                    [0x1D185, 0x1D18B],
                    [0x1D1AA, 0x1D1AD],
                    [0x1D242, 0x1D244],
                    [0xE0001, 0xE0001],
                    [0xE0020, 0xE007F],
                    [0xE0100, 0xE01EF]
                ];
                // binary search
                function bisearch(ucs) {
                    var min = 0;
                    var max = COMBINING.length - 1;
                    var mid;
                    if (ucs < COMBINING[0][0] || ucs > COMBINING[max][1])
                        return false;
                    while (max >= min) {
                        mid = Math.floor((min + max) / 2);
                        if (ucs > COMBINING[mid][1])
                            min = mid + 1;
                        else if (ucs < COMBINING[mid][0])
                            max = mid - 1;
                        else
                            return true;
                    }
                    return false;
                }

                function wcwidth(ucs) {
                    // test for 8-bit control characters
                    if (ucs === 0)
                        return opts.nul;
                    if (ucs < 32 || (ucs >= 0x7f && ucs < 0xa0))
                        return opts.control;
                    // binary search in table of non-spacing characters
                    if (bisearch(ucs))
                        return 0;
                    // if we arrive here, ucs is not a combining or C0/C1 control character
                    return 1 +
                        (ucs >= 0x1100 &&
                            (ucs <= 0x115f ||
                                ucs == 0x2329 ||
                                ucs == 0x232a ||
                                (ucs >= 0x2e80 && ucs <= 0xa4cf && ucs != 0x303f) ||
                                (ucs >= 0xac00 && ucs <= 0xd7a3) ||
                                (ucs >= 0xf900 && ucs <= 0xfaff) ||
                                (ucs >= 0xfe10 && ucs <= 0xfe19) ||
                                (ucs >= 0xfe30 && ucs <= 0xfe6f) ||
                                (ucs >= 0xff00 && ucs <= 0xff60) ||
                                (ucs >= 0xffe0 && ucs <= 0xffe6) ||
                                (ucs >= 0x20000 && ucs <= 0x2fffd) ||
                                (ucs >= 0x30000 && ucs <= 0x3fffd)));
                }
                return wcwidth;
            })({
                nul: 0,
                control: 0
            }); // configurable options
            /**
             * Expose
             */
            Terminal.EventEmitter = EventEmitter_js_1.EventEmitter;
            Terminal.inherits = inherits;
            /**
             * Adds an event listener to the terminal.
             *
             * @param {string} event The name of the event. TODO: Document all event types
             * @param {function} callback The function to call when the event is triggered.
             */
            Terminal.on = on;
            Terminal.off = off;
            Terminal.cancel = cancel;

            module.exports = Terminal;

        }, {
            "./CompositionHelper.js": 1,
            "./EventEmitter.js": 2,
            "./Viewport.js": 3,
            "./handlers/Clipboard.js": 4,
            "./utils/Browser": 5
        }]
    }, {}, [7])(7)
});
//# sourceMappingURL=xterm.js.map


/*var terminalContainer = document.getElementById('terminal-container');

var term = new Terminal({
    cursorBlink: true
});

term.open(terminalContainer);

var shellprompt = '$ ';

term.prompt = function () {
    term.write('\r\n' + shellprompt);
};

term.writeln('Welcome to xterm.js');
term.writeln('This is a local terminal emulation, without a real terminal in the back-end.');
term.writeln('Type some keys and commands to play around.');
term.writeln('');
term.prompt();

term.on('key', function (key, ev) {
    var printable = (
        !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey
    );

    if (ev.keyCode == 13) {
        term.prompt();
    } else if (ev.keyCode == 8) {
        // Do not delete the prompt
        if (term.x > 2) {
            term.write('\b \b');
        }
    } else if (printable) {
        term.write(key);
    }
});

term.on('paste', function (data, ev) {
    term.write(data);
});*/


/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Positions {
    constructor(viewSpacing) {
        this.columnIndex = 0;
        this.lineIndex = 0;
        this.viewSpacing = 30;
        this.allX = 0;
        this.allY = 0;
        this.maxHeight = 0;
        this.counter = 0;
        if (viewSpacing)
            this.viewSpacing = viewSpacing;
    }
    newPosition(instanceWidth, instanceHeight) {
        let width = instanceWidth;
        let height = instanceHeight;
        if (width > window.innerWidth) {
            const scale = window.innerWidth / width;
            width = width * scale;
            height = height * scale;
        }
        if (this.allX + this.columnIndex * this.viewSpacing + width > window.innerWidth) {
            this.lineIndex++;
            this.columnIndex = 0;
            this.allX = 0;
            this.allY += this.maxHeight;
        }
        const posX = this.allX + (this.columnIndex != 0 ? this.viewSpacing : 0);
        const posY = this.allY + this.lineIndex * this.viewSpacing;
        this.allX = posX + width;
        this.maxHeight = height > this.maxHeight ? height : this.maxHeight;
        this.columnIndex++;
        return { x: posX, y: posY, width: width, height: height };
    }
    reset() {
        this.allX = 0;
        this.allY = 0;
        this.columnIndex = 0;
        this.lineIndex = 0;
        this.maxHeight = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Positions;

//# sourceMappingURL=Positions.js.map

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Position; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let Position = class Position {
    constructor(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
        this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startX + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startY + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'width', this.width + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'height', this.height + 'px');
    }
    update(x, y, width, height) {
        this.renderer.setElementStyle(this.element.nativeElement, 'left', x + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', y + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'width', width + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'height', height + 'px');
    }
};
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('startX'),
    __metadata("design:type", Object)
], Position.prototype, "startX", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('startY'),
    __metadata("design:type", Object)
], Position.prototype, "startY", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('width'),
    __metadata("design:type", Object)
], Position.prototype, "width", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('height'),
    __metadata("design:type", Object)
], Position.prototype, "height", void 0);
Position = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
        selector: '[position]',
        exportAs: 'position-directive'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]])
], Position);

//# sourceMappingURL=Position.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__instances_component__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__about_about__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tour_tour__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let ConfigPage = class ConfigPage {
    constructor(model, navCtrl, navParams) {
        this.model = model;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.isHost = false;
        this.automaticFetch = true;
        this.interval = 1;
        this.automaticRotation = false;
        this.detectOnlyChange = true;
        this.enableMadVision = true;
        this.enableTextSpeech = true;
        this.enableAutoReadout = false;
        this.speakInterval = 1;
        this.happyFaceCompatible = false;
        this.isHost = this.model.isHost();
        this.automaticFetch = this.model.configuration.get().automaticFetch;
        this.interval = this.model.configuration.get().reloadInterval;
        this.automaticRotation = this.model.configuration.get().automaticRotation;
        this.detectOnlyChange = this.model.configuration.get().detectOnlyChange;
        this.enableTextSpeech = this.model.configuration.get().enableTextSpeech;
        this.enableAutoReadout = this.model.configuration.get().enableAutoReadout;
        this.speakInterval = this.model.configuration.get().speakInterval;
        this.happyFaceCompatible = this.model.configuration.get().happyFaceCompatible;
    }
    notify() {
        //let model:DataModel = DataModel.getInstance();
        this.model.configuration.setAutomaticFetch(this.automaticFetch);
        this.model.configuration.setAutomaticRotation(this.automaticRotation);
        this.model.configuration.setDetectOnlyChange(this.detectOnlyChange);
        this.model.configuration.setEnableMadVision(this.enableMadVision);
        this.model.configuration.setEnableTextSpeech(this.enableTextSpeech);
        this.model.configuration.setHappyFaceCompatible(this.happyFaceCompatible);
        this.model.configuration.setEnableAutoReadout(this.enableAutoReadout);
        this.model.configuration.setReloadInterval(this.interval);
        this.model.configuration.setSpeakInterval(this.speakInterval);
        this.model.updateLoop();
    }
    chooseInstance() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__instances_component__["a" /* InstancesComponent */], { "viewCtrl": this.navParams.get('viewCtrl') });
    }
    tour() {
        setTimeout(() => {
            this.closeModal();
            setTimeout(() => {
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__tour_tour__["a" /* TourPage */], {});
                console.log("Starting tour");
            }, 500);
        }, 50);
    }
    about() {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__about_about__["a" /* AboutPage */], { "viewCtrl": this.navParams.get('viewCtrl') });
    }
    closeModal() {
        let viewCtrl = this.navParams.get('viewCtrl');
        viewCtrl.dismiss();
    }
};
ConfigPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-config',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\config\config.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title *ngIf="!isHost">Configuration</ion-title>\n        <ion-title *ngIf="isHost">Advanced Configuration</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()"><ion-icon name="close"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list>\n        <ion-item (click)="chooseInstance()" *ngIf="!isHost">\n            <!-- Move to Instance selection page -->\n            <span style="float: left; padding-top: 10px; padding-bottom: 10px"> Choose Instance</span>\n            <span style="float: right; padding-top: 10px; padding-bottom: 10px"><ion-icon name="ios-arrow-forward"></ion-icon></span> <!--<i class="icon ion-ios-arrow-right"></i>-->\n        </ion-item>\n\n        <ion-item *ngIf="false">\n            <ion-label>Automatic rotation</ion-label>\n            <ion-toggle [(ngModel)]="automaticRotation" (ionChange)="notify()"></ion-toggle>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Automatic fetch</ion-label>\n            <ion-toggle [(ngModel)]="automaticFetch" (ionChange)="notify()"></ion-toggle>\n        </ion-item>\n\n        <ion-list-header *ngIf="automaticFetch">\n            Reload Interval:\n            <ion-badge item-end>{{interval}} min</ion-badge>\n        </ion-list-header>\n        <ion-item *ngIf="automaticFetch">\n            <ion-range [min]="1" [max]="60" [step]="1" [(ngModel)]="interval">\n                <ion-icon range-left name="time"></ion-icon>\n            </ion-range>\n        </ion-item>\n\n        <ion-item *ngIf="false">\n            <ion-label>Detect only change</ion-label>\n            <ion-toggle [(ngModel)]="detectOnlyChange" (ionChange)="notify()"></ion-toggle>\n        </ion-item>\n\n        <ion-item *ngIf="false">\n            <ion-label>Enable Mad Vision</ion-label>\n            <ion-toggle [(ngModel)]="enableMadVision" (ionChange)="notify()"></ion-toggle>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Enable Text speech</ion-label>\n            <ion-toggle [(ngModel)]="enableTextSpeech" (ionChange)="notify()"></ion-toggle>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Enable automatic voice readout</ion-label>\n            <ion-toggle [(ngModel)]="enableAutoReadout" (ionChange)="notify()"></ion-toggle>\n        </ion-item>\n\n        <ion-list-header *ngIf="enableAutoReadout">\n            Readout Interval:\n            <ion-badge item-end>{{speakInterval}} min</ion-badge>\n        </ion-list-header>\n        <ion-item *ngIf="enableAutoReadout">\n            <ion-range [min]="1" [max]="60" [step]="1" [(ngModel)]="speakInterval">\n                <ion-icon range-left name="time"></ion-icon>\n            </ion-range>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>HappyFace compatible</ion-label>\n            <ion-toggle [(ngModel)]="happyFaceCompatible" (ionChange)="notify()"></ion-toggle>\n        </ion-item>\n\n        <ion-item (click)="tour()">\n            <!-- Start tour page again -->\n            <span style="float: left; padding-top: 10px; padding-bottom: 10px"> Tour </span>\n            <span style="float: right; padding-top: 10px; padding-bottom: 10px"><ion-icon name="ios-arrow-forward"></ion-icon></span>\n        </ion-item>\n\n        <ion-item (click)="about()">\n            <!-- Move to Impressum page -->\n            <span style="float: left; padding-top: 10px; padding-bottom: 10px"> About </span>\n            <span style="float: right; padding-top: 10px; padding-bottom: 10px"><ion-icon name="ios-arrow-forward"></ion-icon></span>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\config\config.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */]])
], ConfigPage);

//# sourceMappingURL=config.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TourPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(34);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let TourPage = class TourPage {
    constructor(model, navCtrl, storage, alertCtrl) {
        this.model = model;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.url = "";
        this.restart = false;
        this.isLoading = false;
        this.slides = [
            {
                title: "Welcome to HappyFace Mobile",
                description: "This tour will explain to you the basic functions of this app. <br> If you want to see this tour again, you can find it under <br> Settings [ -> Extended Settings] -> Tour.",
                image: "assets/img/tour/happyface-tour-1.png"
            },
            {
                title: "Settings",
                description: "In this page, you can choose the distributed Grid computing system to be monitored. You can find it on the top left corner of the monitoring page. It is a good idea to start there right after this tour. The other Settings you be self explaining",
                image: "assets/img/tour/happyface-tour-9.png"
            },
            {
                title: "The status badge",
                description: "This badge is on top of the Monitoring and Analyze page. In the picture above you can see it as an example from ATLAS distributed grid computing system. It tells you the status level of the monitored distributed Grid computing system and the failed systems. It also reads it out for you when you tap on it (if you're lazy)",
                image: "assets/img/tour/happyface-tour-2.png"
            },
            {
                title: "The systems reports",
                description: "On the Monitoring page, all systems of the monitored distributed Grid computing system report with a screenshot of their status screen. In this example again from the ATLAS distributed computing system. They are ordered by their level of severity. If one system has a critical state, their report picture will turn red.",
                image: "assets/img/tour/happyface-tour-3.png"
            },
            {
                title: "The Analyzer page",
                description: "On the Analyzer page, below the status badge, you can display the interconnection between systems (pathway and overall pathway), the stability of the systems over time (analysis), a forecast of their availability (Happy Forecast, still beta) and the classical version of HappyFace Mobile",
                image: "assets/img/tour/happyface-tour-4.png"
            },
            {
                title: "The controller page",
                description: "To give you the ability to react on system failures, the controller page lets you remotely connect to any system of the monitored distributed Grid computing system and change it. It also connects you via ticket or email to the responsible administrator in case you need help.",
                image: "assets/img/tour/happyface-tour-5.png"
            },
            {
                title: "The visualizer page",
                description: "The visualizer page shows you plots generated by external systems like ATLAS status dashboard. It also provides pretty pictures of computing systems.",
                image: "assets/img/tour/happyface-tour-6.png"
            },
            {
                title: "The logs page",
                description: "If anything goes wrong, you can always have a look into the logs of the controlling servers. They might give you a hint of whats going wrong.",
                image: "assets/img/tour/happyface-tour-7.png"
            },
            {
                title: "The widget page",
                description: "This page gives you a lot of possibilities to display the information you need from this app and you can reorder them as you like, so it fits your workflow. To modify the widgets you can click on the configuration icon on the top right corner, from there you can also add new ones. If you don't find what you are looking for you can even build your own widgets.",
                image: "assets/img/tour/happyface-tour-8.png"
            }
        ];
    }
    ngOnInit() { }
    skip() {
        console.log("SKIP");
        this.storage.set("startup", true);
        this.navCtrl.pop();
    }
    continue() {
        console.log("CONTINUE");
        let alert = this.alertCtrl.create({
            title: "Show guide on next startup ?",
            buttons: [{
                    text: "Yes",
                    handler: () => { this.storage.set("startup", false); this.navCtrl.pop(); }
                }, {
                    text: "No",
                    handler: () => { this.storage.set("startup", true); this.navCtrl.pop(); }
                }]
        });
        alert.setCssClass("alertText");
        alert.present();
    }
};
TourPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\tour\tour.html"*/'<ion-content>\n    <div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ion-slides pager [hidden]="isLoading">\n        <!-- Guide slides -->\n        <ion-slide *ngFor="let slide of slides">\n            <ion-toolbar>\n                <ion-buttons end>\n                    <button ion-button color="primary" (click)="skip()">Skip</button>\n                </ion-buttons>\n            </ion-toolbar>\n            <img [src]="slide.image" class="slide-image"/>\n            <h2 class="slide-title" [innerHTML]="slide.title"></h2>\n            <p [innerHTML]="slide.description"></p>\n        </ion-slide>\n        <!-- Last slide -->\n        <ion-slide>\n            <ion-toolbar>\n            </ion-toolbar>\n            <img src="assets/img/tour/happyface-tour-1.png" class="slide-image"/>\n            <h2 class="slide-title">Ready to Start</h2>\n            <button ion-button large clear icon-end color="primary" (click)="continue()">\n                Continue\n                <ion-icon name="arrow-forward"></ion-icon>\n            </button>\n        </ion-slide>\n    </ion-slides>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\tour\tour.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
], TourPage);

//# sourceMappingURL=tour.js.map

/***/ })

},[228]);
//# sourceMappingURL=main.js.map