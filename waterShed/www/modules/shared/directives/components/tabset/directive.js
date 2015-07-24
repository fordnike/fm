(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('tabSet', TabSetDirective);

    function TabSetLink(scope, element, attrs) {
        scope.justified = scope.justified === true;
    }

    function TabSetDirective() {
        return {
            restrict: 'EA',
            scope: {
                type: '@',
                justified: '='
            },
            replace: true,
            transclude: true,
            templateUrl: 'modules/shared/directives/components/tabset/partial.html',
            link: TabSetLink,
            controller: 'TabSetController'
        }
    }

})();
