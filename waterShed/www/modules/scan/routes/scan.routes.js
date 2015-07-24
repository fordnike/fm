(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider

            /**** USER ****/
                .state('private.scan-view', {
                    url: '/scan',
                    template: '<wlt-scan-view toggle-left="toggleLeft()" toggle-right="toggleRight()"></wlt>'
                })


        }]);

})();
