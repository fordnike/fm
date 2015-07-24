(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('locationFactory', locationFactory);

    locationFactory.$inject = ['$q', '$window','httpFactory', 'globalValues', 'globalFactory', '$state'];

    function locationFactory($q, $window, httpFactory, globalValues, globalFactory, $state) {

        return {
            add: addLocation,
            delete: deleteLocation,
            get: getLocation,
            getList: getListLocations,
            goBack: goBack,
            goLocationNew: goLocationNew,
            update: updateLocation
        };

        function addLocation(data) {
            var deferred = $q.defer();
            var dataForm = data;
            var account = globalValues.account;
            var url = account + '/location';

            httpFactory.HTTP(url, dataForm, 'POST')
                .then(function (response) {
                    var path = response.headers('content-location')
                    var pathSplit = path.split('/');
                    var locationId = pathSplit[4];

                    deferred.resolve(locationId);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function deleteLocation(data) {
            var deferred = $q.defer();
            var dataForm = data;
            var id = data.id;
            var account = globalValues.account;
            var url = account + '/location/' + id;

            httpFactory.HTTP(url, dataForm, 'DELETE')
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function getLocation(id) {
            id = parseInt(id, 10);
            var deferred = $q.defer();
            var dataForm = {};
            var account = globalValues.account;
            var url = account + '/location/' + id;

            httpFactory.HTTP(url, dataForm, 'GET')
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function getListLocations() {
            var deferred = $q.defer();
            var dataForm = {};
            var account = globalValues.account;
            var url = account + '/locations';

            httpFactory.HTTP(url, dataForm, 'GET')
                .then(function (response) {
                    deferred.resolve(response.data.locations);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

        function goBack() {
            $window.history.back();
        }

        function goLocationNew(){
            $state.go('private.account.location-new');
        }

        function updateLocation(data) {
            var deferred = $q.defer();
            var dataForm = data;
            var id = data.id;
            var account = globalValues.account;
            var url = account + '/location/' + id;

            httpFactory.HTTP(url, dataForm, 'PUT')
                .then(function (response) {
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(globalFactory.formatError(error));
                });
            return deferred.promise;
        }

    }

})();
