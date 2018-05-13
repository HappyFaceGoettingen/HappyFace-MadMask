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
        _this.height = 170;
        _this.width = 200;
        _this.imgList = [];
        _this.statusText = "";
        _this.statusColor = "";
        return _this;
    }
    CriticalUrlsWidget.prototype.onInit = function () {
        this.imgList.push({ src: "http://img.youtube.com/vi/ttz4Sr0tZFg/maxresdefault.jpg", title: "IMG TITLE" });
        this.name = "Critical Urls";
        this.statusText = "Error";
        this.statusColor = "#FF0000";
    };
    CriticalUrlsWidget.prototype.imgClicked = function (img) {
        console.log(img.src);
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
