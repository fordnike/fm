(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider

            /**** TUTORIAL ****/
                .state('private.tutorial', {
                    url: '/welcome',
                    template: '<wlt-welcome toggle-left="toggleLeft()" toggle-right="toggleRight()"></wlt-welcome>'
                })

        }]);

})();
