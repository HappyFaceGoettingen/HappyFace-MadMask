angular.module('hf.FacInstances', [])
    .factory('FacInstances', ['FacUIVariables', 'FacRequest', 'FacPopup', '$timeout', '$q' , function (FacUIVariables, FacRequest, FacPopup, $timeout, $q) {
        var instances = [];
        var activeInstance = [];
        var instanceString = window.localStorage['instances'];
        if (instanceString) {
            instances = angular.fromJson(instanceString);
        }
        if (window.localStorage['lastActiveInstance']) {
            activeInstance = instances[parseInt(window.localStorage['lastActiveInstance'])];
        }

        function setLastActiveInstance(index) {
            if (index == -1) {
                activeInstance = [];
                window.localStorage.removeItem('lastActiveInstance');
                return
            }
            activeInstance = instances[index];
            window.localStorage['lastActiveInstance'] = index;
        }

        function saveInstances() {
            window.localStorage.setItem('instances', angular.toJson(instances));
        }

        function createInstance(instance, doSelect) {
            var newInstance = {
                title: instance.title,
                url: instance.url,
                webServiceUrl: instance.webServiceUrl
            };
            newInstance.usingWebservice = newInstance.webServiceUrl ? true : false;
            FacUIVariables.beginLoading(doSelect);  //when resetting the instances then no ionicLoading, when adding instance manually then yes
            FacRequest.Query(newInstance.url)
                .then(function (data) {
                    if (data.data.indexOf("<happyface>") > -1) {  //if the response contains string "<happyface>"
                        var HFTree = $.xml2json(data.data);
                        var i;
                        for (i = 0; i < HFTree.category.length; ++i) {
                            HFTree.category[i].status = parseFloat(HFTree.category[i].status);
                        }
                        newInstance.categories = HFTree;
                        newInstance.lastRefreshed = new Date();
                        instances.push(newInstance);
                        if (doSelect) {
                            setLastActiveInstance(instances.length - 1);
                        }
                        saveInstances();
                        FacUIVariables.stopLoading(doSelect);
                        FacUIVariables.setTimeOutIsGreyedOut(newInstance.lastRefreshed);
                    }
                    else {
                        FacUIVariables.stopLoading(doSelect);
                        FacPopup.showPopupByName('invalidUrl');
                    }
                },
                function () { //error stuff here
                    FacUIVariables.stopLoading(doSelect);
                    FacPopup.showPopupByName('errorWhileAdding', newInstance.title);
                })
        }

        function refresh() {
            FacRequest.cancel();
            if (activeInstance.length != 0) { //if there is an activeInstance
                FacUIVariables.setIsLoading(true);
                FacUIVariables.beginLoading(false);
                FacRequest.Query(activeInstance.url)
                    .then(function (data) {
                        var HFTree = $.xml2json(data.data);
                        var i;
                        for (i = 0; i < HFTree.category.length; ++i) {
                            HFTree.category[i].status = parseFloat(HFTree.category[i].status);
                        }
                        activeInstance.categories = HFTree;
                        activeInstance.lastRefreshed = new Date();
                        saveInstances(instances);
                        $timeout(function () {
                            FacUIVariables.setTimeOutIsGreyedOut(activeInstance.lastRefreshed);
                            FacUIVariables.setIsLoading(false);
                            FacUIVariables.stopLoading(false);
                        }, 800)
                    },
                    function (data) { //error stuff here
                        if (data.data === null) { //it appears that data.data comes back as null, when the promise was canceled, if there was a server error it comes back as "" (an empty string)
                            console.log('previous refresh has been canceled');
                        } else {
                            console.log('error while refreshing');
                            $timeout(function () {
                                FacUIVariables.setIsLoading(false);
                                FacUIVariables.stopLoading(false);
                                FacPopup.showPopupByName('noInternet');
                            }, 800)
                        }
                    });
            }
            else {
                FacPopup.showPopupByName('errorWhileRefreshing');
            }
        }


        //conditionalRefresh comparing the last date when the refresh was made with current date
        function conditionalRefresh() {    //refresh the activeInstance if internet is there and last refresh is more than 15 min old
            if ((navigator.connection.type != Connection.NONE) && (activeInstance.length != 0)) {  //if we have internet and an active instance
              //get date of last refresh
              var lastRefreshDateObj = activeInstance.lastRefreshed;
              var lastRefreshDate = new Date(lastRefreshDateObj);
              //current date
              var currentTime = new Date();
              if (currentTime.getTime() - lastRefreshDate.getTime() > 120000) { //120000 milliseconds are 2 min
                $timeout(function () { //delay to give the app time to initialize UI
                  refresh();
                }, 400);
              }
            }
        }

        function setInstancesToDefault() {
            while (instances.length != 0) { //delete the current stock of instances
                removeInstance(0);
            }
            setLastActiveInstance(-1);  //delete active instance
            createInstance(
                {title: "CMS T1 Production Monitoring", url: "http://ekphappyface.physik.uni-karlsruhe.de/~happyface/cmst1prodmon/webpage/?action=getxml"},
                false
            );
            createInstance(
                {title: "Belle", url: "http://ekphappyface.physik.uni-karlsruhe.de/HappyFace/belle/category?action=getxml"},
                false
            );
            createInstance(
                {title: "KIT T3", url: "http://ekphappyface.physik.uni-karlsruhe.de/~happyface/t3-kit/webpage/?action=getxml"},
                false
            );
            createInstance(
                {title: "KIT T1", url: "http://ekphappyface.physik.uni-karlsruhe.de/~happyface/gridka/webpage/?action=getxml"},
                false
            );
            createInstance(
                {title: "GoeGrid", url: "http://happyface-goegrid.gwdg.de/category?action=getxml", webServiceUrl: "http://happyface-goegrid.gwdg.de/webservice/"},
                false
            );
//            setLastActiveInstance(-1); //code for the instances to be "reset", so the refresh button does not spin
        }


        function removeInstance(instance) {
            instances.splice(instances.indexOf(instance), 1);
            saveInstances(instances);
        }

        function lightweightRefresh() {
            var deferred = $q.defer();  //promise to tell the background refresh if the refresh was successful
            //lightweightRefresh
            FacRequest.Query(activeInstance.url)
                .then(function (data) {
                    var HFTree = $.xml2json(data.data);
                    var i;
                    for (i = 0; i < HFTree.category.length; ++i) {
                        HFTree.category[i].status = parseFloat(HFTree.category[i].status);
                    }
                    activeInstance.categories = HFTree;
                    activeInstance.lastRefreshed = new Date();
                    saveInstances(instances);
                    FacUIVariables.setTimeOutIsGreyedOut(activeInstance.lastRefreshed);
                    //lightweightRefreshEnd
                    deferred.resolve();
                },
                function () {
                    //error
                    deferred.reject("could not query that url");
                }
            );
            return deferred.promise;
        }


        // From the outside
        return {
            all: function () {
                return instances;
            },
            saveInstances: function (instances) {
                saveInstances(instances);
            },
            getLastActiveInstance: function () {
                return activeInstance;
            },
            setLastActiveInstance: function (index) {
                setLastActiveInstance(index);
            },
            createInstance: function (instance, doSelect) {
                createInstance(instance, doSelect);
            },
            refresh: function () {
                refresh();
            },
            conditionalRefresh: function () {
                conditionalRefresh();
            },
            setInstancesToDefault: function () {
                setInstancesToDefault();
            },
            removeInstance: function (instance) {
                removeInstance(instance);
            },
            lightweightRefresh: function () {
                return lightweightRefresh();
            }
        };
    }]);