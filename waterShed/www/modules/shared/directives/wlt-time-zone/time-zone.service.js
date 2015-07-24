(function () {
    'use strict';
    angular
        .module('nodiumApp')
        .factory('timeZoneFactory', timeZoneFactory);

    timeZoneFactory.$inject = ['httpFactory','$http', '$q'];

    function timeZoneFactory(httpFactory,$http, $q) {
        return {
            getTimeZoneList: getTimeZone,
            getTimeZoneLocal: getTimeZoneLocal
        };
        function getTimeZone() {
            var dataForm = {};
            var url = '/admin/timezone';
            return httpFactory.HTTP(url, dataForm, 'GET');
        };
        function getTimeZoneLocal() {
            var deferred = $q.defer();
            var temp = $http.defaults.headers.common;
            $http.defaults.headers.common = null;
            var dataForm = {};
            var url = 'https://www.telize.com/geoip';
            httpFactory.HTTP(url, dataForm, 'GET', 'text/plain ; charset=utf-8')
                .then(function (response) {
                    deferred.resolve(response.data.timezone);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });
            $http.defaults.headers.common = temp;
            return deferred.promise;
        };
    }
})();