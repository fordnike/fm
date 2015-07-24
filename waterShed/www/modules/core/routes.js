(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

            // send to login page
            $urlRouterProvider.otherwise('/login');

            $locationProvider.html5Mode(false).hashPrefix('!');
            $stateProvider
                .state('general', {
                    abstract: true,
                    template: '<ui-view/>'
                })
                .state('public.404', {
                    url: '/404',
                    templateUrl: 'modules/core/404.html'
                })
            ;

        }]);

})();
