export function cls() {
    return ClockWidget;
}
export function template() {
    return "<ion-content>\n" +
        "    <span style=\"font-weight: bold\">{{time}}</span>\n" +
        "</ion-content>";
}
var ClockWidget = /** @class */ (function () {
    function ClockWidget() {
        this.time = "";
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        setInterval(this.setTime(), 500);
    }
    ClockWidget.prototype.setTime = function () {
        var d = new Date();
        this.hours = d.getHours();
        this.minutes = d.getMinutes();
        this.seconds = d.getSeconds();
        var m = (this.minutes < 10 ? "0" + this.minutes : "" + this.minutes);
        var s = (this.seconds < 10 ? "0" + this.seconds : "" + this.seconds);
        this.time = this.hours + ":" + m + ":" + s;
    };
    return ClockWidget;
}());
export { ClockWidget };
