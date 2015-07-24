(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltDecoratorPublic', wltDecoratorPublic);

    wltDecoratorPublic.$inject = ['globalFactory', 'systemValues'];

    function wltDecoratorPublic(globalFactory, systemValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/decorator/directives/wlt-decorator-public/decorator-public.html',
            scope: {},
            link: DecoratorPublicLink
        };

        return directive;

        function DecoratorPublicLink(scope, element, attrs) {

            scope.langCurrent = globalFactory.getCurrentLanguage();
            globalFactory.loadSystemValues();
            scope.systemValues = systemValues;

            init();

            function init() {
                globalFactory.loadTranslation('public');
            }
        }
    }

})();