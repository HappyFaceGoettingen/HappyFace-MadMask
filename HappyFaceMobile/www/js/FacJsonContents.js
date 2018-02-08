angular.module('madface.FacJsonContents', [])

.factory('Config', function() {

  return {
      reload: function(metaSite) {
	  logger.debug("Reloading " + metaSite.name + " [" + metaSite.host + ":" + metaSite.port + "/" + metaSite.dir + "] ...");
	  config = loadJson(metaSite.host, metaSite.port, metaSite.dir, configJson);
	  config.dir = metaSite.dir;
      },
    get: function() {
      return config;
      },
    getStatusImg: function(status) {
	  for (var i = 0; i < config.status.length; i++) {
	      if (config.status[i].name === status) {
		  return config.status[i].file;
	      }
	  }
	  return null;
      },
    getStatusColor: function(status) {
	  for (var i = 0; i < config.status.length; i++) {
	      if (config.status[i].name === status) {
		  return config.status[i].color;
	      }
	  }
	  return null;
      },
      isMobilePlatform: function(){
	  if (FORCE_MOBILE) return true;
	  return isMobilePlatform();
      }
  };
})

.factory('Summary', function(MobileConfig, Config) {

  return {
    all: function() {
      return summary;
    },
    getText: function() {
	  return summary.text;
    },
    getLevel: function() {
	  return summary.level;
    },
    getHistory: function() {
	  var str = summary.history;
	  var array = str.split(" ");
	  var history = new Array();
	  for (var i = 0; i < array.length; i++){
	      history.push({"name": array[i], "datetime": array[i]});
	  }
	  return history;
    },
    reload: function(){
	  logger.debug("Reloading summary ...");
	  summary = loadJson(Config.get().host, Config.get().port, "", summaryJson);
    },
    say: function() {
	  if (MobileConfig.get().enableTextSpeech) window.TTS.speak(summary.text);
    }
  };
})

.factory('MonitoringUrls', function(Config, MobileConfig) {
  // Making URLs
  var plot_name = "analysis";
  setLinks("latest");


  function setLinks(datetime_dir){
      var remote_url = getMobileUrl();

      var capture_dir = config.capture;
      var thumbnail_dir = config.thumbnail;
      if (MobileConfig.get().enableMadVision){
	  capture_dir = config.analysis + "/mad_vision";
	  thumbnail_dir = config.analysis + "/mad_vision_thumbnail";
      }
      var plot_infogain_dir = config.analysis + "/plot_infogain/latest";
      var plot_analysis_dir = config.analysis + "/plot_analysis/latest";
      var plot_pathway_dir = config.analysis + "/plot_pathway/latest";

      for (var i = 0; i < monitoringUrls.length; i++) {
	  for (var j = 0; j < monitoringUrls[i].urls.length; j++){
	      if ((monitoringUrls[i].urls[j].file_prefix == null) || (! monitoringUrls[i].urls[j].capture)){
		  monitoringUrls[i].urls[j].thumbnail = remote_url + "img/not_captured.png";
		  monitoringUrls[i].urls[j].image = remote_url + "img/not_captured.png";
		  monitoringUrls[i].urls[j].analysis_plot = remote_url + "img/not_captured.png";
		  monitoringUrls[i].urls[j].plot_pathway = remote_url + "img/not_captured.png";
		  monitoringUrls[i].urls[j].plot_overall_pathway = remote_url + "img/not_captured.png";
	      } else {
		  monitoringUrls[i].urls[j].thumbnail = remote_url + thumbnail_dir + "/" + datetime_dir + "/" + monitoringUrls[i].urls[j].file_prefix + ".jpg";
		  monitoringUrls[i].urls[j].image = remote_url + capture_dir + "/" + datetime_dir + "/" + monitoringUrls[i].urls[j].file_prefix + ".jpg";
		  monitoringUrls[i].urls[j].plot_infogain = remote_url + plot_infogain_dir + "/" + monitoringUrls[i].urls[j].file_prefix + ".png";
		  monitoringUrls[i].urls[j].plot_analysis = remote_url + plot_analysis_dir + "/" + monitoringUrls[i].urls[j].file_prefix + ".png";
		  monitoringUrls[i].urls[j].plot_pathway = remote_url + plot_pathway_dir + "/" + monitoringUrls[i].urls[j].file_prefix + ".png";
		  monitoringUrls[i].urls[j].plot_overall_pathway = remote_url + plot_pathway_dir + "/overall_pathway.png";

		  setPlots(plot_name);
	      }
	  }
      }
  }

  function setPlots(pname){
      plot_name = pname;
      for (var i = 0; i < monitoringUrls.length; i++) {
	  for (var j = 0; j < monitoringUrls[i].urls.length; j++){
	      if ((monitoringUrls[i].urls[j].file_prefix == null) || (! monitoringUrls[i].urls[j].capture)){
		  logger.debug("nop");
	      } else {
		  if (plot_name == "infogain" ) monitoringUrls[i].urls[j].analysis_plot = monitoringUrls[i].urls[j].plot_infogain;
		  if (plot_name == "analysis" ) monitoringUrls[i].urls[j].analysis_plot = monitoringUrls[i].urls[j].plot_analysis;
		  if (plot_name == "pathway" ) monitoringUrls[i].urls[j].analysis_plot = monitoringUrls[i].urls[j].plot_pathway;
		  if (plot_name == "overall_pathway" ) monitoringUrls[i].urls[j].analysis_plot = monitoringUrls[i].urls[j].plot_overall_pathway;
	      }
	  }
      }
  }


  return {
    all: function() {
      return monitoringUrls;
    },
    get: function(file_prefix) {
      for (var i = 0; i < monitoringUrls.length; i++) {
	  for (var j = 0; j < monitoringUrls[i].urls.length; j++){
	      if (monitoringUrls[i].urls[j].file_prefix == file_prefix) {
		  return monitoringUrls[i].urls[j];
	      }
	  }
      }
      return null;
    },
    setUrls: function(datetime_dir){
	  setLinks(datetime_dir);
	  return monitoringUrls;
    },
    setPlots: function(pname){
	  setPlots(pname);
	  return monitoringUrls;
    },
    reload: function(){
	  logger.debug("Reloading MonitoringUrls ...");
	  monitoringUrls = loadJsonByConfig(Config.get(), monitoringUrlsJson);
	  setLinks("latest");
    }
  };
})

.factory('Servers', function(Config) {


  return {
    all: function() {
      return servers;
    },
    get: function(serverName) {
      for (var i = 0; i < servers.length; i++) {
        if (servers[i].name == serverName) {
          return servers[i];
        }
      }
      return null;
    },
    reload: function(){
	  logger.debug("Reloading Servers ...");
	  servers = loadJsonByConfig(Config.get(), serversJson);
    }
  };
})


.factory('Visualizers', function(Config) {
  var visualizers = config.visualizers;
  setLinks();

  function setLinks(){
      for (var i = 0; i < visualizers.length; i++) {
	  var remote_url = getMobileUrl();
	  if (isHttpUrl(visualizers[i].file)) remote_url= "";
	  visualizers[i].file = remote_url + visualizers[i].file;
      }
  }

  return {
    all: function() {
      return visualizers;
    },
    get: function(i) {
      return visualizers[i];
    },
    reload: function(){
	  logger.debug("Reloading Visualizers ...");
	  visualizers = Config.get().visualizers;
	  setLinks();
    }
  };
})


.factory('Logs', function(Config) {
  var logs = config.logs;
  setLinks();

  function setLinks(){
      for (var i = 0; i < logs.length; i++) {
	  var remote_url = getMobileUrl();
	  if (isHttpUrl(logs[i].file)) remote_url= "";
	  logs[i].file = remote_url + logs[i].file;
      }
  }

  return {
    all: function() {
      return logs;
    },
    get: function(i) {
      return logs[i];
    },
    reload: function(){
	  logger.debug("Reloading Logs ...");
	  logs = Config.get().logs;
	  setLinks();
    }
  };
})

.factory('Emails', function(Config) {

  return {
    all: function() {
      return emails;
    },
    get: function(emailAddress) {
      for (var i = 0; i < emails.length; i++) {
        if (emails[i].email === emailAddress) {
          return emails[i];
        }
      }
      return null;
    },
    reload: function(){
	  logger.debug("Reloading Emails ...");
	  emails = loadJsonByConfig(Config.get(), emailsJson);
    }
  };
});
