angular.module('madface.controllers', [])

.controller('ServersCtrl', function($scope, Servers) {
  $scope.servers = Servers.all();
})

.controller('ServerDetailCtrl', function($scope, $stateParams, Servers) {
  $scope.server = Servers.get($stateParams.serverName);
})

.controller('WebImageViewerCtrl', function($scope, $stateParams, MonitoringUrls) {
  logger.info("Selected " + $stateParams.imageName);
  $scope.url = MonitoringUrls.get($stateParams.imageName);
})

.controller('PlotViewerCtrl', function($scope, $stateParams, MonitoringUrls) {
  logger.info("Selected " + $stateParams.imageName);
  $scope.url = MonitoringUrls.get($stateParams.imageName);
})

.controller('MonitoringCtrl', function($scope, $ionicModal, $ionicLoading, $timeout, MonitoringUrls, Config, Summary, MobileConfig, MetaSiteReloader) {

  // load configuration
  $scope.isBrowser = ! Config.isMobilePlatform();


  /*******************************************************************
   * MetaMetaModal
   ******************************************************************/
  $ionicModal.fromTemplateUrl('templates/meta-meta-configuration.html',
			      function(modal) {
				  $scope.modalMetaMetaConfiguration = modal;
			      }, {
				  scope : $scope,
				      animation : "slide-in-down"
				      });
  
  $scope.openModalMetaMetaConfiguration = function() {
      if (!$scope.isBrowser) $scope.modalMetaMetaConfiguration.show();
  };
  
  $scope.closeModalMetaMetaConfiguration = function() {
      // closing
      $scope.modalMetaMetaConfiguration.hide();
      MetaSiteReloader.reload();

      $scope.statusImg = Config.getStatusImg(Summary.getLevel());
      $scope.statusLevel = Summary.getLevel();
      $scope.statusText = Summary.getText();
      $scope.history = Summary.getHistory();
      $scope.selectedItem = $scope.history[0];
      $scope.monitoringUrls = MonitoringUrls.all();
  };
  

  /*******************************************************************
   * Contents
   ******************************************************************/

  // Init
  $scope.init = function() {
      $scope.statusImg = Config.getStatusImg(Summary.getLevel());
      $scope.statusLevel = Summary.getLevel();
      $scope.statusText = Summary.getText();
      $scope.history = Summary.getHistory();
      $scope.selectedItem = $scope.history[0];
      $scope.monitoringUrls = MonitoringUrls.all();
  };
  $scope.init();


  // Set current status color
  $scope.statusColor = function(){
      return Config.getStatusColor(Summary.getLevel());
  };


  /*******************************************************************
   * Actions
   ******************************************************************/
  // Reload
  $scope.reload = function(selectedItem) {
      console.log(selectedItem);
      Summary.reload();
      $scope.statusImg = Config.getStatusImg(Summary.getLevel());
      $scope.statusLevel = Summary.getLevel();
      $scope.statusText = Summary.getText();
      //$scope.history = Summary.getHistory();
      $scope.monitoringUrls = MonitoringUrls.setUrls(selectedItem.name);
      $scope.selectedItem = selectedItem;
  };



  $scope.speakSummary = function(){
      $ionicLoading.show({
	      content: '<i class="icon ion-loading-c"></i>',
	      animation: 'fade-in',
	      showBackdrop: false,
	      maxWidth: 50,
	      showDelay: 0
	  });


      if (MobileConfig.get().automaticRotation){
	  // Reloading next site
	  MetaSiteReloader.next();
	  Summary.reload();
	  $scope.init();
	  $scope.monitoringUrls = MonitoringUrls.setUrls($scope.selectedItem.name);
      } else {
	  // Reloading only this site
	  $scope.reload($scope.selectedItem);
      }
      $ionicLoading.hide();
      Summary.say();
  };

  $timeout(function () {
	  $ionicLoading.hide();
      }, 3000);

})


.controller('AnalyzerCtrl', function($scope, MonitoringUrls, Config, Summary) {
  $scope.monitoringUrls = MonitoringUrls.all();

  $scope.statusImg = Config.getStatusImg(Summary.getLevel());
  $scope.statusLevel = Summary.getLevel();
  $scope.statusText = Summary.getText();
  //$scope.history = Summary.getHistory();

  $scope.selectedItem = "overall_pathway";
  $scope.single_plot_src = $scope.monitoringUrls[0].urls[0].plot_overall_pathway;

  // Set current status color
  $scope.statusColor = function(){
      return Config.getStatusColor(Summary.getLevel());
  };

  $scope.reload = function() {
      Summary.reload();
      $scope.statusImg = Config.getStatusImg(Summary.getLevel());
      $scope.statusLevel = Summary.getLevel();
      $scope.statusText = Summary.getText();
      //$scope.history = Summary.getHistory();
  };

  $scope.setPlots = function(name) {
      console.log(name);
      $scope.selectedItem = name;
      $scope.monitoringUrls = MonitoringUrls.setPlots(name);
      if (name == "overall_pathway"){
	  $scope.single_plot_src = $scope.monitoringUrls[0].urls[0].plot_overall_pathway;
      }
  };

  $scope.hideMultiPlot = function(){
      if (($scope.selectedItem == "infogain") || ($scope.selectedItem == "analysis") || ($scope.selectedItem == "pathway")) return(false);
      return(true);
  };

  $scope.hideSinglePlot = function(){
      if ($scope.selectedItem == "overall_pathway") return(false);
      return(true);
  };

  $scope.speakSummary = function(){
      $scope.reload();
      Summary.say();
  };
})

.controller('LogCtrl', function($scope, $http, $q, Logs) {
  $scope.logs = Logs.all();
  $scope.selectedItem = $scope.logs[0];
  $http.get($scope.selectedItem.file).success(function(resp) {$scope.logfileContent = resp;});

  $scope.reload = function(log) {
      console.log(log);
      // Gettiing content
      $http.get(log.file).success(function(resp) {$scope.logfileContent = resp;});
  };
})

.controller('DiagramCtrl', function($scope, Visualizers) {
  $scope.visualizers = Visualizers.all();
  $scope.selectedItem = $scope.visualizers[0];
  $scope.diagram = $scope.selectedItem.file;

  $scope.reload = function(visualizer) {
      console.log(visualizer);
      // Gettiing content
      $scope.diagram = visualizer.file;
  };

})

.controller('ConfigCtrl', function($scope) {

})

.controller('AccountCtrl', function($scope, Emails) {
  $scope.emails = Emails.all();
});

