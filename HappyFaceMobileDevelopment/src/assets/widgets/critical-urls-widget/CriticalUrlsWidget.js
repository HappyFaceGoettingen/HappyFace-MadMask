var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { BaseWidget } from "../BaseWidget.js";
/*export function instance()
{
    return new CriticalUrlsWidget();
}

export function template()
{
    return "<ion-content>\n" +
        "    <ion-grid>\n" +
        "        <ion-row>\n" +
        "            <ion-col col-sm-4 *ngFor=\"let img of imgList\">\n" +
        "                <div class=\"card_temp\" (click)=\"imgClicked(img)\">\n" +
        "                    <img src=\"{{img.src}}\">\n" +
        "                    <p style=\"font-size: 9px\">{{img.title}}</p>\n" +
        "                </div>\n" +
        "            </ion-col>\n" +
        "        </ion-row>\n" +
        "    </ion-grid>\n" +
        "</ion-content>";

    /*let req:XMLHttpRequest = new XMLHttpRequest();
    req.open("GET", "./assets/widgets/critical-urls-widget/CriticalUrlsWidget.html", false);
    req.send();
    return req.responseText;
}

export function style() { return ""; }*/
export function cls() {
    return CriticalUrlsWidget;
}
var CriticalUrlsWidget = /** @class */ (function (_super) {
    __extends(CriticalUrlsWidget, _super);
    function CriticalUrlsWidget() {
        var _this = _super.call(this) || this;
        _this.height = 200;
        _this.width = 220;
        _this.imgList = [];
        _this.statusText = "";
        _this.statusColor = "";
        _this.okText = "";
        return _this;
    }
    CriticalUrlsWidget.prototype.onInit = function () {
        this.name = "Critical Urls";
        this.statusText = "No Data";
        this.statusColor = "#F1F1F1";
        this.okText = "Everything's cool.";
    };
    CriticalUrlsWidget.prototype.onReload = function () {
        var _this = this;
        var img = "";
        var title = "";
        var image = "";
        if (!this.summary || !this.monitoringUrls || !this.config)
            return;
        if (!this.summary.urls)
            return;
        console.log("on reload");
        this.statusText = this.summary.level;
        if (!Array.isArray(this.summary.urls))
            this.okText = "No connection";
        if (this.statusText === "No Data")
            this.okText = "No connection";
        for (var j = 0; j < this.monitoringUrls.length; j++) {
            this.monitoringUrls[j].urls.find(function (element) {
                if (_this.summary.urls.indexOf(element.name) > -1) {
                    img = element.thumbnail;
                    title = element.name;
                    image = element.image;
                    console.log("IMG: " + img);
                    _this.imgList.push({ src: img, title: title, image: image });
                }
            });
        }
        for (var i = 0; i < this.config.status.length; i++) {
            if (this.config.status[i].name === this.statusText) {
                this.statusColor = this.config.status[i].color;
                this.statusColor = _super.prototype.getColor.call(this, this.statusColor);
            }
        }
    };
    CriticalUrlsWidget.prototype.imgClicked = function (img) {
        console.log(img.src);
        this.openImageView({ name: img.title, image: img.image });
    };
    CriticalUrlsWidget.template = "<ion-content>\n" +
        "    <ion-grid>\n" +
        "        <ion-row>\n" +
        "            <ion-col col-sm-4 *ngFor=\"let img of imgList\">\n" +
        "                <div class=\"card_temp\" (click)=\"imgClicked(img)\">\n" +
        "                    <img src=\"{{img.src}}\">\n" +
        "                    <p style=\"font-size: 9px\">{{img.title}}</p>\n" +
        "                </div>\n" +
        "            </ion-col>\n" +
        "        </ion-row>\n" +
        "    </ion-grid>\n" +
        "</ion-content>";
    CriticalUrlsWidget.templateUrl = "./assets/widgets/critical-urls-widget/CriticalUrlsWidget.html";
    return CriticalUrlsWidget;
}(BaseWidget));
export { CriticalUrlsWidget };
