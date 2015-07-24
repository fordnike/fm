(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider

            /**** EVENT ****/
                .state('private.account.event-list', {
                    url: '/events',
                    template: '<wlt-event-list toggle-left="toggleLeft()" toggle-right="toggleRight()"></wlt-event-list>'
                })
                .state('private.account.event-view', {
                    url: '/event/:id',
                    template: '<wlt-event-view toggle-left="toggleLeft()" toggle-right="toggleRight()"></wlt-event-view>'
                })
                .state('private.account.event-new', {
                    url: '/event-new',
                    template: '<wlt-event-edit is-new="true"></wlt-event-edit>'
                })
                .state('private.account.event-new-help', {
                    url: '/event-new/:help',
                    template: '<wlt-event-edit is-new="true"></wlt-event-edit>'
                })
                .state('private.account.event-edit', {
                    url: '/event/:id/edit',
                    template: '<wlt-event-edit is-new="false"></wlt-event-edit>'
                })

        }]);

})();
