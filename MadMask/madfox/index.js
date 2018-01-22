/*
  Author: Gen Kawamura
  Date: 12.2015
*/

/*
  Generating a button
*/
var buttons = require('sdk/ui/button/action');

var button = buttons.ActionButton({
	id: "mozilla-link",
	label: "Capture tabs",
	icon: {
	    "24": "./icon-24.png",
	    "32": "./icon-32.png",
	    "64": "./icon-64.png"
	},
	onClick: handleClick
    });

function handleClick(state) {
    // Saving tabs to /tmp/madfox.$USER/*.png
    captureTabs(false);
}


/*
  Generating HotKey Function
*/
var { Hotkey } = require("sdk/hotkeys");

var saveHotKey = Hotkey({
	combo: "alt-shift-s",
	onPress: function() {
	    captureTabs(false);
	}
    }
);

var saveAndCloseHotKey = Hotkey({
	combo: "accel-shift-s",
	onPress: function() {
	    captureTabs(true);
	}
    }
);


/*
  Capture function
*/
var tabs = require("sdk/tabs");
var tab_utils = require("sdk/tabs/utils");
var { modelFor } = require("sdk/model/core");
var { viewFor } = require("sdk/view/core");

const { Cc, Ci, Cu } = require('chrome');
const { OS } = Cu.import("resource://gre/modules/osfile.jsm");
const { Task } = Cu.import("resource://gre/modules/Task.jsm");


function captureTabs(closeTabs){
    var i = 0;
    var dirname = "/tmp/madfox." + env.USER;
    var FileUtils = Cu.import("resource://gre/modules/FileUtils.jsm").FileUtils
    var nsifile   = new FileUtils.File( dirname )
    if (! nsifile.exists()){
      console.error("Making output dir: [" + dirname + "]");
      nsifile.create(1, 0755);
    }

    for (let tab of tabs){
	// Capturing
        var output_png = dirname + "/" + i + ".png";
	console.error("Tab: " + i + " Capturing [" + tab.url + "] --> [" + output_png + "]");

	// Save current tab
	/*
	  Ref:
	  https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/tabs#Converting_to_XUL_tabs
	  https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XUL/browser
	 */

	// get the XUL tab that corresponds to this high-level tab
	var lowLevelTab = viewFor(tab);
	// now we can, for example, access the tab's content directly
	var browser = tab_utils.getBrowserForTab(lowLevelTab);
	//console.log(browser.contentDocument.body.innerHTML);

	var window = browser.contentWindow;

	/*
	  Ref:
	  https://developer.mozilla.org/en-US/Add-ons/Code_snippets/Canvas#Saving_a_canvas_image_to_a_file
	 */
	var canvas = drawCanvas(window);
	saveCanvas(canvas, output_png);

	i++;
    }

    if (closeTabs){
	for (let tab of tabs){
	    //tab.activate();
	    tab.close();
	}
    }
}

/*
  Set environment util
*/
var { env } = require('sdk/system/environment');




/*
  Canvas drawer and saver
*/
function drawCanvas(win) {
    var doc = win.document;
    var html = doc.documentElement;

    var width = html.scrollWidth;
    var height = html.scrollHeight;
    if (height == 0) {
	console.error("win.innerHeight = " + win.innerHeight);
	height = win.innerHeight;
    }
    console.error("height = " + height + ", width = " + width);

    var left = 0, top = 0;

    /*
      Create a new canvas element
    */
    //var canvas = win.document.createElementNS("http://www.w3.org/1999/xhtml", "html:canvas");
    var canvas = win.document.createElement('canvas');
    canvas.style.width = canvas.style.maxwidth = String(width) + "px";
    canvas.style.height = canvas.style.maxheight = String(height) + "px";
    canvas.width = width;
    canvas.height = height;

    /*
             Draw a rectangle inside the canvas
    */
    var ctx = canvas.getContext("2d");
    ctx.clearRect(left, top, width, height);
    ctx.save();
    ctx.drawWindow(win, left, top, width, height, "rgb(255,255,255)");
    ctx.restore();

    // Return the canvas
    return canvas;
}



/*
  Saving canvas
  Ref: http://stackoverflow.com/questions/31502231/firefox-addon-expose-chrome-function-to-website
 */


function expose(event) {
    Cu.exportFunction(saveCanvas, event.subject, {defineAs: "saveCanvas"});
}


function saveCanvas(canvas, name) {
    var path = OS.Path.join(OS.Constants.Path.desktopDir, name);

    return Task.spawn(function *() {
        var reader;
        try {
          Cu.importGlobalProperties(['FileReader']);
          reader = new FileReader();
        } catch (e) {
          reader = Cc['@mozilla.org/files/filereader;1'].createInstance(Ci.nsIDOMFileReader);
        }
        var blob = yield new Promise(accept => canvas.toBlob(accept));
        reader.readAsArrayBuffer(blob);
        yield new Promise(accept => { reader.onloadend = accept });
        return yield OS.File.writeAtomic(path, new Uint8Array(reader.result));
    });
}


exports.main = function(options, callbacks) {
    var events = require("sdk/system/events");
    events.on("content-document-global-created", expose);
};
