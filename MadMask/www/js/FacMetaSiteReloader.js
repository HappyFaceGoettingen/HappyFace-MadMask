angular.module('madface.FacMetaSiteReloader', [])

    .factory('MetaSiteReloader', function(MetaMetaSites, MobileConfig, Config, Summary, MonitoringUrls, Servers, Visualizers, Logs, Emails) {

	var metaSite = MetaMetaSites.getSelectedSite();

	return {
	    reload: function() {
		metaSite = MetaMetaSites.getSelectedSite();
		logger.debug("Meta site = " + metaSite.name);
		Config.reload(metaSite);
		Summary.reload();
		MonitoringUrls.reload();
		Servers.reload();
		Visualizers.reload();
		Logs.reload();
		Emails.reload();
	    },
	    next: function() {
		    metaSite = MetaMetaSites.getNextSite();
		    logger.debug("Meta site = " + metaSite.name);
		    Config.reload(metaSite);
	    }
  };
});
