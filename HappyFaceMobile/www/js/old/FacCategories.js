angular.module('hf.FacCategories', [])
    .factory('FacCategories', function () {
        return {
            getLastActiveCatIndex: function () {
                return parseInt(window.localStorage['lastActiveCat']) || 0;
            },
            setLastActiveCatIndex: function (index) {
                window.localStorage['lastActiveCat'] = index;
            }
        };
    });