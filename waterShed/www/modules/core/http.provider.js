(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('httpInterceptorFactory');
        }]);

})();
