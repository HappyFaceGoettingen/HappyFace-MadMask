angular.module('madface.FacMobileConfig', [])

.factory('MobileConfig', function() {

	var mobileConfig = {
	    "automaticFetch" : true,
	    "interval" : 1,
	    "automaticRotation" : false,
	    "detectOnlyChange" : true,
	    "enableMadVision": true,
	    "enableTextSpeech" : true,
	    "happyFaceCompatible" : false
        };

  return {
      get: function() {
	  return mobileConfig;
      },
      put: function(config){
	  console.log(config);
	  mobileConfig = config;
      }

  };
});

