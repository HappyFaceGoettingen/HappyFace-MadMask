var BaseWidget = /** @class */ (function () {
    function BaseWidget() {
        this.name = null;
        this.width = null;
        this.height = null;
        this.baseWindow = null;
    }
    BaseWidget.prototype.onInit = function () { };
    BaseWidget.style = null;
    BaseWidget.template = null;
    BaseWidget.templateUrl = null;
    return BaseWidget;
}());
export { BaseWidget };
