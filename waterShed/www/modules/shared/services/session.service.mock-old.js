(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .factory('sessionFactoryMockOld', sessionFactoryMockOld);

    sessionFactoryMockOld.$inject = [];

    function sessionFactoryMockOld() {

        return {
            mockSuccess: true,
            expectedData: {data: 'unset data', error: 'unset error'},
            getSync: function (a, b) {
                return this.expectedData.data;
            },
            putSync: function (a, b, c) {
                this.expectedData.data = b;
            },
            destroy: function () {
            },
            installSpies: function () {
                spyOn(this, 'getSync').and.callFake(function (a, b) {
                    var retval;
                    if (this.mockSuccess == true) {
                        retval = this.expectedData.data;
                    } else {
                        retval = this.expectedData.error;
                    }
                    return retval;
                });
                spyOn(this, 'putSync').and.callFake(function (a, b, c) {
                    if (this.mockSuccess == true) {
                    } else {
                    }
                });
                spyOn(this, 'destroy').and.callFake(function () {
                    if (this.mockSuccess == true) {
                    } else {
                    }
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

