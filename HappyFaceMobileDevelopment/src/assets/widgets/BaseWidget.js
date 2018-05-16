var BaseWidget = /** @class */ (function () {
    function BaseWidget() {
        this.name = null;
        this.width = null;
        this.height = null;
        this.monitoringUrls = null;
        this.summary = null;
        this.config = null;
        this.openImageView = null;
    }
    BaseWidget.prototype.getColor = function (col) {
        switch (col) {
            case "item-calm": return "#32db64";
            case "item-balanced": return "#fffe00";
            case "item-energized": return "#ff9800";
            case "item-assertive": return "#f53d3d";
            default: return "#ffffff";
        }
    };
    BaseWidget.prototype.onInit = function () { };
    BaseWidget.style = null;
    BaseWidget.template = null;
    BaseWidget.templateUrl = null;
    return BaseWidget;
}());
export { BaseWidget };
