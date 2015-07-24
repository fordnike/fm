(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider

            /**** USER ****/
                .state('private.user-view', {
                    url: '/profile',
                    template: '<wlt-user-view toggle-left="toggleLeft()" toggle-right="toggleRight()"></wlt-user-view>'
                })
                .state('private.user-edit', {
                    url: '/profileEdit/',
                    template: '<wlt-user-edit></wlt-user-edit>'
                })
                .state('private.changePassword', {
                    url: '/changePassword',
                    template: '<wlt-user-edit-password toggle-left="toggleLeft()" toggle-right="toggleRight()"></wlt-user-edit-password>'
                })

        }]);

})();
