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
    return DependencyFunctionWidget;
}
var DependencyFunctionWidget = /** @class */ (function (_super) {
    __extends(DependencyFunctionWidget, _super);
    function DependencyFunctionWidget() {
        var _this = _super.call(this) || this;
        _this.width = 300;
        _this.height = 300;
        _this.src = "";
        return _this;
    }
    DependencyFunctionWidget.prototype.onInit = function () {
        this.isLoading = true;
    };
    DependencyFunctionWidget.prototype.onReload = function () {
        this.isLoading = false;
        this.src = this.data.plot_pathway[0].url ? this.data.plot_pathway[0].url : this.data.plot_pathway[0];
    };
    DependencyFunctionWidget.prototype.openImage = function () {
        this.openImageView({ image: this.src, name: this.data.name });
    };
    DependencyFunctionWidget.templateUrl = "./assets/widgets/searchWidgets/dependency-function-widget/DependencyFunctionWidget.html";
    return DependencyFunctionWidget;
}(BaseWidget));
export { DependencyFunctionWidget };
