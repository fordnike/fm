(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltDateRangeSelect', wltDateRangeSelect);

    wltDateRangeSelect.$inject = ['globalFactory', 'globalValues'];

    function wltDateRangeSelect(globalFactory, globalValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/report/directives/wlt-date-range-select/date-range-select.html',
            scope: {
                startDate: '=',
                endDate: '='
            },
            link: DateRangeSelectLink
        };

        return directive;

        function DateRangeSelectLink(scope, element, attrs) {

            scope.receivedResponse = true;
            scope.responseSuccess = true;

            init();

            function init() {
                globalFactory.loadTranslation('report');
            }

        }
    }

})();