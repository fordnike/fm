(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
            /**** REPORT ****/
                .state('private.report-list', {
                    url: '/reports',
                    template: '<wlt-report-list toggle-left="toggleLeft()" toggle-right="toggleRight()"></wlt-report-list>'
                })
                .state('private.report-view', {
                    url: '/report/:id',
                    template: '<wlt-report-view toggle-left="toggleLeft()" toggle-right="toggleRight()"></wlt-report-view>'
                })

        }]);

})();
