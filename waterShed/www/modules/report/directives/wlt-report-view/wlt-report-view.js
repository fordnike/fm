(function () {
    'use strict';

    angular
        .module('nodiumApp')
        .directive('wltReportView', wltReportView);

    wltReportView.$inject = ['$stateParams', 'reportFactory', 'globalFactory', 'globalValues'];

    function wltReportView($stateParams, reportFactory, globalFactory, globalValues) {

        var directive = {
            restrict: 'EA',
            templateUrl: 'modules/report/directives/wlt-report-view/report-view.html',
            scope: {
                toggleLeft: '&toggleLeft',
                toggleRight: '&toggleRight'
            },
            link: ReportViewLink
        };

        return directive;

        function ReportViewLink(scope, element, attrs) {

            scope.receivedResponse = false;
            scope.responseSuccess = false;
            scope.admin = globalValues.admin;
            scope.subdomain = globalValues.subdomain;

            init();

            function init() {
                globalFactory.loadTranslation('report');

                var reportId = $stateParams.id;
                if (reportId != "undefined") {

                    reportFactory.get(reportId)
                        .then(function (response) {
                            scope.receivedResponse = true;
                            scope.responseSuccess = true;
                            scope.report = angular.copy(response.data);
                        })
                        .catch(function (error) {
                            scope.receivedResponse = true;
                            scope.responseSuccess = false;
                            scope.message = globalFactory.formatMessage('danger', 'shared.error.error', error);
                        });
                }
            }
        }
    }

})();