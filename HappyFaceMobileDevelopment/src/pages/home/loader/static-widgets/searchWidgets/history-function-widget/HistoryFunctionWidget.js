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
    return HistoryFunctionWidget;
}
var HistoryFunctionWidget = /** @class */ (function (_super) {
    __extends(HistoryFunctionWidget, _super);
    function HistoryFunctionWidget() {
        var _this = _super.call(this) || this;
        _this.width = 300;
        _this.height = 300;
        _this.isLoading = true;
        return _this;
    }
    HistoryFunctionWidget.prototype.onInit = function () {
        this.isLoading = true;
    };
    HistoryFunctionWidget.prototype.onReload = function () {
    };
    HistoryFunctionWidget.templateUrl = "./assets/widgets/searchWidgets/history-function-widget/HistoryFunctionWidget.html";
    return HistoryFunctionWidget;
}(BaseWidget));
export { HistoryFunctionWidget };
