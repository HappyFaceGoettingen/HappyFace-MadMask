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
export function cls() {
    return ClockWidget;
}
var ClockWidget = /** @class */ (function (_super) {
    __extends(ClockWidget, _super);
    function ClockWidget() {
        var _this = _super.call(this) || this;
        _this.width = 200;
        _this.height = 170;
        _this.name = "Clock";
        _this.time = "";
        _this.hours = 0;
        _this.minutes = 0;
        _this.seconds = 0;
        return _this;
    }
    ClockWidget.prototype.onInit = function () {
        this.baseWindow.setTimeout(this.setTime(), 12000);
    };
    ClockWidget.prototype.setTime = function () {
        console.log("New Time");
        var d = new Date();
        this.hours = d.getHours();
        this.minutes = d.getMinutes();
        this.seconds = d.getSeconds();
        var m = (this.minutes < 10 ? "0" + this.minutes : "" + this.minutes);
        var s = (this.seconds < 10 ? "0" + this.seconds : "" + this.seconds);
        this.time = this.hours + ":" + m + ":" + s;
    };
    ClockWidget.template = "<ion-content>\n" +
        "    <span style=\"font-weight: bold\">{{time}}</span>\n" +
        "</ion-content>";
    return ClockWidget;
}(BaseWidget));
export { ClockWidget };
