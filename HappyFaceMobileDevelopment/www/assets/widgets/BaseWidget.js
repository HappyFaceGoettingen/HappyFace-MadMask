var BaseWidget = /** @class */ (function () {
    function BaseWidget() {
        /**
         * Variable to specify the name of the Widget. This will be displayed in the
         * widget header. If not specified the filename of the widget will be used.
         * @type {string}
         */
        this.name = null;
        /**
         * Variable to specify the width of the Widget.
         * NOTE: To this day, changes to this variable will not be recognized.
         * @type {number}
         */
        this.width = null;
        /**
         * Variable to specify the height of the Widget.
         * NOTE: To this day, changes to this variable will not be recognized.
         * @type {number}
         */
        this.height = null;
        /**
         * When onInit() is called, this variable holds a JSON.parse of
         * http://host:port/sites/default/monitoring-urls.json
         * @type {any}
         */
        this.monitoringUrls = null;
        /**
         * When onInit() is called, this variable holds a JSON.parse of
         * http://host:port/data/<name>/index/latest/summary.json
         * @type {any}
         */
        this.summary = null;
        /**
         * When onInit() is called, this variable holds a JSON.parse of
         * http://host:port/sites/default/config.json
         * @type {any}
         */
        this.config = null;
        /**
         * When onInit() is called, openImageView holds a function able of
         * opening a simple fullscreen view to display an image.
         * @param (any) data  Must specify the image to be shown and its title like so:
         *                    { name: <title of image>, image: <src url of image> }
         * @type {(any) => void}
         */
        this.openImageView = null;
        /**
         *
         */
        this.data = null;
    }
    /**
     * Returns the color codes for status colors used in config.
     * @param {string} col  Name of the color as found in config.
     * @returns {string}  Hex code of the specified color or "#FFFFFF" if unknown.
     */
    BaseWidget.prototype.getColor = function (col) {
        switch (col) {
            case "item-calm": return "#32db64";
            case "item-balanced": return "#fffe00";
            case "item-energized": return "#ff9800";
            case "item-assertive": return "#f53d3d";
            default: return "#ffffff";
        }
    };
    /**
     * Initialization function called by the loader system as soon as all variables and functions
     * in BaseWidget are available.
     * Should be overwritten by implementing Widgets
     */
    BaseWidget.prototype.onInit = function () { };
    /**
     * Reloading function called by the loader system when the user hits the reloading button.
     * Once called, the variables monitoringUrls, summary and config may have changed.
     */
    BaseWidget.prototype.onReload = function () { };
    /**
     * Static style variable to add custom scss styles as string.
     * NOTE: Not working yet
     * @type {string}
     */
    BaseWidget.style = null;
    /**
     * Static template variable to add the HTML template as string.
     * Can be null if templateUrl is specified.
     * @type {string}
     */
    BaseWidget.template = null;
    /**
     * Static template variable to add the path to a HTML file as string.
     * Path must be accessible through webserver.
     * Can be null if template is specified.
     * @type {string}
     */
    BaseWidget.templateUrl = null;
    return BaseWidget;
}());
export { BaseWidget };
