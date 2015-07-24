(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('httpFactory', httpFactory);

    httpFactory.$inject = ['$http', '$q'];

    function httpFactory($http, $q) {

        return {
            HTTP: function (url, dataForm, method, headers) {
                var deferred = $q.defer();
                var headers = headers || 'application/json ; charset=utf-8';
                $http({
                    method: method,
                    url: url,
                    data: dataForm,
                    headers: {'Content-Type': headers}

                }).success(function (data, status, headers, config) {
                    deferred.resolve({data: data, status: status, headers: headers, config: config});
                }).error(function (data, status, headers, config) {
                    deferred.reject({data: data, status: status, headers: headers, config: config}); //{error: status, data: data}
                });

                return deferred.promise;
            }
        };
    }

})();

