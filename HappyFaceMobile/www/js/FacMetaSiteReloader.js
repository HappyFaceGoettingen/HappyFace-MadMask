angular.module('happyface.FacMetaSiteReloader', [])

    .factory('MetaSiteReloader', function(MetaMetaSites, MobileConfig, Config, Summary, MonitoringUrls, Systems, Visualizers, Logs) {

	var metaSite = MetaMetaSites.getSelectedSite();

	return {
	    reload: function() {
		metaSite = MetaMetaSites.getSelectedSite();
		logger.debug("Meta site = " + metaSite.name);
		Config.reload(metaSite);
		Summary.reload();
		MonitoringUrls.reload();
		Systems.reload();
		Visualizers.reload();
		Logs.reload();
	    },
	    next: function() {
		    metaSite = MetaMetaSites.getNextSite();
		    logger.debug("Meta site = " + metaSite.name);
		    Config.reload(metaSite);
	    }
  };
});
