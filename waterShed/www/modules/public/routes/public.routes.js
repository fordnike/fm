(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider

            /**** AUTHENTICATION ****/
                .state('public.login', {
                    url: '/login',
                    template: '<wlt-login></wlt-login>'
                })
                .state('public.signup', {
                    url: '/signup',
                    template: '<wlt-signup></wlt-signup>'
                })
                .state('public.forgot', {
                    url: '/forgot',
                    template: '<wlt-forgot-password></wlt-forgot-password>'
                })
                .state('public.email', {
                    url: '/valide-email/',
                    template: '<wlt-valid-email></wlt-valid-email>'
                })
                .state('public.resetPassword', {
                    url: '/reset-password',
                    template: '<wlt-reset-password></wlt-reset-password>'
                })

        }]);

})();
