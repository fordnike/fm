(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltFormatCurrency', wltFormatCurrency);
    wltFormatCurrency.$inject = [];
    function wltFormatCurrency() {
        return {
            restrict: 'EA',
            template: '<input ng-model="format" type="text" ui-number-mask="2" aria-label="amount">',
            scope: {
                getValue:'='
            },
            controller:['$scope', function (scope) {

            }],
            link: function (scope, element, attrs) {
               scope.format=angular.copy(scope.getValue)/100;
                scope.$watch('format', function() {
                    scope.getValue= scope.format*100;
                });
            }
        };
    }

})();