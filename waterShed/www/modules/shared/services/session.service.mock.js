(function () {
    'use strict';
    angular
        .module('nodiumApp')
        .factory('sessionFactoryMock', sessionFactoryMock);

    sessionFactoryMock.$inject = ['$http', '$q'];

    function sessionFactoryMock($http, $q) {

        return {
            mockSuccess: true,
            expectedData: {data: 'unset data', error: 'unset error'},
            getSync: function (a, b) {
                return this.expectedData.data;
            },
            putSync: function (a, b, c) {
            },
            installSpies: function () {
                spyOn(this, 'getSync').and.callThrough();
                spyOn(this, 'putSync').and.callThrough();
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

