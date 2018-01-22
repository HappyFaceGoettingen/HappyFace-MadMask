angular.module('madface.FacMetaMetaSites', [])

.factory('MetaMetaSites', function() {

    var selectedSite = metaMetaSites[0];

    return {
	all: function() {
	    return metaMetaSites;
	},
	getSelectedSite: function() {
	    return selectedSite;
	},
	setSelectedSite: function(site){
	    selectedSite = site;
	},
	getNextSite: function() {
	    var aSite = selectedSite;
	    for (var i = 0; i < metaMetaSites.length; i++){
		if ((metaMetaSites[i].name == aSite.name) && 
		    (metaMetaSites[i].region == aSite.region) &&
		    (metaMetaSites[i].type == aSite.type)){
		    if (i >= metaMetaSites.length - 1){
			selectedSite = metaMetaSites[0];
		    } else {
			selectedSite = metaMetaSites[i+1];
		    }
		}
	    }
	    return selectedSite;
	}
  };
});

