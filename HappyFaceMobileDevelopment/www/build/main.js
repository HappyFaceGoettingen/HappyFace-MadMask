webpackJsonp([1],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__monitoring_monitoring__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__analyzer_analyzer__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__controller_controller__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__logs_logs__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__visualizers_visualizers__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__humans_humans__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__working_working__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__config_config__ = __webpack_require__(163);
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
var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tabMonitoring = __WEBPACK_IMPORTED_MODULE_2__monitoring_monitoring__["a" /* MonitoringPage */];
        this.tabAnalyzer = __WEBPACK_IMPORTED_MODULE_3__analyzer_analyzer__["a" /* AnalyzerPage */];
        this.tabSystems = __WEBPACK_IMPORTED_MODULE_4__controller_controller__["a" /* ControllerPage */];
        this.tabVisualizer = __WEBPACK_IMPORTED_MODULE_6__visualizers_visualizers__["a" /* VisualizersPage */];
        this.tabLogs = __WEBPACK_IMPORTED_MODULE_5__logs_logs__["a" /* LogsPage */];
        this.tabHumans = __WEBPACK_IMPORTED_MODULE_7__humans_humans__["a" /* HumansPage */];
        this.tabConfig = __WEBPACK_IMPORTED_MODULE_9__config_config__["a" /* ConfigPage */];
        this.tabWorking = __WEBPACK_IMPORTED_MODULE_8__working_working__["a" /* WorkingPage */];
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TabsPage');
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\tabs\tabs.html"*/'<ion-content padding>\n  <ion-tabs>\n    <ion-tab [root]="tabMonitoring" tabTitle="Monitoring" tabIcon="ios-speedometer"></ion-tab>\n    <ion-tab [root]="tabAnalyzer" tabTitle="Analyzer" tabIcon="ios-analytics"></ion-tab>\n    <ion-tab [root]="tabSystems" tabTitle="Controller" tabIcon="ios-game-controller-b"></ion-tab>\n    <ion-tab [root]="tabVisualizer" tabTitle="Visualizer" tabIcon="logo-snapchat"></ion-tab>\n    <ion-tab [root]="tabLogs" tabTitle="Logs" tabIcon="ios-recording"></ion-tab>\n    <ion-tab [root]="tabHumans" tabTitle="Humans" tabIcon="ios-people"></ion-tab>\n    <ion-tab [root]="tabConfig" tabTitle="Config" tabIcon="ios-settings"></ion-tab>\n    <ion-tab [root]="tabWorking" tabTitle="Working" tabIcon="ios-nuclear"></ion-tab>\n  </ion-tabs>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\tabs\tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 111:
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
webpackEmptyAsyncContext.id = 111;

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/tabs/tabs.module": [
		282,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 152;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MobileConfig; });
var MobileConfig = /** @class */ (function () {
    function MobileConfig() {
    }
    MobileConfig.get = function () {
        return {
            "automaticFetch": true,
            "interval": 1,
            "automaticRotation": false,
            "detectOnlyChange": true,
            "enableMadVision": true,
            "enableTextSpeech": true,
            "happyFaceCompatible": false
        };
    };
    return MobileConfig;
}());

//# sourceMappingURL=MobileConfig.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonitoringWebviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(13);
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
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\monitoring\monitoring-webview.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{url.name}}</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only item-end (click)="changeToMadVision()">\n                <ion-icon name="ion-eye"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <img style="margin-left: auto; margin-right:auto; max-width: 100%" src="{{url.image}}"/>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\monitoring\monitoring-webview.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* NavParams */]])
    ], MonitoringWebviewPage);
    return MonitoringWebviewPage;
}());

//# sourceMappingURL=monitoring-webview.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyzerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_DataModel__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__monitoring_monitoring__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__analyzer_detail__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__data_MobileConfig__ = __webpack_require__(153);
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
    function AnalyzerPage(navControl, alertCtrl) {
        this.navControl = navControl;
        this.alertCtrl = alertCtrl;
        this.isLoading = true;
        this.statusLevel = "Normal";
        this.statusImg = "https://i3.ytimg.com/vi/GYYvKxchHrM/maxresdefault.jpg";
        this.statusColor = "item-calm";
        this.statusText = "World wide Atlas Distributed Computing System";
        this.viewers = [
            { "id": "analysis", "name": "Status Analysis", "multiplots": true, "spsrc": "" },
            { "id": "pathway", "name": "Info Pathway", "multiplots": true, "spsrc": "" },
            { "id": "overall_pathway", "name": "Overall Info Pathway", "multiplots": false, "spsrc": "" },
            { "id": "happyface", "name": "HappyFace Classical Rating", "multiplots": false, "spsrc": "assets/img/happyface_classical.png" },
            { "id": "forecast", "name": "Happy Forecast", "multiplots": false, "spsrc": "assets/img/forecast.png" }
        ];
        this.selectedViewer = this.viewers.find(function (v) { return v.id === "overall_pathway"; });
    }
    AnalyzerPage.prototype.ngOnInit = function () {
        __WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */].getInstance().addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        if (!__WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */].getInstance().isLoading())
            this.onReloadFinishedListener();
    };
    AnalyzerPage.prototype.onReloadFinishedListener = function () {
        if (!this.connectionErrorPopup()) {
            this.isLoading = false;
            this.setStatusCard();
            __WEBPACK_IMPORTED_MODULE_3__monitoring_monitoring__["a" /* MonitoringPage */].setPlots(this.selectedViewer.id);
            this.monitoringURLs = __WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */].getInstance().monitoringUrls;
            this.viewers.find(function (v) { return v.id === "overall_pathway"; }).spsrc = this.monitoringURLs[0].urls[0].plot_overall_pathway;
        }
    };
    AnalyzerPage.prototype.connectionErrorPopup = function () {
        var model = __WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */].getInstance();
        if (!(model.summary == null || model.summary == undefined)) {
            if (!(model.config == null || model.config == undefined)) {
                if (!(model.config.status == null || model.config.status == undefined)) {
                    if (!(model.monitoringUrls == null || model.monitoringUrls == undefined)) {
                        return false;
                    }
                }
            }
        }
        var alert = this.alertCtrl.create({
            title: '<b>Connection error</b>',
            subTitle: 'Unable to  connect to given instance<br\>Host: ' + model.currentlyActive.host + '<br\>Port: ' + model.currentlyActive.mobile_port,
            buttons: ['OK']
        });
        alert.present();
        return true;
    };
    AnalyzerPage.prototype.setStatusCard = function () {
        this.statusText = __WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */].getInstance().summary.text;
        this.statusLevel = __WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */].getInstance().summary.level;
        var model = __WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */].getInstance();
        for (var i = 0; i < model.config.status.length; i++) {
            if (model.config.status[i].name === this.statusLevel) {
                this.statusImg = model.config.status[i].file;
            }
        }
        for (var i = 0; i < model.config.status.length; i++) {
            if (model.config.status[i].name === this.statusLevel) {
                this.statusColor = model.config.status[i].color;
            }
        }
    };
    AnalyzerPage.prototype.viewerChanged = function (event) {
        console.log("VIEWER CHANGED TO: " + JSON.stringify(event));
        this.selectedViewer = event;
    };
    AnalyzerPage.prototype.speakSummary = function () {
        this.setStatusCard();
        if (__WEBPACK_IMPORTED_MODULE_5__data_MobileConfig__["a" /* MobileConfig */].get().enableTextSpeech) {
            var u = new SpeechSynthesisUtterance();
            u.text = __WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */].getInstance().summary.text;
            u.lang = 'en-GB';
            speechSynthesis.speak(u);
        }
    };
    AnalyzerPage.prototype.openPage = function (url) {
        this.navControl.push(__WEBPACK_IMPORTED_MODULE_4__analyzer_detail__["a" /* AnalyzerDetailPage */], { 'url': url });
    };
    AnalyzerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-monitoring',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\analyzer\analyzer.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Happy Monitoring Analyzer</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n    <div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ion-list [hidden]="isLoading" no-padding>\n        <!-- Status card -->\n        <ion-card color="{{statusColor}}" no-padding no-margin style="width: 100%" (click)="speakSummary()">\n            <ion-card-header>\n                Status: {{statusLevel}}\n            </ion-card-header>\n            <ion-card-content no-padding>\n                <ion-item color="{{statusColor}}" text-wrap>\n                    <ion-thumbnail item-start>\n                        <img src="{{statusImg}}">\n                    </ion-thumbnail>\n                    <h2>{{statusText}}</h2>\n                </ion-item>\n            </ion-card-content>\n        </ion-card>\n\n        <!-- Viewer chooser -->\n        <ion-item no-padding>\n            <ion-label>Viewer:</ion-label>\n            <ion-select (ionChange)="viewerChanged($event)" interface="action-sheet" style="max-width: 81% !important;">\n                <ion-option *ngFor="let v of viewers" [selected]="v.id === \'overall_pathway\'" [value]="v">{{v.name}}</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <!-- Single Plots, i.e. pictures -->\n        <ion-item [hidden]="selectedViewer.multiplots">\n            <img src="{{selectedViewer.spsrc}}"/>\n        </ion-item>\n\n        <!-- Multi Plots -->\n        <ion-item *ngFor="let monitoringURL of monitoringURLs" no-padding no-margin text-wrap [hidden]="!selectedViewer.multiplots">\n            <ion-card no-padding no-margin>\n                <ion-card-header class="group-title">{{monitoringURL.name}}</ion-card-header>\n                <ion-card-content no-padding>\n                    <ion-grid>\n                        <ion-row>\n                            <ion-col col-6 col-sm no-padding *ngFor="let url of monitoringURL.urls">\n                                <div class="launchpad">\n                                    <div class="logo"><img src="{{url.analysis_plot}}" alt="Not Analyzed" (click)="openPage(url)"/></div>\n                                    <a href="{{url.link}}" target="_blank"><div class="caption">{{url.name}}</div></a>\n                                </div>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid>\n                </ion-card-content>\n            </ion-card>\n        </ion-item>\n\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\analyzer\analyzer.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], AnalyzerPage);
    return AnalyzerPage;
}());

//# sourceMappingURL=analyzer.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnalyzerDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
            selector: 'page-analyzer-detail',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\analyzer\analyzer-detail.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{url.name}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <img style="margin-left: auto; margin-right: auto; max-width: 100%;" src="{{url.analysis_plot}}"/>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\analyzer\analyzer-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], AnalyzerDetailPage);
    return AnalyzerDetailPage;
}());

//# sourceMappingURL=analyzer-detail.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControllerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controller_detail__ = __webpack_require__(158);
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
    function ControllerPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.isLoading = true;
        this.systems = [];
    }
    ControllerPage.prototype.ngOnInit = function () {
        __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance().addLoadingFinishedCallback(this.reloadingFinishedCallback.bind(this));
        if (!__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance().isLoading())
            this.reloadingFinishedCallback();
    };
    ControllerPage.prototype.reloadingFinishedCallback = function () {
        this.systems = __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance().systems;
        this.isLoading = false;
    };
    ControllerPage.prototype.openPage = function (system) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__controller_detail__["a" /* ControllerDetailPage */], { "system": system });
    };
    ControllerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-controller',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\controller\controller.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Controller</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ion-list no-padding [hidden]="isLoading">\n        <ion-item *ngFor="let system of systems" text-wrap no-padding (click)="openPage(system)">\n            <ion-avatar item-left>\n                <img src="assets/{{system.img}}"/>\n            </ion-avatar>\n            <h2>{{system.name}}</h2>\n            <p>{{system.text}}</p>\n            <ion-icon class="icon-accessory" name="ion-chevron-right"></ion-icon>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\controller\controller.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* NavController */]])
    ], ControllerPage);
    return ControllerPage;
}());

//# sourceMappingURL=controller.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControllerDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
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
            selector: 'page-controller-detail',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\controller\controller-detail.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{system.name}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <img src="{{system.img}}" style="width: 64px; height: 64px">\n    <h2>{{system.text}}</h2>\n\n    <ion-card>\n        <ion-item-divider>Power</ion-item-divider>\n        <ion-item text-wrap>\n            <button ion-button class="button-outline">Cold reboot</button>\n            <button ion-button class="button-outline">Warm reboot</button>\n        </ion-item>\n    </ion-card>\n    <ion-card>\n        <ion-item-divider>Service</ion-item-divider>\n        <ion-item *ngFor="let service of system.services" text-wrap>\n            <button ion-button class="button-outline">{{service.name}}</button>\n        </ion-item>\n    </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\controller\controller-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], ControllerDetailPage);
    return ControllerDetailPage;
}());

//# sourceMappingURL=controller-detail.js.map

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_DataModel__ = __webpack_require__(33);
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
    function LogsPage(alertCtrl) {
        this.alertCtrl = alertCtrl;
        this.logs = [];
        this.selectedLog = null;
        this.logText = "";
    }
    LogsPage.prototype.ngOnInit = function () {
        __WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */].getInstance().addLoadingFinishedCallback(this.reloadingFinishedListener.bind(this));
        if (!__WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */].getInstance().isLoading())
            this.reloadingFinishedListener();
    };
    LogsPage.prototype.reloadingFinishedListener = function () {
        var model = __WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */].getInstance();
        if (model.logs == null || model.logs == undefined || model.config == null || model.config == undefined) {
            var alert_1 = this.alertCtrl.create({
                title: '<b>Connection error</b>',
                subTitle: 'Unable to  connect to given instance<br\>Host: ' + model.currentlyActive.host + '<br\>Port: ' + model.currentlyActive.mobile_port,
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            this.modifyURLs();
            this.logs = model.logs;
            this.selectedLog = this.logs[0];
            this.loadSelectedLog();
        }
    };
    LogsPage.prototype.logSelected = function ($event) {
        this.selectedLog = $event;
        this.loadSelectedLog();
    };
    LogsPage.prototype.loadSelectedLog = function () {
        __WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */].getInstance().asyncLoadFile(this.selectedLog.file, this.logLoaded.bind(this));
    };
    LogsPage.prototype.modifyURLs = function () {
        var model = __WEBPACK_IMPORTED_MODULE_2__data_DataModel__["a" /* DataModel */].getInstance();
        var log_dir = model.config.data_dir + "/log";
        var remote_url = model.getRemoteURL();
        for (var i = 0; i < model.logs.length; i++) {
            // If it does not begin with 'http', then basename of log name is set
            // For example, /tmp/cron.log --> cron.log --> remote_url + data_dir + '/log/' + cron.log
            if (!model.isHttpURL(model.logs[i].file)) {
                var logname = model.logs[i].file;
                var base_logfile = logname.split('/').reverse()[0];
                model.logs[i].file = remote_url + "/" + log_dir + "/" + base_logfile;
            }
        }
    };
    LogsPage.prototype.logLoaded = function (log, statusCode) {
        if (statusCode == 200)
            this.logText = log;
        else
            this.logText = "ERROR: Log could not be loaded";
    };
    LogsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-logs',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\logs\logs.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Logs Viewer</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-item no-padding>\n        <ion-label>Log:</ion-label>\n        <ion-select (ionChange)="logSelected($event)" interface="action-sheet" style="max-width: 85% !important;">\n            <ion-option *ngFor="let l of logs" [selected]="l == selectedLog" [value]="l">{{l.name}}</ion-option>\n        </ion-select>\n    </ion-item>\n\n    <div no-padding text-wrap>\n        <br/>\n        {{logText}}\n    </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\logs\logs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], LogsPage);
    return LogsPage;
}());

//# sourceMappingURL=logs.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisualizersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
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
    function VisualizersPage(alertCtrl) {
        this.alertCtrl = alertCtrl;
        this.visualizers = [];
        this.selectedVisualizer = null;
    }
    VisualizersPage.prototype.ngOnInit = function () {
        __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance().addLoadingFinishedCallback(this.reloadingFinishedListener.bind(this));
        if (!__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance().isLoading())
            this.reloadingFinishedListener();
    };
    VisualizersPage.prototype.reloadingFinishedListener = function () {
        this.visualizers = __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance().visualizers;
        if (this.visualizers == null || this.visualizers == undefined) {
            this.createErrorLoadingPopup();
        }
        else {
            // TODO modify visulizer urls
            this.selectedVisualizer = this.visualizers[0];
        }
    };
    VisualizersPage.prototype.createErrorLoadingPopup = function () {
        var model = __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance();
        var alert = this.alertCtrl.create({
            title: '<b>Connection error</b>',
            subTitle: 'Unable to  connect to given instance<br\>Host: ' + model.currentlyActive.host + '<br\>Port: ' + model.currentlyActive.mobile_port,
            buttons: ['OK']
        });
        alert.present();
    };
    VisualizersPage.prototype.visualizerSelected = function ($event) {
        this.selectedVisualizer = $event;
    };
    VisualizersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-visualizers',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\visualizers\visualizers.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Visualizers</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-item no-padding>\n        <ion-label>Diagram:</ion-label>\n        <ion-select (ionChange)="visualizerSelected($event)" interface="action-sheet" style="max-width: 75% !important;">\n            <ion-option *ngFor="let v of visualizers" [value]="v">{{v.name}}</ion-option>\n        </ion-select>\n    </ion-item>\n\n    <ion-item no-padding style="margin-left: auto; margin-right: auto; max-width: 100%;">\n        <img src="{{selectedVisualizer.file}}"/>\n    </ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\visualizers\visualizers.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
    ], VisualizersPage);
    return VisualizersPage;
}());

//# sourceMappingURL=visualizers.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HumansPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(33);
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
    function HumansPage() {
        this.humans = [];
    }
    HumansPage.prototype.ngOnInit = function () {
        __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance().addLoadingFinishedCallback(this.reloadingFinishedCallback.bind(this));
        if (!__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance().isLoading())
            this.reloadingFinishedCallback();
    };
    HumansPage.prototype.reloadingFinishedCallback = function () {
        this.humans = __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance().humans;
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
            selector: 'page-humans',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\humans\humans.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Ticket, E-mail & Contact</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list no-padding>\n        <ion-item *ngFor="let human of humans" text-wrap (click)="openHuman(human)">\n            <ion-avatar item-left>\n                <img src="{{human.img}}"/>\n            </ion-avatar>\n            E-mail: <a href="mailto:{{human.email}}" target="_blank">{{human.email}}</a> <br/>\n            Tel: {{human.tel}}\n            <p>{{human.text}}</p>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\humans\humans.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], HumansPage);
    return HumansPage;
}());

//# sourceMappingURL=humans.js.map

/***/ }),

/***/ 162:
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
            selector: 'page-working',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\working\working.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Working</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\working\working.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], WorkingPage);
    return WorkingPage;
}());

//# sourceMappingURL=working.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigPage; });
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

var ConfigPage = /** @class */ (function () {
    function ConfigPage() {
    }
    ConfigPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-config',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\config\config.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Configuration</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list>\n        <ion-item (click)="chooseInstance()">\n            <!-- Move to Instance selection page -->\n            <span style="float: left; padding-top: 10px; padding-bottom: 10px"> Choose Instance</span>\n            <span style="float: right; padding-top: 10px; padding-bottom: 10px"><ion-icon name="ios-arrow-forward"></ion-icon></span> <!--<i class="icon ion-ios-arrow-right"></i>-->\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\config\config.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ConfigPage);
    return ConfigPage;
}());

//# sourceMappingURL=config.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(230);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_monitoring_monitoring__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_monitoring_monitoring_webview__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_analyzer_analyzer__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_analyzer_analyzer_detail__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_controller_controller__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_controller_controller_detail__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_visualizers_visualizers__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_logs_logs__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_humans_humans__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_working_working__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_config_config__ = __webpack_require__(163);
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
                __WEBPACK_IMPORTED_MODULE_10__pages_analyzer_analyzer_detail__["a" /* AnalyzerDetailPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_controller_controller__["a" /* ControllerPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_controller_controller_detail__["a" /* ControllerDetailPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_visualizers_visualizers__["a" /* VisualizersPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_logs_logs__["a" /* LogsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_humans_humans__["a" /* HumansPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_config_config__["a" /* ConfigPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_working_working__["a" /* WorkingPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* HappyFaceApp */], {}, {
                    links: [
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* HappyFaceApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_monitoring_monitoring__["a" /* MonitoringPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_monitoring_monitoring_webview__["a" /* MonitoringWebviewPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_analyzer_analyzer__["a" /* AnalyzerPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_analyzer_analyzer_detail__["a" /* AnalyzerDetailPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_controller_controller__["a" /* ControllerPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_controller_controller_detail__["a" /* ControllerDetailPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_visualizers_visualizers__["a" /* VisualizersPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_logs_logs__["a" /* LogsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_humans_humans__["a" /* HumansPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_config_config__["a" /* ConfigPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_working_working__["a" /* WorkingPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HappyFaceApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(101);
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], HappyFaceApp);
    return HappyFaceApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataModel; });
/* unused harmony export ConfigObject */
/* unused harmony export StatusObject */
/* unused harmony export InstanceObject */
var DataModel = /** @class */ (function () {
    function DataModel() {
        // Seed node
        this.SEED_META_META_HOST = "141.5.108.30";
        this.SEED_META_META_MOBILE_PORT = "20110";
        this.SEED_META_META_WEB_PORT = "10110";
        this.SEED_META_META_DIR = "sites/default";
        this.SEED_META_META_JSON = "meta-meta.json";
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
        this.__backup = new InstanceObject();
        this.currentlyActive = new InstanceObject();
        // Asynchronous file loading
        this.loadingFinishedCallbacks = [];
        this.loading = false;
        this.reload();
    }
    DataModel.getInstance = function () { if (this._instance == null)
        return (this._instance = new DataModel());
    else
        return this._instance; };
    DataModel.loadJSON = function (host, port, dir, json, callback, errCallback) {
        var url = "";
        //let jsonContent:string = "";
        if (host === "localhost")
            url = dir + "/" + json;
        else
            url = "http://" + host + ":" + port + "/" + dir + "/" + json;
        console.log("READING: " + url);
        this.readFileAsync(url, callback, errCallback);
    };
    DataModel.loadJsonByConfig = function (config, json, callback, errCallback) {
        //ConfigReader.loadJSON(ConfigReader.current.host, (this.isMobilePlatform() ? ConfigReader.current.mobile_port : ConfigReader.current.web_port),
        //            config.data_dir, json, callback, errCallback);
        if (config.dir == null || config.dir == undefined) {
            config.dir = "sites/default";
            console.log("USING REPLACEMENT FOR CONFIG.DIR");
        }
        this.loadJSON(DataModel.getInstance().currentlyActive.host, DataModel.getInstance().currentlyActive.mobile_port, config.dir, json, callback, errCallback);
    };
    DataModel.readFileAsync = function (url, callback, errCallback) {
        var req = new XMLHttpRequest();
        try {
            req.addEventListener("load", function (event) { callback(req.response); });
            req.addEventListener("error", function (event) { errCallback(req.response); });
            req.open("GET", url, false);
            req.send();
        }
        catch (error) {
            console.log("ERROR occurred: ", error);
            errCallback(error);
        }
    };
    DataModel.prototype.addLoadingFinishedCallback = function (callback) { this.loadingFinishedCallbacks.push(callback); };
    DataModel.prototype.removeLoadingFinishedCallback = function (callback) {
        this.loadingFinishedCallbacks = this.loadingFinishedCallbacks.filter(function (obj) { return obj !== callback; });
    };
    DataModel.prototype.isLoading = function () { return this.loading; };
    DataModel.prototype.reload = function () {
        this.loading = true;
        var urls = [DataModel.configJson, DataModel.monitoringUrlsJson, DataModel.systemsJson, DataModel.visualizersJson,
            DataModel.logsJson, DataModel.humansJson, DataModel.meta_meta_json, DataModel.summaryJson];
        // Find data_dir for summary JSON TODO Improve. This configuration is not secure
        var summary_data_dir = "data/" + this.currentlyActive.name; //this.currentlyActive.dir.replace("sites", "data");
        for (var i = 0; i < urls.length; i++) {
            if (this.currentlyActive.host === "localhost")
                urls[i] = this.currentlyActive.dir + "/" + urls[i];
            else
                urls[i] = "http://" + this.currentlyActive.host + ":" + this.currentlyActive.mobile_port + "/" + //TODO Mobile Port is still the only used one.
                    (i == urls.length - 1 ? summary_data_dir : this.currentlyActive.dir) + "/" + urls[i];
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
                return function (event) {
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
        if (statusCodes[0] == 200)
            this.config = JSON.parse(responses[0]);
        else
            this.config = null;
        if (statusCodes[1] == 200)
            this.monitoringUrls = JSON.parse(responses[1]);
        else
            this.monitoringUrls = null;
        if (statusCodes[2] == 200)
            this.systems = JSON.parse(responses[2]);
        else
            this.systems = null;
        if (statusCodes[3] == 200)
            this.visualizers = JSON.parse(responses[3]);
        else
            this.visualizers = null;
        if (statusCodes[4] == 200)
            this.logs = JSON.parse(responses[4]);
        else
            this.logs = null;
        if (statusCodes[5] == 200)
            this.humans = JSON.parse(responses[5]);
        else
            this.humans = null;
        if (statusCodes[6] == 200)
            this.metaMetaSites = JSON.parse(responses[6]);
        else
            this.metaMetaSites = null;
        if (statusCodes[7] == 200)
            this.summary = JSON.parse(responses[7]);
        else
            this.summary = null;
        this.loading = false;
        //console.log(JSON.stringify(this));
        for (var i = 0; i < this.loadingFinishedCallbacks.length; i++) {
            this.loadingFinishedCallbacks[i]();
        }
    };
    // Asynchronous load JSON file
    DataModel.prototype.asyncLoadFile = function (url, callback) {
        console.log("READING: " + url);
        var req = new XMLHttpRequest();
        req.onreadystatechange = function (event) {
            if (req.readyState == 4) {
                callback(req.response, req.status);
            }
        };
        req.open("GET", url, true);
        req.send();
    };
    // Getters
    DataModel.prototype.getRemoteURL = function () {
        return "http://" + this.currentlyActive.host + ":" + this.currentlyActive.mobile_port + "/";
    };
    DataModel.prototype.isHttpURL = function (url) {
        return new RegExp('^(http|https)(:\\/\\/)').test(url);
    };
    // Singletone
    DataModel._instance = null;
    // { return this._instance || (this._instance = new DataModel()); };
    // Debug switches
    DataModel.FORCE_LOAD_LOCAL_META_META_FILE = false;
    DataModel.FORCE_MOBILE = false;
    // Locations
    DataModel.configJson = "config.json";
    DataModel.monitoringUrlsJson = "monitoring-urls.json";
    DataModel.systemsJson = "systems.json";
    DataModel.visualizersJson = "visualizers.json";
    DataModel.logsJson = "logs.json";
    DataModel.humansJson = "humans.json";
    DataModel.meta_meta_json = "meta-meta.json";
    DataModel.summaryJson = "index/latest/summary.json";
    return DataModel;
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
    }
    InstanceObject.prototype.changeActive = function (name, host, web_port, mobile_port, dir) {
        DataModel.getInstance().__backup = DataModel.getInstance().currentlyActive;
        this.name = name;
        this.host = host;
        this.web_port = web_port;
        this.mobile_port = mobile_port;
        this.dir = dir;
    };
    return InstanceObject;
}());

//# sourceMappingURL=DataModel.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonitoringPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_DataModel__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_MobileConfig__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__monitoring_webview__ = __webpack_require__(154);
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
    function MonitoringPage(navControl, alertCtrl) {
        this.navControl = navControl;
        this.alertCtrl = alertCtrl;
        this.isLoading = true;
        this.statusLevel = "Warning";
        this.statusImg = "https://i.ytimg.com/vi/RqRNd4UyA4c/maxresdefault.jpg";
        this.statusColor = "item-calm";
        this.statusText = "World wide Atlas Distributed Computing System";
        // Helper
        this.plot_name = "analysis";
    }
    MonitoringPage_1 = MonitoringPage;
    MonitoringPage.prototype.ngOnInit = function () {
        __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance().addLoadingFinishedCallback(this.onReloadFinishedListener.bind(this));
        if (!__WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance().isLoading())
            this.onReloadFinishedListener();
    };
    MonitoringPage.prototype.onReloadFinishedListener = function () {
        if (!this.connectionErrorPopup()) {
            this.isLoading = false;
            this.setHistory();
            this.setStatusCard();
            this.setLinks("latest");
        }
    };
    MonitoringPage.prototype.connectionErrorPopup = function () {
        var model = __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance();
        if (!(model.summary == null || model.summary == undefined)) {
            if (!(model.config == null || model.config == undefined)) {
                if (!(model.config.status == null || model.config.status == undefined)) {
                    return false;
                }
            }
        }
        var alert = this.alertCtrl.create({
            title: '<b>Connection error</b>',
            subTitle: 'Unable to  connect to given instance<br\>Host: ' + model.currentlyActive.host + '<br\>Port: ' + model.currentlyActive.mobile_port,
            buttons: ['OK']
        });
        alert.present();
        return true;
    };
    MonitoringPage.prototype.openModalConfig = function () {
    };
    MonitoringPage.prototype.historyChanged = function (event) {
        this.setLinks(event);
    };
    MonitoringPage.prototype.setStatusCard = function () {
        this.statusText = __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance().summary.text;
        this.statusLevel = __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance().summary.level;
        var model = __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance();
        for (var i = 0; i < model.config.status.length; i++) {
            if (model.config.status[i].name === this.statusLevel) {
                this.statusImg = model.config.status[i].file;
            }
        }
        for (var i = 0; i < model.config.status.length; i++) {
            if (model.config.status[i].name === this.statusLevel) {
                this.statusColor = model.config.status[i].color;
            }
        }
    };
    MonitoringPage.prototype.setHistory = function () {
        var str = __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance().summary.history;
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
        this.navControl.push(__WEBPACK_IMPORTED_MODULE_4__monitoring_webview__["a" /* MonitoringWebviewPage */], { 'url': url });
    };
    MonitoringPage.prototype.speakSummary = function () {
        this.setStatusCard();
        if (__WEBPACK_IMPORTED_MODULE_2__data_MobileConfig__["a" /* MobileConfig */].get().enableTextSpeech) {
            var u = new SpeechSynthesisUtterance();
            u.text = __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance().summary.text;
            u.lang = 'en-GB';
            speechSynthesis.speak(u);
        }
    };
    // Helper functions
    MonitoringPage.prototype.setLinks = function (datetime_dir) {
        var model = __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance();
        var remote_url = model.getRemoteURL();
        var config = model.config;
        var capture_dir = config.data_dir + "/capture";
        var thumbnail_dir = config.data_dir + "/thumbnail";
        var analysis_dir = config.data_dir + "/analysis";
        if (__WEBPACK_IMPORTED_MODULE_2__data_MobileConfig__["a" /* MobileConfig */].get().enableMadVision) {
            capture_dir = analysis_dir + "/madvision";
            thumbnail_dir = analysis_dir + "/madvision_thumbnail";
        }
        var plot_analysis_dir = analysis_dir + "/plot_analysis/latest";
        var plot_pathway_dir = analysis_dir + "/plot_pathway/latest";
        for (var i = 0; i < model.monitoringUrls.length; i++) {
            for (var j = 0; j < model.monitoringUrls[i].urls.length; j++) {
                if ((model.monitoringUrls[i].urls[j].file_prefix == null) || (!model.monitoringUrls[i].urls[j].capture)) {
                    model.monitoringUrls[i].urls[j].thumbnail = remote_url + "img/not_captured.png";
                    model.monitoringUrls[i].urls[j].image = remote_url + "img/not_captured.png";
                    model.monitoringUrls[i].urls[j].analysis_plot = remote_url + "img/not_captured.png";
                    model.monitoringUrls[i].urls[j].plot_pathway = remote_url + "img/not_captured.png";
                    model.monitoringUrls[i].urls[j].plot_overall_pathway = remote_url + "img/not_captured.png";
                }
                else {
                    model.monitoringUrls[i].urls[j].thumbnail = remote_url + thumbnail_dir + "/" + datetime_dir + "/" + model.monitoringUrls[i].urls[j].file_prefix + ".jpg";
                    model.monitoringUrls[i].urls[j].image = remote_url + capture_dir + "/" + datetime_dir + "/" + model.monitoringUrls[i].urls[j].file_prefix + ".jpg";
                    model.monitoringUrls[i].urls[j].plot_analysis = remote_url + plot_analysis_dir + "/" + model.monitoringUrls[i].urls[j].file_prefix + ".png";
                    model.monitoringUrls[i].urls[j].plot_pathway = remote_url + plot_pathway_dir + "/" + model.monitoringUrls[i].urls[j].file_prefix + ".png";
                    model.monitoringUrls[i].urls[j].plot_overall_pathway = remote_url + plot_pathway_dir + "/overall_pathway.png";
                    MonitoringPage_1.setPlots(this.plot_name);
                }
            }
        }
        console.log(JSON.stringify(model.monitoringUrls));
        this.monitoringURLs = model.monitoringUrls;
    };
    MonitoringPage.setPlots = function (plot_name) {
        var model = __WEBPACK_IMPORTED_MODULE_1__data_DataModel__["a" /* DataModel */].getInstance();
        for (var i = 0; i < model.monitoringUrls.length; i++) {
            for (var j = 0; j < model.monitoringUrls[i].urls.length; j++) {
                if ((model.monitoringUrls[i].urls[j].file_prefix == null) || (!model.monitoringUrls[i].urls[j].capture)) {
                    //logger.debug("nop");
                    console.log("DEBUG: nop");
                }
                else {
                    if (plot_name == "analysis")
                        model.monitoringUrls[i].urls[j].analysis_plot = model.monitoringUrls[i].urls[j].plot_analysis;
                    if (plot_name == "pathway")
                        model.monitoringUrls[i].urls[j].analysis_plot = model.monitoringUrls[i].urls[j].plot_pathway;
                    if (plot_name == "overall_pathway")
                        model.monitoringUrls[i].urls[j].analysis_plot = model.monitoringUrls[i].urls[j].plot_overall_pathway;
                }
            }
        }
    };
    MonitoringPage = MonitoringPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-monitoring',template:/*ion-inline-start:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\monitoring\monitoring.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Happy Meta-Monitoring</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="openModalConfig()">\n        <ion-icon name="md-more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n    <div text-center padding [hidden]="!isLoading">\n        <ion-spinner></ion-spinner>\n    </div>\n\n    <ion-list [hidden]="isLoading" no-padding>\n        <!-- Status card -->\n        <ion-card color="{{statusColor}}" no-padding no-margin style="width: 100%" (click)="speakSummary()">\n            <ion-card-header>\n                Status: {{statusLevel}}\n            </ion-card-header>\n            <ion-card-content no-padding>\n                <ion-item color="{{statusColor}}" text-wrap>\n                    <ion-thumbnail item-start>\n                        <img src="{{statusImg}}">\n                    </ion-thumbnail>\n                    <h2>{{statusText}}</h2>\n                </ion-item>\n            </ion-card-content>\n        </ion-card>\n\n        <!-- History chooser -->\n        <ion-item no-padding>\n            <ion-label>History:</ion-label>\n            <ion-select (ionChange)="historyChanged($event)" interface="action-sheet" style="max-width: 75% !important;">\n              <ion-option *ngFor="let ts of history" [selected]="ts.datetime == latest">{{ts.datetime}}</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <!-- Content list -->\n        <ion-item *ngFor="let monitoringURL of monitoringURLs" no-padding no-margin text-wrap>\n            <ion-card no-padding no-margin>\n                <ion-card-header class="group-title">{{monitoringURL.name}}</ion-card-header>\n                <ion-card-content no-padding>\n                    <ion-grid>\n                        <ion-row>\n                            <ion-col col-6 col-sm no-padding *ngFor="let url of monitoringURL.urls">\n                                <div class="launchpad">\n                                    <div class="logo"><img src="{{url.thumbnail}}" alt="Not Captured" (click)="openPage(url)"/></div>\n                                    <a href="{{url.link}}" target="_blank"><div class="caption">{{url.name}}</div></a>\n                                </div>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid>\n                </ion-card-content>\n            </ion-card>\n        </ion-item>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\atopi\Codes\bachelor\HappyFaceMobile2\src\pages\monitoring\monitoring.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */]])
    ], MonitoringPage);
    return MonitoringPage;
    var MonitoringPage_1;
}());

//# sourceMappingURL=monitoring.js.map

/***/ })

},[207]);
//# sourceMappingURL=main.js.map