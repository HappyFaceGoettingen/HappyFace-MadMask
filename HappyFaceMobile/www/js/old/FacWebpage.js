angular.module('hf.FacWebpage', [])
    .factory('FacWebpage', ['FacUIVariables', 'FacPopup', function (FacUIVariables, FacPopup) {

        function openModuleInAppBrowser(mod) {
            console.log('not using webservice');
            var ref = window.open(mod.link, '_blank', 'location=no,toolbar=yes,toolbarposition=top,EnableViewPortScale=yes,closebuttoncaption=Back,hidden=yes');
            FacUIVariables.beginLoading(true);
            ref.addEventListener('loadstop', function () {
                FacUIVariables.stopLoading(true);
                ref.insertCSS({code: "#header {display:none}" //insertCSS to polish the website and make it suitable for an app
                    + "#category_bar {display:none;}"
                    + "#content {margin:0;margin-left:40px;margin-top:60px}"
                    + "#timemachine {display:none;}" //until here elements for GoeGrid were disabled
                    + ".HappyFNnav {display: none;}" //from here, all other instances are effected
                    + ".HappySolidLayer {display:none}"
                    + ".HappyPanelsTabGroup {display:none}"
                    + ".HappyPanelsTab {display:none}"
                    + ".HappyPanelsContentGroup {border:none;}"
                    + ".HappyTitleBar {display:none}" //until here for KIT and CMS
                    + "a {pointer-events: none;cursor: default;}"    //for safety disable all links
                });
                ref.show();
            });
            ref.addEventListener('loaderror', function () {
                FacUIVariables.stopLoading(true);
                FacPopup.showPopupByName('noInternet');
                ref.removeEventListener('loadstop', function () {
                });
                ref.removeEventListener('loaderror', function () {
                });
                ref.removeEventListener('exit', function () {
                });
            });
            ref.addEventListener('exit', function () {
                ref.removeEventListener('loadstop', function () {
                });
                ref.removeEventListener('loaderror', function () {
                });
                ref.removeEventListener('exit', function () {
                });
            });
        }

        return {
            openModuleInAppBrowser: function (mod) {
                openModuleInAppBrowser(mod);
            }
        }
    }]);