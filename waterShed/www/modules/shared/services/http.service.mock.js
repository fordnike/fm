(function () {
    'use strict';
    angular
        .module('nodiumApp')
        .factory('httpFactoryMock', httpFactoryMock);

    httpFactoryMock.$inject = ['$http', '$q'];

    function httpFactoryMock($http, $q) {

        return {
            mockSuccess: true,
            expectedData: {data: 'unset data', error: 'unset error'},
            HTTP: function (url, dataForm, metho) {
                var deferred = $q.defer();
                return deferred.promise;
            },
            installSpies: function () {
                spyOn(this, 'HTTP').and.callFake(function (url, dataForm, httpVerb) {
                    var deferred = $q.defer();
                    if (this.mockSuccess === true) {
                        deferred.resolve(this.expectedData.data);
                    } else {
                        deferred.reject(this.expectedData.error);
                    }
                    return deferred.promise;
                });
            },
            setData: function (d) {
                this.expectedData.data = d;
            },
            getData: function (d) {
                return this.expectedData.data;
            },
            setError: function (e) {
                this.expectedData.error = e;
            },
            getError: function () {
                return this.expectedData.error;
            },
            setMockSuccess: function (b) {
                this.mockSuccess = b;
            }

        };

    }


})();
