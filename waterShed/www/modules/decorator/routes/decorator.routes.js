(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider

            /**** DECORATOR ****/
                .state('public', {
                    parent: 'general',
                    abstract: true,
                    template: '<wlt-decorator-public></wlt-decorator-public>'
                })
                .state('private', {
                    parent: 'general',
                    abstract: true,
                    template: '<wlt-decorator-private></wlt-decorator-private>',
                    data: {
                        auth: true
                    }
                })
                .state('private.account', {
                    parent: 'general',
                    abstract: true,
                    template: '<wlt-decorator-private></wlt-decorator-private>',
                    data: {
                        auth: true
                    }
                })

        }]);

})();
