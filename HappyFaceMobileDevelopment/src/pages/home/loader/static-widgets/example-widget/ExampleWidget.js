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
    return ExampleWidget;
}
var ExampleWidget = /** @class */ (function (_super) {
    __extends(ExampleWidget, _super);
    function ExampleWidget() {
        var _this = _super.call(this) || this;
        _this.height = 200;
        _this.width = 200;
        _this.name = "Example Widget";
        _this.status = { img: "", level: "" };
        return _this;
    }
    ExampleWidget.prototype.onInit = function () {
        var _this = this;
        if (!this.summary)
            return;
        if (!this.config || !this.config.status)
            return;
        this.status.level = this.summary.level;
        this.config.status.find(function (element) {
            if (element.name === _this.status.level)
                _this.status.img = element.file;
        });
    };
    ExampleWidget.template = "<ion-content>" +
        "   <img src='{{status.img}}' alt='missing'>" +
        "   <p> {{status.level}} </p>" +
        "</ion-content>";
    return ExampleWidget;
}(BaseWidget));
export { ExampleWidget };
