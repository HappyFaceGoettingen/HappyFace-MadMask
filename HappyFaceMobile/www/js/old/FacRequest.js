angular.module('hf.FacRequest', [])
    .factory('FacRequest', ['FacUIVariables', '$http', '$q', function (FacUIVariables, $http, $q) {
        var canceler = $q.defer();
        return {
            Query: function (instanceUrl) {
                canceler = $q.defer();
                return $http({
                    method: 'GET',
                    timeout: canceler.promise,  //call canceler.resolve(); to cancel the request
                    url: instanceUrl,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            },
            cancel: function () {
                if (FacUIVariables.getIsLoading()) {//if one is loading, then cancel it, triggering the error function of previous $http promises
                    canceler.resolve('canceled');
                    FacUIVariables.setIsLoading(false);
                    FacUIVariables.stopLoading(false);
                }
            }
        }
    }]);