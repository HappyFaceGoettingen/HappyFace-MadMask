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
var TestWidget = /** @class */ (function (_super) {
    __extends(TestWidget, _super);
    function TestWidget() {
        var _this = _super.call(this) || this;
        _this.title = "TITLE";
        _this.content = "<img src='http://img.youtube.com/vi/ttz4Sr0tZFg/maxresdefault.jpg' alt='No Image'>";
        return _this;
    }
    return TestWidget;
}(BaseWidget));
export { TestWidget };
export function instance() {
    return new TestWidget();
}
