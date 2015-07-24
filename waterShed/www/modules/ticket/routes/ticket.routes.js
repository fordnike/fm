(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider

            /**** TICKET ****/
                .state('private.ticket-edit-help', {
                    url: '/event/:id/tickets/edit/:help',
                    template: '<wlt-ticket-list afficher="edit"></wlt-ticket-list>'
                })
                .state('private.ticket-edit', {
                    url: '/event/:id/tickets/edit',
                    template: '<wlt-ticket-list afficher="edit"></wlt-ticket-list>'
                })

        }]);

})();
