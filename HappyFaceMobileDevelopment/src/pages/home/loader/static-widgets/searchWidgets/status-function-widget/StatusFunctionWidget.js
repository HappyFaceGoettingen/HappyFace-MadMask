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
import { BaseWidget } from "../../BaseWidget.js";
export function cls() {
    return StatusFunctionWidget;
}
var StatusFunctionWidget = /** @class */ (function (_super) {
    __extends(StatusFunctionWidget, _super);
    function StatusFunctionWidget() {
        var _this = _super.call(this) || this;
        _this.width = 300;
        _this.height = 300;
        _this.src = "";
        return _this;
    }
    StatusFunctionWidget.prototype.onInit = function () {
        this.isLoading = true;
    };
    StatusFunctionWidget.prototype.onReload = function () {
        this.isLoading = false;
        this.src = this.data.image[0].url ? this.data.image[0].url : this.data.image[0];
    };
    StatusFunctionWidget.prototype.openImage = function () {
        this.openImageView({ image: this.src, name: this.data.name });
    };
    StatusFunctionWidget.templateUrl = "./assets/widgets/status-function-widget/StatusFunctionWidget.html";
    return StatusFunctionWidget;
}(BaseWidget));
export { StatusFunctionWidget };
