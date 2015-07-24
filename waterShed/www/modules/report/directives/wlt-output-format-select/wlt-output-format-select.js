(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltOutputFormatSelect', wltOutputFormatSelect);

    wltOutputFormatSelect.$inject = ['globalFactory', 'globalValues'];

    function wltOutputFormatSelect(globalFactory, globalValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/report/directives/wlt-output-format-select/output-format-select.html',
            scope: {
                output: '='
            },
            link: OutputFormatSelectLink
        };

        return directive;

        function OutputFormatSelectLink(scope, element, attrs) {

            scope.receivedResponse = true;
            scope.responseSuccess = true;

            init();

            function init() {
                globalFactory.loadTranslation('report');
                if (scope.output === undefined) {
                    scope.output = 'pdf';
                }
            }

        }
    }

})();