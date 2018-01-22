angular.module('madface.CtrlModalMetaMetaConfiguration', []).controller(
		'CtrlModalMetaMetaConfiguration',
		function($scope, $ionicModal, MetaMetaSites, MobileConfig) {

			/*
			 * initial configuration parameters
			 */
			$scope.metaMetaSites = MetaMetaSites.all();
			$scope.selectedSite = MetaMetaSites.getSelectedSite();

			$scope.mobileConfig = MobileConfig.get();

			$scope.setSite = function(selectedSite){
			    logger.debug(selectedSite);
			    MetaMetaSites.setSelectedSite(selectedSite);
			};

			$scope.onChange = function(){
			    MobileConfig.put($scope.mobileConfig);
			}

		});
