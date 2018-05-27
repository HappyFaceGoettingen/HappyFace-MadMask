webpackJsonp([0],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PassModal; });
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


let PassModal = class PassModal {
    constructor(viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.host = "";
        this.port = 22;
        this.user = "";
        this.pass = "";
    }
    closeModal() {
        this.viewCtrl.dismiss({ enter: false, host: "", port: 0, user: "", pass: "" });
    }
    enter() {
        this.viewCtrl.dismiss({ enter: true, host: this.host, port: this.port, user: this.user, pass: this.pass });
    }
};
PassModal = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\ssh\pass-modal.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Login</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (click)="closeModal()"><ion-icon name="close"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <p>Please provide login information:</p>\n\n\n\n    <ion-item>\n\n        <ion-label fixed>Host: </ion-label>\n\n        <ion-input [(ngModel)]="host"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n        <ion-label fixed>Port: </ion-label>\n\n        <ion-input type="number" [(ngModel)]="port"></ion-input>\n\n    </ion-item>\n\n    <p></p>\n\n    <ion-item>\n\n        <ion-label fixed>Username: </ion-label>\n\n        <ion-input [(ngModel)]="user"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n        <ion-label fixed>Password: </ion-label>\n\n        <ion-input type="password" [(ngModel)]="pass"></ion-input>\n\n    </ion-item>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n    <ion-toolbar>\n\n        <ion-buttons end>\n\n            <button ion-button (click)="enter()">Enter</button>\n\n        </ion-buttons>\n\n    </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\ssh\pass-modal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* ViewController */]])
], PassModal);

//# sourceMappingURL=pass-modal.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClassicalDataModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(11);
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

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export modelCounter */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataModel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(42);
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
        this.findInitialConfiguration();
        this.initLoop();
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
    reload() {
        this.loading = true;
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
        console.log("SELFHOST: " + this.isHost());
        if (this.isHost()) {
            this.currentlyActive.host = window.location.hostname;
            this.currentlyActive.mobile_port = window.location.port;
            this.currentlyActive.web_port = window.location.port;
            this.currentlyActive.dir = "sites/default";
            console.log("POSITION: " + window.location.hostname + ":" + window.location.port);
            /*this.loadConfig();
            this.currentlyActive.name = this.config.site_name;*/
            //this.reload();
        }
        else {
            // Initial configuration
            this.currentlyActive.name = "GoeGrid";
            this.currentlyActive.host = "141.5.108.30";
            this.currentlyActive.mobile_port = "20200";
            this.currentlyActive.web_port = "10200";
            this.currentlyActive.dir = "sites/default";
        }
        this.storage.get('instance').then((value) => {
            if (value !== null && value !== undefined)
                this.currentlyActive = value;
            console.log("Saved Instance is: " + JSON.stringify(value));
            console.log("Running instance: " + JSON.stringify(this.currentlyActive));
            this.reload();
        });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__monitoring_monitoring__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controller_controller__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logs_logs__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__visualizers_visualizers__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__humans_humans__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__working_working__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modals_config_config__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__analyzer_analyzer__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__home_home__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__tour_tour__ = __webpack_require__(53);
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
                else
                    this.storage.set("startup", false);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__monitoring_webview__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_config_modal__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tour_tour__ = __webpack_require__(53);
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
        if (this.dataExists()) {
            this.isLoading = false;
            this.setHistory();
            this.setStatusCard();
            this.model.setLinks("latest");
            this.monitoringURLs = this.model.monitoringUrls;
        }
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
        selector: 'page-monitoring',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\monitoring\monitoring.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-buttons left>\n            <button ion-button icon-only (click)="openModalConfig()"><ion-icon name="md-cog"></ion-icon></button>\n        </ion-buttons>\n        <ion-title>Happy Meta-Monitoring</ion-title>\n        <ion-buttons end>\n            <!--<button ion-button icon-only (click)="openGuide()"><ion-icon name="md-happy"></ion-icon></button>-->\n            <button ion-button icon-only (click)="reload()" *ngIf="!isLoading"><ion-icon name="refresh"></ion-icon></button>\n        </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n    <div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ion-list [hidden]="isLoading" no-padding>\n        <!-- Status card -->\n        <ion-card no-padding no-margin style="width: 100%" (click)="speakSummary()">\n            <ion-card color="{{statusColor}}">\n                <ion-card-header>\n                    Status: {{statusLevel}}\n                </ion-card-header>\n            </ion-card>\n            <ion-card-content no-padding>\n                <ion-item text-wrap>\n                    <ion-thumbnail item-start>\n                        <img src="{{statusImg}}">\n                    </ion-thumbnail>\n                    <h2>{{statusText}}</h2>\n                </ion-item>\n            </ion-card-content>\n        </ion-card>\n        <br>\n\n        <!-- History chooser -->\n        <ion-item no-padding>\n            <ion-label>History:</ion-label>\n            <ion-select (ionChange)="historyChanged($event)" interface="action-sheet" style="max-width: 75% !important;">\n              <ion-option *ngFor="let ts of history" [selected]="ts.datetime == latest">{{ts.datetime}}</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <!-- Content list -->\n        <ion-item *ngFor="let monitoringURL of monitoringURLs" no-padding no-margin text-wrap>\n            <ion-card no-padding no-margin>\n                <ion-card-header class="group-title">{{monitoringURL.name}}</ion-card-header>\n                <ion-card-content no-padding>\n                    <ion-grid no-padding>\n                        <ion-row class="group" no-padding no-margin>\n                            <ion-col col-6 col-sm no-padding *ngFor="let url of monitoringURL.urls">\n                                <div class="launchpad">\n                                    <div class="logo"><img src="{{url.thumbnail}}" alt="Not Captured" (click)="openPage(url)"/></div>\n                                    <a href="{{url.link}}" target="_blank"><div class="caption">{{url.name}}</div></a>\n                                </div>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid>\n                </ion-card-content>\n            </ion-card>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\monitoring\monitoring.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_DataModel__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(52);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(52);
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
    close() {
        let viewCtrl = this.navParams.get('viewCtrl');
        viewCtrl.dismiss();
    }
};
InstancesBrowserComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\config\instances.browser.component.html"*/'<ion-header>\n\n    <ion-navbar *ngIf="isIOS" style="height:calc(44px + 20px); min-height:calc(44px + 20px); padding-top:20px;">\n\n        <ion-title style="padding-top: 15px">Settings</ion-title>\n\n    </ion-navbar>\n\n    <ion-navbar *ngIf="!isIOS">\n\n        <ion-title>Settings</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (click)="close()"><ion-icon name="close"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-list-header>\n\n        Choose Instance\n\n    </ion-list-header>\n\n\n\n    <div text-center *ngIf="isLoading">\n\n        <ion-spinner></ion-spinner>\n\n    </div>\n\n    <ion-list *ngIf="!isLoading">\n\n        <ng-container *ngFor="let inst of instances">\n\n            <button ion-item detail-none (click)="choose(inst)">\n\n                {{inst.name}}\n\n                <div item-end text-center>\n\n                    <ion-icon name="ios-arrow-forward"></ion-icon>\n\n                </div>\n\n            </button>\n\n        </ng-container>\n\n        <ion-item *ngIf="instances.length == 0">\n\n            There are no subinstances here.\n\n        </ion-item>\n\n    </ion-list>\n\n    <ion-item>\n\n        <button ion-item detail-none (click)="extSettings()">\n\n            Advanced Settings\n\n            <div item-end text-center>\n\n                <ion-icon name="ios-arrow-forward"></ion-icon>\n\n            </div>\n\n        </button>\n\n    </ion-item>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\config\instances.browser.component.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_DataModel__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(42);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_DataModel__ = __webpack_require__(11);
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
        selector: "about-page",template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\about\about.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>About</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (click)="close()"><ion-icon name="close"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="ios7-grey-bg" padding="10px">\n\n    <div class="logos">\n\n        <span class="app-logo" >                      <img height="60px" src="assets/img/iTunesArtwork@2x.png"/> </span>\n\n        <span class="uni-logo" ng-click="openSite()"> <img height="60px" src="assets/img/logoGoe.png"/> </span>\n\n    </div>\n\n\n\n    <br>\n\n    <div class="settings-explanation credits">\n\n        <div>\n\n            <b>HappyFace Meta-Monitoring-Tool</b><br>\n\n            <b>Mobile Application</b>, version {{versionCode}}\n\n        </div>\n\n\n\n        <br>\n\n        <div class="row" style="text-align: left;">\n\n            <div class="col col-top">Developed by</div>\n\n            <div class="col col-67">\n\n                Timon Vogt<br>\n\n                Dr. Gen Kawamura<br>\n\n                Prof. Dr. Arnulf Quadt<br>\n\n            </div>\n\n        </div>\n\n        <div class="row" style="text-align: left;">\n\n            <div class="col col-top">Coded by</div>\n\n            <div class="col col-67">\n\n                Timon Vogt<br>\n\n            </div>\n\n        </div>\n\n    </div>\n\n\n\n    <br>\n\n    <div class="settings-explanation">\n\n        <b>Georg-August-Universität Göttingen</b><br>\n\n        Wilhelmsplatz 1<br>\n\n        37073 Göttingen<br>\n\n        Germany<br>\n\n        Tel. +49 551 39-0<br>\n\n        Fax +49 551 39-9612<br>\n\n        pressestelle@uni-goettingen.de\n\n    </div>\n\n    <br>\n\n    <div class="settings-explanation padding-top">\n\n        <b>Responsible for content:</b><br>\n\n        Prof. Dr. Arnulf Quadt<br>\n\n        II. Physikalisches Institut<br>\n\n        Friedrich-Hund-Platz 1<br>\n\n        37077 Göttingen<br>\n\n        Germany<br>\n\n        aquadt@uni-goettingen.de\n\n    </div>\n\n    <br>\n\n    <div class="padding-top padding-bottom settings-explanation">\n\n        Portions of the app are Apache 2.0 licensed.\n\n        <br>\n\n        Portions of the app are MIT licensed.\n\n        <br>\n\n        Some icons in this app are made by FreePik from <a href="www.flaticon.com">FlatIcon</a>\n\n\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\about\about.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controller_detail__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_ssh_ssh_terminal__ = __webpack_require__(213);
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
        if (!(this.model.systems == null || this.model.systems == undefined)) {
            this.systems = this.model.systems;
            this.isLoading = false;
        }
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
        selector: 'page-controller',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\controller\controller.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Controller</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button (click)="openSSH()" class="ssh-button">SSH</button>\n\n            <button ion-button icon-only (click)="reload()" *ngIf="!isLoading"><ion-icon name="refresh"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div text-center padding [hidden]="!isLoading">\n\n        <ion-spinner></ion-spinner>\n\n    </div>\n\n\n\n    <ion-list no-padding [hidden]="isLoading">\n\n        <ion-item *ngFor="let system of systems" text-wrap no-padding (click)="openPage(system)">\n\n            <ion-avatar item-left>\n\n                <img src="assets/{{system.img}}"/>\n\n            </ion-avatar>\n\n            <h2>{{system.name}}</h2>\n\n            <p>{{system.text}}</p>\n\n            <ion-icon name="ios-arrow-forward-outline" item-end></ion-icon>\n\n        </ion-item>\n\n    </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\controller\controller.html"*/
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modals_ssh_SSH2_Wrapper__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modals_ssh_pass_modal__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_DataModel__ = __webpack_require__(11);
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
        this.serviceTMP = null;
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
                    this.openSSHCommand(service);
                    break;
            }
        }
    }
    openSSHCommand(service) {
        try {
            this.sshWrapper = new __WEBPACK_IMPORTED_MODULE_2__modals_ssh_SSH2_Wrapper__["a" /* SSH2Wrapper */]();
        }
        catch (error) {
            if (this.alertCtrl != null) {
                if (this.model.isAndroid()) {
                    let alert = this.alertCtrl.create({
                        title: "Secure connection not available",
                        subTitle: "An unknown error makes SSH Cordova plugin unavailable.\nPlease use external " +
                            "clients like JuiceSSH, ConnectBot or Terminus.",
                        cssClass: "alertText",
                        buttons: ["OK"]
                    });
                    alert.present();
                }
                else if (this.model.isiOS()) {
                    let alert = this.alertCtrl.create({
                        title: "Secure connection not available",
                        subTitle: "The SSH plugin is not available in iOS for now. Our intelligent (and extraordinary good looking) " +
                            "team is already working on it, but for now please use external ssh clients like Terminus or iTerminal",
                        cssClass: "alertText",
                        buttons: ["OK"]
                    });
                    alert.present();
                }
                else {
                    let alert = this.alertCtrl.create({
                        title: "Secure connection not available",
                        subTitle: "The SSH client is in this version of HappyFaceMobile (probably the browser version) not available. " +
                            "Due to the limitations of portable web apps (pwa), this feature might not be included at all. Please use your " +
                            "linux terminal to connect.",
                        cssClass: "alertText",
                        buttons: ["OK"]
                    });
                    alert.present();
                }
            }
            else {
                console.log("ERROR: SSH plugin is missing.");
            }
            this.sshWrapper = null;
            return;
        }
        this.serviceTMP = service;
        let modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__modals_ssh_pass_modal__["a" /* PassModal */]);
        modal.onDidDismiss(this.gotSSHPass.bind(this));
        modal.present();
    }
    gotSSHPass(data) {
        if (data == null || data.enter == undefined || !data.enter)
            return;
        this.sshWrapper.host = data.host;
        this.sshWrapper.port = data.port;
        this.sshWrapper.username = data.user;
        this.sshWrapper.password = data.pass;
        this.sshWrapper.connect(false);
        this.sshWrapper.write(this.serviceTMP.command + "\n");
        this.sshWrapper.close();
        this.serviceTMP = null;
    }
};
ControllerDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
        selector: 'page-controller-detail',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\controller\controller-detail.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{system.name}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <img src="assets/{{system.img}}" style="width: 64px; height: 64px">\n\n    <h2>{{system.text}}</h2>\n\n\n\n    <!--<ion-card>\n\n        <ion-item-divider>Power</ion-item-divider>\n\n        <ion-item text-wrap>\n\n            <button ion-button class="button-outline">Cold reboot</button>\n\n            <button ion-button class="button-outline">Warm reboot</button>\n\n        </ion-item>\n\n    </ion-card>-->\n\n    <ion-card>\n\n        <ion-card-header style="background: #e2e4e2">Services</ion-card-header>\n\n        <ion-card-content>\n\n            <br>\n\n            <span *ngFor="let service of system.services" padding-left="15px" text-wrap>\n\n                <button ion-button class="button-outline" (click)="serviceStart(service)">{{service.name}}</button>\n\n            </span>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\controller\controller-detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__data_DataModel__["a" /* DataModel */]])
], ControllerDetailPage);

//# sourceMappingURL=controller-detail.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SSH2Wrapper {
    constructor() {
        this.conn = null;
        this.clientFailure = false;
        this.connectionOpen = false;
        this.loopHandler = null;
        this.host = "141.5.108.29";
        this.port = 22;
        this.username = "test";
        this.password = "passATLAS01";
        this.onData = null;
        this.onError = null;
        if (window.sshClient == null || window.sshClient == undefined) {
            this.clientFailure = true;
            throw new Error("NO CLIENT");
        }
    }
    connect(keepOpen) {
        if (this.clientFailure)
            return;
        if (this.host == "") {
            console.error("SSH: ERROR No host provided");
            return;
        }
        else if (this.port == 0 || this.port >= 65356) {
            console.error("SSH: ERROR Undefined port");
            return;
        }
        window.sshClient.sshOpenSession((success) => {
            console.log("SSH: Connection success");
            this.conn = success;
            window.sshClient.sshVerifyHost((success) => {
                console.log("SSH: Hostkey saved in known_hosts file");
            }, (error) => {
                console.log("SSH: ERROR Connection error " + error);
            }, this.host, this.port, true);
            this.connectionOpen = true;
        }, (error) => {
            console.log("SSH: ERROR Connection error " + error);
        }, this.host, this.port, this.username, this.password, 100, 80);
        if (keepOpen)
            this.startLoop();
    }
    startLoop() {
        if (!this.clientFailure && this.connectionOpen && this.conn != null) {
            this.loopHandler = window.setInterval(this.runLoop.bind(this), 200);
        }
    }
    runLoop() {
        if (!this.connectionOpen || this.conn == null)
            return;
        window.sshRead((success) => {
            if (this.onData != null)
                this.onData(success);
        }, (error) => {
            if (this.onError != null)
                this.onError(error);
        }, this.conn);
    }
    write(str) {
        if (this.clientFailure) {
            console.log("SSH: ERROR No client.");
            return;
        }
        else if (this.conn == null || this.conn == undefined) {
            console.log("SSH: ERROR No connection open");
            return;
        }
        else if (!this.connectionOpen) {
            console.log("SSH: ERROR No connection open");
            return;
        }
        window.sshWrite((success) => { }, (error) => { console.log("SSH: ERROR Write error"); if (this.onError != null)
            this.onError("WRITE ERROR"); }, this.conn, str);
    }
    close() {
        if (this.clientFailure || this.conn == null || this.conn == undefined || !this.connectionOpen)
            return;
        window.sshClose((success) => { }, (error) => { console.log("SSH ERROR Close error"); });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SSH2Wrapper;

//# sourceMappingURL=SSH2-Wrapper.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SSHTerminalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Terminal2__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_DataModel__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import {SSH2Wrapper} from "./SSH2-Wrapper";
let SSHTerminalPage = class SSHTerminalPage {
    constructor(viewCtrl, alertCtrl, model, modalCtrl) {
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.model = model;
        this.modalCtrl = modalCtrl;
        this.term = null;
        this.promt = "[usr@happy] #";
    }
    ngOnInit() {
        // #input-line cmdline
        //console.log("cmdLine: " + JSON.stringify(document.querySelector(".cmdline")));
        this.term = new __WEBPACK_IMPORTED_MODULE_2__Terminal2__["a" /* Terminal2 */]('.cmdline', '#container output', this.alertCtrl, this.model, this.modalCtrl, this.viewCtrl);
        this.term.setPromtChange(this.promtChange.bind(this));
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
        selector: "page-ssh",template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\ssh\ssh-terminal.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>SSH-Terminal</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (click)="closeModal()"><ion-icon name="close"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content id="terminal-container">\n\n    <div id="container">\n\n        <output></output>\n\n        <div id="input-line" class="input-line">\n\n            <div class="prompt" [innerHtml]="promt"></div>\n\n            <div><input id="cmdline" class="cmdline" autofocus/></div>\n\n        </div>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\modals\ssh\ssh-terminal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__data_DataModel__["a" /* DataModel */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
], SSHTerminalPage);

//# sourceMappingURL=ssh-terminal.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(11);
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

/***/ 215:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisualizersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(11);
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
    }
    ngOnInit() {
        this.model.addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        this.model.addLoadingFinishedCallback(this.reloadingFinishedListener.bind(this));
        if (!this.model.isLoading())
            this.reloadingFinishedListener();
    }
    reloadingFinishedListener() {
        this.visualizers = [];
        if (!(this.model.visualizers == null || this.model.visualizers == undefined)) {
            this.visualizers = this.model.visualizers;
            this.isLoading = false;
            this.modifyLinks();
            this.selectedVisualizer = this.visualizers[0];
        }
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
        selector: 'page-visualizers',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\visualizers\visualizers.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Visualizers</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (click)="reload()" *ngIf="!isLoading"><ion-icon name="refresh"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div text-center padding [hidden]="!isLoading">\n\n        <ion-spinner></ion-spinner>\n\n    </div>\n\n\n\n    <ion-item no-padding [hidden]="isLoading">\n\n        <ion-label>Diagram:</ion-label>\n\n        <ion-select (ionChange)="visualizerSelected($event)" interface="action-sheet" style="max-width: 75% !important;">\n\n            <ion-option *ngFor="let v of visualizers" [value]="v">{{v.name}}</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item no-padding style="margin-left: auto; margin-right: auto; max-width: 100%;" [hidden]="isLoading">\n\n        <img src="{{selectedVisualizer.file}}"/>\n\n    </ion-item>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\visualizers\visualizers.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */]])
], VisualizersPage);

//# sourceMappingURL=visualizers.js.map

/***/ }),

/***/ 216:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HumansPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(11);
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

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(11);
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

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyzerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hf_classical_hf_categories__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__analyzer_detail__ = __webpack_require__(222);
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
        if (this.dataExists()) {
            this.isLoading = false;
            this.setStatusCard();
            this.setPlots2();
            this.viewers.find(v => v.id === "overall_pathway").src = this.model.monitoringUrls[0].urls[0].plot_overall_pathway;
            this.setForecast();
        }
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
        selector: 'page-analyzer',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\analyzer.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Happy Monitoring Analyzer</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only (click)="reload()" *ngIf="!isLoading"><ion-icon name="refresh"></ion-icon></button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content no-padding>\n\n    <div text-center padding [hidden]="!isLoading">\n\n        <ion-spinner></ion-spinner>\n\n    </div>\n\n\n\n    <ion-list [hidden]="isLoading" no-padding>\n\n        <!-- Status card -->\n\n        <ion-card no-padding no-margin style="width: 100%" (click)="speakSummary()">\n\n            <ion-card color="{{statusColor}}">\n\n                <ion-card-header>\n\n                    Status: {{statusLevel}}\n\n                </ion-card-header>\n\n            </ion-card>\n\n            <ion-card-content no-padding>\n\n                <ion-item text-wrap>\n\n                    <ion-thumbnail item-start>\n\n                        <img src="{{statusImg}}">\n\n                    </ion-thumbnail>\n\n                    <h2>{{statusText}}</h2>\n\n                </ion-item>\n\n            </ion-card-content>\n\n        </ion-card>\n\n        <br>\n\n\n\n        <!-- Viewer chooser -->\n\n        <ion-item no-padding>\n\n            <ion-label>Viewer:</ion-label>\n\n            <ion-select (ionChange)="viewerChanged($event)" interface="action-sheet" style="max-width: 81% !important;">\n\n                <ion-option *ngFor="let v of viewers" [selected]="v.id === \'overall_pathway\'" [value]="v">{{v.name}}</ion-option>\n\n            </ion-select>\n\n        </ion-item>\n\n\n\n\n\n        <!-- TYPE == plots -->\n\n        <ng-container *ngIf="(selectedViewer.type === \'plots\')">\n\n            <ion-item *ngFor="let monitoringURL of selectedViewer.src.monitoringURLs" no-padding no-margin text-wrap>\n\n                <ion-card no-padding no-margin>\n\n                    <ion-card-header class="group-title">{{monitoringURL.name}}</ion-card-header>\n\n                    <ion-card-content no-padding>\n\n                        <ion-grid no-padding>\n\n                            <ion-row class="group" no-padding no-margin>\n\n                                <ion-col col-6 col-sm no-padding *ngFor="let url of monitoringURL.urls">\n\n                                    <div class="launchpad">\n\n                                        <div class="logo"><img src="{{url.plot}}" alt="Not Analyzed" (click)="openPage(url)"/></div>\n\n                                        <a href="{{url.link}}" target="_blank"><div class="caption">{{url.name}}</div></a>\n\n                                    </div>\n\n                                </ion-col>\n\n                            </ion-row>\n\n                        </ion-grid>\n\n                    </ion-card-content>\n\n                </ion-card>\n\n            </ion-item>\n\n        </ng-container>\n\n\n\n\n\n        <!-- TYPE == img -->\n\n        <ion-item *ngIf="(selectedViewer.type === \'img\')">\n\n            <img src="{{selectedViewer.src}}"/>\n\n        </ion-item>\n\n\n\n        <!-- TYPE == imgs -->\n\n        <ion-item *ngIf="(selectedViewer.type === \'imgs\')">\n\n            <ion-row>\n\n                <ion-col col-sm-4 *ngFor="let src of selectedViewer.src">\n\n                    <img src="{{src}}">\n\n                </ion-col>\n\n            </ion-row>\n\n        </ion-item>\n\n\n\n    </ion-list>\n\n\n\n    <!-- TYPE == page -->\n\n    <span [hidden]="!(selectedViewer.type === \'page\')">\n\n        <ng-container #parent></ng-container>\n\n    </span>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\analyzer.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__angular_core__["o" /* ComponentFactoryResolver */]])
], AnalyzerPage);

//# sourceMappingURL=analyzer.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HFCategoriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ClassicalDataModel__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hf_modules__ = __webpack_require__(220);
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

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HFModulesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ClassicalDataModel__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(221);
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

/***/ 222:
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

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return WidgetCard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_DataModel__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_detail_image__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Positions__ = __webpack_require__(301);
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
                eval("import('./Positions')");
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
            throw e;
            //return null;
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

/***/ 224:
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

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(246);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_monitoring_monitoring__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_monitoring_monitoring_webview__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_analyzer_analyzer_detail__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_controller_controller__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_controller_controller_detail__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_visualizers_visualizers__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_logs_logs__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_humans_humans__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_working_working__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_modals_config_config__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_modals_config_instances_component__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_modals_config_modal__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__data_DataModel__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_analyzer_hf_classical_ClassicalDataModel__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_analyzer_hf_classical_hf_categories__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_analyzer_hf_classical_hf_modules__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_analyzer_analyzer__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_modals_error_connection_error__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_modals_ssh_ssh_terminal__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_modals_ssh_pass_modal__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_modals_config_instances_browser_component__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_modals_about_about__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_home_home__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_home_home_detail_image__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__angular_common_http__ = __webpack_require__(302);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_in_app_browser__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__directives_position_Position__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_tour_tour__ = __webpack_require__(53);
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
            __WEBPACK_IMPORTED_MODULE_21__pages_analyzer_hf_classical_ClassicalDataModel__["a" /* ClassicalDataModel */],
            __WEBPACK_IMPORTED_MODULE_32__angular_common_http__["a" /* HttpClientModule */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 296:
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

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SSH2_Wrapper__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pass_modal__ = __webpack_require__(105);


class Terminal2 {
    constructor(cmdLineContainer, outputContainer, alertC, model, modalCtrl, viewCtrl) {
        //window.URL = window.URL || window.webkitURL;
        //window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        this.model = model;
        this.ssh = false;
        this.outlet = false;
        this.sshWrapper = null;
        this.alertCtrl = null;
        this.modalCtrl = null;
        this.viewCtrl = null;
        this.history_ = [];
        this.histpos_ = 0;
        this.histtemp_ = "";
        this.cmdLine_ = null;
        this.output_ = null;
        this.value = "";
        this.promt = "[usr@happy] # ";
        this.promtChangeCallback = null;
        this.CMDS_ = [
            'clear', 'date', 'echo', 'help', 'uname', 'whoami'
        ];
        this.cmdLine_ = document.querySelector(cmdLineContainer);
        this.output_ = document.querySelector(outputContainer);
        if (alertC != null && alertC != undefined)
            this.alertCtrl = alertC;
        else
            this.alertCtrl = null;
        if (modalCtrl != null && modalCtrl != undefined)
            this.modalCtrl = modalCtrl;
        else
            this.modalCtrl = null;
        if (viewCtrl != null && viewCtrl != undefined)
            this.viewCtrl = viewCtrl;
        else
            this.viewCtrl = null;
        /*let _this = this;
        window.addEventListener('click', function (e) {
            _this.cmdLine_.focus();
        }, false);*/
        //this.cmdLine_.addEventListener('click', this.inputTextClick_.bind(this), false);
        this.cmdLine_.addEventListener('keyup', this.valueHandler.bind(this), false);
        this.cmdLine_.addEventListener('keydown', this.backspaceHandler.bind(this), false);
        this.cmdLine_.addEventListener('keydown', this.historyHandler_.bind(this), false);
        this.cmdLine_.addEventListener('keydown', this.processNewCommand_.bind(this), false);
        /*this.util.toArray = function(list) {
            return Array.prototype.slice.call(list || [], 0);
        };*/
    }
    setPromtChange(callback) {
        this.promtChangeCallback = callback;
    }
    changePromt(str) {
        this.promt = str;
        if (this.promtChangeCallback != null && this.promtChangeCallback != undefined) {
            this.promtChangeCallback(this.promt);
        }
    }
    /*inputTextClick_()
    {
        this.cmdLine_.focus();
    }*/
    backspaceHandler(e) {
        if (e.keyCode == 8) {
            this.value = this.value.substring(0, this.value.length - 1);
        }
    }
    valueHandler(e) {
        /* Deprecated
        /* Deprecated
        console.log("OUTLET: " + this.outlet + "  KEYCODE: " + e.key);

        if(!this.outlet)
        {
            if((e.keyCode > 31 && e.keyCode < 127) || (e.keyCode > 127 && e.keyCode < 255)) // Recognize only printable characters
            {
                this.value = this.value + String.fromCharCode(e.keyCode);
                console.log("NEW VALUE: " + this.value);
            }
        }*/
        if (!this.outlet) {
            if (e.key.length != null || e.key.length != undefined) {
                this.value = this.value + e.target.value.charAt(e.target.value.length - 1);
            }
            //console.log("KEY WAS: " + e.key + "  AND VALUE IS: " + this.value);
        }
    }
    historyHandler_(e) {
        if (this.history_.length) {
            if (e.keyCode == 38 || e.keyCode == 40) {
                if (this.history_[this.histpos_]) {
                    this.history_[this.histpos_] = this.value;
                }
                else {
                    this.histtemp_ = this.value;
                }
            }
            if (e.keyCode == 38) {
                this.histpos_--;
                if (this.histpos_ < 0) {
                    this.histpos_ = 0;
                }
            }
            else if (e.keyCode == 40) {
                this.histpos_++;
                if (this.histpos_ > this.history_.length) {
                    this.histpos_ = this.history_.length;
                }
            }
            if (e.keyCode == 38 || e.keyCode == 40) {
                this.value = this.history_[this.histpos_] ? this.history_[this.histpos_] : this.histtemp_;
                //this.value = this.value; // Sets cursor to end of input.
                this.cmdLine_.value = this.value;
            }
        }
    }
    processNewCommand_(e) {
        console.log("KEYCODE: " + this.ssh);
        if (e.keyCode == 9)
            e.preventDefault();
        else if (e.keyCode == 13) {
            console.log("ENTER");
            // Save shell history.
            if (this.value) {
                this.history_[this.history_.length] = this.value;
                this.histpos_ = this.history_.length;
            }
            if (this.ssh) {
                let cmd = this.value + "\n";
                //let ret:string = this.ssh_mocfunc(cmd);
                //this.output(ret);
                if (this.sshWrapper == null || this.sshWrapper == undefined)
                    this.output("");
                else {
                    this.sshWrapper.write(cmd);
                }
            }
            else {
                let cmd = "";
                let args = [];
                if (this.value && this.value.trim()) {
                    args = this.value.split(' ').filter(function (val, i) {
                        return val;
                    });
                    cmd = args[0].toLowerCase();
                    args = args.splice(1); // Remove cmd from arg list.
                }
                cmd = cmd.replace(/[^\x20-\x7F]/g, "");
                console.log("CMD: " + this.value);
                switch (cmd) {
                    case 'cat':
                        let url = args.join(' ');
                        if (!url) {
                            //this.output('Usage: ' + cmd + ' https://s.codepen.io/...\nExample: ' + cmd + ' https://s.codepen.io/AndrewBarfield/pen/LEbPJx.js');
                            this.output("Usage: " + cmd + " < url >\n Example: " + cmd +
                                " https://github.com/HappyFaceGoettingen/HappyFace-MadMask/blob/timon_development/HappyFaceMobileDevelopment/README.md");
                            break;
                        }
                        let _this = this;
                        let req = new XMLHttpRequest();
                        req.onreadystatechange = function () {
                            if (req.readyState == 4) {
                                let encodedStr = req.responseText.replace(/[\u00A0-\u9999<>\&]/gim, (i) => {
                                    return '&#' + i.charCodeAt(0) + ';';
                                });
                                _this.output('<pre>' + encodedStr + '</pre>');
                            }
                        };
                        break;
                    case 'clear':
                        this.output_.innerHTML = '';
                        this.value = '';
                        return;
                    case 'date':
                        this.output(new Date().toLocaleString());
                        break;
                    case 'echo':
                        this.output(args.join(' '));
                        break;
                    case 'help':
                        this.output('<div class="ls-files">' + this.CMDS_.join('<br>') + '</div>');
                        break;
                    case 'ssh':
                        this.moveToSSH();
                        break;
                    case 'uname':
                        this.output(navigator.appVersion);
                        break;
                    case 'whoami':
                        let result = "usr\n <img src=\"" + window.location + "\"><br><br>";
                        this.output(result);
                        break;
                    case 'exit':
                        if (this.viewCtrl != null) {
                            this.viewCtrl.dismiss();
                            break;
                        }
                        else
                            break;
                    default:
                        if (cmd) {
                            this.output(cmd + ': command not found');
                        }
                }
            }
            window.scrollTo(0, Terminal2.getDocHeight_());
            this.value = ""; // Clear/setup line for next input.
        }
    }
    output(data) {
        // Convert to HTML
        data = data.replace(/\n/gi, "<br/>");
        console.log("CONVERTED DATA: " + data);
        // Duplicate current input and append to output section.
        let line = this.cmdLine_.parentNode.parentNode.cloneNode(true);
        line.removeAttribute('id');
        line.classList.add('line');
        let input = line.querySelector('input.cmdline');
        input.autofocus = false;
        input.readOnly = true;
        this.output_.appendChild(line);
        // Clear current input section
        this.cmdLine_.parentNode.parentNode.querySelector('input.cmdline').value = "";
        // Print out
        if (this.ssh)
            this.output_.insertAdjacentHTML('beforeEnd', data);
        else
            this.output_.insertAdjacentHTML('beforeEnd', '<p>' + data + '</p>');
    }
    moveToSSH() {
        if (this.sshWrapper == null || this.sshWrapper == undefined) {
            try {
                this.sshWrapper = new __WEBPACK_IMPORTED_MODULE_0__SSH2_Wrapper__["a" /* SSH2Wrapper */]();
            }
            catch (error) {
                if (this.alertCtrl != null) {
                    if (this.model.isAndroid()) {
                        let alert = this.alertCtrl.create({
                            title: "SSH not available",
                            subTitle: "An unknown error makes SSH Cordova plugin unavailable.\nPlease use external " +
                                "clients like JuiceSSH, ConnectBot or Terminus.",
                            cssClass: "alertText",
                            buttons: ["OK"]
                        });
                        alert.present();
                    }
                    else if (this.model.isiOS()) {
                        let alert = this.alertCtrl.create({
                            title: "SSH not available (yet)",
                            subTitle: "The SSH plugin is not available in iOS for now. Our intelligent (and extraordinary good looking) " +
                                "team is already working on it, but for now please use external ssh clients like Terminus or iTerminal",
                            cssClass: "alertText",
                            buttons: ["OK"]
                        });
                        alert.present();
                    }
                    else {
                        let alert = this.alertCtrl.create({
                            title: "SSH not available (yet)",
                            subTitle: "The SSH client is in this version of HappyFaceMobile (probably the browser version) not available. " +
                                "Due to the limitations of portable web apps (pwa), this feature might not be included at all. Please use your " +
                                "linux terminal to connect.",
                            cssClass: "alertText",
                            buttons: ["OK"]
                        });
                        alert.present();
                    }
                }
                else {
                    console.log("ERROR: SSH plugin is missing.");
                }
                this.sshWrapper = null;
                this.output("");
                return;
            }
        }
        this.outlet = true;
        let modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_1__pass_modal__["a" /* PassModal */]);
        modal.onDidDismiss(this.gotSSHPass.bind(this));
        modal.present();
    }
    gotSSHPass(data) {
        this.outlet = false;
        if (data == null || data.enter == undefined || !data.enter) {
            this.output("");
            return;
        }
        this.ssh = true;
        this.sshWrapper.host = data.host;
        this.sshWrapper.port = data.port;
        this.sshWrapper.username = data.user;
        this.sshWrapper.password = data.pass;
        this.sshWrapper.onData = (data) => { this.output(data); };
        this.sshWrapper.onError = (error) => { console.log("SSH ERROR: " + error); };
        this.sshWrapper.connect(true);
        this.changePromt("[usr@ssh] # ");
        this.output("");
    }
    static getDocHeight_() {
        let d = document;
        return Math.max(Math.max(d.body.scrollHeight, d.documentElement.scrollHeight), Math.max(d.body.offsetHeight, d.documentElement.offsetHeight), Math.max(d.body.clientHeight, d.documentElement.clientHeight));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Terminal2;

//# sourceMappingURL=Terminal2.js.map

/***/ }),

/***/ 301:
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

/***/ 308:
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

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__instances_component__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__about_about__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tour_tour__ = __webpack_require__(53);
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
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__tour_tour__["a" /* TourPage */], {});
            console.log("Starting tour");
        }, 500);
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

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TourPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(42);
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

},[225]);
//# sourceMappingURL=main.js.map