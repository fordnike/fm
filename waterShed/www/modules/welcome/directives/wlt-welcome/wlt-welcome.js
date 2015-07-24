(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltWelcome', wltWelcome);

    wltWelcome.$inject = ['globalFactory'];

    function wltWelcome(globalFactory) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/welcome/directives/wlt-welcome/welcome.html',
            scope: {
                toggleLeft: '&toggleLeft',
                toggleRight: '&toggleRight'
            },
            link: WelcomeLink
        };

        return directive;

        function WelcomeLink(scope, element, attrs) {

            init();

            function init() {
                globalFactory.loadTranslation('welcome');
                scope.receivedResponse = true;
            }
        }
    }

})();