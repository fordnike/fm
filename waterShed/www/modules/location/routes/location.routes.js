(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider

            /**** LOCATION ****/
                .state('private.account.location-list', {
                    url: '/locations',
                    template: '<wlt-location-list toggle-left="toggleLeft()" toggle-right="toggleRight()"></wlt-location-list>'
                })
                .state('private.account.location-view', {
                    url: '/location/:id',
                    template: '<wlt-location-view toggle-left="toggleLeft()" toggle-right="toggleRight()"></wlt-location-view>'
                })
                .state('private.account.location-edit', {
                    url: '/location/:id/edit',
                    template: '<wlt-location-edit-page is-new="false"></wlt-location-edit-page>'
                })
                .state('private.account.location-new', {
                    url: '/location/new/',
                    template: '<wlt-location-edit-page is-new="true"></wlt-location-edit-page>'
                })

        }]);

})();
