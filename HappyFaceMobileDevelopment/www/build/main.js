webpackJsonp([0],{

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__instances_component__ = __webpack_require__(204);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ConfigPage = /** @class */ (function () {
    function ConfigPage(model, navCtrl, navParams) {
        this.model = model;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.automaticFetch = true;
        this.interval = 1;
        this.automaticRotation = false;
        this.detectOnlyChange = true;
        this.enableMadVision = true;
        this.enableTextSpeech = true;
        this.enableAutoReadout = false;
        this.speakInterval = 1;
        this.happyFaceCompatible = false;
    }
    ConfigPage.prototype.notify = function () {
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
    };
    ConfigPage.prototype.chooseInstance = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__instances_component__["a" /* InstancesComponent */]);
    };
    ConfigPage.prototype.closeModal = function () {
        var viewCtrl = this.navParams.get('viewCtrl');
        viewCtrl.dismiss();
    };
    ConfigPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-config',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\config\config.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Configuration</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()"><ion-icon name="close"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list>\n        <ion-item (click)="chooseInstance()">\n            <!-- Move to Instance selection page -->\n            <span style="float: left; padding-top: 10px; padding-bottom: 10px"> Choose Instance</span>\n            <span style="float: right; padding-top: 10px; padding-bottom: 10px"><ion-icon name="ios-arrow-forward"></ion-icon></span> <!--<i class="icon ion-ios-arrow-right"></i>-->\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Automatic rotation</ion-label>\n            <ion-toggle [(ngModel)]="automaticRotation" (ionChange)="notify()"></ion-toggle>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Automatic fetch</ion-label>\n            <ion-toggle [(ngModel)]="automaticFetch" (ionChange)="notify()"></ion-toggle>\n        </ion-item>\n\n        <ion-list-header *ngIf="automaticFetch">\n            Reload Interval:\n            <ion-badge item-end>{{interval}} min</ion-badge>\n        </ion-list-header>\n        <ion-item *ngIf="automaticFetch">\n            <ion-range [min]="1" [max]="60" [step]="1" [(ngModel)]="interval">\n                <ion-icon range-left name="time"></ion-icon>\n            </ion-range>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Detect only change</ion-label>\n            <ion-toggle [(ngModel)]="detectOnlyChange" (ionChange)="notify()"></ion-toggle>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Enable Mad Vision</ion-label>\n            <ion-toggle [(ngModel)]="enableMadVision" (ionChange)="notify()"></ion-toggle>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Enable Text speech</ion-label>\n            <ion-toggle [(ngModel)]="enableTextSpeech" (ionChange)="notify()"></ion-toggle>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Enable automatic voice readout</ion-label>\n            <ion-toggle [(ngModel)]="enableAutoReadout" (ionChange)="notify()"></ion-toggle>\n        </ion-item>\n\n        <ion-list-header *ngIf="enableAutoReadout">\n            Readout Interval:\n            <ion-badge item-end>{{speakInterval}} min</ion-badge>\n        </ion-list-header>\n        <ion-item *ngIf="enableAutoReadout">\n            <ion-range [min]="1" [max]="60" [step]="1" [(ngModel)]="speakInterval">\n                <ion-icon range-left name="time"></ion-icon>\n            </ion-range>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>HappyFace compatible</ion-label>\n            <ion-toggle [(ngModel)]="happyFaceCompatible" (ionChange)="notify()"></ion-toggle>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\config\config.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavParams */]])
    ], ConfigPage);
    return ConfigPage;
}());

//# sourceMappingURL=config.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HFCategoriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ClassicalDataModel__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hf_modules__ = __webpack_require__(212);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HFCategoriesPage = /** @class */ (function () {
    function HFCategoriesPage(classicModel, navCtrl) {
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
    HFCategoriesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.classicModel.addLoadingFinishedCallback(this.loadingFinishedListener.bind(this));
        if (!this.classicModel.isLoading())
            this.loadingFinishedListener();
        this.outdateHandler = setInterval(function () { _this.outdated = true; }, 1200000);
    };
    HFCategoriesPage.prototype.loadingFinishedListener = function () {
        this.isLoading = false;
        this.categories = this.classicModel.categories;
        this.data_time = this.classicModel.lastRefreshed.toLocaleString();
    };
    HFCategoriesPage.prototype.reload = function () {
        var _this = this;
        clearInterval(this.outdateHandler);
        this.outdateHandler = setInterval(function () { _this.outdated = true; }, 1200000);
        this.classicModel.addLoadingFinishedCallback(this.loadingFinishedListener.bind(this));
        if (!this.classicModel.isLoading())
            this.loadingFinishedListener();
        this.classicModel.reload();
    };
    HFCategoriesPage.prototype.imgForCategory = function (cat) {
        return cat.status == 1.0 ? this.IMG_HAPPY : (cat.status == 0.5 ? this.IMG_WARNING : (cat.status == 0.0 ? this.IMG_CRITICAL : this.IMG_ERROR));
    };
    HFCategoriesPage.prototype.categorySelected = function (cat) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__hf_modules__["a" /* HFModulesPage */], { 'category': cat });
    };
    HFCategoriesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-hf-categories",template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\hf-classical\hf-categories.html"*/'<!--<ion-header>\n    <ion-navbar>\n        <ion-title>Categories</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="reload()"><ion-icon name="refresh"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>-->\n\n<style>.scroll-content {\n    padding: 0 !important;\n}</style>\n\n<ion-content>\n    <div text-center padding *ngIf="isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <div class="complete-overlay" padding *ngIf="outdated && !isLoading">\n        <h1 class="outdated">Outdated</h1>\n    </div>\n    <div class="complete-overlay" padding *ngIf="false && !isLoading">\n        <h1 class="no-active-instance">No Active Instance</h1>\n    </div>\n\n    <div text-center *ngIf="!isLoading" no-padding><h5>data from {{data_time}}</h5></div>\n\n    <ion-grid *ngIf="!isLoading">\n        <ion-row>\n            <ion-col col-6 col-sm *ngFor="let category of categories">\n                <ion-card (click)="categorySelected(category)">\n                    <ion-card-content>\n                        <img src="{{imgForCategory(category)}}" height="50px" width="50px"/><br/>\n                        <div class="cat-title"><h2>{{category.title}}</h2></div>\n                    </ion-card-content>\n                </ion-card>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\hf-classical\hf-categories.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ClassicalDataModel__["a" /* ClassicalDataModel */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */]])
    ], HFCategoriesPage);
    return HFCategoriesPage;
}());

//# sourceMappingURL=hf-categories.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClassicalDataModel; });
/* unused harmony export XML2JSON */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ClassicalDataModel = /** @class */ (function () {
    function ClassicalDataModel(model) {
        this.model = model;
        this.categories = [];
        this.lastRefreshed = new Date();
        this.loading = false;
        this.loadingFinishedCallbacks = [];
        this.reload();
    }
    ClassicalDataModel.prototype.reload = function () {
        this.loading = true;
        var url = "http://" + this.model.currentlyActive.host + ":" + this.model.currentlyActive.web_port + "/category?action=getxml";
        this.asyncReadFile(url, this.parseXMLResult.bind(this));
    };
    ClassicalDataModel.prototype.asyncReadFile = function (url, callback) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                callback(req.responseText, req.status);
            }
        };
        req.open("GET", url, true);
        req.send();
    };
    ClassicalDataModel.prototype.parseXMLResult = function (response, statusCode) {
        var HFTree = [];
        if (statusCode == 200) {
            response = response.replace("\\n", "");
            var cat = XML2JSON.xmlStringToJSON(response);
            HFTree = cat.happyface;
        }
        else {
            this.categories = null;
            this.loading = false;
            for (var i = 0; i < this.loadingFinishedCallbacks.length; i++) {
                this.loadingFinishedCallbacks[i]();
            }
            return;
        }
        // Parsing
        for (var i = 0; i < HFTree.category.length; i++)
            HFTree.category[i].status = parseFloat(HFTree.category[i].status);
        this.categories = HFTree.category;
        this.lastRefreshed = new Date();
        this.loading = false;
        for (var i = 0; i < this.loadingFinishedCallbacks.length; i++) {
            this.loadingFinishedCallbacks[i]();
        }
    };
    ClassicalDataModel.prototype.addLoadingFinishedCallback = function (callback) { this.loadingFinishedCallbacks.push(callback); };
    ;
    ClassicalDataModel.prototype.isLoading = function () { return this.loading; };
    ClassicalDataModel.prototype.loadModuleContent = function (module, callback) {
    };
    ClassicalDataModel = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */]])
    ], ClassicalDataModel);
    return ClassicalDataModel;
}());

var XML2JSON = /** @class */ (function () {
    function XML2JSON() {
    }
    // Credits to http://davidwalsh.name/convert-xml-json and https://gist.github.com/chinchang/8106a82c56ad007e27b1
    XML2JSON.xmlToJSON = function (xml) {
        var obj = {};
        if (xml.nodeType == 1) {
            if (xml.attributes.length > 0) {
                obj['@attributes'] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
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
            for (var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (nodeName === "#text")
                    continue;
                if (typeof (obj[nodeName]) == 'undefined') {
                    obj[nodeName] = this.xmlToJSON(item);
                }
                else {
                    if (typeof (obj[nodeName].push) == 'undefined') {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJSON(item));
                }
            }
        }
        return obj;
    };
    XML2JSON.xmlStringToJSON = function (str) {
        var xmlDOM = new DOMParser().parseFromString(str, 'text/xml');
        return this.xmlToJSON(xmlDOM);
    };
    return XML2JSON;
}());

//# sourceMappingURL=ClassicalDataModel.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyzerDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AnalyzerDetailPage = /** @class */ (function () {
    function AnalyzerDetailPage(navParams) {
        this.navParams = navParams;
        this.url = this.navParams.get('url');
        if (this.url == null || this.url == undefined) {
            this.url = { "name": "", "analysis_plot": "http://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg" };
        }
    }
    AnalyzerDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-analyzer-detail',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\analyzer-detail.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{url.name}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <img style="margin-left: auto; margin-right: auto; max-width: 100%;" src="{{url.analysis_plot}}"/>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\analyzer-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], AnalyzerDetailPage);
    return AnalyzerDetailPage;
}());

//# sourceMappingURL=analyzer-detail.js.map

/***/ }),

/***/ 114:
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
webpackEmptyAsyncContext.id = 114;

/***/ }),

/***/ 155:
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
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export modelCounter */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataModel; });
/* unused harmony export ConfigObject */
/* unused harmony export StatusObject */
/* unused harmony export InstanceObject */
/* unused harmony export ConfigurationObject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_error_connection_error__ = __webpack_require__(201);
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
var DataModel = /** @class */ (function () {
    function DataModel(plt, storage, modalCtrl) {
        this.plt = plt;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.host = "141.5.108.30"; // HOST and PORT have initial values due to the third option in constructor
        this.port = "20200"; // NOTE: This might get fixed (=removed) in the future
        this.dir = "sites/default";
        this.config = null;
        this.monitoringUrls = null;
        this.summary = null;
        this.systems = null;
        this.visualizers = null;
        this.logs = null;
        this.humans = null;
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
        // Loop
        this.loopHandler = null;
        this.loopCounter = 0;
        modelCounter++;
        console.log("DataModel creation counter: " + modelCounter);
        this.findInitialConfiguration();
        this.initLoop();
    }
    DataModel_1 = DataModel;
    DataModel.prototype.addLoadingFinishedCallback = function (callback) { this.loadingFinishedCallbacks.push(callback); };
    DataModel.prototype.removeLoadingFinishedCallback = function (callback) {
        this.loadingFinishedCallbacks = this.loadingFinishedCallbacks.filter(function (obj) { return obj !== callback; });
    };
    DataModel.prototype.addLoadingStartedCallback = function (callback) { this.loadingStartedCallbacks.push(callback); };
    DataModel.prototype.removeLoadingStartedCallback = function (callback) {
        this.loadingStartedCallbacks = this.loadingStartedCallbacks.filter(function (obj) { return obj !== callback; });
    };
    DataModel.prototype.isLoading = function () { return this.loading; };
    DataModel.prototype.reload = function () {
        this.loading = true;
        this.errors = [];
        for (var i = 0; i < this.loadingStartedCallbacks.length; i++) {
            console.log("Started start callback");
            this.loadingStartedCallbacks[i]();
        }
        this.asyncLoadFile(this.getRemoteURL() + this.currentlyActive.dir + "/" + DataModel_1.configJson, this.reload_next.bind(this));
    };
    DataModel.prototype.reload_next = function (content, statusCode) {
        if (statusCode == 200)
            this.config = JSON.parse(content);
        else {
            this.errors.push({ "url": this.getRemoteURL() + this.currentlyActive.dir + "/" + DataModel_1.configJson, "code": statusCode });
            this.initError();
            return;
        }
        var urls = [DataModel_1.monitoringUrlsJson, DataModel_1.systemsJson, DataModel_1.visualizersJson,
            DataModel_1.logsJson, DataModel_1.humansJson, DataModel_1.meta_meta_json, DataModel_1.summaryJson];
        for (var i = 0; i < urls.length; i++) {
            if (this.currentlyActive.host == "localhost")
                urls[i] = this.currentlyActive.dir + "/" + urls[i];
            else
                urls[i] = this.getRemoteURL() + (i == urls.length - 1 ? this.config.data_dir : this.currentlyActive.dir) + "/" + urls[i];
        }
        this.readFileListAsync(urls, this.finishingCallback.bind(this));
    };
    DataModel.prototype.readFileListAsync = function (urls, callback) {
        var results = new Array(urls.length);
        var statusCodes = new Array(urls.length);
        var remainingCounter = urls.length;
        for (var i = 0; i < urls.length; i++) {
            console.log("READING: " + urls[i]);
            var req = new XMLHttpRequest();
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
    };
    DataModel.prototype.finishingCallback = function (responses, statusCodes) {
        //console.log("THIS: " + JSON.stringify(this));
        //if(statusCodes[0] == 200) this.config = JSON.parse(responses[0]);
        //else this.config = null;
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
            this.pushError(DataModel_1.monitoringUrlsJson, statusCodes[1]);
        }
        if (statusCodes[2] == 200)
            this.visualizers = JSON.parse(responses[2]);
        else {
            this.visualizers = null;
            this.pushError(DataModel_1.monitoringUrlsJson, statusCodes[2]);
        }
        if (statusCodes[3] == 200)
            this.logs = JSON.parse(responses[3]);
        else {
            this.logs = null;
            this.pushError(DataModel_1.monitoringUrlsJson, statusCodes[3]);
        }
        if (statusCodes[4] == 200)
            this.humans = JSON.parse(responses[4]);
        else {
            this.humans = null;
            this.pushError(DataModel_1.monitoringUrlsJson, statusCodes[4]);
        }
        if (statusCodes[5] == 200)
            this.metaMetaSites = JSON.parse(responses[5]);
        else {
            this.metaMetaSites = null;
            this.pushError(DataModel_1.monitoringUrlsJson, statusCodes[5]);
        }
        if (statusCodes[6] == 200)
            this.summary = JSON.parse(responses[6]);
        else {
            this.summary = null;
            this.pushError(DataModel_1.monitoringUrlsJson, statusCodes[6]);
        }
        this.loading = false;
        for (var i = 0; i < this.loadingFinishedCallbacks.length; i++) {
            console.log("Started finished callback");
            this.loadingFinishedCallbacks[i]();
        }
    };
    // Asynchronous load file
    DataModel.prototype.asyncLoadFile = function (url, callback) {
        console.log("READING: " + url);
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                callback(req.response, req.status);
            }
        };
        req.open("GET", url, true);
        req.send();
    };
    // Synchronous load JSON file (for config)
    DataModel.prototype.syncLoadFile = function (url) {
        console.log("Loading: " + url);
        var result = null;
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                result = JSON.parse(req.response);
            }
        };
        req.onerror = function () { console.log("ERROR LOADING FILE SYNC."); result = null; };
        req.open("GET", url, false);
        req.send();
        return result;
    };
    DataModel.prototype.initError = function () {
        var _this = this;
        var preset = this.configuration.get().automaticFetch;
        this.configuration.setAutomaticFetch(false);
        console.log("ERROR initialized");
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_error_connection_error__["a" /* ConnectionErrorPage */], { "host": this.currentlyActive.host, "port": this.currentlyActive.mobile_port, "errors": this.errors });
        modal.onDidDismiss(function (data) {
            if (data.retry) {
                _this.currentlyActive.host = data.host;
                _this.currentlyActive.mobile_port = data.port;
                _this.reload();
                _this.configuration.setAutomaticFetch(preset);
            }
        });
        modal.present();
    };
    // Helpers
    DataModel.prototype.getRemoteURL = function () {
        return "http://" + this.currentlyActive.host + ":" + this.currentlyActive.mobile_port + "/";
    };
    DataModel.prototype.isHttpURL = function (url) {
        return new RegExp('^(http|https)(:\\/\\/)').test(url);
    };
    DataModel.prototype.pushError = function (website, code) {
        this.errors.push({ "url": this.getRemoteURL() + this.currentlyActive.dir + "/" + website, "code": code });
    };
    DataModel.prototype.speakSummary = function () {
        if (this.configuration == null || this.summary == null || this.summary.text == null)
            return;
        if (this.configuration == undefined || this.summary == undefined || this.summary.text == undefined)
            return;
        if (this.configuration.get().enableTextSpeech) {
            var u = new SpeechSynthesisUtterance();
            u.text = this.summary.text;
            u.lang = 'en-GB';
            speechSynthesis.speak(u);
        }
    };
    DataModel.prototype.initLoop = function () {
        var _this = this;
        if (this.configuration.get().automaticFetch && this.configuration.get().enableTextSpeech) {
            this.loopHandler = setInterval(function () {
                _this.loopCounter++;
                // List all loop dependent configurations as if (like in automaticFetch below)
                if (_this.configuration.get().automaticFetch && (_this.loopCounter % _this.configuration.get().reloadInterval == 0))
                    _this.reload();
                if (_this.configuration.get().enableAutoReadout && (_this.loopCounter % _this.configuration.get().speakInterval == 0))
                    _this.speakSummary();
            }, 60000);
        }
    };
    DataModel.prototype.updateLoop = function () {
        if (!this.loopHandler == null)
            clearInterval(this.loopHandler);
        this.initLoop();
        console.log("Updated Loop");
    };
    // Initial configuration
    DataModel.prototype.findInitialConfiguration = function () {
        var _this = this;
        // App running on a webserver:
        if (this.isHost()) {
            this.currentlyActive.host = window.location.hostname;
            this.currentlyActive.mobile_port = window.location.port;
            this.currentlyActive.dir = "sites/default";
            console.log("POSITION: " + window.location.hostname + ":" + window.location.port);
            /*this.loadConfig();
            this.currentlyActive.name = this.config.site_name;*/
            this.reload();
        }
        else {
            this.currentlyActive.name = "GoeGrid";
            this.currentlyActive.host = "141.5.108.30";
            this.currentlyActive.mobile_port = "20200";
            this.currentlyActive.web_port = "10200";
            this.currentlyActive.dir = "sites/default";
            this.storage.get('instance').then(function (value) {
                if (!(value == null || value == undefined))
                    _this.currentlyActive = value;
                console.log("Saved Instance is: " + JSON.stringify(value));
                //this.currentlyActive.host = "141.5.108.31";
                _this.reload();
            });
        }
    };
    // Determinations.
    // isMobilePhone() is used to rearrange the UI based on the smaller screen size on mobile phones
    // isHost() is used to add/remove functions unnecessary on mobile phone / browser
    // NOTE: isHost() is based on whether or not the mobile phone application is used because browsers are most likely connected to a remote host.
    // Determine if screen size fits to a mobile device. NOTE: This doesn't say anything about device native functions
    DataModel.prototype.isMobilePhone = function () {
        return DataModel_1.FORCE_MOBILE_VISION || !this.plt.is('core');
    };
    // Determine whether this instance should show content hosted by itself or should connect to a remote host
    // NOTE: connect to host is most likely true for mobile applications and self hosted content is most likely true for browser applications
    DataModel.prototype.isHost = function () {
        //return DataModel.FORCE_SELFHOST_DEBUG || this.plt.is('core'); // || this.plt.is('mobileweb');
        return false;
    };
    // Singletone Depreceated
    // private static _instance:DataModel = null;
    // public  static getInstance() { if(this._instance == null) return (this._instance = new DataModel()); else return this._instance;}
    // { return this._instance || (this._instance = new DataModel()); };
    // Debug switches
    DataModel.FORCE_SELFHOST_DEBUG = false;
    DataModel.FORCE_MOBILE_VISION = false;
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
    DataModel = DataModel_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */]) === "function" && _c || Object])
    ], DataModel);
    return DataModel;
    var DataModel_1, _a, _b, _c;
}());

var ConfigObject = /** @class */ (function () {
    function ConfigObject() {
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
    return ConfigObject;
}());

var StatusObject = /** @class */ (function () {
    function StatusObject() {
        this.name = "";
        this.color = "";
        this.file = "";
    }
    return StatusObject;
}());

var InstanceObject = /** @class */ (function () {
    function InstanceObject() {
        this.name = "GoeGrid";
        this.host = "141.5.108.30";
        this.web_port = "10200";
        this.mobile_port = "20200";
        this.dir = "sites/default"; // sites/GoeGrid
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
    return InstanceObject;
}());

var ConfigurationObject = /** @class */ (function () {
    function ConfigurationObject() {
        this._automaticFetch = true;
        this._reloadInterval = 1;
        this._automaticRotation = false;
        this._detectOnlyChange = true;
        this._enableMadVision = true;
        this._enableTextSpeech = true;
        this._enableAutoReadout = false;
        this._speakInterval = 1;
        this._happyFaceCompatible = false;
    }
    ConfigurationObject.prototype.get = function () {
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
    };
    ConfigurationObject.prototype.setAutomaticFetch = function (value) { this._automaticFetch = value; };
    ConfigurationObject.prototype.setReloadInterval = function (value) { this._reloadInterval = value; };
    ConfigurationObject.prototype.setAutomaticRotation = function (value) { this._automaticRotation = value; };
    ConfigurationObject.prototype.setDetectOnlyChange = function (value) { this._detectOnlyChange = value; };
    ConfigurationObject.prototype.setEnableMadVision = function (value) { this._enableMadVision = value; };
    ConfigurationObject.prototype.setEnableTextSpeech = function (value) { this._enableTextSpeech = value; };
    ConfigurationObject.prototype.setEnableAutoReadout = function (value) { this._enableAutoReadout = value; };
    ConfigurationObject.prototype.setSpeakInterval = function (value) { this._speakInterval = value; };
    ConfigurationObject.prototype.setHappyFaceCompatible = function (value) { this._happyFaceCompatible = value; };
    return ConfigurationObject;
}());

//# sourceMappingURL=DataModel.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__monitoring_monitoring__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controller_controller__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__logs_logs__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__visualizers_visualizers__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__humans_humans__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__working_working__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config_config__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__analyzer_analyzer2__ = __webpack_require__(211);
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
var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tabMonitoring = __WEBPACK_IMPORTED_MODULE_2__monitoring_monitoring__["a" /* MonitoringPage */];
        this.tabAnalyzer = __WEBPACK_IMPORTED_MODULE_9__analyzer_analyzer2__["a" /* AnalyzerPage2 */];
        this.tabSystems = __WEBPACK_IMPORTED_MODULE_3__controller_controller__["a" /* ControllerPage */];
        this.tabVisualizer = __WEBPACK_IMPORTED_MODULE_5__visualizers_visualizers__["a" /* VisualizersPage */];
        this.tabLogs = __WEBPACK_IMPORTED_MODULE_4__logs_logs__["a" /* LogsPage */];
        this.tabHumans = __WEBPACK_IMPORTED_MODULE_6__humans_humans__["a" /* HumansPage */];
        this.tabConfig = __WEBPACK_IMPORTED_MODULE_8__config_config__["a" /* ConfigPage */];
        this.tabWorking = __WEBPACK_IMPORTED_MODULE_7__working_working__["a" /* WorkingPage */];
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TabsPage');
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\tabs\tabs.html"*/'<ion-content padding>\n  <ion-tabs [selectedIndex]="7">\n    <ion-tab [root]="tabMonitoring" tabTitle="Monitoring" tabIcon="ios-speedometer"></ion-tab>\n    <ion-tab [root]="tabAnalyzer" tabTitle="Analyzer" tabIcon="ios-analytics"></ion-tab>\n    <ion-tab [root]="tabSystems" tabTitle="Controller" tabIcon="ios-game-controller-b"></ion-tab>\n    <ion-tab [root]="tabVisualizer" tabTitle="Visualizer" tabIcon="ios-desktop"></ion-tab>\n    <ion-tab [root]="tabLogs" tabTitle="Logs" tabIcon="ios-recording"></ion-tab>\n    <ion-tab [root]="tabHumans" tabTitle="Humans" tabIcon="ios-people"></ion-tab>\n    <ion-tab [root]="tabConfig" tabTitle="Config" tabIcon="ios-settings" *ngIf="false"></ion-tab>\n    <ion-tab [root]="tabWorking" tabTitle="Working" tabIcon="ios-nuclear" *ngIf="true"></ion-tab>\n  </ion-tabs>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\tabs\tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonitoringPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__monitoring_webview__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_modal__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MonitoringPage = /** @class */ (function () {
    function MonitoringPage(model, navControl, alertCtrl, modalCtrl) {
        this.model = model;
        this.navControl = navControl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.isLoading = true;
        this.statusLevel = "Warning";
        this.statusImg = "https://i.ytimg.com/vi/RqRNd4UyA4c/maxresdefault.jpg";
        this.statusColor = "item-calm";
        this.statusText = "World wide Atlas Distributed Computing System";
        // Helper
        this.plot_name = "analysis";
    }
    MonitoringPage.prototype.ngOnInit = function () {
        //DataModel.getInstance().addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        //DataModel.getInstance().addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        //if(!DataModel.getInstance().isLoading()) this.onReloadFinishedListener();
        this.model.addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        this.model.addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        if (!this.model.isLoading())
            this.onReloadFinishedListener();
    };
    MonitoringPage.prototype.onReloadFinishedListener = function () {
        if (this.dataExists()) {
            this.isLoading = false;
            this.setHistory();
            this.setStatusCard();
            this.setLinks("latest");
        }
    };
    MonitoringPage.prototype.onLoadingStartedListener = function () {
        this.isLoading = true;
    };
    MonitoringPage.prototype.dataExists = function () {
        if (!(this.model.summary == null || this.model.summary == undefined)) {
            if (!(this.model.config == null || this.model.config == undefined)) {
                if (!(this.model.config.status == null || this.model.config.status == undefined)) {
                    return true;
                }
            }
        }
        return false;
    };
    MonitoringPage.prototype.openModalConfig = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__config_modal__["a" /* ModalPage */]);
        modal.present();
    };
    MonitoringPage.prototype.reload = function () {
        console.log("ISLOADING: " + this.isLoading);
        if (this.isLoading)
            return;
        this.isLoading = true;
        // DataModel.getInstance().reload();
        this.model.reload();
    };
    MonitoringPage.prototype.historyChanged = function (event) {
        this.setLinks(event);
    };
    MonitoringPage.prototype.setStatusCard = function () {
        //this.statusText  = DataModel.getInstance().summary.text;
        //this.statusLevel = DataModel.getInstance().summary.level;
        this.statusText = this.model.summary.text;
        this.statusLevel = this.model.summary.level;
        //let model:DataModel = DataModel.getInstance();
        for (var i = 0; i < this.model.config.status.length; i++) {
            if (this.model.config.status[i].name === this.statusLevel) {
                this.statusImg = this.model.config.status[i].file;
            }
        }
        for (var i = 0; i < this.model.config.status.length; i++) {
            if (this.model.config.status[i].name === this.statusLevel) {
                this.statusColor = this.model.config.status[i].color;
            }
        }
    };
    MonitoringPage.prototype.openHappyFaceCore = function () {
        window.open("http://" + this.model.currentlyActive.host + ":" + this.model.currentlyActive.web_port, "_blank");
    };
    MonitoringPage.prototype.setHistory = function () {
        //let str:string     = DataModel.getInstance().summary.history;
        var str = this.model.summary.history;
        var array = str.split(" ");
        this.history = [];
        for (var i = 0; i < array.length; i++)
            this.history.push({ "name": array[i], "datetime": array[i] });
        if (this.history.length != 0)
            this.latest = this.history[0].datetime;
        else
            this.latest = "";
    };
    MonitoringPage.prototype.openPage = function (url) {
        this.navControl.push(__WEBPACK_IMPORTED_MODULE_3__monitoring_webview__["a" /* MonitoringWebviewPage */], { 'url': url });
    };
    MonitoringPage.prototype.speakSummary = function () {
        this.setStatusCard();
        //DataModel.getInstance().speakSummary();
        this.model.speakSummary();
    };
    // Helper functions
    MonitoringPage.prototype.setLinks = function (datetime_dir) {
        //let model:DataModel = DataModel.getInstance();
        var remote_url = this.model.getRemoteURL();
        var config = this.model.config;
        var capture_dir = config.data_dir + "/capture";
        var thumbnail_dir = config.data_dir + "/thumbnail";
        var analysis_dir = config.data_dir + "/analysis";
        if (this.model.configuration.get().enableMadVision) {
            capture_dir = analysis_dir + "/madvision";
            thumbnail_dir = analysis_dir + "/madvision_thumbnail";
        }
        var plot_analysis_dir = analysis_dir + "/plot_analysis/latest";
        var plot_pathway_dir = analysis_dir + "/plot_pathway/latest";
        for (var i = 0; i < this.model.monitoringUrls.length; i++) {
            for (var j = 0; j < this.model.monitoringUrls[i].urls.length; j++) {
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
                    this.setPlots(this.plot_name);
                }
            }
        }
        //console.log(JSON.stringify(this.model.monitoringUrls));
        this.monitoringURLs = this.model.monitoringUrls;
    };
    /*static setPlots(plot_name:string){
        let model:DataModel = DataModel.getInstance();
        for (let i:number = 0; i < this.model.monitoringUrls.length; i++) {
            for (let j:number = 0; j < this.model.monitoringUrls[i].urls.length; j++){
                if ((model.monitoringUrls[i].urls[j].file_prefix == null) || (! model.monitoringUrls[i].urls[j].capture)){
                    //logger.debug("nop");
                    console.log("DEBUG: nop");
                } else {
                    if (plot_name == "analysis" ) model.monitoringUrls[i].urls[j].analysis_plot = model.monitoringUrls[i].urls[j].plot_analysis;
                    if (plot_name == "pathway" ) model.monitoringUrls[i].urls[j].analysis_plot = model.monitoringUrls[i].urls[j].plot_pathway;
                    if (plot_name == "overall_pathway" ) model.monitoringUrls[i].urls[j].analysis_plot = model.monitoringUrls[i].urls[j].plot_overall_pathway;
                }
            }
        }
    }*/
    MonitoringPage.prototype.setPlots = function (plot_name) {
        //let model:DataModel = DataModel.getInstance();
        for (var i = 0; i < this.model.monitoringUrls.length; i++) {
            for (var j = 0; j < this.model.monitoringUrls[i].urls.length; j++) {
                if ((this.model.monitoringUrls[i].urls[j].file_prefix == null) || (!this.model.monitoringUrls[i].urls[j].capture)) {
                    //logger.debug("nop");
                    console.log("DEBUG: nop");
                }
                else {
                    if (plot_name == "analysis")
                        this.model.monitoringUrls[i].urls[j].analysis_plot = this.model.monitoringUrls[i].urls[j].plot_analysis;
                    if (plot_name == "pathway")
                        this.model.monitoringUrls[i].urls[j].analysis_plot = this.model.monitoringUrls[i].urls[j].plot_pathway;
                    if (plot_name == "overall_pathway")
                        this.model.monitoringUrls[i].urls[j].analysis_plot = this.model.monitoringUrls[i].urls[j].plot_overall_pathway;
                }
            }
        }
    };
    MonitoringPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-monitoring',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\monitoring\monitoring.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-buttons left>\n            <button ion-button icon-only (click)="openHappyFaceCore()"><ion-icon name="md-happy"></ion-icon></button>\n        </ion-buttons>\n        <ion-title>Happy Meta-Monitoring</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="reload()" *ngIf="!isLoading"><ion-icon name="refresh"></ion-icon></button>\n            <button ion-button icon-only (click)="openModalConfig()"><ion-icon name="md-more"></ion-icon></button>\n        </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n    <div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ion-list [hidden]="isLoading" no-padding>\n        <!-- Status card -->\n        <ion-card color="{{statusColor}}" no-padding no-margin style="width: 100%" (click)="speakSummary()">\n            <ion-card-header>\n                Status: {{statusLevel}}\n            </ion-card-header>\n            <ion-card-content no-padding>\n                <ion-item color="{{statusColor}}" text-wrap>\n                    <ion-thumbnail item-start>\n                        <img src="{{statusImg}}">\n                    </ion-thumbnail>\n                    <h2>{{statusText}}</h2>\n                </ion-item>\n            </ion-card-content>\n        </ion-card>\n\n        <!-- History chooser -->\n        <ion-item no-padding>\n            <ion-label>History:</ion-label>\n            <ion-select (ionChange)="historyChanged($event)" interface="action-sheet" style="max-width: 75% !important;">\n              <ion-option *ngFor="let ts of history" [selected]="ts.datetime == latest">{{ts.datetime}}</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <!-- Content list -->\n        <ion-item *ngFor="let monitoringURL of monitoringURLs" no-padding no-margin text-wrap>\n            <ion-card no-padding no-margin>\n                <ion-card-header class="group-title">{{monitoringURL.name}}</ion-card-header>\n                <ion-card-content no-padding>\n                    <ion-grid>\n                        <ion-row>\n                            <ion-col col-6 col-sm no-padding *ngFor="let url of monitoringURL.urls">\n                                <div class="launchpad">\n                                    <div class="logo"><img src="{{url.thumbnail}}" alt="Not Captured" (click)="openPage(url)"/></div>\n                                    <a href="{{url.link}}" target="_blank"><div class="caption">{{url.name}}</div></a>\n                                </div>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid>\n                </ion-card-content>\n            </ion-card>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\monitoring\monitoring.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* ModalController */]])
    ], MonitoringPage);
    return MonitoringPage;
}());

//# sourceMappingURL=monitoring.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionErrorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConnectionErrorPage = /** @class */ (function () {
    function ConnectionErrorPage(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.host = "";
        this.port = "";
        this.statusCode = "404";
        this.onlyOneCode = true;
        this.missingFiles = [];
        this.host = this.navParams.get("host");
        this.port = this.navParams.get("port");
        this.missingFiles = this.navParams.get("errors");
        if (!(this.missingFiles == null || this.missingFiles == undefined) || this.missingFiles.length > 0) {
            var s = this.missingFiles[0].code;
            for (var i = 0; i < this.missingFiles.length; i++)
                this.onlyOneCode = (s == this.missingFiles[i].code);
            this.statusCode = s.toString(10);
        }
    }
    ConnectionErrorPage.prototype.retry = function () {
        this.viewCtrl.dismiss({ "retry": true, "host": this.host, "port": this.port });
    };
    ConnectionErrorPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss({ "retry": false, "host": this.host, "port": this.port });
    };
    ConnectionErrorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-connection-error",template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\error\connection-error.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Connection Error</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="closeModal()"><ion-icon name="close"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <div text-center><h1>Connection Error</h1></div>\n    <p>Unable to connect to given instance.</p>\n    <p *ngIf="onlyOneCode">Errorcode: {{statusCode}}</p>\n    <p *ngIf="!onlyOneCode">Recieved various Errorcodes (shown below)</p>\n\n    <ion-item>\n        <ion-label color="primary" fixed>Host: </ion-label>\n        <ion-input placeholder="{{host}}" [(ngModel)]="host"></ion-input>\n    </ion-item>\n    <ion-item>\n        <ion-label color="primary" fixed>Port: </ion-label>\n        <ion-input placeholder="{{port}}" [(ngModel)]="port"></ion-input>\n    </ion-item>\n    <br/>\n    <!--Data: {{host}} + {{port}} <br/>-->\n\n    Files with errors: <br/>\n    <code>\n        <span *ngFor="let m of missingFiles">{{m.url}} --> code: {{m.code}}<br/></span>\n    </code>\n</ion-content>\n\n<ion-footer>\n    <ion-toolbar>\n        <ion-buttons end>\n            <button ion-button type="submit" (click)="retry()" item-end>Retry</button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\error\connection-error.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object])
    ], ConnectionErrorPage);
    return ConnectionErrorPage;
    var _a, _b;
}());

//# sourceMappingURL=connection-error.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonitoringWebviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(8);
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


var MonitoringWebviewPage = /** @class */ (function () {
    function MonitoringWebviewPage(navParams) {
        this.navParams = navParams;
        this.url = this.navParams.get('url');
        if (this.url == null || this.url == undefined) {
            this.url = { "name": "", "image": "http://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg" };
        }
    }
    MonitoringWebviewPage.prototype.changeToMadVision = function () {
    };
    MonitoringWebviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\monitoring\monitoring-webview.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{url.name}}</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button icon-only item-end (click)="changeToMadVision()">\n\n                <ion-icon name="ion-eye"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n    <img style="margin-left: auto; margin-right:auto; max-width: 100%" src="{{url.image}}"/>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\monitoring\monitoring-webview.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* NavParams */]])
    ], MonitoringWebviewPage);
    return MonitoringWebviewPage;
}());

//# sourceMappingURL=monitoring-webview.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ModalPage = /** @class */ (function () {
    function ModalPage(navParams, viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* ConfigPage */];
        this.rootParams = null;
        this.rootParams = Object.assign({}, navParams.data, { viewCtrl: viewCtrl });
    }
    ModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\config\modal.html"*/'<ion-nav [root]="rootPage" [rootParams]="rootParams"></ion-nav>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\config\modal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ViewController */]])
    ], ModalPage);
    return ModalPage;
}());

//# sourceMappingURL=modal.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstancesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_DataModel__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InstancesComponent = /** @class */ (function () {
    function InstancesComponent(model, navCtrl, plt, storage) {
        this.model = model;
        this.navCtrl = navCtrl;
        this.plt = plt;
        this.storage = storage;
        this.headURL = "http://141.5.108.30:20100/sites/default/meta-meta.json";
        this.label = "";
        this.locations = [];
        this.favorites = [];
        this.backstack = [];
        this.current = null;
        this.level = 0;
        this.levels = ["Country", "Region", "Server"];
        this.isIOS = false;
        this.isIOS = this.plt.is('ios');
    }
    InstancesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('favorites').then(function (value) {
            if (!(value == null || value == undefined))
                _this.favorites = value;
            else
                _this.favorites = [];
            console.log("FAVORITES: " + JSON.stringify(value));
        });
        var req = new XMLHttpRequest();
        req.addEventListener("load", function () {
            _this.updateList(req.responseText);
        });
        req.open("GET", this.headURL);
        req.send();
        this.label = this.levels[this.level];
    };
    InstancesComponent.prototype.backClicked = function () {
        this.level--;
        this.move(null);
    };
    InstancesComponent.prototype.itemClicked = function (loc) {
        this.level++;
        this.move(loc);
    };
    InstancesComponent.prototype.move = function (loc) {
        var _this = this;
        this.locations = [];
        if (loc != null)
            this.backstack.push(this.current);
        else
            loc = this.backstack.pop();
        this.current = loc;
        var url = "";
        if (this.level <= 0) {
            this.level = 0;
            url = this.headURL;
        }
        else if (this.level == 1)
            url = "http://" + loc.host + ":" + loc.mobile_port + "/sites/default/meta-meta.json";
        else if (this.level >= 2)
            url = "http://" + loc.host + ":" + loc.mobile_port + "/sites/default/meta-meta.json";
        var req = new XMLHttpRequest();
        req.addEventListener("load", function () { _this.updateList(req.responseText); });
        req.open("GET", url);
        req.send();
        this.label = this.levels[this.level];
    };
    InstancesComponent.prototype.updateList = function (str) {
        var json = JSON.parse(str);
        for (var i = 0; i < json.length; i++) {
            var obj = json[i];
            this.locations.push(obj);
        }
    };
    InstancesComponent.prototype.choose = function (loc) {
        this.model.currentlyActive = loc;
        this.storage.set('instance', this.model.currentlyActive);
        this.model.reload();
        this.navCtrl.pop();
    };
    InstancesComponent.prototype.favorite = function (loc) {
        if (!(this.favorites.indexOf(loc) > -1)) {
            this.favorites.push(loc);
            this.storage.set('favorites', this.favorites);
        }
    };
    InstancesComponent.prototype.unfavorite = function (loc) {
        if (this.favorites.indexOf(loc) > -1) {
            this.favorites = this.favorites.filter(function (obj) { return obj != loc; });
            this.storage.set('favorites', this.favorites);
        }
    };
    InstancesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\config\instances.component.html"*/'<ion-header>\n    <ion-navbar *ngIf="isIOS" style="height:calc(44px + 20px); min-height:calc(44px + 20px); padding-top:20px;">\n        <ion-title style="padding-top: 15px">Choose Instance</ion-title>\n    </ion-navbar>\n    <ion-navbar *ngIf="!isIOS">\n        <ion-title>Choose Instance</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="outer-content">\n  <ion-list-header>\n    Favorites\n  </ion-list-header>\n  <ion-list>\n    <ion-item-sliding *ngFor="let fav of favorites">\n      <button ion-item detail-none (click)="choose(fav)">\n        {{fav.name}}\n      </button>\n      <ion-item-options side="left">\n        <button ion-button color="danger" (click)="unfavorite(fav)"><ion-icon name="trash"></ion-icon></button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n\n    <br/>\n  <ion-list-header>\n      <button (click)="backClicked()" item-left class="button-icon" style="background-color: transparent" [hidden]="level == 0">\n          <ion-icon name="ios-arrow-back"></ion-icon>\n      </button>\n      {{label}}\n  </ion-list-header>\n  <ion-list>\n    <ion-item-sliding *ngFor="let loc of locations">\n      <button ion-item detail-none (click)="choose(loc);">\n        {{loc.name}}\n        <div item-end text-center>\n          <button class="button-icon" style="background-color: transparent" (click)="itemClicked(loc); $event.stopPropagation()">\n            <ion-icon name="arrow-forward"></ion-icon>\n          </button>\n        </div>\n      </button>\n      <ion-item-options side="left">\n        <button ion-button (click)="favorite(loc)"><ion-icon name="star"></ion-icon></button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n  <!--<span [innerHtml]="label"></span>-->\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\config\instances.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], InstancesComponent);
    return InstancesComponent;
}());

//# sourceMappingURL=instances.component.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControllerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controller_detail__ = __webpack_require__(206);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ControllerPage = /** @class */ (function () {
    function ControllerPage(model, navCtrl) {
        this.model = model;
        this.navCtrl = navCtrl;
        this.isLoading = true;
        this.systems = [];
    }
    ControllerPage.prototype.ngOnInit = function () {
        // DataModel.getInstance().addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        // DataModel.getInstance().addLoadingFinishedCallback(this.reloadingFinishedCallback.bind(this));
        // if(!DataModel.getInstance().isLoading()) this.reloadingFinishedCallback();
        this.model.addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        this.model.addLoadingFinishedCallback(this.reloadingFinishedCallback.bind(this));
        if (!this.model.isLoading())
            this.reloadingFinishedCallback();
    };
    ControllerPage.prototype.onLoadingStartedListener = function () {
        this.isLoading = true;
    };
    ControllerPage.prototype.reloadingFinishedCallback = function () {
        this.systems = [];
        if (!(this.model.systems == null || this.model.systems == undefined)) {
            this.systems = this.model.systems;
            this.isLoading = false;
        }
    };
    ControllerPage.prototype.reload = function () {
        if (this.isLoading)
            return;
        this.isLoading = true;
        this.model.reload();
    };
    ControllerPage.prototype.openPage = function (system) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__controller_detail__["a" /* ControllerDetailPage */], { "system": system });
    };
    ControllerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-controller',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\controller\controller.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Controller</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="reload()" *ngIf="!isLoading"><ion-icon name="refresh"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ion-list no-padding [hidden]="isLoading">\n        <ion-item *ngFor="let system of systems" text-wrap no-padding (click)="openPage(system)">\n            <ion-avatar item-left>\n                <img src="assets/{{system.img}}"/>\n            </ion-avatar>\n            <h2>{{system.name}}</h2>\n            <p>{{system.text}}</p>\n            <ion-icon name="ios-arrow-forward-outline" item-end></ion-icon>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\controller\controller.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */]])
    ], ControllerPage);
    return ControllerPage;
}());

//# sourceMappingURL=controller.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControllerDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ControllerDetailPage = /** @class */ (function () {
    function ControllerDetailPage(navParams) {
        this.navParams = navParams;
        this.system = null;
        this.system = navParams.get('system');
        if (this.system == null || this.system == undefined) {
            this.system = { 'name': "Galaxy Controller", "text": "Restart Galaxy: Milky Way?",
                "img": "http://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg",
                "services": [{ "name": "Restart Mass Portals" }, { "name": "Stop Reapers" }] };
        }
    }
    ControllerDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-controller-detail',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\controller\controller-detail.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{system.name}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <img src="assets/{{system.img}}" style="width: 64px; height: 64px">\n    <h2>{{system.text}}</h2>\n\n    <ion-card>\n        <ion-item-divider>Power</ion-item-divider>\n        <ion-item text-wrap>\n            <button ion-button class="button-outline">Cold reboot</button>\n            <button ion-button class="button-outline">Warm reboot</button>\n        </ion-item>\n    </ion-card>\n    <ion-card>\n        <ion-item-divider>Service</ion-item-divider>\n        <ion-item *ngFor="let service of system.services" text-wrap>\n            <button ion-button class="button-outline">{{service.name}}</button>\n        </ion-item>\n    </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\controller\controller-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], ControllerDetailPage);
    return ControllerDetailPage;
}());

//# sourceMappingURL=controller-detail.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_DataModel__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LogsPage = /** @class */ (function () {
    function LogsPage(model, alertCtrl) {
        this.model = model;
        this.alertCtrl = alertCtrl;
        this.logs = [];
        this.selectedLog = null;
        this.logText = "";
        this.isLoading = false;
    }
    LogsPage.prototype.ngOnInit = function () {
        //DataModel.getInstance().addLoadingFinishedCallback(this.reloadingFinishedListener.bind(this));
        //if(!DataModel.getInstance().isLoading()) this.reloadingFinishedListener();
        this.model.addLoadingFinishedCallback(this.reloadingFinishedListener.bind(this));
        if (!this.model.isLoading())
            this.reloadingFinishedListener();
    };
    LogsPage.prototype.reloadingFinishedListener = function () {
        //let model:DataModel = DataModel.getInstance();
        this.logs = [];
        if (!(this.model.logs == null || this.model.logs == undefined || this.model.config == null || this.model.config == undefined)) {
            this.modifyURLs();
            this.logs = this.model.logs;
            this.selectedLog = this.logs[0];
            this.loadSelectedLog();
        }
    };
    LogsPage.prototype.reload = function () {
        if (this.isLoading)
            return;
        this.loadSelectedLog();
    };
    LogsPage.prototype.logSelected = function ($event) {
        this.selectedLog = $event;
        this.loadSelectedLog();
    };
    LogsPage.prototype.loadSelectedLog = function () {
        this.isLoading = true;
        //DataModel.getInstance().asyncLoadFile(this.selectedLog.file, this.logLoaded.bind(this))
        this.model.asyncLoadFile(this.selectedLog.file, this.logLoaded.bind(this));
    };
    LogsPage.prototype.modifyURLs = function () {
        var log_dir = this.model.config.data_dir + "/log";
        var remote_url = this.model.getRemoteURL();
        for (var i = 0; i < this.model.logs.length; i++) {
            // If it does not begin with 'http', then basename of log name is set
            // For example, /tmp/cron.log --> cron.log --> remote_url + data_dir + '/log/' + cron.log
            if (!this.model.isHttpURL(this.model.logs[i].file)) {
                var logname = this.model.logs[i].file;
                var base_logfile = logname.split('/').reverse()[0];
                this.model.logs[i].file = remote_url + "/" + log_dir + "/" + base_logfile;
            }
        }
    };
    LogsPage.prototype.logLoaded = function (log, statusCode) {
        if (statusCode == 200)
            this.logText = log;
        else
            this.logText = "ERROR: Log could not be loaded";
        this.isLoading = false;
    };
    LogsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-logs',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\logs\logs.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Logs Viewer</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="reload()" *ngIf="!isLoading"><ion-icon name="refresh"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-item no-padding>\n        <ion-label>Log:</ion-label>\n        <ion-select (ionChange)="logSelected($event)" interface="action-sheet" style="max-width: 85% !important;">\n            <ion-option *ngFor="let l of logs" [selected]="l == selectedLog" [value]="l">{{l.name}}</ion-option>\n        </ion-select>\n    </ion-item>\n\n    <div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <div no-padding text-wrap [hidden]="isLoading">\n        <br/>\n        {{logText}}\n    </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\logs\logs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], LogsPage);
    return LogsPage;
}());

//# sourceMappingURL=logs.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisualizersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VisualizersPage = /** @class */ (function () {
    function VisualizersPage(model, alertCtrl) {
        this.model = model;
        this.alertCtrl = alertCtrl;
        this.visualizers = [];
        this.selectedVisualizer = null;
        this.isLoading = true;
    }
    VisualizersPage.prototype.ngOnInit = function () {
        this.model.addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        this.model.addLoadingFinishedCallback(this.reloadingFinishedListener.bind(this));
        if (!this.model.isLoading())
            this.reloadingFinishedListener();
    };
    VisualizersPage.prototype.reloadingFinishedListener = function () {
        this.visualizers = [];
        if (!(this.model.visualizers == null || this.model.visualizers == undefined)) {
            this.visualizers = this.model.visualizers;
            this.isLoading = false;
            this.modifyLinks();
            this.selectedVisualizer = this.visualizers[0];
        }
    };
    VisualizersPage.prototype.onLoadingStartedListener = function () {
        this.isLoading = true;
    };
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
    VisualizersPage.prototype.reload = function () {
        if (this.isLoading)
            return;
        this.isLoading = true;
        //DataModel.getInstance().reload();
        this.model.reload();
    };
    VisualizersPage.prototype.modifyLinks = function () {
        //let model:DataModel = DataModel.getInstance();
        for (var i = 0; i < this.model.visualizers.length; i++) {
            var remote_url = this.model.getRemoteURL();
            if (this.model.isHttpURL(this.model.visualizers[i].file))
                remote_url = "";
            this.model.visualizers[i].file = remote_url + this.model.visualizers[i].file;
        }
    };
    VisualizersPage.prototype.visualizerSelected = function ($event) {
        this.selectedVisualizer = $event;
    };
    VisualizersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-visualizers',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\visualizers\visualizers.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Visualizers</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="reload()" *ngIf="!isLoading"><ion-icon name="refresh"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ion-item no-padding [hidden]="isLoading">\n        <ion-label>Diagram:</ion-label>\n        <ion-select (ionChange)="visualizerSelected($event)" interface="action-sheet" style="max-width: 75% !important;">\n            <ion-option *ngFor="let v of visualizers" [value]="v">{{v.name}}</ion-option>\n        </ion-select>\n    </ion-item>\n\n    <ion-item no-padding style="margin-left: auto; margin-right: auto; max-width: 100%;" [hidden]="isLoading">\n        <img src="{{selectedVisualizer.file}}"/>\n    </ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\visualizers\visualizers.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
    ], VisualizersPage);
    return VisualizersPage;
}());

//# sourceMappingURL=visualizers.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HumansPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HumansPage = /** @class */ (function () {
    function HumansPage(model) {
        this.model = model;
        this.humans = [];
    }
    HumansPage.prototype.ngOnInit = function () {
        //DataModel.getInstance().addLoadingFinishedCallback(this.reloadingFinishedCallback.bind(this));
        //if(!DataModel.getInstance().isLoading()) this.reloadingFinishedCallback();
        this.model.addLoadingFinishedCallback(this.reloadingFinishedCallback.bind(this));
        if (!this.model.isLoading())
            this.reloadingFinishedCallback();
    };
    HumansPage.prototype.reloadingFinishedCallback = function () {
        //this.humans = DataModel.getInstance().humans;
        this.humans = this.model.humans;
        if (this.humans == null || this.humans == undefined) {
            this.humans = [{ "name": "Commander John Shepard", "img": "https://yt3.ggpht.com/a-/AJLlDp22ITbg7LJa22ARdZVTVnouLreNJE6M60QYjA=s900-mo-c-c0xffffffff-rj-k-no",
                    "email": "john.shepard@navy.alliace", "tel": "01713387554", "text": "The chances of surviving are... slim.", "url": "" }];
        }
    };
    HumansPage.prototype.openHuman = function (human) {
        console.log("HUMAN: " + JSON.stringify(human));
        window.open(human.url, "_system");
    };
    HumansPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-humans',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\humans\humans.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Ticket, E-mail & Contact</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <ion-list no-padding>\n\n        <ion-item *ngFor="let human of humans" text-wrap (click)="openHuman(human)">\n\n            <ion-avatar item-left>\n\n                <img src="{{human.img}}"/>\n\n            </ion-avatar>\n\n            E-mail: <a href="mailto:{{human.email}}" target="_blank">{{human.email}}</a> <br/>\n\n            Tel: {{human.tel}}\n\n            <p>{{human.text}}</p>\n\n        </ion-item>\n\n    </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\humans\humans.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */]])
    ], HumansPage);
    return HumansPage;
}());

//# sourceMappingURL=humans.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkingPage; });
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

var WorkingPage = /** @class */ (function () {
    function WorkingPage() {
    }
    WorkingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-working',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\working\working.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Working</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\working\working.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], WorkingPage);
    return WorkingPage;
}());

//# sourceMappingURL=working.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyzerPage2; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__hf_classical_hf_categories__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__analyzer_detail__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AnalyzerPage2 = /** @class */ (function () {
    function AnalyzerPage2(model, navControl, alertCtrl, componentFactoryResolver) {
        this.model = model;
        this.navControl = navControl;
        this.alertCtrl = alertCtrl;
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
            { "id": "forecast", "name": "Happy Forecast", "type": "img", "src": "assets/img/forecast.png" }
        ];
        this.selectedViewer = this.viewers.find(function (v) { return v.id === "overall_pathway"; });
    }
    AnalyzerPage2.prototype.ngOnInit = function () {
        this.model.addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        this.model.addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        if (!this.model.isLoading())
            this.onReloadFinishedListener();
    };
    AnalyzerPage2.prototype.onReloadFinishedListener = function () {
        if (this.dataExists()) {
            this.isLoading = false;
            this.setStatusCard();
            //this.setPlots(this.selectedViewer.id);
            this.setPlots2();
            //this.monitoringURLs = this.model.monitoringUrls;
            this.viewers.find(function (v) { return v.id === "overall_pathway"; }).src = this.model.monitoringUrls[0].urls[0].plot_overall_pathway;
        }
    };
    AnalyzerPage2.prototype.onLoadingStartedListener = function () {
        this.isLoading = true;
    };
    AnalyzerPage2.prototype.dataExists = function () {
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
    };
    AnalyzerPage2.prototype.setStatusCard = function () {
        this.statusText = this.model.summary.text;
        this.statusLevel = this.model.summary.level;
        for (var i = 0; i < this.model.config.status.length; i++) {
            if (this.model.config.status[i].name === this.statusLevel) {
                this.statusImg = this.model.config.status[i].file;
            }
        }
        for (var i = 0; i < this.model.config.status.length; i++) {
            if (this.model.config.status[i].name === this.statusLevel) {
                this.statusColor = this.model.config.status[i].color;
            }
        }
    };
    AnalyzerPage2.prototype.reload = function () {
        if (this.isLoading)
            return;
        this.isLoading = true;
        this.model.reload();
    };
    AnalyzerPage2.prototype.viewerChanged = function (event) {
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
    };
    AnalyzerPage2.prototype.speakSummary = function () {
        this.setStatusCard();
        this.model.speakSummary();
    };
    AnalyzerPage2.prototype.openPage = function (url) {
        this.navControl.push(__WEBPACK_IMPORTED_MODULE_4__analyzer_detail__["a" /* AnalyzerDetailPage */], { 'url': url });
    };
    AnalyzerPage2.prototype.setPlots = function (plot_name) {
        for (var i = 0; i < this.model.monitoringUrls.length; i++) {
            for (var j = 0; j < this.model.monitoringUrls[i].urls.length; j++) {
                if ((this.model.monitoringUrls[i].urls[j].file_prefix == null) || (!this.model.monitoringUrls[i].urls[j].capture)) {
                    //logger.debug("nop");
                    console.log("DEBUG: nop");
                }
                else {
                    if (plot_name == "analysis")
                        this.model.monitoringUrls[i].urls[j].analysis_plot = this.model.monitoringUrls[i].urls[j].plot_analysis;
                    if (plot_name == "pathway")
                        this.model.monitoringUrls[i].urls[j].analysis_plot = this.model.monitoringUrls[i].urls[j].plot_pathway;
                    if (plot_name == "overall_pathway")
                        this.model.monitoringUrls[i].urls[j].analysis_plot = this.model.monitoringUrls[i].urls[j].plot_overall_pathway;
                }
            }
        }
    };
    AnalyzerPage2.prototype.setPlots2 = function () {
        // Generate array
        this.viewers[0].src = { "monitoringURLs": [] };
        this.viewers[1].src = { "monitoringURLs": [] };
        this.viewers[0].src.monitoringURLs = [];
        this.viewers[1].src.monitoringURLs = [];
        for (var i = 0; i < this.model.monitoringUrls.length; i++) {
            this.viewers[0].src.monitoringURLs.push({ "urls": [], "name": "" });
            this.viewers[1].src.monitoringURLs.push({ "urls": [], "name": "" });
            for (var j = 0; j < this.model.monitoringUrls[i].urls.length; j++) {
                this.viewers[0].src.monitoringURLs[i].urls.push({ "plot": "", "name": "", "link": "" });
                this.viewers[1].src.monitoringURLs[i].urls.push({ "plot": "", "name": "", "link": "" });
            }
        }
        for (var i = 0; i < this.model.monitoringUrls.length; i++) {
            this.viewers[0].src.monitoringURLs[i].name = this.model.monitoringUrls[i].name;
            this.viewers[1].src.monitoringURLs[i].name = this.model.monitoringUrls[i].name;
            for (var j = 0; j < this.model.monitoringUrls[i].urls.length; j++) {
                if ((this.model.monitoringUrls[i].urls[j].file_prefix == null) || (!this.model.monitoringUrls[i].urls[j].capture))
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
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_8" /* ViewChild */])('parent', { read: __WEBPACK_IMPORTED_MODULE_3__angular_core__["_10" /* ViewContainerRef */] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3__angular_core__["_10" /* ViewContainerRef */])
    ], AnalyzerPage2.prototype, "parent", void 0);
    AnalyzerPage2 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-analyzer',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\analyzer2.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Happy Monitoring Analyzer</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="reload()" *ngIf="!isLoading"><ion-icon name="refresh"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n    <div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ion-list [hidden]="isLoading" no-padding>\n        <!-- Status card -->\n        <ion-card color="{{statusColor}}" no-padding no-margin style="width: 100%" (click)="speakSummary()">\n            <ion-card-header>\n                Status: {{statusLevel}}\n            </ion-card-header>\n            <ion-card-content no-padding>\n                <ion-item color="{{statusColor}}" text-wrap>\n                    <ion-thumbnail item-start>\n                        <img src="{{statusImg}}">\n                    </ion-thumbnail>\n                    <h2>{{statusText}}</h2>\n                </ion-item>\n            </ion-card-content>\n        </ion-card>\n\n        <!-- Viewer chooser -->\n        <ion-item no-padding>\n            <ion-label>Viewer:</ion-label>\n            <ion-select (ionChange)="viewerChanged($event)" interface="action-sheet" style="max-width: 81% !important;">\n                <ion-option *ngFor="let v of viewers" [selected]="v.id === \'overall_pathway\'" [value]="v">{{v.name}}</ion-option>\n            </ion-select>\n        </ion-item>\n\n\n        <!-- TYPE == plots -->\n        <ng-container *ngIf="(selectedViewer.type === \'plots\')">\n            <ion-item *ngFor="let monitoringURL of selectedViewer.src.monitoringURLs" no-padding no-margin text-wrap>\n                <ion-card no-padding no-margin>\n                    <ion-card-header class="group-title">{{monitoringURL.name}}</ion-card-header>\n                    <ion-card-content no-padding>\n                        <ion-grid>\n                            <ion-row>\n                                <ion-col col-6 col-sm no-padding *ngFor="let url of monitoringURL.urls">\n                                    <div class="launchpad">\n                                        <div class="logo"><img src="{{url.plot}}" alt="Not Analyzed" (click)="openPage(url)"/></div>\n                                        <a href="{{url.link}}" target="_blank"><div class="caption">{{url.name}}</div></a>\n                                    </div>\n                                </ion-col>\n                            </ion-row>\n                        </ion-grid>\n                    </ion-card-content>\n                </ion-card>\n            </ion-item>\n        </ng-container>\n\n\n        <!-- TYPE == img -->\n        <ion-item *ngIf="(selectedViewer.type === \'img\')">\n            <img src="{{selectedViewer.src}}"/>\n        </ion-item>\n\n    </ion-list>\n\n    <!-- TYPE == page -->\n    <span [hidden]="!(selectedViewer.type === \'page\')">\n        <ng-container #parent></ng-container>\n    </span>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\analyzer2.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__angular_core__["o" /* ComponentFactoryResolver */]])
    ], AnalyzerPage2);
    return AnalyzerPage2;
}());

//# sourceMappingURL=analyzer2.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HFModulesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ClassicalDataModel__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HFModulesPage = /** @class */ (function () {
    function HFModulesPage(classicModel, navParams, navCtrl) {
        this.classicModel = classicModel;
        this.navParams = navParams;
        this.navCtrl = navCtrl;
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
    HFModulesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.classicModel.addLoadingFinishedCallback(this.loadingFinishedListener.bind(this));
        if (!this.classicModel.isLoading())
            this.loadingFinishedListener();
        this.outdateHandler = setInterval(function () { _this.outdated = true; }, 1200000);
    };
    HFModulesPage.prototype.loadingFinishedListener = function () {
        this.isLoading = false;
    };
    HFModulesPage.prototype.reload = function () {
        var _this = this;
        clearInterval(this.outdateHandler);
        this.outdateHandler = setInterval(function () { _this.outdated = true; }, 1200000);
        this.classicModel.addLoadingFinishedCallback(this.loadingFinishedListener.bind(this));
        if (!this.classicModel.isLoading())
            this.loadingFinishedListener();
        this.classicModel.reload();
    };
    HFModulesPage.prototype.imgForModule = function (mod) {
        return mod.status == 1.0 ? this.IMG_HAPPY : (mod.status == 0.5 ? this.IMG_WARNING : (mod.status == 0.0 ? this.IMG_CRITICAL : this.IMG_ERROR));
    };
    HFModulesPage.prototype.moduleSelected = function (mod) {
        window.open(mod.link, "_blank");
    };
    HFModulesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-hf-modules",template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\hf-classical\hf-modules.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            {{category.title}}\n        </ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="reload()" *ngIf="false"><ion-icon name="refresh"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div text-center padding *ngIf="isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <div class="complete-overlay" padding *ngIf="outdated && !isLoading">\n        <h1 class="outdated">Outdated</h1>\n    </div>\n\n    <div class="no-modules" *ngIf="!modulesExisting"> No modules contained</div>\n\n    <ion-list *ngIf="modulesExisting">\n        <ng-container *ngFor="let module of category.module">\n            <ion-item *ngIf="module.title" (click)="moduleSelected(module)" style="padding: 0 !important">\n                <ion-thumbnail item-start style="min-width: 30px; min-height: 30px; width: 30px; height: 30px;">\n                    <img src="{{imgForModule(module)}}" style="width: 30px; height: 30px"/>\n                </ion-thumbnail>\n                <span padding-left text-wrap style="font-size: 20px" item-end>{{module.title}}</span>\n                <ion-icon name="ios-arrow-forward-outline" item-end></ion-icon>\n            </ion-item>\n        </ng-container>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\hf-classical\hf-modules.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ClassicalDataModel__["a" /* ClassicalDataModel */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */]])
    ], HFModulesPage);
    return HFModulesPage;
}());

//# sourceMappingURL=hf-modules.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(236);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_monitoring_monitoring__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_monitoring_monitoring_webview__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_analyzer_analyzer__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_analyzer_analyzer_detail__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_controller_controller__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_controller_controller_detail__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_visualizers_visualizers__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_logs_logs__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_humans_humans__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_working_working__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_config_config__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_config_instances_component__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_config_modal__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__data_DataModel__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_storage__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_hf_classical_ClassicalDataModel__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_hf_classical_hf_categories__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_hf_classical_hf_modules__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_analyzer_analyzer2__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_error_connection_error__ = __webpack_require__(201);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* HappyFaceApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_monitoring_monitoring__["a" /* MonitoringPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_monitoring_monitoring_webview__["a" /* MonitoringWebviewPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_analyzer_analyzer__["a" /* AnalyzerPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_analyzer_analyzer2__["a" /* AnalyzerPage2 */],
                __WEBPACK_IMPORTED_MODULE_10__pages_analyzer_analyzer_detail__["a" /* AnalyzerDetailPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_controller_controller__["a" /* ControllerPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_controller_controller_detail__["a" /* ControllerDetailPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_visualizers_visualizers__["a" /* VisualizersPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_logs_logs__["a" /* LogsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_humans_humans__["a" /* HumansPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_config_config__["a" /* ConfigPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_config_modal__["a" /* ModalPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_config_instances_component__["a" /* InstancesComponent */],
                __WEBPACK_IMPORTED_MODULE_16__pages_working_working__["a" /* WorkingPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_error_connection_error__["a" /* ConnectionErrorPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_hf_classical_hf_categories__["a" /* HFCategoriesPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_hf_classical_hf_modules__["a" /* HFModulesPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* HappyFaceApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_21__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* HappyFaceApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_monitoring_monitoring__["a" /* MonitoringPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_monitoring_monitoring_webview__["a" /* MonitoringWebviewPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_analyzer_analyzer__["a" /* AnalyzerPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_analyzer_analyzer2__["a" /* AnalyzerPage2 */],
                __WEBPACK_IMPORTED_MODULE_10__pages_analyzer_analyzer_detail__["a" /* AnalyzerDetailPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_controller_controller__["a" /* ControllerPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_controller_controller_detail__["a" /* ControllerDetailPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_visualizers_visualizers__["a" /* VisualizersPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_logs_logs__["a" /* LogsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_humans_humans__["a" /* HumansPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_config_config__["a" /* ConfigPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_config_modal__["a" /* ModalPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_config_instances_component__["a" /* InstancesComponent */],
                __WEBPACK_IMPORTED_MODULE_16__pages_working_working__["a" /* WorkingPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_error_connection_error__["a" /* ConnectionErrorPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_hf_classical_hf_categories__["a" /* HFCategoriesPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_hf_classical_hf_modules__["a" /* HFModulesPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_20__data_DataModel__["a" /* DataModel */],
                __WEBPACK_IMPORTED_MODULE_22__pages_hf_classical_ClassicalDataModel__["a" /* ClassicalDataModel */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HappyFaceApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HappyFaceApp = /** @class */ (function () {
    function HappyFaceApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    HappyFaceApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], HappyFaceApp);
    return HappyFaceApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyzerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_DataModel__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__analyzer_detail__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__hf_classical_hf_categories__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AnalyzerPage = /** @class */ (function () {
    function AnalyzerPage(model, navControl, alertCtrl) {
        this.model = model;
        this.navControl = navControl;
        this.alertCtrl = alertCtrl;
        this.isLoading = true;
        this.statusLevel = "Normal";
        this.statusImg = "https://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg";
        this.statusColor = "item-calm";
        this.statusText = "World wide Atlas Distributed Computing System";
        this.HFClassical = __WEBPACK_IMPORTED_MODULE_4__hf_classical_hf_categories__["a" /* HFCategoriesPage */];
        this.viewers = [
            { "id": "analysis", "name": "Status Analysis", "multiplots": true, "spsrc": "" },
            { "id": "pathway", "name": "Info Pathway", "multiplots": true, "spsrc": "" },
            { "id": "overall_pathway", "name": "Overall Info Pathway", "multiplots": false, "spsrc": "" },
            { "id": "happyface", "name": "HappyFace Classical Rating", "multiplots": false, "spsrc": "" },
            { "id": "forecast", "name": "Happy Forecast", "multiplots": false, "spsrc": "assets/img/forecast.png" }
        ];
        this.selectedViewer = this.viewers.find(function (v) { return v.id === "overall_pathway"; });
    }
    AnalyzerPage.prototype.ngOnInit = function () {
        //DataModel.getInstance().addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        //DataModel.getInstance().addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        //if(!DataModel.getInstance().isLoading()) this.onReloadFinishedListener();
        this.model.addLoadingStartedCallback(this.onLoadingStartedListener.bind(this));
        this.model.addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        if (!this.model.isLoading())
            this.onReloadFinishedListener();
    };
    AnalyzerPage.prototype.onReloadFinishedListener = function () {
        if (!this.connectionErrorPopup()) {
            this.isLoading = false;
            this.setStatusCard();
            this.setPlots(this.selectedViewer.id);
            //this.monitoringURLs = DataModel.getInstance().monitoringUrls;
            this.monitoringURLs = this.model.monitoringUrls;
            this.viewers.find(function (v) { return v.id === "overall_pathway"; }).spsrc = this.monitoringURLs[0].urls[0].plot_overall_pathway;
        }
    };
    AnalyzerPage.prototype.onLoadingStartedListener = function () {
        this.isLoading = true;
    };
    AnalyzerPage.prototype.connectionErrorPopup = function () {
        //let model:DataModel = DataModel.getInstance();
        if (!(this.model.summary == null || this.model.summary == undefined)) {
            if (!(this.model.config == null || this.model.config == undefined)) {
                if (!(this.model.config.status == null || this.model.config.status == undefined)) {
                    if (!(this.model.monitoringUrls == null || this.model.monitoringUrls == undefined)) {
                        return false;
                    }
                }
            }
        }
        var alert = this.alertCtrl.create({
            title: '<b>Connection error</b>',
            subTitle: 'Unable to  connect to given instance<br\>Host: ' + this.model.currentlyActive.host + '<br\>Port: ' + this.model.currentlyActive.mobile_port,
            buttons: ['OK']
        });
        alert.present();
        return true;
    };
    AnalyzerPage.prototype.setStatusCard = function () {
        //this.statusText  = DataModel.getInstance().summary.text;
        //this.statusLevel = DataModel.getInstance().summary.level;
        this.statusText = this.model.summary.text;
        this.statusLevel = this.model.summary.level;
        //let model:DataModel = DataModel.getInstance();
        for (var i = 0; i < this.model.config.status.length; i++) {
            if (this.model.config.status[i].name === this.statusLevel) {
                this.statusImg = this.model.config.status[i].file;
            }
        }
        for (var i = 0; i < this.model.config.status.length; i++) {
            if (this.model.config.status[i].name === this.statusLevel) {
                this.statusColor = this.model.config.status[i].color;
            }
        }
    };
    AnalyzerPage.prototype.reload = function () {
        if (this.isLoading)
            return;
        this.isLoading = true;
        //DataModel.getInstance().reload();
        this.model.reload();
    };
    AnalyzerPage.prototype.viewerChanged = function (event) {
        console.log("VIEWER CHANGED TO: " + JSON.stringify(event));
        this.selectedViewer = event;
        if (this.selectedViewer.multiplots) {
            this.setPlots(this.selectedViewer.id);
            this.monitoringURLs = this.model.monitoringUrls;
        }
    };
    AnalyzerPage.prototype.speakSummary = function () {
        this.setStatusCard();
        //DataModel.getInstance().speakSummary();
        this.model.speakSummary();
    };
    AnalyzerPage.prototype.openPage = function (url) {
        this.navControl.push(__WEBPACK_IMPORTED_MODULE_3__analyzer_detail__["a" /* AnalyzerDetailPage */], { 'url': url });
    };
    AnalyzerPage.prototype.setPlots = function (plot_name) {
        //let model:DataModel = DataModel.getInstance();
        for (var i = 0; i < this.model.monitoringUrls.length; i++) {
            for (var j = 0; j < this.model.monitoringUrls[i].urls.length; j++) {
                if ((this.model.monitoringUrls[i].urls[j].file_prefix == null) || (!this.model.monitoringUrls[i].urls[j].capture)) {
                    //logger.debug("nop");
                    console.log("DEBUG: nop");
                }
                else {
                    if (plot_name == "analysis")
                        this.model.monitoringUrls[i].urls[j].analysis_plot = this.model.monitoringUrls[i].urls[j].plot_analysis;
                    if (plot_name == "pathway")
                        this.model.monitoringUrls[i].urls[j].analysis_plot = this.model.monitoringUrls[i].urls[j].plot_pathway;
                    if (plot_name == "overall_pathway")
                        this.model.monitoringUrls[i].urls[j].analysis_plot = this.model.monitoringUrls[i].urls[j].plot_overall_pathway;
                }
            }
        }
    };
    AnalyzerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-analyzer',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\analyzer.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Happy Monitoring Analyzer</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="reload()" *ngIf="!isLoading"><ion-icon name="refresh"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n    <div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ion-list [hidden]="isLoading" no-padding>\n        <!-- Status card -->\n        <ion-card color="{{statusColor}}" no-padding no-margin style="width: 100%" (click)="speakSummary()">\n            <ion-card-header>\n                Status: {{statusLevel}}\n            </ion-card-header>\n            <ion-card-content no-padding>\n                <ion-item color="{{statusColor}}" text-wrap>\n                    <ion-thumbnail item-start>\n                        <img src="{{statusImg}}">\n                    </ion-thumbnail>\n                    <h2>{{statusText}}</h2>\n                </ion-item>\n            </ion-card-content>\n        </ion-card>\n\n        <!-- Viewer chooser -->\n        <ion-item no-padding>\n            <ion-label>Viewer:</ion-label>\n            <ion-select (ionChange)="viewerChanged($event)" interface="action-sheet" style="max-width: 81% !important;">\n                <ion-option *ngFor="let v of viewers" [selected]="v.id === \'overall_pathway\'" [value]="v">{{v.name}}</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <!-- HappyFace Version1 Connector -->\n        <ion-item [hidden]="!selectedViewer.id === \'happyface\'">\n            <ion-tabs>\n                <ion-tab [root]="HFClassical"></ion-tab>\n            </ion-tabs>\n        </ion-item>\n\n        <!-- Single Plots, i.e. pictures -->\n        <ion-item [hidden]="selectedViewer.multiplots  || (selectedViewer.id === \'happyface\' )">\n            <img src="{{selectedViewer.spsrc}}"/>\n        </ion-item>\n\n        <!-- Multi Plots -->\n        <ion-item *ngFor="let monitoringURL of monitoringURLs" no-padding no-margin text-wrap [hidden]="!selectedViewer.multiplots || (selectedViewer.id === \'happyface\')">\n            <ion-card no-padding no-margin>\n                <ion-card-header class="group-title">{{monitoringURL.name}}</ion-card-header>\n                <ion-card-content no-padding>\n                    <ion-grid>\n                        <ion-row>\n                            <ion-col col-6 col-sm no-padding *ngFor="let url of monitoringURL.urls">\n                                <div class="launchpad">\n                                    <div class="logo"><img src="{{url.analysis_plot}}" alt="Not Analyzed" (click)="openPage(url)"/></div>\n                                    <a href="{{url.link}}" target="_blank"><div class="caption">{{url.name}}</div></a>\n                                </div>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid>\n                </ion-card-content>\n            </ion-card>\n        </ion-item>\n\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFace-MadMask\HappyFaceMobileDevelopment\src\pages\analyzer\analyzer.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], AnalyzerPage);
    return AnalyzerPage;
}());

//# sourceMappingURL=analyzer.js.map

/***/ })

},[213]);
//# sourceMappingURL=main.js.map