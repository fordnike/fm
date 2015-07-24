(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltDateSingleSelect', wltDateSingleSelect);

    wltDateSingleSelect.$inject = ['globalFactory', 'globalValues'];

    function wltDateSingleSelect(globalFactory, globalValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/report/directives/wlt-date-single-select/date-single-select.html',
            scope: {
                date: '='
            },
            link: DateSingleSelectLink
        };

        return directive;

        function DateSingleSelectLink(scope, element, attrs) {

            scope.receivedResponse = true;
            scope.responseSuccess = true;

            init();

            function init() {
                globalFactory.loadTranslation('report');
            }

        }
    }

})();